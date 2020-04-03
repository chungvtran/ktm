import { createSelector } from 'reselect';
import { initialState } from './reducer';
/**
 * Direct selector to the authentication state domain
 */

const selectAuthenticationDomain = state => {
  return state.authentication || initialState;
}

/**
 * Other specific selectors
 */

const makeSelectToken = () => {
  return createSelector(
    selectAuthenticationDomain,
    substate => substate.token
  )
}


export { selectAuthenticationDomain, makeSelectToken };
