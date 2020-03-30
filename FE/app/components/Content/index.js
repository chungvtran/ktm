import React from 'react';
import { Layout } from 'antd';

import '../../styles/components/Content.css';

function Content(props) {
  const { Content } = Layout;
  const { children } = props;

  return (
    <Content
      className="content site-layout-background"
    >
  
      {children}
    </Content>
    // <Content />
  )
}

Content.propTypes = {};

export default Content;
