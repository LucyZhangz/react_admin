import { Button, Form, Input, Popconfirm, Table, Tag, Pagination, Modal } from 'antd';
import React, { useContext, useEffect, useRef, useState } from 'react';
import style from './meun.module.less'
import ModalBox from './ModalBox'
import EditModalBox from './EditModalBox'
import { getMenu, delMenu } from '../../../api/Organization/menu';
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
    const [dataSource, setDataSource] = useState([]);
    const items = []
    const getmenu = async () => {
        let res = await getMenu();
        console.log(res);
        let resMenu = transformMenu(res.data[0].children)
        resMenu.map((item) => {
            items.push(item)
        })
        setDataSource(items);
        // console.log("1111111111111111111", items);
    }

    function transformMenu(data) {
        const res = data.map((item) => {
            const obj = {
                title: item.title,
                id: item.id,
                type: item.type,
                url: item.url,
                icon: item.icon,
                key: item.id,
                orderNum: item.orderNum,
                checked: item.checked,
                pid:item.pid
            }
            if (item.children && item.children.length) {
                obj.children = transformMenu(item.children)
            } else if(item.pidName) {
                obj.name = item.pidName
            }
            return obj
        })
        return res
    }

    // 删除数据请求参数
    async function DelMenu(id) {
        await delMenu(id)
    }

    const handleDelete = (key) => {
        const newData = dataSource.filter((item) => item.key !== key);
        setDataSource(newData);
        DelMenu(key);
        console.log(key);
    };
    useEffect(() => {
        getmenu();
    }, [])
    const defaultColumns = [
        {
            title: '菜单名称',
            dataIndex: 'title',
            editable: true,
        },
        {
            title: 'url',
            dataIndex: 'url',
        },
        {
            title: '图标',
            dataIndex: 'icon',
        },
        {
            title: '类型',
            dataIndex: 'type',
            render: function (text, record, index) {
                let color = text === 1 ? 'magenta' : 'cyan'
                let font = text === 1 ? '目录' : '菜单'
                if (text === 3) {
                    color = 'geekblue';
                    font = '按钮'
                }

                return <Tag color={color}>{font}</Tag>

            }
        },
        {
            title: '父级名称',
            dataIndex: 'name',
        },
        {
            title: '排序',
            dataIndex: 'orderNum',
        },
        {
            title: '状态',
            dataIndex: 'checked',
            render: function (text, record, index) {
                let color = text ? '#f50' : '#2db7f5'
                let font = text ? '禁用' : '已启用'

                return <Tag color={color}>{font}</Tag>

            }
        },

        {
            title: 'operation',
            dataIndex: 'operation',
            render: (_, record) =>
                <span >

                    <Tag color="#2db7f5" className={style.EditBtn} onClick={() => handleEdit(record)}>编辑</Tag>

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

    function handleClose() {
        sethandleModal(false);
    }
    // 编辑事件
    const [handleEditModal, sethandleEditModal] = useState(false)
    // 获取当前行的Id值
    const [hadleEditId,sethadleEditId] = useState(undefined)
    function handleEdit(e) {
        sethandleEditModal(true)
        // console.log(e);
        sethadleEditId(e)
    }
    //  让编辑模态框默认保持关闭
    function handleEditClose() {
        sethandleEditModal(false)
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
            <Pagination size="small" total={9} showSizeChanger showQuickJumper />
            {/* EditModalBox */}
            <Modal title="菜单新增" visible={handleModal} footer={null} onCancel={handleClose}>
                <ModalBox sethandleModal={sethandleModal} />
            </Modal>
            <Modal title="菜单编辑" visible={handleEditModal} footer={null} onCancel={handleEditClose}>
                <EditModalBox sethandleEditModal={sethandleEditModal} hadleEditId={hadleEditId}   />
            </Modal>

        </div>
    );
};

export default App;