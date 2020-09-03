import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';


function* fetchDetailSaga(action) {
    console.log('in detailsSaga...', action.payload)
    try {
        const response = yield axios.get('/api/details/'+ action.payload)
        yield put({ type: 'SET_DETAILS', payload: response.data })
    } catch (error) {
        console.log('issue with details get saga:', error)
    }
}


function* detailsSaga() {
    yield takeLatest('FETCH_DETAILS', fetchDetailSaga);
  }

export default detailsSaga;