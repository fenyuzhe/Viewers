import React from 'react';
import { Layout, Button, theme, Tooltip } from 'antd';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { MenuFoldOutlined, PoweroffOutlined, MenuUnfoldOutlined } from '@ant-design/icons';

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
        <Tooltip
          placement="right"
          title={collapsed ? '展开' : '折叠'}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => toggleSidebar(!collapsed)}
            style={{
              fontSize: '16px',
            }}
          />
        </Tooltip>
      </div>
      <div>
        {/* <span style={{ marginRight: '10px', fontSize: '20px' }}>
          您好，<a>游客</a>
        </span> */}
        <Tooltip
          placement="left"
          title="退出登录"
        >
          <Button
            type="text"
            icon={<PoweroffOutlined />}
            onClick={handleLogout}
            style={{
              fontSize: '16px',
            }}
          ></Button>
        </Tooltip>
      </div>
    </Header>
  );
};
AppHeader.propTypes = {
  toggleSidebar: PropTypes.func,
  collapsed: PropTypes.bool,
};

export default AppHeader;
