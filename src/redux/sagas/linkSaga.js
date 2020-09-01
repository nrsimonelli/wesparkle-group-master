import { put, takeLatest } from 'redux-saga/effects';
import axios from "axios";

// Saga to add a link POST route
function* addLink(action) {
  console.log('trying to send a link:', action.payload)
  try {
    const response = yield axios.post('/api/link', action.payload)
    yield put({type:"SET_LINKS", payload: action.payload})
  } catch (error) {
    console.log('issue with post link saga:', error)
  }
}

function* linkSaga() {
  yield takeLatest("ADD_LINK", addLink);
}

export default linkSaga;
