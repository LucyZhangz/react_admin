import React,{useEffect} from 'react'
import {createRef} from 'react-dom'
import Style from '../components/index.module.css'
import { Card } from 'antd';
import { Button, Form, Input } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { userlogin } from '../api/login'
export default function login() {
  const [form] = Form.useForm();
  // 获取input数值
	const myRef = React.useRef()
  const onFinish = (values) => {
    console.log('Finish:', values);
  };
    userlogin({
    'captcha': '',
    'createId': '',
    'createIds': [],
    'createTime': '',
    'createWhere': 0,
    'deleted': 0,
    'deptId':'',
    'deptName':'',
    'deptNo':'' ,
    'education': 0,
    'email': '',
    'endTime':'',
    'id':'',
    'limit': 0,
    'major': '',
    "newPwd": "",
    "nickName": "",
    "oldPwd": "",
    "page": 0,
    "password": "",
    "phone": "",
    "profile": "",
    "qualificationImg": "",
    "realName": "",
    "roleId": "",
    "roleIds": [],
    "salt": "",
    "selfEvaluation": "",
    "sex": 0,
    "startTime": "",
    "status": 0,
    "university": "",
    "updateId": "",
    "updateTime": "",
    "username": ""
  }).then(res=>{
    console.log(res);
  })
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
