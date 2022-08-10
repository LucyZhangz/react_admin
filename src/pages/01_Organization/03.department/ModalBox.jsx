import { Button, Form, Input, Switch, Select } from 'antd';
import style from './department.module.less'
import React from 'react';
// 选择层级的下拉框
const { Option } = Select;
const handleChange = (value) => {
  console.log(`selected ${value}`);
};
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const treeData = [
  {
    title: 'parent 1',
    key: '0-0',
    children: [
      {
        title: 'parent 1-0',
        key: '0-0-0',
        children: [
          {
            title: 'leaf',
            key: '0-0-0-0',
          },
          {
            title: 'leaf',
            key: '0-0-0-1',
          },
        ],
      },
      {
        title: 'parent 1-1',
        key: '0-0-1',
        children: [
          {
            title: (
              <span
                style={{
                  color: '#1890ff',
                }}
              >
                sss
              </span>
            ),
            key: '0-0-1-0',
          },
        ],
      },
    ],
  },
];

const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not a valid email!',
    number: '${label} is not a valid number!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};
const App = (props) => {
  const onFinish = (values) => {
    console.log(values);
  };
  //   console.log(props);
  function CloseModal() {
    props.sethandleModal(false);
  }
  function CannelModal() {
    props.sethandleModal(false)
  }
  return (
    <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
      <Form.Item
        // name={['user', 'name']}
        label="部门名称"
      >
        <Input />
      </Form.Item>
      <Form.Item
        // name={['user', 'name']}
        label="所属部门"
      >
        <Select
          defaultValue="lucy"
          style={{
            width: 120,
          }}
          onChange={handleChange}
        >
          <Option value="jack">Jack</Option>
          <Option value="lucy">Lucy</Option>
          <Option value="disabled" >
            露露
          </Option>
          <Option value="Yiminghe">yiminghe</Option>
        </Select>
      </Form.Item>
      <Form.Item
        // name={['user', 'name']}
        label="部门经理名称"
      >
        <Input />
      </Form.Item>
      <Form.Item
        // name={['user', 'name']}
        label="部门经理手机号"
      >
        <Input />
      </Form.Item>
      <Form.Item label="状态" valuePropName="checked">
        <Switch  className={style.SwichCheck} />
      </Form.Item>
      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
        <Button type="primary" htmlType="submit"
          style={{ position: 'relative', left: "150px" }}
          onClick={CloseModal}
        >
          确定
        </Button>
        <Button style={{ postion: 'relative', left: '170px' }} onClick={CannelModal}>
          取消
        </Button>
      </Form.Item>
    </Form>
  );
};

export default App;