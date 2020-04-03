/*
 *
 * Authentication reducer
 *
 */
import produce from 'immer';
import { SIGN_IN_START } from './constants';
import { SIGN_IN_SUCCESS } from '../App/constants';

export const initialState = {
  token: null
};

/* eslint-disable default-case, no-param-reassign */
const authenticationReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SIGN_IN_START:
        draft.loading = true;
        draft.token = action.token;
        break;
    }
  });

export default authenticationReducer;
