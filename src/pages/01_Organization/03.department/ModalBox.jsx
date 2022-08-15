import { Button, Form, Input, Switch, Select } from 'antd';
import style from './department.module.less'
import React, { useContext, useEffect, useRef, useState } from 'react';
import {getDepartment,addDepartment} from '../../../api/Organization/department'

// 选择层级的下拉框
const { Option } = Select;

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
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
  // 下拉菜单动态渲染数据
  const DepName = []
  const [Children, setChildren] = useState([])
  async function getdepartment(){
    let res = await getDepartment();
    console.log(res.data);
    res.data.map((item) => {
      DepName.push(<Option key={item.id}>{item.name}</Option>)
    })
    setChildren(DepName);
 }
//  获取部门名称
const [BumenVal,setBumenVal] = useState('')
 function BumenInp(e){
    // console.log(e.target.value);
    setBumenVal(e.target.value)
 }
//  获取所属部门名称和pid
const [SuosuValue,setSuosuValue] = useState('');
const [SuosuPid,SetSuosuPid] = useState('');
 const handleChange = (_,e) => {
  console.log(e);
  setSuosuValue(e.children);
  SetSuosuPid(e.value);
};
// 获取手机号值
const [Phone,setPhone] = useState('')
function IphoneChange(e){
  setPhone(e.target.value)
}
// 获取部门经理名称
const [managerename,setmanagerename] = useState('')
function ManagereName(e){
  setmanagerename(e.target.value)
}
// 状态变化的回调函数
let [StatusVal, setStatusVal] = useState(true)
function swichChange(checked, event) {
  console.log(checked, event);
  if (checked === true) {
    setStatusVal('1')
  } else {
    setStatusVal('0')
  }
}
// 封装新增部门函数
async function adddepartment(data){
  await addDepartment(data);
}
  const onFinish = (values) => {
    values = {
      name:BumenVal,
      phone:Phone,
      pid:SuosuPid,
      pidName:SuosuValue,
      status:StatusVal,
      managerName:managerename,
      id:'',
    }
    adddepartment(values);
  };
  //   console.log(props);
  function CloseModal() {
    props.sethandleModal(false);
    // location.reload()

  }
  function CannelModal() {
    props.sethandleModal(false)
  }
  useEffect(()=>{
    getdepartment();
  },[])
  return (
    <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
      <Form.Item
        // name={['user', 'name']}
        label="部门名称"

      >
        <Input placeholder='请输入组织机构名称' onChange={BumenInp} />
      </Form.Item>
      <Form.Item
        // name={['user', 'name']}
        label="所属部门"
      >
        <Select
          defaultValue="请选择所属部门"
          onChange={handleChange}
        >
          {Children}
        </Select>
      </Form.Item>
      <Form.Item
        // name={['user', 'name']}
        label="部门经理名称"
      >
        <Input placeholder='请输入部门经理名称' onChange={ManagereName} />
      </Form.Item>
      <Form.Item
        // name={['user', 'name']}
        label="部门经理手机号"
      >
        <Input placeholder='请输入经理手机号' onChange={IphoneChange} />
      </Form.Item>
      <Form.Item label="状态" valuePropName="checked">
        <Switch  className={style.SwichCheck} defaultChecked={true} onChange={swichChange} />
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