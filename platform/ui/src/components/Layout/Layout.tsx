import React, { useState } from 'react';
import { Layout, theme } from 'antd';
import Sidebar from './Sidebar';
import AppHeader from './AppHeader';
import Breadcrumbs from './Breadcrumbs';
import { Outlet } from 'react-router-dom';

const { Content } = Layout;

const LayOut = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sidebar collapsed={collapsed} />
      <Layout style={{ padding: '0 5px 5px' }}>
        <AppHeader
          toggleSidebar={toggleSidebar}
          collapsed={collapsed}
        />
        <Breadcrumbs />
        <Content
          style={{
            margin: '5px',
            padding: 10,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default LayOut;
