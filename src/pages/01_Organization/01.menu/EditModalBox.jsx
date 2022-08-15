import { Button, Form, Input, Switch, Tree, Radio, Select } from 'antd';
import style from './menu.module.less'
import React, { useState, useEffect, useRef } from 'react';
import { getMenu,editMenu } from '../../../api/Organization/menu';
import { set } from 'nprogress';
const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};
const { Option } = Select;


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
    const fromref = useRef();
    
    // 调用函数渲染其所属菜单
    const MenuName = []
    const [Children, setChildren] = useState([])
    const getmenu = async () => {
        let res = await getMenu();
        // console.log(res.data[0].children);
        res.data[0].children.map((item) => {
            MenuName.push(<Option key={item.id}>{item.title}</Option>)
        })
        setChildren(MenuName);
    }

    //单选框里的值
    const [value, setValue] = useState(2);
    // 选择目录出现的表单
    const [TopMenu, setTopMenu] = useState(true);
    let menuDisplay = TopMenu ? 'block' : 'none';
    // 选择菜单出现的表单
    const [secondChange, setSecondChange] = useState(false)
    let secondMenu = secondChange ? "block" : 'none'
    // 选择按钮出现的表单
    const [btnChange, setBtnChange] = useState(false)
    let thirdMenu = btnChange ? 'block' : 'none'
    const onChange = (e) => {
        console.log(e.target.value);
        setValue(e.target.value);
        if (e.target.value === 1) {
            setTopMenu(true);
        } else {
            setTopMenu(false)
        }
        if (e.target.value === 2) {
            setSecondChange(true);
        } else {
            setSecondChange(false)
        }
        if (e.target.value === 3) {
            setBtnChange(true);
        } else {
            setBtnChange(false)
        }
    };
    const isShow = (e) => {
        setValue(e);
        if (e === 1) {
            setTopMenu(true);
        } else {
            setTopMenu(false)
        }
        if (e === 2) {
            setSecondChange(true);
        } else {
            setSecondChange(false)
        }
        if (e === 3) {
            setBtnChange(true);
        } else {
            setBtnChange(false)
        }
    };
    // console.log(props.hadleEditId);
    // 菜单名称的change事件
    const [MenuNameVal, setMenuNameVal] = useState('')
    function MenuNameInput(e) {
        // console.log(e.target.value);
        setMenuNameVal(e.target.value)
    }
    function NameVal(e){
        setMenuNameVal(e)
    }
    // 目录下面的icon图标值
    const [FirstIconInputVal, setFirstIconInputVal] = useState('')
    function FirstIconInput(e) {
        setFirstIconInputVal(e.target.value)
    }
    function FirstIcon(e) {
        setFirstIconInputVal(e)
    }
    // 菜单下面的icon图标值
    const [SecondIconInputVal, setSecondIconInputVal] = useState('')
    function SecondIconInput(e) {
        setSecondIconInputVal(e.target.value)
    }
    function SecondIcon(e) {
        setSecondIconInputVal(e)
    }
    // 菜单下的url值
    const [SecondUrlVal, setSecondUrlVal] = useState('')
    function SecondUrlInp(e) {
        setSecondUrlVal(e.target.value)
        console.log(e.target.value);
    }
    function SecondUrl(e) {
        setSecondUrlVal(e)
    }
    // 按钮下的url值
    const [ThirdUrlVal, setThirdUrlVal] = useState('')
    function ThirdUrl(e) {
        setThirdUrlVal(e.target.value)
    }
    function DefaultThirdUrl(e) {
        setThirdUrlVal(e)
    }
    // Target的change事件
    const [targeValue, setTargeValue] = useState(1);
    const [target, settarget] = useState('')
    function onTargeChange(e) {
        console.log(e.target.value);
        setTargeValue(e.target.value)
        if (e.target.value == 1) {
            settarget("_self")
        } else if (e.target.value == 2) {
            settarget("_blank")
        }
    }
    // console.log(target);
    // 所属菜单下拉框的点击事件
    const [upperMenu, setUpperMenu] = useState();
    const [OptionPid, setOptionPid] = useState(0)
    const handleChange = (_, event) => {
        console.log(event);
        setUpperMenu(event.children)
        setOptionPid(event.key)
    };
    // 授权标识值
    const [Authorization, setAuthorization] = useState()
    function AuthorizationId(e) {
        setAuthorization(e.target.value)
    }
    //获取排序码的值
    let [SortCodeVal, setSortCodeVal] = useState('')
    function SortCode(e) {
        setSortCodeVal(e.target.value)
    }
    function DeSortCode(e) {
        setSortCodeVal(e)
    }


    // 状态变化的回调函数
    let [StatusVal, setStatusVal] = useState(true)
    function swichChange(checked, event) {
        console.log(checked);
        if (checked === true) {
            setStatusVal('1')
        } else {
            setStatusVal('0')
        }
    }
    // 调用编辑Ajax
    async function EditMenu(data){
        await editMenu(data)
    }
    const onFinish = (values) => {
        values = {
            name: MenuNameVal,
            pidname: upperMenu,
            orderNum: SortCodeVal,
            status: StatusVal,
            pid: props.hadleEditId.pid,
            id:props.hadleEditId.id,
        }
        values.status = 1
        // values.id = props.hadleEditId.id
        // values.pid =props.hadleEditId.pid
        if (value === 1) {
            values.icon = FirstIconInputVal;
            values.type = String(value)
        } else if (value === 2) {
            values.icon = SecondIconInputVal;
            values.url = SecondUrlVal;
            values.target = target
            values.type = String(value)
            values.pid = OptionPid
        } else if (value === 3) {
            values.url = ThirdUrlVal
            values.perms = Authorization
            values.type = String(value)
            values.pid = OptionPid
        }
        EditMenu(values);
    };

    useEffect(() => {
        getmenu();
    }, [])

    useEffect(() => {
        fromref.current.setFieldsValue({
            type: props.hadleEditId.type,
            title:props.hadleEditId.title,
            icon:props.hadleEditId.icon,
            url:props.hadleEditId.url,
            orderNum:props.hadleEditId.orderNum,
            pidName:props.hadleEditId.name,
            status:1,
        });
        isShow(props.hadleEditId.type)
        NameVal(props.hadleEditId.title);
        FirstIcon(props.hadleEditId.icon);
        SecondIcon(props.hadleEditId.icon)
        SecondUrl(props.hadleEditId.url);
        DefaultThirdUrl(props.hadleEditId.url);
        DeSortCode(props.hadleEditId.orderNum)
    }, [props.hadleEditId])

    //  确定和取消事件
    function CloseModal() {
        props.sethandleEditModal(false);
        // location.reload()
    }
    function CannelModal() {
        props.sethandleEditModal(false)
    }
    console.log(props.hadleEditId);
    return (
        <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}
            initialValues={props.hadleEditId}
            ref={fromref}
        >
            <Form.Item
                // name={['user', 'name']}
                label="类型"
                name='type'
            >
                <Radio.Group onChange={onChange} value={value}>
                    <Radio value={1}>目录</Radio>
                    <Radio value={2}>菜单</Radio>
                    <Radio value={3}>按钮</Radio>
                </Radio.Group>
            </Form.Item>
            <Form.Item
                // name={['user', 'name']}
                label="菜单名称"
                name='title'
            >
                <Input placeholder='请输入菜单名称' onChange={MenuNameInput} />
            </Form.Item>
            <Form.Item
                // name={['user', 'name']}
                label="所属菜单"
                name='pidName'
            >   
                <Select
                    onChange={handleChange}
                >
                    {Children}
                </Select>
            </Form.Item>
            {/* 目录的新增表单 */}
            <div style={{ display: menuDisplay }}>
                <Form.Item
                    // name={['user', 'name']}
                    label="图标"
                    name='icon'
                >
                    <Input onChange={FirstIconInput} />

                </Form.Item>
            </div>
            {/* 菜单的新增表单 */}
            <div style={{ display: secondMenu }}>
                <Form.Item
                    // name={['user', 'name']}
                    label="窗口URL"
                    name='url'

                >
                    <Input placeholder='请输入接口URL' onChange={SecondUrlInp} />
                </Form.Item>
                <Form.Item
                    // name={['user', 'name']}
                    label="图标"
                    name='icon'
                >
                    <Input onChange={SecondIconInput} />

                </Form.Item>

                <Form.Item
                    // name={['user', 'name']}
                    label="Target"
                    name="target"
                >
                    <Radio.Group onChange={onTargeChange} value={targeValue} defaultValue={1}>
                        <Radio value={1}>_self</Radio>
                        <Radio value={2}>_blank</Radio>
                    </Radio.Group>
                </Form.Item>

            </div>
            {/* 按钮的新增表单 */}
            <div style={{ display: thirdMenu }}>
                <Form.Item
                    // name={['user', 'name']}
                    label="窗口URL"
                    name='url'
                >
                    <Input placeholder='请输入接口URL' onChange={ThirdUrl} />
                </Form.Item>
                <Form.Item
                    // name={['user', 'name']}
                    label="授权标识"
                >
                    <Input onChange={AuthorizationId} />

                </Form.Item>


            </div>

            <Form.Item
                // name={['user', 'name']}
                label="排序码"
                name='orderNum'
            >
                <Input placeholder='请输入排序码' onChange={SortCode} />
            </Form.Item>

            <Form.Item label="状态" valuePropName="checked" name='status'>
                <Switch className={style.SwichCheck} onChange={swichChange}/>
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


