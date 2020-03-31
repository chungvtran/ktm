import React from 'react';
import { Layout, Menu } from 'antd';
import _ from 'lodash';
import {
  Link,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import '../../styles/components/Sidebar.css'
import SubMenu from 'antd/lib/menu/SubMenu';

function Sidebar(props) {
  const { Sider } = Layout;
  const { routes, sidebarOpen, onCollapse, currentPath } = props;
  
  return (
    <Sider className="sider" collapsed={sidebarOpen} onCollapse={onCollapse}>
      <div className="logo" />
      <Menu className="menu" theme="dark" mode="inline" defaultSelectedKeys={[currentPath]}>
        {_.map(routes, (route, index) => ( 
          <Menu.Item key={route.path}>
            <Link to={route.path} className="nav-link" style={{ textDecoration: 'none' }}>
              {route.icon}
              <span>
                {route.name}
            </span>
            </Link>
          </Menu.Item>
        ))}
      </Menu>
    </Sider>
  )
}

Sidebar.propTypes = {};

export default Sidebar;