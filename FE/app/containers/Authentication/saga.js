import { call, put, select, takeLatest } from 'redux-saga/effects';
import { makeSelectToken } from './selectors';
import { SIGN_IN_START } from './constants';
import { signInSuccess, signInError } from 'containers/App/actions';
import history from 'utils/history';
import authenticationService from '../../services/authenticationService';

export function* getAuthenticate() {
  const token = yield select(makeSelectToken());
  localStorage.setItem('accessToken', token);
  
  try {
    const userInfo = yield call(authenticationService.getUserInfo);
    yield put(signInSuccess(userInfo));
    history.push('/home')

  } catch (err) {
    console.log(err)
    // yield put(signInError(err));
  }
}

export default function* authenticationSaga() {
  yield takeLatest(SIGN_IN_START, getAuthenticate);
}
