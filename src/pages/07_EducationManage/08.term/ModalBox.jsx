import { Input, Select, Button, Table, Pagination, Modal, Tag, Popconfirm, Switch, Form, message, DatePicker, Space } from 'antd';
import React, { useContext, useEffect, useRef, useState } from 'react';
import moment from "moment"



const { Option } = Select;
import { addList } from '../../../api/termManage/termManage'
export default function ModalBox(props) {
  const [arrlist, setlist] = useState([])
  const [handleModal, sethandleModal] = useState(false)
  // 初始化时间
  const [time, setTime] = useState('')
  const [time2, setTime2] = useState('')
  // 添加
  const [val, setVal] = useState('')
  const onClassChange = (value) => {
    console.log(value);
    setVal(value)
  }
  const onFinish = (values) => {
    console.log('Success:', values);
    console.log(values);
    const resVal = {
      id: '',
      ...values,
      startTime: moment(values.startTime).format('YYYY-MM-DD'),
      endTime: moment(values.endTime).format('YYYY-MM-DD')
    }
    console.log(resVal);
    addList(resVal).then(res => {
      console.log(res);
      message.success({
        content: res.msg,
        className: 'custom-class',
        style: {
          marginTop: '20vh',
        },
      });
      // location.reload()
    })
    props.sethandleModal(false)
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  // 返回
  function handleClose() {
    props.sethandleModal(false);
  }
  // 时间框调用函数
  const onChange = (date, dateString) => {
    console.log(date, dateString);
    setTime(dateString)
  };
  const onChange2 = (date, dateString) => {
    console.log(date, dateString);
    setTime2(dateString)
  };
  return (
    <div>
      <Form
        name="basic"
        preserve={false}
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="标题名称"
          name="title"
          rules={[
            {
              required: true,
              message: '请输入标题',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="学年"
          name="schoolYear"
          rules={[
            {
              required: true,
              message: '请输入学年',

            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="term"
          label="学期"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select
            style={{
              width: 570,
              marginBottom: '20px',
              marginLeft: '15px'
            }}
            placeholder="请选择"
            onChange={onClassChange}
            allowClear
          >
            <Option value="请选择">请选择</Option>
            <Option value="1">第一学期</Option>
            <Option value="2">第二学期</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="startTime"
          label="开始时间"
        >
          <DatePicker />
        </Form.Item>
        <Form.Item
          name="endTime"
          label="结束时间"
        >
          <DatePicker />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            保存
          </Button>
          <Button size='middle' style={{ marginLeft: '10px', marginRight: '10px' }} onClick={handleClose}>
            取消
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}
