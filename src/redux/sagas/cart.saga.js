import { takeEvery, put } from "@redux-saga/core/effects";
import axios from "axios";

function* fetchCart(action) {
    try {
        // axios call to get all cart items for that user
        const results = yield axios({
            method: 'GET',
            url: 'api/cart',
            params: {
                cart: action.payload
            }
        })
        console.log('we are getting this back from the cart server: ', results.data)
        // send them to the reducer
        yield put({
            type: 'SET_CART_REDUCER',
            payload: results.data
        })
    } catch (error) {
        console.log('Failed to fetch the cart: ', error);
        alert('Failed to fetch the cart. See the console for details.')
    }
};

function* cartSaga(action) {
    yield takeEvery('FETCH_CART', fetchCart)
}

export default cartSaga;