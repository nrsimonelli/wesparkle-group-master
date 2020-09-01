import axios from 'axios';
import {put, takeLatest} from 'redux-saga/effects';

  function* fetchFeedback(action) {
    try {
      const response = yield axios.get( '/api/feedback', action.payload );
      yield put({ type: 'SET_FEEDBACK', payload: response.data });
      
    } catch (error) {
      console.log('Feedback get request failed', error);
    }
  }

  function* feedbackSaga() {
    yield takeLatest('FETCH_FEEDBACK', fetchFeedback);
  }

export default feedbackSaga;