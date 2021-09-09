const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();


router.post('/', rejectUnauthenticated, (req, res) => {
    // check if the row exists in the database
    const updateSqlQuery = `UPDATE "user_recipes"
                            SET "is_current" = TRUE
                            WHERE "user_id" = $1 AND "recipe_id" = $2;`
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
});


router.delete('/', rejectUnauthenticated, (req, res) => {
    // we will do a soft delete using the "is_current" field
    const sqlQuery = `UPDATE "user_recipes"
                      SET "is_current" = FALSE
                      WHERE "user_id" = $1 AND "recipe_id" = $2;`;
    const sqlParams = [req.user.id, req.body.recipeId];
    pool.query(sqlQuery, sqlParams).then(dbResponse => {
        res.sendStatus(204);
    }).catch(err => {
        console.log('Failed to remove item from cart: ', err)
        res.sendStatus(500);
    });
});

module.exports = router;