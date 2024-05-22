import React from 'react';
import { Layout, Menu } from 'antd';
import PropTypes from 'prop-types';
import { HomeOutlined, InfoCircleOutlined, ContactsOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Sider } = Layout;

const Sidebar = ({ collapsed }) => {
  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
    >
      <div className="h-20 ">
        <div className="bg-[rgb(51,68,84)] p-3">
          <h1 className="text-center text-2xl text-white">临床工作站</h1>
        </div>
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
