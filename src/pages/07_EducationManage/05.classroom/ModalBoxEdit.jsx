import React, { useContext, useEffect, useRef, useState } from 'react';
import { Input, Select, Button, Table, Pagination, Modal, Tag, Popconfirm, Switch, Form } from 'antd';
const { Option } = Select;
import { editList } from '../../../api/classroomManage/classroomManage'
import { nanoid } from 'nanoid';

export default function ModalBoxEdit(props) {
    console.log(props.recordEdit);
    const [typeLitm,settypeLitm]=useState('')
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
        values.roomType = typeLitm
        values.id= props.recordEdit.id
        console.log(values);
         console.log(values);
        editList(values).then(res=>{
            console.log(res);
            // location.reload()
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
                    address: props.recordEdit.address,
                    capacity: props.recordEdit.capacity,
                    id: props.recordEdit.id,
                    remark: props.recordEdit.remark,
                    roomDesc: props.recordEdit.roomDesc,
                    roomName: props.recordEdit.roomName,
                    roomType: props.recordEdit.roomType,
                }}
                
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
                <Form.Item>

                </Form.Item>
            </Form>
        </div>
    )
}
