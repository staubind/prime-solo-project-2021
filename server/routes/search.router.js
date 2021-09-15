const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const axios = require('axios');
const addCurrentAndFavorites = require('../modules/addProps')

router.get('/', (req, res) => {
    // console.log('the request term is: ', req.query.searchTerm);
  // compose params for api call.
  axios({
    method: 'GET',
    url: 'https://api.spoonacular.com/recipes/complexSearch', 
    params: {
        // grabs the api key from environment variables to keep our key secure
        apiKey: process.env.SPOONACULAR_API_KEY,
        query: req.query.searchTerm,
        number: 2, // adjust later
        fillIngredients: true,
        addRecipeInformation: true,
    }
  })
  .then(async apiResponse => {
    // console.log('api request succeeded: ', apiResponse.data)
    const preparedResults = await addCurrentAndFavorites(req.user.id, apiResponse.data.results)
    // console.log('the prepared results for item 0 is: ', preparedResults.results[0].isCurrent);
    // console.log('the prepared results for item 1 is: ', preparedResults.results[1].isCurrent);
    if (preparedResults === 'addCurrentAndFavorites failed') {
      console.log('addCurrentAndFavorites Failed.')
      res.sendStatus(500);
    }
    res.send(preparedResults)
  }).catch( error => {
      console.log('Spoonacular api request failed: ', error)
      res.sendStatus(500);
  })
});


router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;
