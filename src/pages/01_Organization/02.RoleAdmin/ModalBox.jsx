import { Button, Form, Input,Switch,Tree  } from 'antd';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { addRole,getMenuAll} from "../../../api/Organization/role";
import style from './roleAdmin.module.less'
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
  


  // 封装多级菜单函数（利用递归的方法）
  const [dataSource, setDataSource] = useState([]);
  async function gettreeall(){
    let res  = await getMenuAll();
    console.log(res);
    setDataSource(res.data);
  }

// 输入框事件
const [RoleName,setRoleName] = useState('')
function RoleNameChange(e){
  setRoleName(e.target.value);
}
// 备注信息Change事件
const [remarks,setRemarks] = useState('')
function remarksChange (e){
  setRemarks(e.target.value)
}
// 树形组件点击事件
const [CheckVal,setCheckVal] = useState([])
function onCheck(e){
    setCheckVal(e);
}
// console.log(CheckVal);
// 状态选择器事件
let [StatusVal, setStatusVal] = useState(true)
  function swichChange(checked, event) {
    console.log(checked, event);
    if (checked === true) {
      setStatusVal('1')
    } else {
      setStatusVal('0')
    }
  }
  // console.log(StatusVal);
  // 封装新增角色异步函数
async function addrole(data){
  await addRole(data);
}
  const onFinish = (values) => {
    values={
      description:remarks,
      id:'',
      name:RoleName,
      permissions:CheckVal,
      status:StatusVal,
    }
    // console.log(values.permissions);
    addrole(values);
  };
//   console.log(props);
  function CloseModal(){
      props.sethandleModal(false);
      // location.reload()

  }
  function CannelModal(){
    props.sethandleModal(false)
  }
  useEffect(() => {
    gettreeall()
}, [])
  return (
    <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
      <Form.Item
        // name={['user', 'name']}
        label="角色名称"
      >
        <Input placeholder='请输入角色名称' onChange={RoleNameChange} />
      </Form.Item>
      <Form.Item
        // name={['user', 'name']}
        label="备注"
      >
        <Input placeholder='请输入备注信息' onChange={remarksChange} />
      </Form.Item>
      <Form.Item label="状态" valuePropName="checked">
        <Switch className={style.SwichCheck}  onChange={swichChange} />
      </Form.Item>
      <Form.Item label='请选择权限'>
      <Tree
      checkable
      fieldNames={{key: 'id'}}
      onCheck={onCheck}
      treeData={dataSource}
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