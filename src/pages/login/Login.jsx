import React, { useEffect } from "react";
import { createRef } from "react-dom";
import Style from "./login.module.css";
import leftBg from "./images/login-box-bg.svg";
import { Button, Form, Input } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { userlogin} from "../../api/login";
import Theme from '../../components/ThemeCheck/Theme'
import Switchtheme from '../../components/Switch/Switchtheme'
export default function login() {
  const [form] = Form.useForm();
  // 获取input数值
  const myRef = React.useRef();
  const onFinish =async(values) => {
    console.log("Finish:", values);
     await userlogin({
      username: values.username,
      password: values.password,
      captcha: values.captcha,
    }).then((res) => {
      console.log(res);
      localStorage.setItem('VITE_ADMIN_TOKEN',res.data.accessToken)
    });
  };
  return (
    <div className={Style.loginContainer}>
     <Switchtheme className={Style.antSwitch}/>
      <div className={Style.loginBox}>
        <div className={Style.leftBox}>
          <img src={leftBg} alt="" className={Style.loginImg} />
        </div>
        <div className={Style.rightBox}>
       
          <div className={Style.loginForm}>
            <h1 className={Style.titleColor}>教务管理系统</h1>
            <Form
              form={form}
              name="horizontal_login"
              layout="vertical"
              onFinish={onFinish}
            >
              <Form.Item
                name="username"
                rules={[
                  { required: true, message: "Please input your username!" },
                ]}
              >
                <Input
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="Username"
                  ref={myRef}
                  style={{ width: "380px", padding: "11px" }}
                />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  { required: true, message: "Please input your password!" },
                ]}
              >
                <Input
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="Password"
                  ref={myRef}
                  style={{ width: "380px", padding: "11px" }}
                />
              </Form.Item>
              <Form.Item
                name="captcha"
                rules={[
                  { required: true, message: "Please input your captcha!" },
                ]}
              >
                <Input
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="text"
                  suffix={<img src='http://192.168.0.253:8091/sys/getVerify' className={Style.msg} alt=""/>}  
                  placeholder="captcha"
                  ref={myRef}
                  style={{ width: "380px", padding: "11px" }}
                />
                
              </Form.Item>
            
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className={Style.loginButton}
                  style={{ width: "380px", height: "50px" }}
                >
                  登录
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
