/**
 *
 * ReportPage
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectReportPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { Table, Tag, Select } from 'antd';

export function ReportPage() {
  useInjectReducer({ key: 'reportPage', reducer });
  useInjectSaga({ key: 'reportPage', saga });

  const { Option } = Select;

  /* Sample data */
  const columns = [
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
      render: tags => (
        <span>
          {tags.map(tag => {
            let color = tag === "sending" ? 'geekblue' : 'green';
            if (tag === 'loser') {
              color = 'volcano';
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </span>
      ),
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: text => <a>{text}</a>,
    },
    {
      title: 'Kudo Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Content',
      dataIndex: 'content',
      key: 'content',
    },
    {
      title: 'Date/Time',
      key: 'date',
      dataIndex: 'date'
    },
  ];

  const data = [
    {
      status: ["SEND"],
      key: '1',
      name: 'John Brown',
      title: 32,
      content: 'For bla bla',
      date: 'mock date',
      tags: ['nice', 'developer'],
    },
    {
      status: ["SEND"],
      key: '2',
      name: 'Jim Green',
      title: 42,
      content: 'Vietnam No. 1',
      tags: ['cool'],
    },
    {
      status: ["SEND"],
      key: '3',
      name: 'Joe Black',
      title: "For you",
      content: 'Sidney No. 1',
      date: 'mock date',
      tags: ['cool', 'teacher'],
      date: 'mock date',
    },
  ];
  /* */

  return (
    <div>
      <div class="select"  style={{ paddingBottom: 20 }}>
        <Select defaultValue="send" style={{ width: 120 }}>
          <Option value="send">Send</Option>
          <Option value="Receive">Receive</Option>
        </Select>
      </div>
      <Table columns={columns} dataSource={data} />
    </div>
  );
}

ReportPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  reportPage: makeSelectReportPage(),
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
)(ReportPage);
