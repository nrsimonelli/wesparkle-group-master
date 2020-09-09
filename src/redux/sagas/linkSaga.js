import { put, takeLatest } from 'redux-saga/effects';
import axios from "axios";

// Saga to add a link POST route
function* addLink(action) {
  console.log('trying to send a link:', action.payload)
  try {
    const response = yield axios.post('/api/link', action.payload)
    yield put({type:"FETCH_LINKS", payload: response.data})
  } catch (error) {
    console.log('issue with post link saga:', error)
  }
}

function* getLink(action){
  console.log('getting links', action.payload)
  try {
    const response = yield axios.get('/api/link');
    yield put({ type: 'SET_LINKS', payload: response.data });
  } catch (error){
    console.log('error with get link Saga:', error)
  }
}

function* getFilter(action){
  console.log('getting filter links', action.payload)
  try {
    const response = yield axios.get(`/api/link/${action.payload.filterTag}`, action.payload);
    yield put({ type: 'SET_LINKS', payload: response.data });
  } catch (error){
    console.log('error with get filter Saga:', error)
  }
}

function* disableLink(action){
  console.log('disabling link', action.payload.id)
  try {
    const response = yield axios.put(`/api/link/${action.payload.id}`);
    yield put({ type: 'FETCH_LINKS', payload: response.data });
  } catch (error){
    console.log('error with get link Saga:', error)
  }
}


function* linkSaga() {
  yield takeLatest("ADD_LINK", addLink);
  yield takeLatest("FETCH_LINKS", getLink);
  yield takeLatest("REMOVE_LINK", disableLink);
  yield takeLatest("FETCH_FILTERED_LINKS", getFilter);

}

export default linkSaga;
