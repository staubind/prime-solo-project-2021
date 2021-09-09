import { takeLatest } from "redux-saga/effects";
import axios from 'axios';

function* addToCart(action) {
    console.log('have we even made it to the saga?')
    console.log('user is: ', action.payload.userId);
    console.log('payload is: ', action.payload.recipeId);
    try {
        const response = yield axios({
            method: 'POST',
            url: `/api/cart/add`,
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

function* removeFromCart() {
    try {

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