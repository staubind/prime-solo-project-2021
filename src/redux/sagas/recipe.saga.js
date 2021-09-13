import { put, takeLatest } from "redux-saga/effects";
import axios from 'axios';

// maybe able to compress this and removeFromCart into one function
// and have the logic change dependign on the action.type
function* addToCart(action) {
    // console.log('have we even made it to the saga?')
    // console.log('user is: ', action.payload.userId);
    // console.log('payload is: ', action.payload.recipeId);
    try {
        yield axios({
            method: 'POST',
            url: `/api/cart/`,
            data: {
                user: action.payload.userId,
                recipeId: action.payload.recipeId,
                servings: action.payload.servings
            }
        })
        // do a get w/ the stuff that's in the search - we need to know their     
        const isCurrent = yield axios({
            method: 'GET',
            url: `/api/cart/${action.payload.recipeId}/isCurrent`,
        })
        // send update to reducer and update it
        // yield console.log('isCurrent contents: ', isCurrent)
        yield put({
            type: 'UPDATE_SEARCH_REDUCER',
            payload: {
                recipeId: isCurrent.data.recipeId,
                isCurrent: isCurrent.data.isCurrent
            }
        })
    } catch (error) {
        console.log('Failed to add to cart: ', error);
        alert('Failed to add to cart. See console for details.');
    }
}

function* removeFromCart(action) {
    console.log('actions value is: ', action);
    try {
        yield axios({
            method: 'DELETE',
            url: `/api/cart/`,
            data: {
                user: action.payload.userId,
                // for RESTful api should I be sending the user
                //  in the body to keep all relevant info?
                // even though we have it in the user attribute
                recipeId: action.payload.recipeId
            }
        })
        const isCurrent = yield axios({
            method: 'GET',
            url: `/api/cart/${action.payload.recipeId}/isCurrent`,
        })
        // console.log('from remove from cart: isCurrent get request gave back the following: ', isCurrent)
        // send update to reducer and update it
        // yield console.log('isCurrent contents: ', isCurrent)
        yield put({
            type: 'UPDATE_SEARCH_REDUCER',
            payload: {
                recipeId: isCurrent.data.recipeId,
                isCurrent: isCurrent.data.isCurrent
            }
        })
    } catch (error) {
        console.log('Failed to remove from cart: ', error);
        alert('Failed to remove from cart. See console for details.');
    }
}

function* addToFavorites(action) {

}

function* removeFromFavorites(action) {
    
}

function* recipeSaga(action) {
    yield takeLatest('ADD_TO_CART', addToCart);
    yield takeLatest('REMOVE_FROM_CART', removeFromCart);
}

export default recipeSaga;