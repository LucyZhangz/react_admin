import React,{useEffect} from 'react'
import {createRef} from 'react-dom'
import Style from './login.module.css'
import { Card } from 'antd';
import { Button, Form, Input } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { userlogin } from '../../api/login'
export default function login() {
  const [form] = Form.useForm();
  // 获取input数值
	const myRef = React.useRef()
  const onFinish = (values) => {
    console.log('Finish:', values);
    userlogin({
      username: values.username,
      password: values.password,
      captcha: values.captcha,
    }).then(res=>{
      console.log(res);
    })
  };
//  function handleLogin(){
//     console.log(myRef.current.value);
//   }
  return (
    <div className={Style.bg}>
      <Card
        style={{
          width: 500,
        }}
      >
        <h1 className={Style.titleColor}>教务管理系统</h1>
        <Form form={form} name="horizontal_login" layout="vertical" onFinish={onFinish}>
          <Form.Item
            name="username"
            
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" ref={myRef} />
          </Form.Item>
          <br />
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
              ref={myRef}
            />
          </Form.Item>
          <Form.Item
            name="captcha"
            rules={[{ required: true, message: 'Please input your captcha!'}]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="text"
              placeholder="captcha"
              ref={myRef}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className={Style.loginButton}>
              登录
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )

}
