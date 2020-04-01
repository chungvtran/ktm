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
import NotFoundPage from 'containers/NotFoundPage/Loadable';

import Sidebar from '../../components/Sidebar/index';
import Header from '../../components/Header/index';
import PrivateRoute from '../../auth/routes';

import { toggleSidebar } from './actions';
import { isLogin, login, isAuth } from '../../utils/auth'


import GlobalStyle from '../../global-styles';
import { makeSelectSidebar } from './selectors';
import {
  HomeFilled,
  FileTextFilled
} from '@ant-design/icons';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';

const AppWrapper = styled.div`
  max-width: calc(768px + 16px * 2);
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  padding: 0 16px;
  flex-direction: column;
`;

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
const URL = "http://localhost:3000"

export function App({
  onToggleSidebar,
  sidebarOpen,
  history,
}) {

  const currentPath = history.location.pathname;
  const returnUrl = URL + currentPath;
  console.log(currentPath);
  return (
    <div>
      <Layout>
        <Sidebar
          sidebarOpen={sidebarOpen}
          onCollapse={onToggleSidebar}
          routes={routes}
          currentPath={currentPath}
        />
        <Layout className="site-layout">
          <Header sidebarOpen={sidebarOpen} onToggleSidebar={onToggleSidebar} />
          <Switch>
            {_.map(routes, (route, index) => (
              <PrivateRoute
                routes={history.location}
                key={route.path}
                path={route.path}
                component={route.component}
              />
            ))}
            <Route exact strict render={() => <Redirect to="/home" />} />
          </Switch>
        </Layout>
      </Layout>
      <GlobalStyle />
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  sidebarOpen: makeSelectSidebar()
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
