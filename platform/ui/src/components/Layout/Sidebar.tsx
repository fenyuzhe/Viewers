import React from 'react';
import { Layout, Menu } from 'antd';
import PropTypes from 'prop-types';
import { HomeOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useAppConfig } from '@state';

const { Sider } = Layout;

const Sidebar = ({ collapsed }) => {
  const [appConfig] = useAppConfig();
  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
    >
      <div className="flex h-20 items-center justify-center">
        <h1 className="text-center text-2xl text-white">{appConfig.sidebartext}</h1>
      </div>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={['1']}
        style={{ borderRight: 0 }}
      >
        <Menu.Item
          key="1"
          icon={<HomeOutlined />}
        >
          <Link to="/">检查列表</Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};
Sidebar.propTypes = {
  collapsed: PropTypes.bool,
};

export default Sidebar;
