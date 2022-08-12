import { Button, Form, Input, Popconfirm, Table, Tag, Pagination, Modal, Switch } from 'antd';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons'
import style from './taskschedule.module.less'
import ModalBox from './ModalBox'
import { arranging } from '../../../api/classManage/taskschedule'
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
//const showTotal = (total) => `Total ${total} items`;
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

    // const toggleEdit = () => {
    //     setEditing(!editing);
    //     form.setFieldsValue({
    //         [dataIndex]: record[dataIndex],
    //     });
    // };
    let childNode = children;
  
    // if (editable) {
    //     childNode = editing ? (
    //         <Form.Item
    //             style={{
    //                 margin: 0,
    //             }}
    //             name={dataIndex}
    //             rules={[
    //                 {
    //                     required: true,
    //                     message: `${title} is required.`,
    //                 },
    //             ]}
    //         >
    //             <Input ref={inputRef} onPressEnter={save} onBlur={save} />
    //         </Form.Item>
    //     ) : (
    //         <div
    //             className="editable-cell-value-wrap"
    //             style={{
    //                 paddingRight: 24,
    //             }}
    //             onClick={toggleEdit}
    //         >
    //             {children}
    //         </div>
    //     );
    // }

    return <td {...restProps}>{childNode}</td>;
};
//调用列表数据
let newres = []
const App = () => {
    useEffect(() => {
        update()
    }, [])
    const [dataSource, setDataSource] = useState([

    ]);
    async function update() {
        let res = await arranging()
        res.data.records.map((item) => {
            console.log(res.data.records[0].arrangingName);
             item.key = item.id
             item.arrangingName = res.data.records[0].arrangingName
            item.arranging = res.data.records[0].arrangingName.slice(0, 14)
            // item.examDesc = `<div>
            // <Switch checkedChildren="开启" unCheckedChildren="关闭" defaultChecked />
            // </div> `
        })
        console.log(res.data.records);
        setDataSource(res.data.records)
    }
    // const [count, setCount] = useState(2);
    const handleDelete = (key) => {
        console.log(key);
        const newData = dataSource.filter((item) => item.key !== key);
        setDataSource(newData);
    };
    const columns = [
        {
            key: 'arrangingName',
            title: '排课计划',
            dataIndex: 'arrangingName',
            width: '20%',
            editable: true,
        },
        {
            key: 'arranging',
            title: '学期',
            dataIndex: 'arranging',
        },
        {
            key: 'weekDayNum',
            title: '周上课天数',
            dataIndex: 'weekDayNum',
        },

        {
            key: 'amNum',
            title: '上午上课天数',
            dataIndex: 'amNum',
        },
        {
            key: 'pmNum',
            title: '下午上课天数',
            dataIndex: 'pmNum',
        },
        {
            key: 'nightNum',
            title: '晚上课天数',
            dataIndex: 'nightNum',

        },
        {
            key: 'examDesc',
            title: '状态',
            dataIndex: 'examDesc',
            width: '10%',
       
        },
        {
            title: '操作',
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
    const [handleModal, sethandleModal] = useState(false)
    const handleAdd = () => {
        sethandleModal(true);
    };
    function handleClose() {
        sethandleModal(false);
    }
    // const handleSave = (row) => {
    //     const newData = [...dataSource];
    //     const index = newData.findIndex((item) => row.key === item.key);
    //     const item = newData[index];
    //     newData.splice(index, 1, { ...item, ...row });
    //     setDataSource(newData);
    // };

    const components = {
        body: {
            row: EditableRow,
            cell: EditableCell,
        },
    };
    //分页数据fen
    const [current, setCurrent] = useState(1);
    const [curr, setCurr] = useState(1);
    const [cur, setCur] = useState(1);
    const onChange = (page) => {
        console.log(page);
        setCurrent(page);
    };
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
                scroll={{ y:'400px' }}
                components={components}
                rowClassName={() => 'editable-row'}
                bordered
                dataSource={dataSource}
                columns={columns}
                pagination={false}
            />
            <Pagination current={current} onChange={onChange} total={cur} pageSize={curr}></Pagination>
            <Modal title="Basic Modal" visible={handleModal} footer={null} onCancel={handleClose} width={1000}>
                {/* <ModalBox sethandleModal={sethandleModal} /> */}
                <ModalBox  
                sethandleModal={sethandleModal} dataSource={dataSource}   />
            </Modal>
        </div>
    );
};

export default App;