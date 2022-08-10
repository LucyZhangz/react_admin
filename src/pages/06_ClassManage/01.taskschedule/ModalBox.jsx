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
  const information = (
    <div>
      <div>
        <Tabs defaultActiveKey="1" onChange={onChange}>
          <TabPane tab="基本信息设置" key="1">
            <div>
              <Form
                labelCol={{
                  span: 4,
                }}
                wrapperCol={{
                  span: 14,
                }}
                layout="horizontal"
                initialValues={{
                  size: componentSize,
                }}
                onValuesChange={onFormLayoutChange}
                size={componentSize}
              >
                <Form.Item label="计划名称">
                  <Input placeholder='请输入排课计划名称' />
                </Form.Item>
                <Form.Item label="学期">
                  <Select placeholder='请选择学期'>
                    <Select.Option value="demo">Demo</Select.Option>
                  </Select>
                </Form.Item>
                <Form.Item label="周上课天数">
                  <Input placeholder='请输入周上课数' />
                </Form.Item>
                <div>
                  <Form.Item label="上午课程数" >
                    <Input placeholder='请输入上午课程数' />
                  </Form.Item>
                  <Form.Item label="下午课程数">
                    <Input placeholder='请输入下午课程数' />
                  </Form.Item>
                  <Form.Item label="晚上课程数">
                    <Input placeholder='请输入晚上课程数' />
                  </Form.Item>
                </div>
                <Form.Item label="参排年级">
                </Form.Item>
              </Form>
            </div>
          </TabPane>
          <TabPane tab="教师课程信息设置" key="2">
            <p style={{ background: "rgb(168 161 161 / 85%)", borderLeft: '7px solid #174390' }}> 注意：1、在编辑情况下，如果基本信息中参排年级或者学期有变更，需要重新引入教学数据；在新增情况下，点击引入教学数据，将当前学期中的教学数据引入到排课功能中。
              2、在重新引入教学数据，同时也会删除之前设置的预排课和不排课信息，所以这里需要谨慎！</p>
            <Search placeholder="教师/班级/课程名称" onSearch={onSearch} enterButton />
            <React.Fragment>
              {/*表单 头部按钮 */}
              <Space
                style={{
                  marginBottom: 16,
                }}
              >
                <Button onClick={setAgeSort}>引入教学数据</Button>
              </Space>
              {/* 表单内容  */}
              <Table
                rowSelection={{
                  type: selectionType,
                  ...rowSelection,
                }}
                columns={columns} dataSource={data} />
            </React.Fragment>
          </TabPane>
        </Tabs>
      </div>
    </div>

  )
  //rules 内容区
  const cityData = {
    Zhejiang: ['选择不排课类型', '整体不排课', '教师不排课', '班级不排课', '课程部排课'],

  };
  const provinceData = ['Zhejiang', 'Jiangsu'];
  const [cities, setCities] = useState(cityData[provinceData[0]]);
  const [secondCity, setSecondCity] = useState(cityData[provinceData[0]][0]);
  const onSecondCityChange = (value) => {
    setSecondCity(value);
  };
  //rules内容
  const rules = (
    <div style={{ height: '70vh', marginTop: '30px' }}>
      <Select
        style={{
          width: 120,
        }}
        value={secondCity}
        onChange={onSecondCityChange}
      >
        {cities.map((city) => (
          <Option key={city}>{city}</Option>
        ))}
      </Select>
      {/*下面搜索框 */}
      <Search onSearch={onSearch} enterButton style={{ marginTop: '40px', marginLeft: '-120px', width: '300px' }} />
    </div>
  )
  //Arrangement内容区
  const Arrangement = (
    <div>
      <div style={{ height: '70vh', marginTop: '30px' }}>
        <Select
          style={{
            width: 120,
          }}
          value={secondCity}
          onChange={onSecondCityChange}
        >
          {cities.map((city) => (
            <Option key={city}>{city}</Option>
          ))}
        </Select>
        {/*下面搜索框 */}
        <Search onSearch={onSearch} enterButton style={{ marginTop: '40px', marginLeft: '-120px', width: '300px' }} />
      </div>
    </div>
  )
  //Automatic内容区
  const Automatic = (
    <div  style={{ height: '70vh', marginTop: '30px' }}>
      Automatic
    </div>
  )
  const done = (
    <div style={{ height: '70vh', marginTop: '30px' }}>
      完成
    </div>
  )
  const steps = [
    {
      title: '基本信息设置',
      content: information,
    },
    {
      title: '规则设置',
      content: rules,
    },
    {
      title: '预排课',
      content: Arrangement,
    },
    {
      title: '自动排课',
      content: Automatic
    },
    {
      title: '完成',
      content: done,
    },
  ];
  const [current, setCurrent] = useState(0);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  //最后一页进行跳转
  const [isModalVisible, setIsModalVisible] = useState(false);
  function but() {
    //  history.go(0) 
    setIsModalVisible(false);
  }

  return (
    <>

      <Steps current={current} size="small">
        {steps.map((item) => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>
      <div className="steps-content">{steps[current].content}</div>
      <div className="steps-action">
        {current < steps.length - 1 && (
          <Button type="primary" onClick={() => next()}>
            下一页
          </Button>
        )}

        {current === steps.length - 1 && (
          <Button type="primary" onClick={() => but()
          }>
            完成保存
          </Button>
        )}
        {current > 0 && (
          <Button
            style={{
              margin: '0 8px',
            }}
            onClick={() => prev()}
          >
            上一页
          </Button>
        )}
      </div>
    </>
  )
}
