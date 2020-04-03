/**
 *
 * Authentication
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';

import { signIn } from './actions';
import { makeSelectToken } from './selectors';
import { makeSelectIsAuthenticated } from 'containers/App/selectors';
import reducer from './reducer';
import saga from './saga';

export function Authentication(props) {
  useInjectReducer({ key: 'authentication', reducer });
  useInjectSaga({ key: 'authentication', saga });

  const { signIn } = props;
 
  const urlParams = new URLSearchParams(window.location.search);
  const accessToken = urlParams.get('accessToken');

  useEffect(() => {
    signIn(accessToken)
  }, [accessToken]);

  return <div />
}

Authentication.propTypes = {
  // dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  token: makeSelectToken(),
  isAuthenticated: makeSelectIsAuthenticated(),
});

function mapDispatchToProps(dispatch) {
  return {
    signIn: (token) => dispatch(signIn(token))
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(Authentication);
