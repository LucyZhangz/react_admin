import { Input, Select, Button, Table, Pagination, Modal, Tag, Popconfirm, Switch, Form, message } from 'antd';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { nanoid } from 'nanoid'
const { Option } = Select;
import { addList} from '../../../api/SubjectManage/subjectManage'
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
    values.classType = val
    console.log(values);
    const resVal={id:'', ...values}
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
          label="课程名称"
          name="courseName"
          rules={[
            {
              required: true,
              message: '请输入课程名称',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="classType"
          label="所属阶级"
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
            <Option value="1">小学</Option>
            <Option value="2">初中</Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="课程描述"
          name="courseDesc"
          rules={[
            {
              required: true,
              message: '请输入课程描述',

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
