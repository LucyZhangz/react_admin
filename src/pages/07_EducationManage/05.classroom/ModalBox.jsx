
import { Input, Select, Button, Table, Pagination, Modal, Tag, Popconfirm, Switch, Form } from 'antd';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { nanoid } from 'nanoid'
const { Option } = Select;
import { addList, getClassList } from '../../../api/classroomManage/classroomManage'

export default function ModalBox(props) {
  const [arrlist, setlist] = useState([])
  const [handleModal, sethandleModal] = useState(false)
  // 添加
  const [val, setVal] = useState('')
  const onClassChange = (value) => {
    console.log(value);
    setVal(value)
  }
  const onFinish = (values) => {
    console.log('Success:', values);
    console.log(val);
    values.roomType = val
    console.log(values);
    const id = nanoid()
    const resetVal = { id, ...values }
    console.log(resetVal);
    addList(resetVal).then(res => {
      console.log(res);
      location.reload()
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
  return (
    <div>
      <Form
        name="basic"
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
        preserve={false}
      >
        <Form.Item
          label="教室名称"
          name="roomName"
          rules={[
            {
              required: true,
              message: '请输入',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="roomType"
          label="教室类型"
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
            <Option value="1">普通教室</Option>
            <Option value="2">多媒体教室</Option>
            <Option value="3">其他教室</Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="容纳量"
          name="capacity"
          rules={[
            {
              required: true,
              message: '请输入',

            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="描述"
          name="roomDesc"
          rules={[
            {
              required: true,
              message: '请输入',

            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="地址"
          name="address"
          rules={[
            {
              required: true,
              message: '请输入',

            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="备注"
          name="remark"
          rules={[
            {
              required: true,
              message: '请输入',

            },
          ]}
        >
          <Input />
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
