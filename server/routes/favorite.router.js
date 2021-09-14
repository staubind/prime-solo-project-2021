const express = require('express')
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router()
const axios = require('axios');
const addCurrentAndFavorites = require('../modules/addProps');

router.get('/all', rejectUnauthenticated, (req, res) => {
    const sqlQuery = `SELECT ARRAY_AGG("recipe_id") AS "favorites" FROM "user_recipes"
                      WHERE "user_id" = $1 AND "is_favorite" = TRUE;`;
    const sqlParams = [req.user.id];
    // console.log(req.query.favorites) // will be undefined if we send an empty array, but it is coming through.
    pool.query(sqlQuery, sqlParams).then(dbResponse => {
        // all of this logic would be to minimize api usage
            // compare what's different in the ids sent by the front end to what we've got in dbResponse.rows[0].favorites
                // make a function to do this
            // then do an api call only for what is different
        // console.log('favorites is: ', !!dbResponse.rows[0].favorites)
        
        // api call here:
        if (!!dbResponse.rows[0].favorites) {
            axios({
                method: 'GET',
                url: 'https://api.spoonacular.com/recipes/informationBulk',
                params: {
                    apiKey: process.env.SPOONACULAR_API_KEY,
                    ids: dbResponse.rows[0].favorites.join(',')
                }
            }).then(async apiRes => {
                // console.log('get all favorites from api yielded: ', apiRes.data);
                const preparedResults = await addCurrentAndFavorites(req.user.id, apiRes.data)
                if (preparedResults === 'addCurrentAndFavorites failed') {
                    console.log('addCurrentAndFavorites Failed.')
                    res.sendStatus(500);
                }
                res.send(preparedResults);
            }).catch(error => {
                console.log('Failed to retrieve all favorites info from spoonacular: ', error)
                res.sendStatus(500);
            })
            // res.send(dbResponse.rows[0].favorites);
        }
    }).catch(error => {
        console.log('Failed to fetch all users favorites: ', error);
        res.sendStatus(500);
    });
})

router.get('/:userId/:recipeId', rejectUnauthenticated, (req, res) => {
    const sqlQuery = `SELECT "is_favorite" FROM "user_recipes"
                      WHERE "user_id" = $1 AND "recipe_id" = $2`;
    const sqlParams = [req.user.id, req.params.recipeId] // maybe need to call number on recipeId
    pool.query(sqlQuery, sqlParams).then(dbResponse => {
        // console.log('what we got from db and want to send onward: ', dbResponse.rows[0])
        res.send(dbResponse.rows[0].is_favorite)
    }).catch(error => {
        console.log('Failed to retrieve up-to-date isFavorite parameter: ', error);
        res.sendStatus(500);
    });
})

router.get('/:userId/:recipeId/exist', rejectUnauthenticated, (req, res) => {
    // check if the user has this recipe favorited
    const sqlQuery = `SELECT "is_favorite" from "user_recipes"
                      WHERE "user_id" = $1 and "recipe_id" = $2;`
    // console.log('req.user.id is: ', req.user.id);
    // console.log('req.user.id type is: ', typeof req.user.id);
    // console.log('req.params.recipeId is: ', req.params.recipeId);
    // console.log('req.params.recipeId type is: ', typeof req.params.recipeId);

    const sqlParams = [req.user.id, Number(req.params.recipeId)];
    pool.query(sqlQuery, sqlParams).then(dbRes => {
        if (dbRes.rowCount) {
            res.send({exists: true})
        } else {
            res.send({exists: false})
        }
    }).catch(error => {
        console.log('Failed in db query about getting individual favorite: ', error)
        res.sendStatus(500);
    });
});

router.post('/', rejectUnauthenticated, (req, res) => {
    const sqlQuery = `INSERT INTO "user_recipes"
                          ("user_id", "recipe_id", "is_favorite", "is_current", "servings")
                      VALUES
                          ($1, $2, TRUE, FALSE, 1)`;
    const sqlParams = [req.user.id, req.body.recipeId];
    pool.query(sqlQuery, sqlParams).then(dbRes => {
        res.sendStatus(200);
    }).catch(error => {
        console.log('Failed to insert favorite into database');
        res.sendStatus(500);
    });
});

router.put('/', rejectUnauthenticated, (req, res) => {
    console.log('we are in the favorite updater')
    const sqlQuery = `UPDATE "user_recipes"
                      SET "is_favorite" = NOT "is_favorite"
                      WHERE "user_id" = $1 AND "recipe_id" = $2`;
    // console.log('req object: ', req);
    console.log('req.user.id is: ', req.user.id);
    console.log('req.body.recipeId is: ', req.body.recipeId);
    const sqlParams = [req.user.id, Number(req.body.recipeId)];
    pool.query(sqlQuery, sqlParams).then(dbRes => {
        res.sendStatus(200);
    }).catch(error => {
        console.log('Failed to PUT favorite to db: ', error);
        res.sendStatus(500);
    })
});

module.exports = router