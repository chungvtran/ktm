/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */

import produce from 'immer';
import {
  LOAD_REPOS_SUCCESS,
  LOAD_REPOS,
  LOAD_REPOS_ERROR,
  TOGGLE_SIDEBAR,
  SIGN_IN_START,
  SIGN_IN_SUCCESS,
  SIGN_IN_FAILURE,
  SIGN_OUT_SUCCESS
} from './constants';

// The initial state of the App
export const initialState = {
  loading: false,
  error: false,
  currentUser: false,
  userData: {
    repositories: false,
  },
  isAuthenticated: false,
  sidebarOpen: false,
  // currentRoute: '/',
  token: null,
  userInfo: null,
  role: null
};

/* eslint-disable default-case, no-param-reassign */
const appReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOAD_REPOS:
        draft.loading = true;
        draft.error = false;
        draft.userData.repositories = false;
        break;

      case LOAD_REPOS_SUCCESS:
        draft.userData.repositories = action.repos;
        draft.loading = false;
        draft.currentUser = action.username;
        break;

      case LOAD_REPOS_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;

      case SIGN_IN_START:
        draft.loading = true;
        break;

      case SIGN_IN_SUCCESS:
        draft.loading = false;
        draft.isAuthenticated = true;
        draft.userInfo = action.userInfo;
        draft.token = action.token;
        break;

      case SIGN_IN_FAILURE:
        draft.loading = false;
        draft.isAuthenticated = false
        draft.userInfo = action.userInfo;
        draft.token = action.token;
        break;

      case SIGN_OUT_SUCCESS:
        draft.loading = false;
        draft.isAuthenticated = false;
        draft.token = null;
        draft.userInfo = null;
        draft.token = null;
        break;
        
      case TOGGLE_SIDEBAR:
        draft.sidebarOpen = !state.sidebarOpen;
        break;
    }
  });

export default appReducer;
