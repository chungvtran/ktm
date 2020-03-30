import React from 'react';
import { Layout, Menu } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import _ from 'lodash';
import {
  Link,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import '../../styles/components/Sidebar.css'

function Sidebar(props) {
  const { Sider } = Layout;
  const { menus, sidebarOpen, onCollapse } = props;

  return (
    <Sider collapsible className="sider" collapsed={sidebarOpen} onCollapse={onCollapse}>
      <div className="logo" />
      <Menu className="menu" theme="dark" mode="inline" defaultSelectedKeys={['1']}>
        <Menu.Item key="1">
          {/* <Link to="/" className="nav-link"> */}
            <UserOutlined />
            <span>
              <Link to="/" className="nav-link">Home</Link>
            </span>
          {/* </Link> */}
        </Menu.Item>
        <Menu.Item key="2">
          {/* <Link to="/a" className="nav-link"> */}
            <VideoCameraOutlined />
            <span>
              <Link to="/a" className="nav-link">Feature</Link>
            </span>
          {/* </Link> */}
        </Menu.Item>
      </Menu>
    </Sider>
  )
}

Sidebar.propTypes = {};

export default Sidebar;