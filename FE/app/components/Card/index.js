import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { Card, Col, Avatar  } from 'antd';
const { Meta } = Card;

function CommonCard(props) {
  const { title, content } = props;

  return (
    <Col md={8} xl={8} xs={24}>
      <Card>
        <Meta
          avatar={
            <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
          }
          title={title}
          description={content}
        />
        </Card>
    </Col>
  )
}

CommonCard.propTypes = {};

export default CommonCard;
