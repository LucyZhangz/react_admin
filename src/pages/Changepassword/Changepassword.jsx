import React, { useState } from "react";
import { Button, Checkbox, Form, Input ,message } from "antd";
import Style from "./Changepassword.module.css";
import { user } from '../../api/classManage/taskschedule'
export default function Changetpassword() {
    const onFinish = (values) => {
        console.log("Success:", values);
    };
    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };
    const [value, setValue] = useState('')
    const [pass, setpass] = useState('')
    const [confirm, setconfirm] = useState('')
    async function btn() {
        if (value !== pass) {
            await user({
                newPwd: value,
                oldPwd: pass,
                rePass: confirm
            })
        }else{
            message.info('新旧密码不能相同')  
        }

    }
    return (
        <div style={{ minWidth: '800px' }}>
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
            >
                <Form.Item label="旧密码" name="username">
                    <Input
                        type='password'
                        onChange={event => setValue(event.target.value)}
                        style={{ width: '300px', height: '50px' }} />
                </Form.Item>
                <Form.Item label="新密码" name="password">
                    <Input
                        type='password'
                        onChange={event => setpass(event.target.value)}
                        style={{ width: '300px', height: '50px' }} />
                </Form.Item>
                <Form.Item
                    label="确认密码" name="confirm">
                    <Input
                        type='password'
                        onChange={event => setconfirm(event.target.value)}
                        style={{ width: '300px', height: '50px' }} />
                </Form.Item>
                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Button
                        onClick={btn}
                        type="primary" htmlType="submit" style={{ width: '300px', height: '50px' }}>
                        保存
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}
