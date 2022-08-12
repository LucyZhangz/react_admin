import {
  Button,
  Form,
  Input,
} from "antd";
import React, { useState } from "react";
import { addTypeTestList } from "../../../api/testManage/testType";
import Style from "./typeTest.module.less";

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};


const App = (props) => {
  const [current, setCurrent] = useState(0);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const onFinish = (values) => {
    addList(values)
  };
  async function addList(params){
    let res = await addTypeTestList(params)
    console.log(res);
  }
 
  return (
    <>
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
        <Form.Item
          label="类型名称"
          name="typeName"
          rules={[
            {
              required: true,
              message: "Please input typeName!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="备注"
          name="notes"
          rules={[
            {
              required: true,
              message: "Please input notes!",
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
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default App;
