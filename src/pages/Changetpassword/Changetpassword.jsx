import React from "react";
import { Button, Checkbox, Form, Input } from "antd";
import Style from "./Changetpassword.model.css";
export default function Changetpassword() {
    const onFinish = (values) => {
        console.log("Success:", values);
    };
    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };
    return (
        <div style={{minWidth:'800px'}}>
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
                    <Input  style={{width:'300px',height:'50px'}}/>
                </Form.Item>
                <Form.Item label="新密码" name="password">
                    <Input style={{width:'300px',height:'50px'}} />
                </Form.Item>
                <Form.Item label="确认密码" name="confirm">
                    <Input  style={{width:'300px',height:'50px'}}/>
                </Form.Item>
                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Button type="primary" htmlType="submit"  style={{width:'300px',height:'50px'}}>
                        保存
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}
