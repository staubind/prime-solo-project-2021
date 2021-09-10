const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const axios = require('axios');


function addIsCurrentProperty(userId, recipeList) {
  // this function checks if the search results exist in the db for that user
  // and if they are already in the user's cart
  // we need this to do some conditional rendering on the front end
  for (let i = 0; i < recipeList.results.length; i++) {
    recipe = recipeList.results[i]
    recipe['isCurrent'] = false
    const query =  `SELECT "is_current" FROM "user_recipes"
                    WHERE "user_id" = $1 AND "recipe_id" = $2`
    const params = [userId, recipe.id]
    // see if it exists in the db
    pool.query(query, params).then(dbResponse => {
      if (dbResponse.rowCount !== 0) {
        recipe['isCurrent'] = dbResponse.rows[0].is_current
      } 
      // console.log('after updating: ', recipe['isCurrent'])
      // if exists give it value from db
      recipeList.results[i] = recipe
    }).catch(error => {
      console.log('Failed to decide if recipe is current or not: ', error);
      return 'addIsCurrent failed';
    })
  }
  return recipeList
}

router.get('/', (req, res) => {
    console.log('the request term is: ', req.query.searchTerm);
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
  .then(apiResponse => {
    // console.log('api request succeeded: ', apiResponse.data)
    const preparedResults = addIsCurrentProperty(req.user.id, apiResponse.data)
    console.log('the prepared results are; ', preparedResults.results[0]);
    if (preparedResults === 'addIsCurrent failed') {
      console.log('addIsCurrnet Failed.')
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
