import { Button, Form, Input, Popconfirm, Table, Tag, Pagination, Modal, Tree, Select } from 'antd';
import React, { useContext, useEffect, useRef, useState } from 'react';
import style from './staff.module.less'
import ModalBox from './ModalBox'
import { CarryOutOutlined, FormOutlined } from '@ant-design/icons';
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

// 树形控件
const treeData = [
    {
        title: 'parent 1',
        key: '0-0',
        icon: <CarryOutOutlined />,
        children: [
            {
                title: 'parent 1-0',
                key: '0-0-0',
                icon: <CarryOutOutlined />,
                children: [
                    {
                        title: 'leaf',
                        key: '0-0-0-0',
                        icon: <CarryOutOutlined />,
                    },
                    {
                        title: (
                            <>
                                <div>multiple line title</div>
                                <div>multiple line title</div>
                            </>
                        ),
                        key: '0-0-0-1',
                        icon: <CarryOutOutlined />,
                    },
                    {
                        title: 'leaf',
                        key: '0-0-0-2',
                        icon: <CarryOutOutlined />,
                    },
                ],
            },
            {
                title: 'parent 1-1',
                key: '0-0-1',
                icon: <CarryOutOutlined />,
                children: [
                    {
                        title: 'leaf',
                        key: '0-0-1-0',
                        icon: <CarryOutOutlined />,
                    },
                ],
            },
            {
                title: 'parent 1-2',
                key: '0-0-2',
                icon: <CarryOutOutlined />,
                children: [
                    {
                        title: 'leaf',
                        key: '0-0-2-0',
                        icon: <CarryOutOutlined />,
                    },
                    {
                        title: 'leaf',
                        key: '0-0-2-1',
                        icon: <CarryOutOutlined />,
                        switcherIcon: <FormOutlined />,
                    },
                ],
            },
        ],
    },
    {
        title: 'parent 2',
        key: '0-1',
        icon: <CarryOutOutlined />,
        children: [
            {
                title: 'parent 2-0',
                key: '0-1-0',
                icon: <CarryOutOutlined />,
                children: [
                    {
                        title: 'leaf',
                        key: '0-1-0-0',
                        icon: <CarryOutOutlined />,
                    },
                    {
                        title: 'leaf',
                        key: '0-1-0-1',
                        icon: <CarryOutOutlined />,
                    },
                ],
            },
        ],
    },
];
const App = () => {
    const [dataSource, setDataSource] = useState([
        {
            key: '0',
            name: 'Edward King 0',
            age: '32',
            address: 'London, Park Lane no. 0',
        },
        {
            key: '1',
            name: 'Edward King 1',
            age: '32',
            address: 'London, Park Lane no. 1',
        },
    ]);
    const [count, setCount] = useState(2);

    const handleDelete = (key) => {
        const newData = dataSource.filter((item) => item.key !== key);
        setDataSource(newData);
    };

    const defaultColumns = [
        {
            title: '账号',
            width: 100,
            dataIndex: 'name',
            key: 'name',
            fixed: 'left',
        },
        {
            title: '手机号',
            width: 100,
            dataIndex: 'age',
            key: 'age',
            fixed: 'left',
        },
        {
            title: '所属部门',
            dataIndex: 'address',
            key: '1',
            width: 150,
        },
        {
            title: '真实姓名',
            dataIndex: 'address',
            key: '2',
            width: 150,
        },
        {
            title: '角色',
            dataIndex: 'address',
            key: '3',
            width: 150,
        },
        {
            title: '邮箱',
            dataIndex: 'address',
            key: '4',
            width: 150,
        },
        {
            title: '性别',
            dataIndex: 'address',
            key: '5',
            width: 150,
        },
        {
            title: '状态',
            dataIndex: 'address',
            key: '6',
            width: 150,
        },
        {
            title: 'operation',
            dataIndex: 'operation',
            render: (_, record) =>
                <span >

                    <Tag color="#2db7f5" className={style.EditBtn} onClick={handleAdd}>编辑</Tag>

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

    function handleClose() {
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
    return (
        <div className={style.MenuBox}>
            <div className={style.Tree}>
                <Tree
                    showLine={true}
                    defaultExpandedKeys={['0-0-0']}
                    // onSelect={onSelect}
                    treeData={treeData}
                />
            </div>
            <div className={style.MenuTable}>
                <div>
                    <Input placeholder="Basic usage" style={{ width: '200px' }} />
                    <Input placeholder="Basic usage" style={{ width: '200px' }} />
                    <Input placeholder="Basic usage" style={{ width: '200px' }} />
                    <Select
                        defaultValue="lucy"
                        style={{
                            width: 120,
                        }}
                        onChange={handleChange}
                    >
                        <Option value="jack">Jack</Option>
                        <Option value="lucy">Lucy</Option>
                        <Option value="zll">
                            zll
                        </Option>
                        <Option value="Yiminghe">yiminghe</Option>
                    </Select>
                       <Button type="primary" style={{position:'relative',left:'50px'}}>查询</Button>
                    </div>
                <Button
                    onClick={handleAdd}
                    type="primary"
                    style={{
                        marginBottom: 16,
                        position:'relative',
                        top:'10px',
                       height:"25px",
                       fontSize:'12px',
                       textAlign:'center'
                    }}
                >
                    新增
                </Button>
                <Table
                    columns={columns}
                    dataSource={data}
                    scroll={{
                        x: 1280,
                        y: 300,
                    }}
                    pagination={false}
                />
                <Pagination size="small" total={50} showSizeChanger showQuickJumper />
            </div>


            <Modal title="Basic Modal" visible={handleModal} footer={null} onCancel={handleClose}>
                <ModalBox sethandleModal={sethandleModal} />
            </Modal>

        </div>
    );
};

export default App;