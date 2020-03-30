/**
 *
 * Home
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { makeSelectHome } from './selectors';
import reducer from './reducer';
import saga from './saga';
import { Row, Col } from 'antd';
import Card from '../../components/Card/index';

const key = 'home';

export function Home() {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  return (
    // <Layout>
    //   <Sidebar />
    //   <Layout className="site-layout">
    //     <Header />
    //     <Content />
    //   </Layout>
    // </Layout>
    <Row gutter={[16, 16]}>
      <Card title="Thank you from ABC" content="sadsajdbasjkdhsajkdhsajkdhjkcnsdjcndscdsckjnsadjnbsajkcnsajcnascjsand"/>
      <Card title="Thank you from ABC" content="sadsajdbasjkdhsajkdhsajkdhjkcnsdjcndscdsckjnsadjnbsajkcnsajcnascjsand"/>
      <Card title="Thank you from ABC" content="sadsajdbasjkdhsajkdhsajkdhjkcnsdjcndscdsckjnsadjnbsajkcnsajcnascjsand"/>
      <Card title="Thank you from ABC" content="sadsajdbasjkdhsajkdhsajkdhjkcnsdjcndscdsckjnsadjnbsajkcnsajcnascjsand"/>
      <Card title="Thank you from ABC" content="sadsajdbasjkdhsajkdhsajkdhjkcnsdjcndscdsckjnsadjnbsajkcnsajcnascjsand"/>
      <Card title="Thank you from ABC" content="sadsajdbasjkdhsajkdhsajkdhjkcnsdjcndscdsckjnsadjnbsajkcnsajcnascjsand"/>
    </Row>
    // <div />
  );
}

Home.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  // home: makeSelectHome(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Home);
