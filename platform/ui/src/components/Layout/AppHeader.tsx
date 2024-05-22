import React from 'react';
import { Layout, Button, theme } from 'antd';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { MenuFoldOutlined, PoweroffOutlined, LogoutOutlined } from '@ant-design/icons';

const { Header } = Layout;

const AppHeader = ({ toggleSidebar, collapsed }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem('auth');
    navigate('/login');
  };
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Header
      style={{
        padding: 0,
        background: colorBgContainer,
        display: 'flex',
        alignContent: 'center',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <div>
        <Button
          type="text"
          icon={collapsed ? <LogoutOutlined /> : <MenuFoldOutlined />}
          onClick={() => toggleSidebar(!collapsed)}
          style={{
            fontSize: '16px',
          }}
        />
      </div>
      <Button
        type="text"
        icon={<PoweroffOutlined />}
        onClick={handleLogout}
        style={{
          fontSize: '16px',
        }}
      ></Button>
    </Header>
  );
};
AppHeader.propTypes = {
  toggleSidebar: PropTypes.func,
  collapsed: PropTypes.bool,
};

export default AppHeader;
