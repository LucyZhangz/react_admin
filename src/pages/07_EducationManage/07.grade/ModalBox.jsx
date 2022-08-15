import { Input, Select, Button, Table, Pagination, Modal, Tag, Popconfirm, Switch, Form, message } from 'antd';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { nanoid } from 'nanoid'
const { Option } = Select;
import { addList, getClassList } from '../../../api/gradeManage/gradeManage'
import { render } from 'nprogress';
export default function ModalBox(props) {
  const [arrlist, setlist] = useState([])
  const [handleModal, sethandleModal] = useState(false)
  // 添加
  const [val, setVal] = useState('')
  // 初始化年级获取列表
  const [classList, setClass] = useState([])
  const onClassChange = async(value) => {
    console.log(value);
    setVal(value)
    //  发送获取年级数据的请求
    let res = await getClassList({
      type: "grade",
      valueLike: value
    })
    console.log(res);
    const {data}=res
    setClass(data)
  }
  const onFinish = (values) => {
    console.log('Success:', values);
    console.log(val);
    values.gradeNum = val
    console.log(values);
    const resVal = { id: '', ...values }
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
      getlist(page, limit)
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
          label="年级名称"
          name="gradeName"
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
          name="status"
          label="年级状态"
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
            <Option value="1">正常</Option>
            <Option value="2">毕业</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="type"
          label="所属阶段"
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
          name="gradeNum"
          label="年级"
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
          >
            {classList.map(item => {
                console.log(item);
                return <Option value={item.value} key={item.id}>{item.label}</Option>
              })
            }
          </Select>
        </Form.Item>
        <Form.Item
          label="备注"
          name="remark"
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

