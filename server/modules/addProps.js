const pool = require('./pool');

async function addCurrentAndFavorites(userId, recipeList) {
    // this function checks if the search results exist in the db for that user
    // and if they are already in the user's cart
    // we need this to do some conditional rendering on the front end
    for (let i = 0; i < recipeList.results.length; i++) {
      recipe = recipeList.results[i]
      recipe['isCurrent'] = false
      recipe['isFavorite'] = false
      const query =  `SELECT "is_current", "is_favorite" FROM "user_recipes"
                      WHERE "user_id" = $1 AND "recipe_id" = $2`
      const params = [userId, recipe.id]
      // see if it exists in the db
      await pool.query(query, params).then(dbResponse => {
        if (dbResponse.rowCount !== 0) {
          recipe['isCurrent'] = dbResponse.rows[0].is_current    
          recipe['isFavorite'] = dbResponse.rows[0].is_favorite
        } 
        // console.log('after updating: ', recipe['isCurrent'])
        // if exists give it value from db
        recipeList.results[i] = recipe
        // console.log('after assigning it back into recipeList: ', recipeList.results[i].isCurrent)
      }).catch(error => {
        console.log('Failed to decide if recipe is current or not: ', error);
        return 'addIsCurrent failed';
      })
    }
    // await console.log('Inside addIsCurrentProperty-----------------')
    // await console.log('the first item in addIsCurrentProperty: ', recipeList.results[0].isCurrent)
    // await console.log('the second item in addIsCurrentProperty: ', recipeList.results[1].isCurrent)
    return recipeList
  }

  module.exports = addCurrentAndFavorites