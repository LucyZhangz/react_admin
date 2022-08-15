import { Button, Form, Input, Switch, Tree } from 'antd';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { getRoleOne, editRole, getMenuAll } from "../../../api/Organization/role";
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
    const [jurisdiction, setJurisdiction] = useState([]);
    const [treeExpandedKeys, settreeExpandedKeys] = useState([])
    const [autoExpandParent, setAutoExpandParent] = useState(true);
    const onExpand = (expandedKeysValue) => {
        settreeExpandedKeys(expandedKeysValue);
        setAutoExpandParent(false);
    };
    async function getroleone(id) {
        let resRoleOne = await getRoleOne(id);
        console.log('++++++', resRoleOne);
        let roleJuri = transformJurisdiction(resRoleOne.data.permissionRespNodes)
        let isExpanded = transformIsSpread(resRoleOne.data.permissionRespNodes)
        // console.log('@@@@', roleJuri);
        setJurisdiction(roleJuri)
        settreeExpandedKeys(isExpanded)
    }
    useEffect(() => {
        getroleone(props.RoleData.id)
    }, [props.RoleData])
    // 获取默认选中的节点id
    function transformJurisdiction(data, resArr = []) {
        data.forEach(item => {
            if (item.checked) {
                resArr.push(item.id)
            }
            // 如果有children, 需要递归处理
            if (item.children && item.children.length) {
                transformJurisdiction(item.children, resArr)
            }
        })
        return resArr
    }
    function transformIsSpread(data, resArr = []) {
        data.forEach(item => {
            if (item.spread) {
                resArr.push(String(item.id))
            }
            // 如果有children, 需要递归处理
            if (item.children && item.children.length) {
                transformIsSpread(item.children, resArr)
            }
        })
        // console.log("1111111111111111",resArr);
        return resArr
    }
    const fromref = useRef();
    // 封装多级菜单函数（利用递归的方法）
    // console.log(props.RoleData);

    const [dataSource, setDataSource] = useState([]);
    async function gettreeall() {
        let res = await getMenuAll();
        console.log(res);
        setDataSource(res.data);
    }
    // 输入框事件
    const [RoleName, setRoleName] = useState('')
    function RoleNameChange(e) {
        setRoleName(e.target.value);
    }
    // 备注信息Change事件
    const [remarks, setRemarks] = useState('')
    function remarksChange(e) {
        setRemarks(e.target.value)
    }
    // 树形组件点击事件
    const [CheckVal, setCheckVal] = useState([])
    function onCheck(e) {
        console.log(e);
        setJurisdiction(e);
        setCheckVal(e);
    }
    // console.log(CheckVal);
    // 状态选择器事件
    let [StatusVal, setStatusVal] = useState('1')
    function swichChange(checked, event) {
        // console.log(checked, event);
        if (checked === true) {
            setStatusVal('1')
        } else {
            setStatusVal('0')
        }
    }
    //   封装编辑角色异步函数
    async function editrole(data) {
        await editRole(data);
    }

    const onFinish = (values) => {
        // values = {
        //     description: remarks,
        //     id: props.RoleData.key,
        //     name: RoleName,
        //     permissions: CheckVal,
        //     status: StatusVal,
        // }
        // values.description = props.RoleData.description
        values.status = StatusVal
        values.permissions = CheckVal
        values.id = props.RoleData.key
        // values.name = props.RoleData.name
        editrole(values);
    };
    //   console.log(props);
    function CloseModal() {
        props.setEditHandleModal(false);
        // location.reload()

    }
    function CannelModal() {
        props.setEditHandleModal(false)
    }
    useEffect(() => {
        gettreeall()
    }, [])
    useEffect(() => {
        fromref.current.setFieldsValue({
            name: props.RoleData.name,
            description: props.RoleData.description,
            checked: jurisdiction,
            status:1,
        })
    }, [props.RoleData])
    return (
        <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}
            initialValues={props.hadleEditId}
            ref={fromref}
        >
            <Form.Item
                // name={['user', 'name']}
                label="角色名称"
                name='name'
            >
                <Input placeholder='请输入角色名称' onChange={RoleNameChange} />
            </Form.Item>
            <Form.Item
                // name={['user', 'name']}
                label="备注"
                name='description'
            >
                <Input placeholder='请输入备注信息' onChange={remarksChange} />
            </Form.Item>
            <Form.Item label="状态" valuePropName="checked" name='status' >
                <Switch className={style.SwichCheck} onChange={swichChange} />
            </Form.Item>
            <Form.Item label='请选择权限' name='checked'>
                <Tree
                    checkable
                    onCheck={onCheck}
                    treeData={dataSource}
                    expandedKeys={treeExpandedKeys}
                    checkedKeys={jurisdiction}
                    fieldNames={{ key: 'id' }}
                    onExpand={onExpand}
                />
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