import axios from "axios";
import { put, takeEvery } from "redux-saga/effects";
import { useDispatch } from "react-redux";
import fetchCart from './cart.saga';


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


        // I think the problem is arising because we are using the db strictly for the search and cart views
        // but not so for the search view - the client has the canonical data there
        // that is, the cart and favorites views have to go back to the db every time they want to be updated
        // so after we update favorite or cart status for any item, regardless of where it is,
        // we need to update the reducers for favorite and for cart, doing all of the api calls for those
        // which is stupid, but whatever. 

        // so after updating any updating of favorite in the database, we want to reload the cart and favorites

        // update search state w/ the value
        // ----------
        // WE MUST ALSO UPDATE THE FAVORITES AND CART
        yield put({
            type: 'UPDATE_FAVORITE',
            payload: {
                isFavorite: isFavorite.data,
                recipeId: action.payload.recipeId
            }
        })
        // need to also update the favorites list
            // dispatch to fetch_all_favorites
        yield fetchAllFavorites(action)
        // need to also update the cart list
            // dispatch to fetch_cart
        yield fetchCart(action)





    } catch (error) {
        console.log('Failed to set Favorites: ', error);
        alert('Failed to set Favorites. See console for details.')
    }
};

function* fetchAllFavorites(action) {
    try {
        // console.log('sending to the database will be: ', action.payload)
        const results = yield axios({
            method: 'GET',
            url: '/api/favorite/all',
            params: {
                favorites: action.payload // this isn't working as expected - not finding it on the other side.
            }
        })
        // console.log('results from the fetch all favorites was: ', results.data);
        // put to the reducer
        yield put({
            type: 'SET_FAVORITE_REDUCER',
            payload: results.data
        })
    } catch (error) {
        console.log('Failed to fetch all favorites for this user: ', error);
        alert('Failed to fetch all favorites. See console for details: ', error);
    }
}

function* favoriteSaga(action) {
    yield takeEvery('CHANGE_RECIPE_FAVORITE', changeFavorite);
    yield takeEvery('FETCH_ALL_FAVORITES', fetchAllFavorites)
};

export default favoriteSaga;