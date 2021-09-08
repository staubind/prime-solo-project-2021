import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* search(action) {
    try {
        const results = yield axios.get('/api/search', {params:  {searchTerm: action.payload}})
        yield console.log('received from database is: ', results);
        yield put({
            type: 'SET_SEARCH_REDUCER', 
            payload: results})
    } catch (error) {
        console.log('Failed to search: ', error);
        alert('Failed to search. See console for details.');
    }
}

function* searchSaga(action) {
    yield takeLatest('FETCH_SEARCH', search)
}

export default searchSaga;