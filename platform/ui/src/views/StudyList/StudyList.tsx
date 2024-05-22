import React, { useState } from 'react';
import { Space, Table, Button, Form, Input, Row, DatePicker, theme, message } from 'antd';
import { SearchOutlined, ClearOutlined } from '@ant-design/icons';
import type { TableProps } from 'antd';
import { getStudyList } from '../../api/study/study';

const StudyList = () => {
  interface DataType {
    key: string;
    register_key: string;
    studyInstanceUID: string;
    in_no: string;
    out_no: string;
    bodypart_name: string;
    modality_code: string;
    his_bwmc: string;
    study_time: string;
    hospital: string;
    memo: string;
  }

  const { token } = theme.useToken();
  const [form] = Form.useForm();
  const { RangePicker } = DatePicker;
  const [data, setData] = useState<DataType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const formStyle: React.CSSProperties = {
    maxWidth: 'none',
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    padding: 24,
  };

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      const response = await getStudyList(values);
      const resData = response.data;
      const formattedData = resData.map((item: any, index: number) => ({
        key: index.toString(),
        bodypart_name: item.bodypart_name,
        modality_code: item.modality_code,
        his_bwmc: item.his_bwmc,
        study_time: item.study_time,
        hospital: item.hospital,
        memo: item.memo,
        register_key: item.register_key,
        studyInstanceUID: item.studyInstanceUID,
      }));
      setData(formattedData);
    } catch (error) {
      message.error('获取数据失败');
    } finally {
      setLoading(false);
    }
  };

  const columns: TableProps<DataType>['columns'] = [
    {
      title: '序号',
      dataIndex: 'key',
      rowScope: 'row',
      width: 70,
      align: 'center',
    },
    {
      title: '检查项目名称',
      dataIndex: 'bodypart_name',
      key: 'bodypart_name',
      align: 'center',
      render: text => <a>{text}</a>,
    },
    {
      title: '检查类型',
      dataIndex: 'modality_code',
      align: 'center',
      key: 'modality_code',
    },
    {
      title: '检查部位',
      dataIndex: 'his_bwmc',
      align: 'center',
      key: 'his_bwmc',
    },
    {
      title: '检查时间',
      dataIndex: 'study_time',
      align: 'center',
      key: 'study_time',
    },
    {
      title: '医院名称',
      dataIndex: 'hospital',
      align: 'center',
      key: 'hospital',
    },
    {
      title: '医院等级',
      dataIndex: 'memo',
      align: 'center',
      key: 'memo',
    },
    {
      title: '操作',
      align: 'center',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a style={{ color: '#1677ff' }}>查看</a>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Form
        form={form}
        name="list_search"
        style={formStyle}
        onFinish={onFinish}
      >
        <Row>
          <Space
            size="middle"
            wrap
          >
            <Form.Item
              name="chinese_name"
              label="姓名"
              rules={[{ required: true, message: '姓名不能为空!' }]}
            >
              <Input placeholder="姓名" />
            </Form.Item>
            <Form.Item
              name="identification_no"
              label="身份证号"
              rules={[{ required: true, message: '身份证号不能为空!' }]}
            >
              <Input placeholder="身份证号" />
            </Form.Item>
            <Form.Item
              name="phone_home"
              label="手机号"
            >
              <Input placeholder="手机号" />
            </Form.Item>
            <Form.Item
              name="hospital"
              label="医院名称"
            >
              <Input placeholder="医院名称" />
            </Form.Item>
            <Form.Item
              name="modality_code"
              label="检查类型"
            >
              <Input placeholder="检查类型" />
            </Form.Item>
            <Form.Item
              name="his_bwmc"
              label="检查部位"
            >
              <Input placeholder="检查部位" />
            </Form.Item>
          </Space>
        </Row>
        <Row>
          <Form.Item
            label="查询时间范围"
            name="dateRange"
          >
            <RangePicker placeholder={['开始日期', '结束日期']} />
          </Form.Item>
        </Row>
        <div style={{ textAlign: 'right' }}>
          <Space size="small">
            <Button
              type="primary"
              htmlType="submit"
              icon={<SearchOutlined />}
              style={{ backgroundColor: '#0958d9' }}
            >
              搜索
            </Button>
            <Button
              icon={<ClearOutlined />}
              onClick={() => {
                form.resetFields();
                setData([]);
              }}
            >
              清空
            </Button>
          </Space>
        </div>
      </Form>
      <Table
        style={{ marginTop: 16 }}
        columns={columns}
        dataSource={data}
        loading={loading}
      />
    </div>
  );
};

export default StudyList;
