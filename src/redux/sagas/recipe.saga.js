import { takeLatest } from "redux-saga/effects";
import axios from 'axios';

function* addToCart(action) {
    console.log('have we even made it to the saga?')
    console.log('user is: ', action.payload.userId);
    console.log('payload is: ', action.payload.recipeId);
    try {
        yield axios({
            method: 'POST',
            url: `/api/cart/`,
            data: {
                user: action.payload.userId,
                recipeId: action.payload.recipeId
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
    } catch (error) {
        console.log('Failed to remove from cart: ', error);
        alert('Failed to remove from cart. See console for details.');
    }
}



function* recipeSaga(action) {
    yield takeLatest('ADD_TO_CART', addToCart);
    yield takeLatest('REMOVE_FROM_CART', removeFromCart);
}

export default recipeSaga;