import axios from 'axios';
import {takeLatest} from 'redux-saga/effects';

  function* fetchFeedback(action) {

    console.log( 'saga action: ', action )

    try {

      const response = yield axios.post( '/api/feedback', action.payload );

      console.log( 'saga response: ', response )
      // AUDRY - response message to user 'yay it sent'


      
      // AUDRY - i don't think i need a reducer....
      //yield put({ type: 'SET_FEEDBACK', payload: response.data });

      
    } catch (error) {
      console.log('Feedback get request failed', error);
    }
  }

  function* feedbackSaga() {
    yield takeLatest('FETCH_FEEDBACK', fetchFeedback);
  }

export default feedbackSaga;