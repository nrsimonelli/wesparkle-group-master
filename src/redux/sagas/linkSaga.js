import { takeLatest } from "redux-saga/effects";
import axios from "axios";

// worker Saga: will be fired on "REGISTER" actions
function* addLink(action) {
  try {
    // // clear any existing error on the registration page
    // yield put({ type: 'CLEAR_REGISTRATION_ERROR' });

    // // passes the username and password from the payload to the server
    //yield axios.post('/api/user/register', action.payload);
    yield axios.post("/api/link/", action.payload);
    // // automatically log a user in after registration
    // yield put({ type: 'LOGIN', payload: action.payload });

    // // set to 'login' mode so they see the login screen
    // // after registration or after they log out
    // yield put({type: 'SET_TO_LOGIN_MODE'});
  } catch (error) {
    console.log("Error adding link:", error);
    // yield put({type: 'REGISTRATION_FAILED'});
  }
}

function* linkSaga() {
  //   yield takeLatest('REGISTER', registerUser);
  yield takeLatest("ADD_LINK", addLink);
}

export default linkSaga;
