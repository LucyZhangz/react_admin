import { Button, Form, Input, Popconfirm, Table, Tag, Pagination, Modal} from 'antd';
import React, { useContext, useEffect, useRef, useState } from 'react';
import style from './roleAdmin.module.less'
import ModalBox from './ModalBox'
import EditModalBox from './EditModalBox'
import {getRole,delRole} from '../../../api/Organization/role'
const EditableContext = React.createContext(null);
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

    const [paging,setPaging] = useState(1);
    const [pagingSize,setPagingSize] = useState(10);
    // 监听分页器并将参数存入paging和pagingSize中
    function pagingChange(page,pageSize){
        console.log(page,pageSize);
        setPaging(page)
        setPagingSize(pageSize);
    }
    // 封装调用角色接口的参数
    let pageObj = {
        limit:pagingSize,
        page:paging
    }
    // 设置参数关于分页器总条数
    const [total,setTotal] = useState(1)

    let [RoleItems,setRoleItems] =useState([])
    // 封装调用获取角色列表函数
    async function getrole(data){
        let res = await getRole(data);
        console.log(res);
        setTotal(res.total)
        setRoleItems(res.data.records)
    }
    RoleItems.map((item,idx)=>{
        item.key = item.id
    })
    // console.log(RoleItems);

    // 删除功能
   async function delrole(id){
        await delRole(id);
    }
    const handleDelete = (key) => {
        const newData = RoleItems.filter((item) => item.key !== key);
        setRoleItems(newData);
        delrole(key);
    };

    const defaultColumns = [
        {
            title: '角色名称',
            dataIndex: 'name',
            editable: true,
        },
        {
            title: '创建时间',
            dataIndex: 'createTime',
        },
        {
            title: '更新时间',
            dataIndex: 'updateTime',
        },
        {
            title: '状态',
            dataIndex: 'status',
            render: function (text, record, index) {
                let color = text ? ' #2db7f5' : '#f50'
                let font = text ? '已启用' :'禁用' 

                return <Tag color={color}>{font}</Tag>

            }
        },
        {
            title: '描述',
            dataIndex: 'description',
        },
        {
            title: '操作',
            dataIndex: 'operation',
            render: (_, record) =>
                <span >

                    <Tag color="#2db7f5" className={style.EditBtn} onClick={()=>editHandle(record)}>编辑</Tag>

                    <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)} className={style.DeleteBtn}>
                        <Tag color="#f50" className={style.DeleteBtn}  >删除</Tag>
                    </Popconfirm>
                </span>
        },
    ];
    // 新增模态框
    const [handleModal, sethandleModal] = useState(false)
    const handleAdd = () => {
        sethandleModal(true);
    };
    function handleClose(){
        sethandleModal(false);
    }
     // 编辑模态框
     const [EdithandleModal,setEditHandleModal] = useState(false);
     const [RoleData,setRoleData] = useState([])
     const editHandle = (e)=>{
        setEditHandleModal(true)
        setRoleData(e)
     }
    //  console.log(RoleData);
     function eidtHandleClose(){
        setEditHandleModal(false)
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
    // pageObj 调用ajax函数
    useEffect(()=>{
        getrole(pageObj)
    },[])
    return (
        <div>
            <Button
                onClick={handleAdd}
                type="primary"
                style={{
                    marginBottom: 16,
                }}
            >
                新增
            </Button>
            <Table
                components={components}
                rowClassName={() => 'editable-row'}
                bordered
                dataSource={RoleItems}
                columns={columns}
                pagination={false}
            />
            <Pagination size="small" total={total} showSizeChanger showQuickJumper onChange={pagingChange} />
            <Modal title="角色新增" visible={handleModal} footer={null} onCancel={handleClose}>
                <ModalBox sethandleModal={sethandleModal} />
            </Modal>
            <Modal title="角色编辑" visible={EdithandleModal} footer={null} onCancel={eidtHandleClose}>
                <EditModalBox setEditHandleModal={setEditHandleModal} RoleData={RoleData} />
            </Modal>

        </div>
    );
};

export default App;