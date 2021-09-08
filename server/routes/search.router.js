const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const axios = require('axios');

/**
 * GET route template
 */
router.get('/', (req, res) => {
  // GET route code here
  console.log('we are getting here with the data', req.query.searchTerm);
  const params = {
    query: req.query.searchTerm,
    maxFat: 25,
    number: 1,}
  const apiKey= '49f8bd1be8064b059484c899a3638e06'
  axios({
    method: 'GET',
    url: 'https://api.spoonacular.com/recipes/complexSearch', 
    params: {
        apiKey: process.env.SPOONACULAR_API_KEY,
        query: '',
        number: 2, // adjust later
        fillIngredients: true,
        addRecipeInformation: true,
    }
  })
  .then(apiResponse => {
    console.log('api request succeeded: ', apiResponse.data)
    res.send(apiResponse.data)
  }).catch( error => {
      console.log('Spoonacular api request failed: ', error)
      res.sendStatus(500);
  })
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;
