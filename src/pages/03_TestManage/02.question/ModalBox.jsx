import { Button, Checkbox, Form, Input, message, Steps ,Select,Switch} from "antd";
const { Step } = Steps;
import React, { useState } from "react";
// import Style from './exampaper.module.less'
const { TextArea } = Input;
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const onFinish = (values) => {
  console.log("Success:", values);
};

const handleChange = (value) => {
  console.log(`selected ${value}`);
};

const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};
function onChange(){
  console.log(111);
}
const page1 = (
  <Form
    name="basic"
    style={{width:'80%',marginTop:'20px'}}
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
      label="试卷名称"
      name="papername"
      rules={[
        {
          required: true,
          message: "Please input your papername!",
        },
      ]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      label="考试时长"
      name="testTime"
      rules={[
        {
          required: true,
          message: "Please input  testTime!",
        },
      ]}
    >
      <Input />
    </Form.Item>
    <Form.Item
      label="试卷总分"
      name="totalScore"
      rules={[
        {
          required: true,
          message: "Please input totalScore!",
        },
      ]}
    >
      <Input />
    </Form.Item>
    <Form.Item
      label="适用年级"
      name="grade"
      rules={[
        {
          required: true,
          message: "Please input grade!",
        },
      ]}
    >
      <Select
        placeholder="请选择"
        style={{
          width: 120,
        }}
        onChange={handleChange}
      >
        <Select.Option value="jack">Jack</Select.Option>
        <Select.Option value="lucy">Lucy</Select.Option>
        <Select.Option value="233">
          Disabled
        </Select.Option>
        <Select.Option value="Yiminghe">yiminghe</Select.Option>
      </Select>
    </Form.Item>
    <Form.Item
      label="科目"
      name="subject"
      rules={[
        {
          required: true,
          message: "Please input subject!",
        },
      ]}
    >
      <Select
        placeholder="请选择"
        style={{
          width: 120,
        }}
        onChange={handleChange}
      >
        <Select.Option value="jack">Jack</Select.Option>
        <Select.Option value="lucy">Lucy</Select.Option>
        <Select.Option value="233">
          Disabled
        </Select.Option>
        <Select.Option value="Yiminghe">yiminghe</Select.Option>
      </Select>
    </Form.Item>
    <Form.Item
      label="私有"
    >
     <Switch defaultChecked onChange={onChange}/>
    </Form.Item>
    <Form.Item
      label="注意事项"
    >
      <TextArea rows={4} placeholder="maxLength is 6" maxLength={6} />
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
);
const steps = [
  {
    title: "基本信息设置",
    content: page1,
  },
  {
    title: "试题编辑",
    content: "Second-content",
  },
  {
    title: "完成",
    content: "Last-content",
  },
];

const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
    number: "${label} is not a valid number!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
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
    console.log(values);
  };
  //   console.log(props);
  function CloseModal() {
    props.sethandleModal(false);
  }
  function CannelModal() {
    props.sethandleModal(false);
  }
  return (
    <>
      <Steps current={current}>
        {steps.map((item) => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>
      <div className="steps-content">{steps[current].content}</div>
      <div className="steps-action">
        {current < steps.length - 1 && (
          <Button type="primary" onClick={() => next()}>
            Next
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button
            type="primary"
            onClick={() => message.success("Processing complete!")}
          >
            Done
          </Button>
        )}
        {current > 0 && (
          <Button
            style={{
              margin: "0 8px",
            }}
            onClick={() => prev()}
          >
            Previous
          </Button>
        )}
      </div>
    </>
  );
};

export default App;
