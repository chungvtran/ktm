import React from 'react';
import { Layout } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined
} from '@ant-design/icons';
import '../../styles/components/Header.css';

function Header(props) {
  const { Header } = Layout;
  const { onToggleSidebar, sidebarOpen, fullname } = props;

  return (
    <Header className="header site-layout-background">
      {
        sidebarOpen ?
          <MenuUnfoldOutlined className="trigger-button" onClick={() => onToggleSidebar()} /> :
          <MenuFoldOutlined className="trigger-button" onClick={() => onToggleSidebar()} />
      }
      <span>Home</span>

    <span className="user-info">Hello {fullname} </span>
    </Header>
  );
}

Header.propTypes = {};

export default Header;
