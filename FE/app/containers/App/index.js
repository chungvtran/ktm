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
import { Switch, Route } from 'react-router-dom';
import _ from 'lodash';
import { Layout } from 'antd';

import Home from 'containers/Home/Loadable';
import ReportPage from 'containers/ReportPage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';

import Sidebar from '../../components/Sidebar/index';
import Header from '../../components/Header/index';
import Content from '../../components/Content/index';

import { toggleSidebar } from './actions';

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
    path: '/',
    icon: <HomeFilled />
  },
  {
    name: 'Report',
    component: ReportPage,
    path: '/report',
    icon: <FileTextFilled />,
  }

]

export function App({
  onToggleSidebar,
  sidebarOpen,
  history
}) {

  const currentPath = history.location.pathname;

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
              <Route
                key={index}
                path={route.path}
                exact
                component={() => {
                  // if (route.initFunc) {
                  //   route.initFunc(route);
                  // }
                  const Component = route.component;
                  return (
                    <Content>
                      <Component />
                    </Content>
                  );
                }}
              />
            ))}
            {/* <Content />
          <Route exact path="/" component={Home} />
          <Route path="/features" component={FeaturePage} />
          <Route path="" component={NotFoundPage} /> */}
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
)(App);
