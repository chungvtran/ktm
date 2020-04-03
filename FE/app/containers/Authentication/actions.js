/*
 *
 * Authentication actions
 *
 */

import { SIGN_IN_START, SIGN_IN_SUCCESS } from './constants';

export function signIn(token) {
  return {
    type: SIGN_IN_START,
    token
  };
}

export function signInSuccess() {
  return {
    type: SIGN_IN_SUCCESS,
  }
}
