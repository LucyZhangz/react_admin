import React, { useContext, useEffect, useRef, useState } from 'react';
import { Input, Select, Button, Table, Pagination, Modal, Tag, Popconfirm, Switch, Form } from 'antd';
const { Option } = Select;
import { editList } from '../../../api/SubjectManage/subjectManage'
export default function ModalBoxEdit(props) {
  console.log(props.recordEdit);
  const [typeLitm, settypeLitm] = useState('')
  function handleClose() {
    props.sethandlEditModal(false);
  }
  const onClassChange = (value) => {
    console.log(value);
    settypeLitm(value)
  }
  // 点击保存时发送请求，编辑数据
  const onFinish = (values) => {
    console.log('Success:', values)
    console.log(typeLitm);
    values.classType = typeLitm
    values.id = props.recordEdit.id
    console.log(values);
    console.log(values);
    editList(values).then(res => {
      console.log(res);
      location.reload()
    })
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
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
        preserve={false}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        initialValues={{
          // 编辑数据回显
          classType: props.recordEdit.classType,
          courseDesc: props.recordEdit.courseDesc,
          id: props.recordEdit.id,
          courseName: props.recordEdit.courseName,
        }}
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

