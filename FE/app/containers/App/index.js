/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React, { useState, memo } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import styled from 'styled-components';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import _ from 'lodash';
import { Layout } from 'antd';

import Home from 'containers/Home/Loadable';
import ReportPage from 'containers/ReportPage/Loadable';
import Authentication from 'containers/Authentication';

import Sidebar from 'components/Sidebar/index';
import Header from 'components/Header/index';
import { PrivateRoute } from 'helper';
import { toggleSidebar } from './actions';
import GlobalStyle from '../../global-styles';
import {
  makeSelectSidebar,
  makeSelectIsAuthenticated,
  makeSelectLoading,
  makeSelectUserInfo,
  makeSelectRole
} from './selectors';
import {
  HomeFilled,
  FileTextFilled
} from '@ant-design/icons';
import config from 'utils/config';

const routes = [
  {
    name: 'Home',
    component: Home,
    path: '/home',
    icon: <HomeFilled />
  },
  {
    name: 'Report',
    component: ReportPage,
    path: '/report',
    icon: <FileTextFilled />,
  }
]

export function App(props) {
  const {
    onToggleSidebar,
    sidebarOpen,
    userInfo,
    isAuthenticated,
  } = props;

  if (window.location.pathname === '/callback') {
    return (<Route to="/callback" component={Authentication} />)
  }

  const main = <div>
    <Layout>
      <Sidebar
        sidebarOpen={sidebarOpen}
        onCollapse={onToggleSidebar}
        routes={routes}
      />
      <Layout className="site-layout">
        <Header sidebarOpen={sidebarOpen} onToggleSidebar={onToggleSidebar} fullname={userInfo ? userInfo.fullName : ''} />
        <Switch>
          {_.map(routes, (route) => (
            <PrivateRoute key={route.path} component={route.component} path={route.path} exact />
          ))}
        </Switch>
      </Layout>
    </Layout>
    <GlobalStyle />
  </div>

  return (
    <div>
      {
        isAuthenticated ? main : window.location.replace(config.homeSSO + config.callbackURL)
      }
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  sidebarOpen: makeSelectSidebar(),
  isAuthenticated: makeSelectIsAuthenticated(),
  role: makeSelectRole(),
  userInfo: makeSelectUserInfo()
});

export function mapDispatchToProps(dispatch) {
  return {
    onToggleSidebar: () => dispatch(toggleSidebar())
  }
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(withRouter(App));
