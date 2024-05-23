import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LockOutlined, UserOutlined, TeamOutlined, IdcardOutlined } from '@ant-design/icons';
import { Button, Form, Input, message, Card } from 'antd';
import { getInfo, login } from '../../api/login';
import { utils } from '@ohif/core';
import { useAppConfig } from '@state';
const { setToken } = utils;

const Login = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [appConfig] = useAppConfig();

  const onFinish = async values => {
    setLoading(true);
    try {
      const res = await login({ ...values });
      if (res.status === '200') {
        const loginResult = res.data;
        setToken(loginResult.token || '');
        sessionStorage.setItem('auth', 'true');
        navigate('/');
      } else {
        message.error(res.message);
      }
    } catch (error) {
      const defaultLoginFailureMessage = '登录失败，请重试！';
      message.error(defaultLoginFailureMessage);
    }
    setLoading(false);
  };

  const onFinishFailed = () => {
    message.error('请填写所有必填字段');
  };

  const handlePasswordBlur = async () => {
    const formdata = form.getFieldsValue();
    if (formdata.password) {
      setLoading(true);
      try {
        const res = await getInfo(formdata);
        const data = res.data;
        if (res.status === '200') {
          form.setFieldsValue(data);
        } else {
          form.setFieldsValue({ username: '', deptname: '' });
          message.error(res.message);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    } else {
      form.setFieldsValue({ username: '', deptname: '' });
    }
  };

  return (
    <div className="isolate flex h-screen overflow-hidden bg-white">
      <div className="flex min-h-full flex-1 flex-col justify-center">
        <div
          className="absolute inset-0 -z-10 transform-gpu blur-2xl"
          aria-hidden="true"
        >
          <div className="h-full w-full bg-gradient-to-r from-[#0adfd4] to-[#80a7f0] opacity-30" />
        </div>
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h1 className="text-center text-3xl font-bold leading-9 tracking-tight text-black">
            {appConfig.hospitalName}
          </h1>
          <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            {appConfig.sidebartext}
          </h2>
        </div>
        <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-sm">
          <Card>
            <Form
              name="loginForm"
              form={form}
              initialValues={{ remember: true }}
              size="large"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                name="usercode"
                rules={[{ required: true, message: '请输入登录用户名!' }]}
              >
                <Input
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="用户名"
                  allowClear
                />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[{ required: true, message: '请输入登录密码!' }]}
              >
                <Input.Password
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  allowClear
                  onBlur={handlePasswordBlur}
                  onMouseLeave={handlePasswordBlur}
                  placeholder="密码"
                />
              </Form.Item>
              <Form.Item name="username">
                <Input
                  prefix={<IdcardOutlined className="site-form-item-icon" />}
                  placeholder="姓名"
                  disabled
                />
              </Form.Item>
              <Form.Item name="deptname">
                <Input
                  prefix={<TeamOutlined className="site-form-item-icon" />}
                  placeholder="科室"
                  disabled
                />
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  block
                  htmlType="submit"
                  className="login-form-button"
                  loading={loading}
                  style={{ backgroundColor: '#646464' }}
                >
                  登录
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Login;
