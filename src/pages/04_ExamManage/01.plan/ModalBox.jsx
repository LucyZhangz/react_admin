import { Steps, Input, Button, message, Modal, DatePicker, Space, Select, Menu, Typography,TimePicker } from 'antd';
import { ExclamationCircleOutlined, DownOutlined, UserOutlined, } from '@ant-design/icons';
import React, { useState } from 'react';
import { useEffect } from 'react'
import { addExamlist, getTermlist } from '../../../api/examManage/plan'
const { Step } = Steps;
const { confirm } = Modal;
import moment from 'moment';
const { RangePicker } = DatePicker;
const { TextArea } = Input;
// const [isModalVisible, setIsModalVisible] = useState(false);
const ModalBox = () => {
  const [class1, setclass1] = useState([]);
  const [type, setType] = useState('time');
  // 调用新增接口
  useEffect(() => {
    additem()
    // getTermtype(data)
  }, [])
  // 通过教育阶段来获取年级信息
  const handleChange = (value) => {
    console.log(value);
    getTermtype({ type: value })
  };
  async function getTermtype(data) {
    let res = await getTermlist(data)
    console.log(res);
    console.log(res.data);
    const result = res.data;
    result.map(item => {
      console.log(item.gradeName);
      setclass1(result)
    })
    return res;
  }
  // 获取新增考试信息
  async function additem() {
    let res = await addExamlist({
      "classIds": [],
      "classType": 0,
      "courseIds": [],
      "createId": "",
      "createIds": [],
      "createTime": "",
      "deleted": 0,
      "examDesc": "",
      "examType": 0,
      "gradeId": "",
      "id": "",
      "invigilatorNum": 0,
      "limit": 0,
      "name": "",
      "page": 0,
      "resultInputStatus": 0,
      "status": 0,
      "termId": "",
      "termName": "",
      "timeEnd": "",
      "timeStart": "",
      "updateId": "",
      "updateTime": ""
    })
    console.log(res);
  }

  const [current, setCurrent] = useState(0);
  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };
  // 时间修改
  const onChange = (dates, dateStrings) => {
    if (dates) {
      console.log('From: ', dates[0], ', to: ', dates[1]);
      console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);
    } else {
      console.log('Clear');
    }
  };
  // 基本信息设置
  const Basicmsg=(
    <>
     计划标题 <Input placeholder="请输入考试计划标题" style={{ width: '300px', marginBottom: '15px',marginTop:'15px' }} />
      <br />
      考试时间 <Space direction="vertical" size={12}>
        <RangePicker
          ranges={{
            Today: [moment(), moment()],
            // '清空': <Button size='small'  onClick={handClear} style={{ marginRight: '40px' }}>清空</Button>,
          }}
          showTime
          allowClear
          format="YYYY/MM/DD HH:mm:ss"
          onChange={onChange}
        />

      </Space>
      <br />
      学期  <Space wrap style={{ marginTop: '20px', marginRight: '20px' }}>
        <Select
          style={{
            width: 120,
          }}
          onChange={handleChange}
        >
          <Option value="请选择学期">请选择学期</Option>
          <Option value="2020-2021年第二学期">2020-2021年第二学期</Option>
        </Select>
      </Space>
      监考人数：<Input placeholder="请输入监考教师人数" style={{ width: '150px', marginBottom: '20px' }} />
      <br />
      参考年级 <Select
        style={{
          width: 120,
          marginRight: '20px'
        }}
        onChange={handleChange}
      >
        <Option value="请选择教育阶段">请选择教育阶段</Option>
        <Option value="1">小学</Option>
        <Option value="2">初中</Option>
      </Select>

      <Select
        style={{
          width: 120,
          marginRight: '20px'
        }}
        onChange={handleChange}
      >{class1.map(item => {
        console.log(item.gradeName);
        return <Option value={item.gradeName} key={item.id}></Option>
      })}
      </Select>
      考试类型 <Select
        style={{
          width: 120,
        }}
        onChange={handleChange}
      >
        <Option value="请选择">请选择</Option>
        <Option value="小学">期中考试</Option>
        <Option value="初中">期末考试</Option>
        <Option value="小学">月考</Option>
        <Option value="初中">周考</Option>
      </Select>
      <br />
      考试描述 <TextArea rows={3} placeholder="请输入考试描述" style={{ marginLeft: '10px', display: 'inlineBlock' }} />
      <br />
    </>
  )
  // 参考班级设置
  const Setclass=(
    <div>
      
    </div>
  )
  // 定义步骤条
  const steps = [
    {
      title: '基本信息设置',
      content: Basicmsg
    },
    {
      title: '参考班级设置',
      content: Setclass
    },
    {
      title: '参考课程设置',
      content: '参考课程设置内容',
    },
    {
      title: '考场设置',
      content: '考场设置内容',
    },
    {
      title: '参考老师设置',
      content: '参考老师设置内容',
    },
    {
      title: '考场监考设置',
      content: '考场监考设置内容',
  
    },
    {
      title: '完成',
      content: '完成页面内容',
    },
  ];
  return (
    <>
      <Steps current={current}>
        {steps.map((item) => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>
      <div className="steps-content">{steps[current].content}</div>
      <div className="steps-action" style={{marginTop:'20px'}}>
        {current < 1 && (
          <Button size='middle' style={{ marginRight: '10px' }}>返回</Button>
        )}
        {current < steps.length - 1 && (
          <Button type="primary" onClick={() => next()}>
            保存并下一步
          </Button>
        )}
        {current === steps.length - 1 && (
          <span>
            <Button size='middle' style={{ marginRight: '10px' }}>保存</Button>
            <Button type="primary" onClick=
              {showConfirm}
            >
              确认发布
            </Button>
          </span>
        )}
        {current > 0 && (
          <span>
            <Button
              style={{
                marginLeft: '10px',
                marginTop: '10px'
              }}
              onClick={() => prev()}
            >
              上一步
            </Button>
          </span>

        )}
      </div>
      <br/>

    </>
  )
}

export default ModalBox;