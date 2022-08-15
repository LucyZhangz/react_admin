import React, { useContext, useEffect, useRef, useState } from 'react';
import { Input, Select, Button, Table, Pagination, Modal, Tag, Popconfirm, Switch, Form ,DatePicker, Space} from 'antd';
const { Option } = Select;
import { editList } from '../../../api/termManage/termManage'
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
      // 时间框调用函数
  const onChange = (date, dateString) => {
    console.log(date, dateString);
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
                    endTime: props.recordEdit.endTime,
                    id: props.recordEdit.id,
                    schoolYear: props.recordEdit.schoolYear,
                    startTime: props.recordEdit.startTime,
                    term: props.recordEdit.term,
                    title: props.recordEdit.title,
                }}
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
                    label="开始时间"
                    name="startTime"
                >
                    <Space direction="vertical">
                        <DatePicker onChange={onChange} />
                    </Space>
                </Form.Item>
                <Form.Item
                    label="结束时间"
                    name="endTime"
                >
                    <Space direction="vertical">
                        <DatePicker onChange={onChange} />
                    </Space>
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

