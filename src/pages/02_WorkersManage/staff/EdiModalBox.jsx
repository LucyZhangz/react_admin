import { Button, Form, Input, Switch, Radio, Select, message, Upload } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import style from './staff.module.less'
import React, { useContext, useEffect, useRef, useState } from 'react';
import { getDepartment, editWorkers } from '../../../api/WorkersManage/staff'
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
    const fromref = useRef();
    // 下拉菜单动态渲染数据
    const DepName = []
    const [Children, setChildren] = useState([])
    async function getdepartment() {
        let res = await getDepartment();
        console.log(res.data);
        res.data.map((item) => {
            DepName.push(<Option key={item.id}>{item.name}</Option>)
        })
        setChildren(DepName);
    }
    // 用户名事件
    const [user, setUser] = useState('')

    function userNameChange(e) {
        setUser(e.target.value)
    }
    // 密码事件
    const [passwordn, setpassword] = useState('')
    function passwordChange(e) {
        setpassword(e.target.value)
    }
    // 真实姓名事件
    const [realNamen, setRealName] = useState('');
    function RealNameChange(e) {
        setRealName(e.target.value)
    }
    // 邮箱事件
    const [emailn, setEmail] = useState('')
    function EmailChange(e) {
        setEmail(e.target.value)
    }
    // 手机号事件
    const [phonen, setPhone] = useState('');
    function PhoneChange(e) {
        setPhone(e.target.value)
    }
    // 部门事件
    const [Bumenn, setBumen] = useState('');
    const [BumenId, setBumenId] = useState('')
    function handleBuMenChange(_, e) {
        setBumen(e.children)
        setBumenId(e.value)
    }

    // 选择性别事件
    const [sexn, setSex] = useState(1)
    const changeOnly = (e) => {
        setSex(e.target.value)
    };
    // 状态变化的回调函数
    let [StatusValn, setStatusVal] = useState('1')
    function swichChange(checked, event) {
        // console.log(checked, event);
        if (checked === true) {
            setStatusVal('1')
        } else {
            setStatusVal('0')
        }
    }
    // console.log(StatusValn);
    // 毕业院校事件
    const [universityn, setUniversity] = useState('');
    function universityChange(e) {
        setUniversity(e.target.value)
    }
    // 专业事件
    const [majorn, setMajor] = useState('');
    function majorChange(e) {
        setMajor(e.target.value)
    }
    // 最高学历事件
    const [educationn, setEducation] = useState(1)
    function handleChange(e) {
        setEducation(e);
    }
    // 上传文件事件
    // const [file,setFile] = useState('')
    // function ChangeFile(e){
    //   console.log(e);
    //   let FileUrl = 'http://127.0.0.1:5173/'+e.name
    //   setFile(FileUrl)
    // }
    async function editworker(data) {
        await editWorkers(data)
    }
    const onFinish = (values) => {
        console.log('@@@', values);
        // values = {
        //     id:props.hadleEditWorker.key,
        //     deptId: BumenId,
        //     username: user,
        //     password: passwordn,
        //     realName: realNamen,
        //     email: emailn,
        //     phone: phonen,
        //     deptName: Bumenn,
        //     sex: sexn,
        //     status: StatusValn,
        //     university: universityn,
        //     major: majorn,
        //     education: educationn,
        //     file: '',
        // }
        values.status = StatusValn
        values.id = props.hadleEditWorker.key
        editworker(values);
        // console.log(values);
    };
    useEffect(() => {
        fromref.current.setFieldsValue({
            username: props.hadleEditWorker.username,
            password: props.hadleEditWorker.password,
            realName: props.hadleEditWorker.realName,
            email: props.hadleEditWorker.email,
            phone: props.hadleEditWorker.phone,
            deptName: props.hadleEditWorker.deptName,
            education: props.hadleEditWorker.education,
            sex: props.hadleEditWorker.sex,
            status: '1',
            university: props.hadleEditWorker.university,
            major: props.hadleEditWorker.major,
        });
    }, [props.hadleEditWorker])
    function CloseModal() {
        props.sethandleEditModal(false);
        // location.reload()
    }
    function CannelModal() {
        props.sethandleEditModal(false)
    }
    // console.log(props.hadleEditWorker);
    useEffect(() => {
        getdepartment();
    }, [])
    return (
        <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}
            initialValues={props.hadleEditWorker}
            ref={fromref}
        >
            <Form.Item
                // name={['user', 'name']}
                label="工号"
                name='username'
            >
                <Input onChange={userNameChange} />
            </Form.Item>


            <Form.Item
                // name={['user', 'name']}
                label="密码"
                name='password'
            >
                <Input.Password onChange={passwordChange} />
            </Form.Item>


            <Form.Item
                // name={['user', 'name']}
                label="真实姓名"
                name='realName'
            >
                <Input onChange={RealNameChange} />
            </Form.Item>


            <Form.Item
                // name={['user', 'name']}
                label="邮箱"
                name='email'
            >
                <Input onChange={EmailChange} />
            </Form.Item>


            <Form.Item
                // name={['user', 'name']}
                label="手机号"
                name='phone'
            >
                <Input onChange={PhoneChange} />
            </Form.Item>


            <Form.Item
                // name={['user', 'name']}
                label="所属部门"
                name='deptName'
            >
                <Select
                    onChange={handleBuMenChange}
                >

                    {/* <option value="请选择部门">请选择部门</option> */}
                    {Children}
                </Select>
            </Form.Item>


            <Form.Item label="性别" valuePropName="checked" name='sex'>
                <Radio.Group onChange={changeOnly} value={sexn}  >
                    <Radio value={1}>男</Radio>
                    <Radio value={2}>女</Radio>
                </Radio.Group>
            </Form.Item>


            <Form.Item label="状态" valuePropName="checked" name='status'>
                <Switch className={style.SwichCheck} onChange={swichChange} />
            </Form.Item>

            <Form.Item
                // name={['user', 'name']}
                label="毕业院校"
                name='university'
            >
                <Input onChange={universityChange} />

            </Form.Item>


            <Form.Item
                // name={['user', 'name']}
                label="专业"
                name='major'
            >
                <Input onChange={majorChange} />
            </Form.Item>


            <Form.Item
                // name={['user', 'name']}
                label="最高学历"
                name='education'
            >
                <Select

                    onChange={handleChange}
                >
                    <Option value={1}>博士</Option>
                    <Option value={2}>研究生</Option>
                    <Option value={3}>本科</Option>
                    <Option value={4}>专科</Option>
                    <Option value={5}>高中</Option>
                </Select>
            </Form.Item>

            <Form.Item
                // name={['user', 'name']}
                label="上传照片"
                name='file'
            >
                <Dragger {...props} >
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