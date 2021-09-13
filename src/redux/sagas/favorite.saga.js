import axios from "axios";
import { put, takeEvery } from "redux-saga/effects";


function* changeFavorite(action) {
    try {
        // check if it's in the db GET
        //      if not: POST
                    // for new favorites
        //      if is: PUT - change it to the opposite logical value
        // then GET it from DB
        // send to search state reducer
        const inDatabase = yield axios({
            method: 'GET',
            url: `/api/favorite/${action.payload.userId}/${action.payload.recipeId}/exist`
        })
        // console.log('inDatabase: ', inDatabase.data.exists);
        if (inDatabase.data.exists) {
            // put route
            yield axios({
                method: 'PUT',
                url: '/api/favorite',
                data: {
                    userId: action.payload.userId,
                    recipeId: action.payload.recipeId
                }
            })
        } else {
            // post route
            yield axios({
                method: 'POST',
                url: '/api/favorite',
                data: {
                    userId: action.payload.userId,
                    recipeId: action.payload.recipeId
                }
            })
        }
        // get the value from the db
        // now we KNOW it exists
        const isFavorite = yield axios({
            method: 'GET',
            url: `/api/favorite/${action.payload.userId}/${action.payload.recipeId}`
        })
        // update search state w/ the value
        yield put({
            type: 'UPDATE_FAVORITE',
            payload: {
                isFavorite: isFavorite.data,
                recipeId: action.payload.recipeId
            }
        })
    } catch (error) {
        console.log('Failed to set Favorites: ', error);
        alert('Failed to set Favorites. See console for details.')
    }
};

function* favoriteSaga(action) {
    yield takeEvery('CHANGE_RECIPE_FAVORITE', changeFavorite);
};

export default favoriteSaga;