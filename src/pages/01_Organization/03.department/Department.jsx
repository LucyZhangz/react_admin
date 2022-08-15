import { Button, Form, Input, Popconfirm, Table, Tag, Pagination, Modal} from 'antd';
import React, { useContext, useEffect, useRef, useState } from 'react';
import style from './department.module.less'
import ModalBox from './ModalBox'
import ModalEditBox from './EditModalBox'
import {getDepartment,delDepartment} from '../../../api/Organization/department'
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

    const [dataSource, setDataSource] = useState([]);
    const [count, setCount] = useState(2);
    async function getdepartment(){
        let res = await getDepartment();
        setDataSource(res.data)
     }
     dataSource.map((item,idx)=>{
        item.key = item.id
    })
    // delDepartment 删除功能
    async function deldepartment(id){
        await delDepartment (id)
    }
    const handleDelete = (key) => {
        const newData = dataSource.filter((item) => item.key !== key);
        setDataSource(newData);
        deldepartment(key)

    };
    //编辑功能
    const [handleEdit, sethandleEdit] = useState(false)
    const [DepartmentData,setDepartmentData] = useState({})
    function handleedit(e){
        // console.log(e);
        sethandleEdit(true)
        setDepartmentData(e)
    }
    // console.log(DepartmentData);
    function handleEditClose(){
        sethandleEdit(false)
    }
    const defaultColumns = [
        {
            title: '部门编码',
            dataIndex: 'relationCode',
            editable: true,
        },
        {
            title: '部门名称',
            dataIndex: 'name',
            editable: true,
        },
        {
            title: '上级部门名称',
            dataIndex: 'pidName',
        },
        {
            title: '层级关系编码',
            dataIndex: 'relationCode',
        },
        {
            title: '部门经理',
            dataIndex: 'managerName',
        },
        {
            title: '部门经理联系方式',
            dataIndex: 'phone',
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
            title: '操作',
            dataIndex: 'operation',
            render: (_, record) =>
                <span >

                    <Tag color="#2db7f5" className={style.EditBtn} onClick={() => handleedit(record)}>编辑</Tag>

                    <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)} className={style.DeleteBtn}>
                        <Tag color="#f50" className={style.DeleteBtn}>删除</Tag>
                    </Popconfirm>
                </span>
        },
    ];
    const [handleModal, sethandleModal] = useState(false)
    const handleAdd = () => {
        sethandleModal(true);
    };
    
    function handleClose(){
        sethandleModal(false);
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
    useEffect(()=>{
        getdepartment();
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
                dataSource={dataSource}
                columns={columns}
                pagination={false}
            />
            <Pagination size="small" total={1} showSizeChanger showQuickJumper />

            <Modal title="新增部门" visible={handleModal} footer={null} onCancel={handleClose}>
                <ModalBox sethandleModal={sethandleModal}  />
            </Modal>
                {/* ModalEditBox */}
            <Modal title="编辑角色" visible={handleEdit} footer={null} onCancel={handleEditClose}>
                <ModalEditBox sethandleEdit={sethandleEdit} DepartmentData={DepartmentData} />
            </Modal>
        </div>
    );
};

export default App;