import { Button, Form, Input,Switch,Tree  } from 'antd';
import React from 'react';
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
  function CloseModal(){
      props.sethandleModal(false);
  }
  function CannelModal(){
    props.sethandleModal(false)
  }
  return (
    <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
      <Form.Item
        // name={['user', 'name']}
        label="角色名称"
      >
        <Input />
      </Form.Item>
      <Form.Item
        // name={['user', 'name']}
        label="备注"
      >
        <Input />
      </Form.Item>
      <Form.Item label="状态" valuePropName="checked">
        <Switch />
      </Form.Item>
      <Form.Item label='请选择权限'>
      <Tree
      checkable
      treeData={treeData}
    />
      </Form.Item>
      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
    <Button type="primary" htmlType="submit" 
    style = {{position:'relative',left:"150px"}}
    onClick={CloseModal}
    >
            确定
    </Button>
    <Button style={{postion:'relative',left:'170px'}} onClick={CannelModal}>
             取消
    </Button>
      </Form.Item>
    </Form>
  );
};
