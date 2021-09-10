import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';



function* search(action) {
    try {
        const results = yield axios.get('/api/search', {params:  {searchTerm: action.payload}})
        yield console.log('received from api call is: ', results);

        // in order to do conditional rendering, we need to know if items are in the cart already or not.
        // we will modify the results to include a tag saying which of the elements are included or not
        // we can either make one property of the object and send it as an array where each val is associated
        // properly with the associated recipe in the results array
        // or we can modify the object itself.
        // since the recipe object itself will be passed to hte recipe, this second option makes the most sense to me


        yield put({
            type: 'SET_SEARCH_TERM',
            payload: action.payload})
        yield put({
            type: 'SET_SEARCH_REDUCER', 
            payload: results})
    } catch (error) {
        console.log('Failed to search: ', error);
        alert('Failed to search. See console for details.');
    }
}

function* searchSaga(action) {
    yield takeLatest('SEARCH', search)
}

export default searchSaga;