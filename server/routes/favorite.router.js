const express = require('express')
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router()

router.get('/:userId/:recipeId', rejectUnauthenticated, (req, res) => {
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