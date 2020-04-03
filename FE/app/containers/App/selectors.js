/**
 * The global state selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectGlobal = state => state.global || initialState;

const selectRouter = state => state.router;

const makeSelectCurrentUser = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.currentUser,
  );

const makeSelectLoading = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.loading,
  );

const makeSelectError = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.error,
  );

const makeSelectRepos = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.userData.repositories,
  );

const makeSelectLocation = () =>
  createSelector(
    selectRouter,
    routerState => routerState.location,
  );

const makeSelectSidebar = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.sidebarOpen,
  )

const makeSelectIsAuthenticated = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.isAuthenticated,
  )

const makeSelectToken = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.token,
  )

const makeSelectUserInfo = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.userInfo,
  )

const makeSelectRole = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.role
  )

export {
  selectGlobal,
  makeSelectCurrentUser,
  makeSelectLoading,
  makeSelectError,
  makeSelectRepos,
  makeSelectLocation,
  makeSelectSidebar,
  makeSelectIsAuthenticated,
  makeSelectRole,
  makeSelectUserInfo
};
