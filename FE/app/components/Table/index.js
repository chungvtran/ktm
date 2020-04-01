import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { Table, Tag, Select } from 'antd';

function CommonTable(props) {
  const { Option } = Select;
  const { columns, data } = props;

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
    <Table columns={columns} dataSource={data}  />
  );
}

CommonTable.propTypes = {};

export default CommonTable;
