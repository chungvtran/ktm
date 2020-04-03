import React from 'react';
import { Route, useLocation, Redirect } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { makeSelectIsAuthenticated } from '../containers/App/selectors'
import Content from '../components/Content/index';
import { isLogin, login, isAuth } from '../utils/auth';

const callbackURL = "http://localhost:3000/callback";
const loginURL = "https://home.kms-technology.com/login?returnUrl=" + callbackURL;

function PrivateRoute(props) {
  const { isAuthenticated, component: Component, loading, ...rest } = props;

  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated ? (
          <Content>
            <Component {...props} />
          </Content>
        ) : (
            window.location.replace(loginURL)
          )
      }
    />
  )
}

const mapStateToProps = createStructuredSelector({
  isAuthenticated: makeSelectIsAuthenticated(),
});

export default connect(
  mapStateToProps
)(PrivateRoute);