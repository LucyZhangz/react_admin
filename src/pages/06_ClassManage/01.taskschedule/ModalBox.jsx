import { Button, message, Steps } from 'antd';
import React, { useState } from 'react';
import {
  Modal,
  Tabs,
  Cascader,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Switch,
  Table,
  Divider,
  Pagination

} from 'antd';
// import { AudioOutlined } from '@ant-design/icons';
import { Space } from 'antd';
import { done } from 'nprogress';
export default function ModalBox() {
  // information 内容区
  const { Step } = Steps;
  const { Search } = Input;
  const { Option } = Select;
  //tab1 基本信息设置
  const [componentSize, setComponentSize] = useState('default');
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };
  //tab2 基本信息设置 点击搜索
  const onSearch = (value) => console.log(value);
  //tab栏 切换 
  const { TabPane } = Tabs;

  const onChange = (key) => {
    console.log(key);
  };
  // // information 表格内容区 表格头部
  const columns = [
    {
      title: '教学名称',
      dataIndex: 'name',
    },
    {
      title: '课程名称',
      dataIndex: 'chinese',
      sorter: {
        compare: (a, b) => a.chinese - b.chinese,
        multiple: 3,
      },
    },
    {
      title: '班级名称',
      dataIndex: 'math',
      sorter: {
        compare: (a, b) => a.math - b.math,
        multiple: 2,
      },
    },
    {
      title: '周课时(编辑)',
      dataIndex: 'english',
      sorter: {
        compare: (a, b) => a.english - b.english,
        multiple: 1,
      },
    },
  ];
  // information 表格内容区
  const data = [
    {
      key: '1',
      name: 'John Brown',
      chinese: 98,
      math: 60,
      english: 70,
    },
    {
      key: '2',
      name: 'Jim Green',
      chinese: 98,
      math: 66,
      english: 89,
    },
    {
      key: '3',
      name: 'Joe Black',
      chinese: 98,
      math: 90,
      english: 70,
    },
    {
      key: '4',
      name: 'Jim Red',
      chinese: 88,
      math: 99,
      english: 89,
    },
  ];
  //information 的checkbox 选项框
  const [selectionType, setSelectionType] = useState('checkbox');
  //information 表单事件 
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
  };
  //表单头部 引入教学数据的点击事件
  const setAgeSort = () => {
    setSortedInfo({
      order: 'descend',
      columnKey: 'age',
    });
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

export default App;