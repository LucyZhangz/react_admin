import { Button, Form, Input, Popconfirm, Table, Tag, Pagination, Modal, Tree, Select, Card } from 'antd';
import React, { useContext, useEffect, useRef, useState } from 'react';
import style from './staff.module.less'
import ModalBox from './ModalBox'
import EditModaBox from './EdiModalBox'
import RoleModalBox from './RoleModalBox';
import { CarryOutOutlined, FormOutlined } from '@ant-design/icons';
import { getDepartment, getUsers,delWorkers} from '../../../api/WorkersManage/staff'
const EditableContext = React.createContext(null);
const { Option } = Select;
// 下拉框搜索事件
const handleChange = (value) => {
    console.log(`selected ${value}`);
};
const EditableRow = ({ index, ...props }) => {
    const [form] = Form.useForm();
    return (
        <Form form={form} component={false}>
            <EditableContext.Provider value={form}>
                <tr {...props} />
            </EditableContext.Provider>
        </Form>
    );
};
const showTotal = (total) => `Total ${total} items`;
const EditableCell = ({
    title,
    editable,
    children,
    dataIndex,
    record,
    handleSave,
    ...restProps
}) => {
    const [editing, setEditing] = useState(false);
    const inputRef = useRef(null);
    const form = useContext(EditableContext);
    useEffect(() => {
        if (editing) {
            inputRef.current.focus();
        }
    }, [editing]);

    const toggleEdit = () => {
        setEditing(!editing);
        form.setFieldsValue({
            [dataIndex]: record[dataIndex],
        });
    };

    const save = async () => {
        try {
            const values = await form.validateFields();
            toggleEdit();
            handleSave({ ...record, ...values });
        } catch (errInfo) {
            console.log('Save failed:', errInfo);
        }
    };

    let childNode = children;

    if (editable) {
        childNode = editing ? (
            <Form.Item
                style={{
                    margin: 0,
                }}
                name={dataIndex}
                rules={[
                    {
                        required: true,
                        message: `${title} is required.`,
                    },
                ]}
            >
                <Input ref={inputRef} onPressEnter={save} onBlur={save} />
            </Form.Item>
        ) : (
            <div
                className="editable-cell-value-wrap"
                style={{
                    paddingRight: 24,
                }}
                onClick={toggleEdit}
            >
                {children}
            </div>
        );
    }

    return <td {...restProps}>{childNode}</td>;
};
const App = () => {
    // 获取树形控件数据
    const [treeMenu, setTreeMenu] = useState([])
    async function getdepartment() {
        let res = await getDepartment();
        // console.log(res);
        let resMenu = transformMenu(res.data)
        setTreeMenu(resMenu)
    }
    // console.log(treeMenu);

    function transformMenu(data) {
        const res = data.map((item) => {
            const obj = {
                title: item.name,
                key: item.id,
                deptNo:item.deptNo,
            }
            if (item.children && item.children.length) {
                obj.children = transformMenu(item.children)
            }
            return obj
        })
        return res
    }

    // 设置页面分页器
    // 获取页面分页器函数
    const [paging, setPaging] = useState(1);
    const [pagingSize, setPagingSize] = useState(10);
        // 封装调用角色接口的参数
        let pageObj = {
            limit: pagingSize,
            page: paging
        }
    // 监听分页器并将参数存入paging和pagingSize中
    function pagingChange(page, pageSize) {
        // console.log(page,pageSize);
        setPaging(page)
        setPagingSize(pageSize);
        getuser(pageObj);
    }



    const [dataSource, setDataSource] = useState([]);
    // 设置分页器总条数
    const [total, setTotal] = useState(0)
    // 获取用户数据
    async function getuser(data) {
        let res = await getUsers(data)
        console.log(res);
        let resMenu = transformUsers(res.data.records);
        setDataSource(resMenu);
        setTotal(res.data.total)
    }

    function transformUsers(data) {
        const res = data.map((item) => {
            const obj = {
                username: item.username,
                key: item.id,
                phone: item.phone,
                deptName: item.deptName,
                realName: item.realName,
                roleIds: item.roleIds,
                email: item.email,
                sex: item.sex,
                status: item.status,
                major:item.major,
                deptId:item.deptId,
                education:item.education,
                password:item.password,
                university:item.university
            }
            if (item.children && item.children.length) {
                obj.children = transformUsers(item.children)
            }
            return obj
        })
        return res
    }
    // 封装Ajax删除接口
    async function delworkers(data){
        await delWorkers(data);
    }
    // 删除职工事件
    const handleDelete = (key) => {
        const newData = dataSource.filter((item) => item.key !== key);
        setDataSource(newData);
        delworkers([key])
    };
    // 树形结构控制表单
    function onSelect(_,e){
        let objSelect = {
            deptNo:e.node.deptNo,
            endTime:null,
            limit:10,
            page:1,
            status:'',
            startTime:null,
            username:'',
        }
        getuser(objSelect);
        console.log(e);
    }
    // 查询功能
const [searchVal,setSearchVal] = useState('');
  function  SearchInput(e){
        setSearchVal(e.target.value);
  }
 function SearchUserName(){
    let objSearch = {
        deptNo:null,
        endTime:null,
        limit:10,
        page:1,
        status:'',
        startTime:null,
        username:searchVal,
    }
    getuser(objSearch)
 }
    const defaultColumns = [
        {
            title: '账号',
            width: 100,
            dataIndex: 'username',
            fixed: 'left',
        },
        {
            title: '手机号',
            width: 100,
            dataIndex: 'phone',
            fixed: 'left',
        },
        {
            title: '所属部门',
            dataIndex: 'deptName',
            width: 150,
        },
        {
            title: '真实姓名',
            dataIndex: 'realName',
            width: 150,
        },
        {
            title: '角色',
            dataIndex: 'roleIds',
            width: 150,
            render: function (text) {
                // console.log(text);
                return (
                    <>
                        {
                            text.map((item, idx) => {
                                return <Tag color='green' key={idx} >{item}</Tag>
                            })
                        }
                    </>
                )
            }
        },
        {
            title: '邮箱',
            dataIndex: 'email',
            width: 150,
        },
        {
            title: '性别',
            dataIndex: 'sex',
            width: 150,
            render: function (text, record, index) {
                let color = text === 1 ? ' #2db7f5' : 'orange'
                let font = text === 1 ? '男' : '女'

                return <Tag color={color}>{font}</Tag>

            }
        },
        {
            title: '状态',
            dataIndex: 'status',
            width: 150,
            render: function (text, record, index) {
                let color = text ? ' #2db7f5' : '#f50'
                let font = text ? '已启用' : '禁用'

                return <Tag color={color}>{font}</Tag>

            }
        },
        {
            title: 'operation',
            dataIndex: 'operation',
            fixed: 'right',
            render: (_, record) =>
                <span style={{display:'flex',}}>
                    <Tag color="#2db7f5" className={style.EditBtn} onClick={()=>{handleEdit(record)}}>编辑</Tag>
                    <Tag color="#87d068" style={{cursor:'pointer'}} onClick={()=>{handleRole(record)}}>赋予角色</Tag>
                    <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)} className={style.DeleteBtn}>
                        <Tag color="#f50" className={style.DeleteBtn}>删除</Tag>
                    </Popconfirm>
                </span>
        },
    ];
    const data = [];
    for (let i = 0; i < 100; i++) {
        data.push({
            key: i,
            name: `Edrward ${i}`,
            age: 32,
            address: `London Park no. ${i}`,
        });
    }
    const [handleModal, sethandleModal] = useState(false)
    const handleAdd = () => {
        sethandleModal(true);
    };

    // 编辑事件
    // 编辑事件
        const [handleEditModal, sethandleEditModal] = useState(false)
        // 获取当前行的对象
        const [hadleEditWorker,sethadleEditWorker] = useState(undefined)
        function handleEdit(e) {
            sethandleEditModal(true)
            // console.log(e);
            sethadleEditWorker(e)
        }
        //  让编辑模态框默认保持关闭
        function handleEditClose() {
            sethandleEditModal(false)
        }
    function handleClose() {
        sethandleModal(false);
    }
    // 让赋予角色模态框保持关闭
    const [handleRoleModal,sethandleRoleModal] = useState(false)
    const [sonVal,setSonVal] = useState()
    function handleRole(e){
        setSonVal(e);
        sethandleRoleModal(true)
    }
    function handleRoleClose(){
        sethandleRoleModal(false)
    }
    const handleSave = (row) => {
        const newData = [...dataSource];
        const index = newData.findIndex((item) => row.key === item.key);
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        setDataSource(newData);
    };

    const components = {
        body: {
            row: EditableRow,
            cell: EditableCell,
        },
    };
    const columns = defaultColumns.map((col) => {
        if (!col.editable) {
            return col;
        }

        return {
            ...col,
            onCell: (record) => ({
                record,
                editable: col.editable,
                dataIndex: col.dataIndex,
                title: col.title,
                handleSave,
            }),
        };
    });
    useEffect(() => {
        getdepartment();
        getuser(pageObj);
    }, [])
    return (
        <div className={style.MenuBox}>
            <div className={style.Tree}>
                <Tree
                    showLine={true}
                    onSelect={onSelect}
                    treeData={treeMenu}
                />
            </div>
            <div className={style.MenuTable}>
                <div style={{width:'100%',height:'50px'}}>
                <Input placeholder="查询账号" style={{width:'200px'}} onChange={SearchInput} />
                <Button type="primary" onClick={SearchUserName} >查询</Button>
                </div>
                <Button
                    onClick={handleAdd}
                    type="primary"
                    style={{
                        marginBottom: 16,
                        position: 'relative',
                        top: '10px',
                        height: "25px",
                        fontSize: '12px',
                        textAlign: 'center'
                    }}
                >
                    新增
                </Button>
                <Card style={{ width: 1000 }}>
                    <Table
                        columns={columns}
                        dataSource={dataSource}
                        scroll={{
                            x: 1280,
                            y: 300,
                        }}
                        pagination={false}
                    />
                </Card>

                <Pagination size="small" total={total} showSizeChanger showQuickJumper onChange={pagingChange} />
            </div>


            <Modal title="职工新增" visible={handleModal} footer={null} onCancel={handleClose}>
                <ModalBox sethandleModal={sethandleModal} />
            </Modal>
            <Modal title="职工编辑" visible={handleEditModal} footer={null} onCancel={handleEditClose}>
                <EditModaBox sethandleEditModal={sethandleEditModal} hadleEditWorker={hadleEditWorker} />
            </Modal>
            {/* RoleModalBox */}
            <Modal title="赋予角色" visible={handleRoleModal} footer={null} onCancel={handleRoleClose}>
                <RoleModalBox sethandleRoleModal={sethandleRoleModal} sonVal={sonVal} />
            </Modal>
        </div>
    );
};

export default App;