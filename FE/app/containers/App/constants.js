/*
 * AppConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const LOAD_REPOS = 'boilerplate/App/LOAD_REPOS';
export const LOAD_REPOS_SUCCESS = 'boilerplate/App/LOAD_REPOS_SUCCESS';
export const LOAD_REPOS_ERROR = 'boilerplate/App/LOAD_REPOS_ERROR';

export const TOGGLE_SIDEBAR = 'app/App/TOGGLE_SIDEBAR';
export const SIGN_IN_START = 'app/App/SIGN_IN_START';
export const SIGN_IN_SUCCESS = 'app/App/SIGN_IN_SUCCESS';
export const SIGN_IN_FAILURE = 'app/App/SIGN_IN_FAILURE';
export const SIGN_OUT_SUCCESS = 'app/App/SIGN_OUT_SUCCESS';
