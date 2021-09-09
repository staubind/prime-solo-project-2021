const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();

/**
* GET route template
*/
router.post('/add', rejectUnauthenticated, (req, res) => {
    // check if the row exists in the database
    const updateSqlQuery = `UPDATE "user_recipes"
                            SET "is_current" = TRUE
                            WHERE "user_id" = $1 AND "recipe_id" = $2;  `
    const sqlParams = [req.user.id, req.body.recipeId]
    
    pool.query(updateSqlQuery, sqlParams)
    .then(existResponse => {
        // check if anything was updated, if not insert
        if (existResponse.rowCount === 0) {
            // insert a new row
            const insertSqlQuery = `INSERT INTO "user_recipes"
                                        ("user_id", "recipe_id", "is_favorite", "is_current")
                                    VALUES
                                        ($1, $2, FALSE, TRUE)`
            pool.query(insertSqlQuery, sqlParams).then(dbResponse => {
                // send creation response
                res.sendStatus(201);
            }).catch(error => {
                console.log('Failed to create a new row in user_recipes: ', error);
                res. sendStatus(500);
            })
        } else {
            // successfully updated response
            res.sendStatus(204)
        }
    }).catch(error => {
        console.log('Failed to check if element exists in DB: ', error)
        res.sendStatus(500);
    })
// req.body is:  { user: 1, recipeId: 637285 }
  // otherwise insert it

    // if the row exists, change it to a current one
    // if the row does not exist, add it w/ current set to true
  console.log('req.body is: ', req.body)
});

/**
* POST route template
*/
router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;