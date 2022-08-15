import React, { useContext, useEffect, useRef, useState } from 'react';
import { Input, Select, Button, Table, Pagination, Modal, Tag, Popconfirm, Switch, Form } from 'antd';
const { Option } = Select;
import { editList, getClassList } from '../../../api/gradeManage/gradeManage'
export default function ModalBoxEdit(props) {
    const [classList, setClass] = useState([])
    console.log(props.recordEdit);
    const [typeLitm, settypeLitm] = useState('')
    function handleClose() {
        props.sethandlEditModal(false);
    }
    const onClassChange = async (value) => {
        console.log(value);
        settypeLitm(value)
        let res = await getClassList({
            type: "grade",
            valueLike: value
        })
        console.log(res);
        const { data } = res
        console.log(data);
        setClass(data)
    }
    // 点击保存时发送请求，编辑数据
    const onFinish = (values) => {
        console.log('Success:', values)
        values.gradeNum = typeLitm
        // console.log(values.gradeNum);
        values.id = props.recordEdit.id
        console.log(values);
        editList(values).then(res => {
            console.log(res);
            // location.reload()
        })
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    if (props.recordEdit.status === 1) { props.recordEdit.status = '正常' } else {
        props.recordEdit.status = '毕业'
    }
    if (props.recordEdit.type === 1) { props.recordEdit.type = '小学' } else {
        props.recordEdit.type = '初中'
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
            // 回显数据
                initialValues={{
                    gradeName: props.recordEdit.gradeName,
                    gradeNum: props.recordEdit.gradeNum,
                    remark: props.recordEdit.remark,
                    status: props.recordEdit.status,
                    type: props.recordEdit.type,
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
                    label="年级"
                    name="gradeNum"
                    rules={[
                        {
                            required: true,
                            message: '请输入课程描述',
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
                        {classList.map(item => {
                            // console.log(item);
                            return <Option value={item.value} key={item.id}>{item.label}</Option>
                        })}
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

