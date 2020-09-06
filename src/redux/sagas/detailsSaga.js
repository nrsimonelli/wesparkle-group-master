import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';


function* fetchDetailSaga(action) {
    console.log('in detailsSaga...', action.payload)
    try {
        const response = yield axios.get('/api/details/'+ action.payload)
        yield put({ type: 'SET_DETAILS', payload: response.data })
    } catch (error) {
        console.log('issue with details get saga:', error)
        console.log('error', action)
    }
}

function* saveTagsSaga(action) {
    console.log('in saveTagsSaga...', action.payload)
    try {
        const response = yield axios.put(`/api/details/${action.payload.details.id}`, action.payload)
        yield put({ type: 'FETCH_DETAILS', payload: response.data })
    } catch (error) {
        console.log('issue with saveTagsSaga :', error)
    }
  }
function* detailsSaga() {
    yield takeLatest('FETCH_DETAILS', fetchDetailSaga);
    yield takeLatest('SAVE_TAGS', saveTagsSaga);
  }

export default detailsSaga;