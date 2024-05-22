import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LockOutlined, UserOutlined, TeamOutlined, IdcardOutlined } from '@ant-design/icons';
import { Button, Form, Input, Flex, message, Card } from 'antd';
import { getInfo, login } from '../../api/login';
import { utils } from '@ohif/core';
const { setToken } = utils;

const Login = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const onFinish = async values => {
    setLoading(true);

    try {
      const loginResult = await login({ ...values });
      console.log(loginResult);
      // 存储 token
      setToken(loginResult.token || '');
      sessionStorage.setItem('auth', 'true');
      navigate('/');
      // const defaultLoginSuccessMessage = '登录成功！';
      // message.success(defaultLoginSuccessMessage);
      // await fetchUserInfo();
      /** 此方法会跳转到 redirect 参数所在的位置 */
      // if (!history) {
      //   return;
      // }
      // const { query } = history.location;
      // const { redirect } = query as {
      //   redirect: string;
      // };
      return;
    } catch (error) {
      const defaultLoginFailureMessage = '登录失败，请重试！';
      message.error(defaultLoginFailureMessage);
    }

    setLoading(false);
  };

  const onFinishFailed = () => {};

  const handlePasswordBlur = async () => {
    const data = form.getFieldsValue();
    if (data.password) {
      setLoading(true); // Set loading to true
      try {
        const res = await getInfo(data);
        if (res.data) {
          form.setFieldsValue(res.data);
        } else {
          form.setFieldsValue({ username: '', deptname: '' });
        }
      } catch (error) {
        console.error('Error fetching info:', error);
        form.setFieldsValue({ username: '', deptname: '' });
      } finally {
        setLoading(false); // Set loading to false
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
            中国人民解放军联勤保障部队第九一〇医院
          </h1>
          <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            PACS临床工作站
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
                  onMouseOut={handlePasswordBlur}
                  onKeyDown={handlePasswordBlur}
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
                <Flex
                  vertical
                  gap="small"
                  style={{ width: '100%' }}
                >
                  <Button
                    type="primary"
                    block
                    ghost
                    htmlType="submit"
                    className="login-form-button"
                    disabled={loading} // Disable the button when loading
                  >
                    登录
                  </Button>
                </Flex>
              </Form.Item>
            </Form>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Login;
