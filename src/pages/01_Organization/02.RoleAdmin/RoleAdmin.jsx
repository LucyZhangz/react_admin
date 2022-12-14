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
    // ?????????????????????????????????paging???pagingSize???
    function pagingChange(page,pageSize){
        console.log(page,pageSize);
        setPaging(page)
        setPagingSize(pageSize);
    }
    // ?????????????????????????????????
    let pageObj = {
        limit:pagingSize,
        page:paging
    }
    // ????????????????????????????????????
    const [total,setTotal] = useState(1)

    let [RoleItems,setRoleItems] =useState([])
    // ????????????????????????????????????
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

    // ????????????
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
            title: '????????????',
            dataIndex: 'name',
            editable: true,
        },
        {
            title: '????????????',
            dataIndex: 'createTime',
        },
        {
            title: '????????????',
            dataIndex: 'updateTime',
        },
        {
            title: '??????',
            dataIndex: 'status',
            render: function (text, record, index) {
                let color = text ? ' #2db7f5' : '#f50'
                let font = text ? '?????????' :'??????' 

                return <Tag color={color}>{font}</Tag>

            }
        },
        {
            title: '??????',
            dataIndex: 'description',
        },
        {
            title: '??????',
            dataIndex: 'operation',
            render: (_, record) =>
                <span >

                    <Tag color="#2db7f5" className={style.EditBtn} onClick={()=>editHandle(record)}>??????</Tag>

                    <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)} className={style.DeleteBtn}>
                        <Tag color="#f50" className={style.DeleteBtn}  >??????</Tag>
                    </Popconfirm>
                </span>
        },
    ];
    // ???????????????
    const [handleModal, sethandleModal] = useState(false)
    const handleAdd = () => {
        sethandleModal(true);
    };
    function handleClose(){
        sethandleModal(false);
    }
     // ???????????????
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
    // pageObj ??????ajax??????
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
                ??????
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
            <Modal title="????????????" visible={handleModal} footer={null} onCancel={handleClose}>
                <ModalBox sethandleModal={sethandleModal} />
            </Modal>
            <Modal title="????????????" visible={EdithandleModal} footer={null} onCancel={eidtHandleClose}>
                <EditModalBox setEditHandleModal={setEditHandleModal} RoleData={RoleData} />
            </Modal>

        </div>
    );
};

export default App;