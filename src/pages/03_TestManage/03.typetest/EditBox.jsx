import { Button, Form, Input } from "antd";
import React, { useEffect, useState } from "react";
import { addTypeTestList, editTypeTestList, getEditDatabyId } from "../../../api/testManage/testType";
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
  const [editData, setEditData] = useState([]);
  const next = () => {
    setCurrent(current + 1);
  };
  useEffect(()=>{
   
  },[])
  const prev = () => {
    setCurrent(current - 1);
  };

  const onFinish = (values) => {
    values.id = props.editRecord.id
    console.log(values);
    editList(values);
    props.setHandleEditModal(false);
    location.reload();
  };
  async function editList(values){
    let res = await editTypeTestList(values)
    console.log(res);
  }
 
  return (
    <>
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
          id:props.editRecord.id,
          typeName:props.editRecord.typeName,
          remark:props.editRecord.remark
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
          name="remark"
          rules={[
            {
              required: true,
              message: "Please input remark!",
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
