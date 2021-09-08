import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* search(action) {
    try {
        console.log('action.payload is: ', action.payload);
        const results = yield axios.get('/api/search', {params:  {searchTerm: action.payload}})
    } catch (error) {
        console.log('Failed to search: ', error);
        alert('Failed to search. See console for details.');
    }
}

function* searchSaga(action) {
    yield takeLatest('FETCH_SEARCH', search)
}

export default searchSaga;