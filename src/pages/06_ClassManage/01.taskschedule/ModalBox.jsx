import { Button, message, Steps, } from 'antd';
import { Modal } from 'antd'
import React, { useState, useRef } from 'react';
import { arrang, list, add, dlArrGrade, listByPage, update } from '../../../api/classManage/taskschedule'
import { DownOutlined } from '@ant-design/icons';
//tab1的多选按钮
import { Checkbox, Col, Row } from 'antd';
import {
  Dropdown,
  Menu,
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
import { useEffect } from 'react';
import { useWatch } from 'antd/lib/form/Form';
export default function ModalBox(props) {
  useEffect(() => {
    // if (props.newdata) {
    //   keygen()
    //   //判断有没有
    //   console.log(props);
    // }


  }, [])
  // async function keygen() {
  //   let res = await dlArrGrade(
  //     props.newdata
  //   )
  //   console.log(res);
  //   newres(res)
  //   setweekName(props.newwarr.weekDayNum)
  //   setInMorning(props.newwarr.amNum)
  //   setInAfternoon(props.newwarr.pmNum)
  //   setEvening(props.newwarr.nightNum)
  //   setFirstName(props.newwarr.arrangingName)
  // }

  const [res, newres] = useState([]);
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
  // information 表格内容区 表格头部
  const columns = [
    {
      title: '教师名称',
      dataIndex: 'teacherName',
      key: 'teacherName',
      render: text => <p>{
        text
      }</p>
    },
    {
      title: '课程名称',
      dataIndex: 'courseName',
      key: 'courseName',
      sorter: {
        compare: (a, b) => a.chinese - b.chinese,
        multiple: 3,
      },
      render: text => <p>{
        text
      }</p>
    },
    {
      title: '班级名称',
      dataIndex: 'className',
      key: 'className',
      sorter: {
        compare: (a, b) => a.math - b.math,
        multiple: 2,
      },
      render: text => <p>{
        text
      }</p>
    },
    {
      title: '教师名称',
      dataIndex: 'roomName',
      key: 'roomName',
      sorter: {
        compare: (a, b) => a.math - b.math,
        multiple: 2,
      },
      render: text => <p>{
        text
      }</p>
    },
    {
      title: '周课时(编辑)',
      key: 'courseType',
      dataIndex: 'courseType',
      sorter: {
        compare: (a, b) => a.english - b.english,
        multiple: 1,
      },
      render: text => <p>{
        text
      }</p>
    },
  ];
  // information 表格内容区的
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
  //tab1的下拉菜单的事件
  let tab = []
  props.dataSource.map((item) => {
    tab.push({ 'label': item.arranging, 'key': item.key })
  })
  //tab1的下拉菜单
  const menu = (
    <Menu
      onClick={down}
      items={tab}
    />
  );
  //定义多选框是否显现
  const [show, setshow] = useState(false)
  //tab1下拉菜单的点击事件
  async function down() {
    console.log(props.dataSource[0].termId);
    let xunlist = await list(props.dataSource[0].termId)
    setshow(true)
    console.log('@@@', res);
    if (props.newdata) {
      settitle(res.data)
    } else {
      settitle(xunlist.data)
    }
    // 筛选出来默认被选中的班级
    if (props.newdata) {
      const checkedGradeArr = res.data.filter(item => item.status == 1).map(item => item.gradeId)
      setGrade(checkedGradeArr)
      // 设置表单的默认值
      formRef.current.setFieldsValue({
        grade: checkedGradeArr
      })
    }
  }
  const [title, settitle] = useState([]);
  //获取input的框里面的值
  //排课计划名称
  const [firstName, setFirstName] = useState('');
  //一周
  const [weekName, setweekName] = useState('');
  //上午
  const [InMorning, setInMorning] = useState('');
  //下午
  const [InAfternoon, setInAfternoon] = useState('');
  //晚上
  const [Evening, setEvening] = useState('');
  //多选框
  const [Years, setYears] = useState('');
  //多选框的点击事
  function multi(key) {
    setYears(key)
  }
  const [current, setCurrent] = useState(0);
  const prev = () => {
    setCurrent(current - 1);
  };
  //最后一页进行跳转
  // const [isModalVisible, setIsModalVisible] = useState(false);
  //点击第一个下一页发送axios新增请求
  const next = async () => {
      console.log(InMorning,InAfternoon, weekName,Evening);
    if (current == 0&&weekName<7&&InMorning<=4&&InAfternoon<=4&&Evening<=3) {
      let a = await add({
        amNum: InMorning,
        arrangingName: firstName,
        gradeId: Years,
        id: '',
        nightNum: Evening,
        pmNum: InAfternoon,
        weekDayNum: weekName,
        termId: props.dataSource[0].termId
      })
      message.success({
        content: '添加成功',
        className: 'custom-class',
        style: {
          marginTop: '20vh',
        },
      });
      if (current == 0 && props.newdata) {
        let inputRef = await update({
          amNum: InMorning,
          arrangingName: firstName,
          gradeIds: [],
          id: props.newwarr.id,
          nightNum: Evening,
          pmNum: InAfternoon,
          termId: props.newwarr.termId,
          weekDayNum: weekName,
        })
        //获取表格内容
        let inputlist = await listByPage({
          arrId: props.newdata.arrid,
          courseName: '',
          limit: limit,
          page: page,
        })
        console.log(inputlist);
        settotal(inputlist.data.total)
        setanfin(inputlist.data.records)
        console.log(
          inputlist.data.total
        );
      }
    }else{
      message.info('一周最多7天 上午最大4节课 下午最大4节课 晚上最多3节课 检测输入不符合要求，请重新输入');
    }
    setCurrent(current + 1);

    if (current == 2) {
      // props.sethandleModal(false)
      props.handleClose()
    }

  };
  //分页内容
  //表格数据
  const [anfin, setanfin] = useState('')
  const [limit, setLimit] = useState(10)
  const [page, setpage] = useState(1)
  const [total, settotal] = useState('')
  const onEscCan = async (page, limit) => {
    console.log(page, limit);
    setLimit(limit)
    setpage(page)
    //获取列表内容
    let anfin = await listByPage({
      arrId: props.newdata.arrid,
      courseName: '',
      limit: limit,
      page: page,
    })
    console.log(anfin);
    setanfin(anfin.data.records)
  };
  // 获取默认选中的班级
  const [grade, setGrade] = useState([])
  const formRef = useRef();
  const information = (
    <div>
      <div>
        <Tabs defaultActiveKey="1" onChange={onChange}>
          <TabPane tab="基本信息设置" key="1">
            <div>
              <Form
                name="basic"
                preserve={false}
                ref={formRef}
                labelCol={{
                  span: 4,
                }}
                wrapperCol={{
                  span: 14,
                }}
                layout="horizontal"
                initialValues={{
                  size: componentSize,
                  grade: props.newdata ? grade : ''

                }}
                onValuesChange={onFormLayoutChange}
                size={componentSize}
              >
                <Form.Item label="计划名称"
                  name="user"
                  rules={[
                    {
                      required: true,
                      message: '请输入内容',
                    },
                  ]}
                >
                  <Input placeholder='请输入排课计划名称' onChange={event => setFirstName(event.target.value)}

                    value={firstName} />
                </Form.Item>
                <Form.Item label="学期"

                >
                  <Dropdown overlay={menu}>
                    <Button>
                      <Space>
                        请选择学期
                        <DownOutlined />
                      </Space>
                    </Button>
                  </Dropdown>
                </Form.Item>
                {/* placeholder='请输入周上课数'  */}
                <Form.Item label="周上课天数"
                  name="week"
                  rules={[
                    {
                      required: true,
                      max: 1,
                      pattern: new RegExp(/^[1-9]\d*$/, "g"),
                      message: '只能输入数字or不能大于3',
                    },{
                      max: 1,
                      message: '不能大于7',
                    },
                  ]}
                >
                  <Input
                    value={weekName}
                    onChange={event => setweekName(event.target.value)}
                  />
                </Form.Item>
                <div>
                  <Form.Item label="上午课程数"
                    name='morning'
                    rules={[
                      { 
                        required: true,
                        pattern: new RegExp(/^[1-9]\d*$/, "g"),
                        message: '只能输入数字'
                      },
                      {
                        max: 1,
                        message: '不能大于4',
                      }
                    ]} >
                    <Input placeholder='请输入上午课程数'
                      onChange={event => setInMorning(event.target.value)}
                      value={InMorning} />
                  </Form.Item>
                  <Form.Item label="下午课程数"
                    name='afternoon'
                    rules={[
                      {
                        required: true,
                        max: 1,
                        pattern: new RegExp(/^[1-9]\d*$/, "g"),
                        message: '只能输入数字or不能大于4',
                      },{
                        max: 1,
                        message: '不能大于4',
                      },{
                      }
                    
                    ]}>
                    <Input placeholder='请输入下午课程数'
                      onChange={event => setInAfternoon(event.target.value)}
                      value={InAfternoon} />
                  </Form.Item>
                  <Form.Item label="晚上课程数"
                    name='evening'
                    rules={[
                      {
                        required: true,
                        max: 1,
                        pattern: new RegExp(/^[1-9]\d*$/, "g"),
                        message: '只能输入数字or不能大于3',
                      },{
                        max: 1,
                        message: '不能大于4',
                      },
                     
                    ]}>
                    <Input placeholder='请输入晚上课程数'
                      onChange={event => setEvening(event.target.value)}
                      value={Evening} />
                  </Form.Item>
                </div>
                <Form.Item label="参排年级" name='grade'
                  
                  rules={[
                    {
                     
                      required: true,
                      message: '请输入内容',
                    },
                  ]} >
                  <Checkbox.Group
                    style={{
                      width: '100%',
                      display: show ? 'block' : 'none'
                    }}
                    onChange={multi}
                  >
                    <Row >
                      {title.map((item, index) => {
                        return <Col span={8} key={index}
                        >
                          <Checkbox
                            value={item.gradeId}
                          >{item.gradeName}</Checkbox>
                        </Col>
                      })
                      }
                    </Row>
                  </Checkbox.Group>
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
                scroll={{ y: 440 }}
                rowSelection={{
                  type: selectionType,
                  ...rowSelection,
                }}
                pagination={false}
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
      <Table
        scroll={{ y: 280 }}
        pagination={false}
        rowSelection={{
          type: selectionType,
          ...rowSelection,
        }}
        columns={columns} dataSource={anfin} />
      {/* 分页器 */}
      <Pagination
        onChange={onEscCan}
        total={total}
        showSizeChanger
        showQuickJumper
        showTotal={(total) => `Total ${total} items`}
      />
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
        <Table
          rowSelection={{
            type: selectionType,
            ...rowSelection,
          }}
          columns={columns} dataSource={data} />
      </div>
    </div>
  )
  //Automatic内容区
  const Automatic = (
    <div style={{ height: '70vh', marginTop: '30px' }}>
      <Table
        rowSelection={{
          type: selectionType,
          ...rowSelection,
        }}
        columns={columns} dataSource={data} />
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

  return (
    <>
      <Steps current={current} size="small">
        {steps.map((item) => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>
      <div className="steps-content">{steps[current].content}</div>
      <div className="steps-action">
        {current < steps.length - 2 && (
          <Button type="primary" onClick={() => next()}>
            下一页
          </Button>
        )}
        {current === steps.length - 2 && (
          <Button type="primary" >
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
