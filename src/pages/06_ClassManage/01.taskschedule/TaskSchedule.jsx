import { Button, Form, Input, Popconfirm, Table, Tag, Pagination, Modal, Switch } from 'antd';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons'
import Editbox from './Editbox'
import style from './taskschedule.module.less'
import ModalBox from './ModalBox'
import { arranging, dele } from '../../../api/classManage/taskschedule'
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
//??????????????????
let newres = []
const App = () => {
    useEffect(() => {
        update()
    }, [])
    //????????????
    async function update() {
        let res = await arranging(limit, page)
        settotal(res.data.total)
        //????????????
        res.data.records.forEach((item) => {
            console.log(res.data.records[0].arrangingName);
            item.key = item.id;
            item.arranging = res.data.records[0].arrangingName.slice(0, 14)
        })
        console.log(res.data.records);
        setDataSource(res.data.records)
    }
    //??????????????????
    const handleDelete = async (key) => {
        console.log([key.toString()]);
        await dele([key.toString()])
        onEscCan()
        //  console.log(key);
        const newData = dataSource.filter((item) => item.key !== key);
        setDataSource(newData);
    };
    const editor = (key) => {
        sethandleEditModal(true)
        console.log(key);
        console.log(dataSource);
        let newdata = dataSource.find((item) => {
            return item.id == key
        })
        if (key) {
            setnewwarr(newdata)
            setnewdata({
                arrid: newdata.id,
                termId: newdata.termId
            })
        }
    };
    const [newwarr, setnewwarr] = useState('')
    const [newdata, setnewdata] = useState('')
    const columns = [
        {
            key: 'arrangingName',
            title: '????????????',
            dataIndex: 'arrangingName',
            width: '20%',
            // editable: true,

        },
        {
            key: 'arranging',
            title: '??????',
            dataIndex: 'arranging',
            defaultSortOrder: 'descend',
            render: text => <p>{
                text
            }</p>
        },
        {
            key: 'weekDayNum',
            title: '???????????????',
            dataIndex: 'weekDayNum',
            defaultSortOrder: 'descend',
            render: text => <p>{
                text
            }</p>
        },

        {
            key: 'amNum',
            title: '??????????????????',
            dataIndex: 'amNum',
            defaultSortOrder: 'descend',
            render: text => <p>{
                text
            }</p>
        },
        {
            key: 'pmNum',
            title: '??????????????????',
            dataIndex: 'pmNum',
            defaultSortOrder: 'descend',
            render: text => <p>{
                text
            }</p>
        },
        {
            key: 'nightNum',
            title: '???????????????',
            dataIndex: 'nightNum',
            defaultSortOrder: 'descend',
            render: text => <p>{
                text
            }</p>
        },
        {   //???????????????
            key: 'pmNum',
            title: '??????',
            dataIndex: 'pmNum',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.status - b.status,
            width: '10%',
            render: (_, { pmNum } = record) =>
            (<p>
                <Switch checkedChildren={pmNum == 3 ? '??????' : '??????'} defaultChecked={pmNum == 3}
                />
            </p>)
        },
        {
            title: '??????',
            key: 'operation',
            dataIndex: 'operation',
            defaultSortOrder: 'descend',
            render: (_, record) =>
                <span >
                    <Tag color="#2db7f5" type="primary" danger
                        onClick={() => editor(record.key)}>??????</Tag>
                    <Popconfirm title="????????????????"

                        onConfirm={() => handleDelete(record.key)} className={style.DeleteBtn}>
                        <Tag color="#f50" className={style.DeleteBtn}>??????</Tag>
                    </Popconfirm>
                </span>
        },
    ];
    const [handleModal, sethandleModal] = useState(false)
    const [handleEditModal, sethandleEditModal] = useState(false)

    function handleClose() {
        sethandleModal(false);
        // Modal.destroyAll();
    }
    function handleAdd() {
        sethandleModal(true);
    }
    function handleEdit() {
        sethandleEditModal(false);
    }
    const components = {
        body: {
            row: EditableRow,
            cell: EditableCell,
        },
    };
    //????????????fen
    //????????????
    //????????????
    const [dataSource, setDataSource] = useState([
    ]);
    // const [anfin, setanfin] = useState('')
    const [limit, setLimit] = useState(10)
    const [page, setpage] = useState(1)
    const [total, settotal] = useState('')
    const onEscCan = async (page, limit) => {
        console.log(page, limit);
        setLimit(limit)
        setpage(page)
        let anfin = await arranging(limit, page)
        console.log(anfin);
        anfin.data.records.forEach((item) => {
            item.key = item.id
        })
        setDataSource(anfin.data.records)
    };
    //??????????????????
    const [selectionType, setSelectionType] = useState('checkbox');
    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            let a = []
            selectedRowKeys.map((item) => {
                a.push(item)
            })
            setdeleItem(a)
        },
    };
    const [deleItem, setdeleItem] = useState([])
    //????????????????????????
    async function delectAll() {
        await dele(deleItem)
        onEscCan()
    }
    return (
        <div>
            <Button
                onClick={handleAdd}
                type="primary"
                style={{
                    marginBottom: 16,
                    marginRight: '10px'
                }}
            >
                ??????
            </Button>
            <Button
                onClick={delectAll}
                type="primary"
                style={{
                    marginBottom: 16,
                }}
            >
                ??????
            </Button>
            <Table
                rowSelection={{
                    type: selectionType,
                    ...rowSelection,
                }}

                scroll={{ y: '400px' }}
                components={components}
                rowClassName={() => 'editable-row'}
                bordered
                dataSource={dataSource}
                columns={columns}
                pagination={false}
            />
            <Pagination
                onChange={onEscCan}
                total={total}
                showSizeChanger
                showQuickJumper
                showTotal={(total) => `Total ${total} items`}
            />
            <div>
                <Modal title="Basic Modal" visible={handleModal} footer={null} onCancel={handleClose} width={1000} destroyOnClose >
                    <ModalBox
                        sethandleModal={sethandleModal} handleClose={handleClose} dataSource={dataSource} newdata={newdata} newwarr={newwarr}
                    />
                </Modal>
                <Modal title="Basic Modal" visible={handleEditModal} footer={null} onCancel={handleEdit} width={1000} destroyOnClose  >
                    {/* <ModalBox sethandleModal={sethandleModal} /> */}
                    <Editbox newdata={newdata} newwarr={newwarr}
                        dataSource={dataSource} handleClose={handleEdit}
                        sethandleEditModal={sethandleEditModal} />
                </Modal>
            </div>
        </div>
    );
};

export default App;