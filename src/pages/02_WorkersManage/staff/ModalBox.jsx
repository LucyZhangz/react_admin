import { Button, Form, Input, Switch, Radio, Select, message, Upload } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import style from './staff.module.less'
import React, { useState } from 'react';// 选择层级的下拉框
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

// 上传照片
const { Dragger } = Upload;
const props = {
  name: 'file',
  multiple: true,
  action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',

  onChange(info) {
    const { status } = info.file;

    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }

    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },

  onDrop(e) {
    console.log('Dropped files', e.dataTransfer.files);
  },
};



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
  // 单选框默认选值
  const [value, setValue] = useState(1);
  // 单选框事件
  const changeOnly = (e) => {
    console.log('radio checked', e.target.value);
    setValue(e.target.value);
  };

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
        label="工号"
      >
        <Input />
      </Form.Item>


      <Form.Item
        // name={['user', 'name']}
        label="密码"
      >
        <Input.Password />
      </Form.Item>


      <Form.Item
        // name={['user', 'name']}
        label="真实姓名"
      >
        <Input />
      </Form.Item>


      <Form.Item
        // name={['user', 'name']}
        label="邮箱"
      >
        <Input />
      </Form.Item>


      <Form.Item
        // name={['user', 'name']}
        label="手机号"
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


      <Form.Item label="性别" valuePropName="checked">
        <Radio.Group onChange={changeOnly} value={value}>
          <Radio value={1}>男</Radio>
          <Radio value={2}>女</Radio>
        </Radio.Group>
      </Form.Item>


      <Form.Item label="状态" valuePropName="checked">
        <Switch className={style.SwichCheck} />
      </Form.Item>


      <Form.Item
        // name={['user', 'name']}
        label="毕业院校"
      >
        <Input />

      </Form.Item>


      <Form.Item
        // name={['user', 'name']}
        label="专业"
      >
        <Input />
      </Form.Item>


      <Form.Item
        // name={['user', 'name']}
        label="最高学历"
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
        label="上传照片"
      >
        <Dragger {...props}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">点击上传或者拖拽上传</p>

        </Dragger>
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