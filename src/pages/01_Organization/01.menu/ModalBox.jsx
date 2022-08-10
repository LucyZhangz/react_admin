import { Button, Form, Input,Switch,Tree,Radio  } from 'antd';
import style from './menu.module.less'
import React,{useState }from 'react';
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
  //单选框里的值

const [value, setValue] = useState(1);

  const onChange = (e) => {
    console.log('radio checked', e.target.value);
    setValue(e.target.value);
  };




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
        label="类型"
      >
    <Radio.Group onChange={onChange} value={value}>
      <Radio value={1}>目录</Radio>
      <Radio value={2}>菜单</Radio>
      <Radio value={3}>按钮</Radio>
    </Radio.Group>
      </Form.Item>
      <Form.Item
        // name={['user', 'name']}
        label="备注"
      >
        <Input />
      </Form.Item>
      <Form.Item label="状态" valuePropName="checked">
        <Switch className={style.SwichCheck} />
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

export default App;