import { Button, Form, Input, Popconfirm, Table, Tag, Pagination, Modal, Checkbox, Switch } from 'antd';
import moment from 'moment'
import React, { useContext, useEffect, useRef, useState } from 'react';
import style from './plan.module.less'
import ModalBox from './ModalBox'
import { getExamlist } from '../../../api/examManage/plan';

const Plan = () => {
    // useeffct获取数据
    useEffect(() => {
        getlist(page, limit)
    }, [])
    //  删除
    const handleDelete = (key) => {
        const newData = arr.filter((item) => item.key !== key);
        setarr(newData);
    };
    // 初始化分页数据
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(5)
    const [total, settotal] = useState('')

    const columns = [
        {
            title: '考试标题',
            key: 'name',
            dataIndex: 'name',
            render: text => <p>{
                text
            }</p>
        },
        {
            key: 'timeStart',
            title: '考试时间',
            dataIndex: 'timeStart',
            render: text => <p>{
                text
            }</p>
        },
        {
            key: 'examType',
            title: '考试状态',
            dataIndex: 'examType',
            render: text => <p>{
                text
            }</p>
        },
        {
            key: 'examDesc',
            title: '成绩编辑',
            dataIndex: 'examDesc',
            render: text => {
                //   console.log(arr);
                arr.map(item => { return <Switch checkedChildren="开启" unCheckedChildren="关闭" defaultChecked key={item.id} /> })
            }


        },
        {
            key: 'termName',
            title: '参考年级',
            dataIndex: 'termName',
            render: text => <p>{
                text
            }</p>
        },
        {
            key: 'examType',
            title: '考试类型',
            dataIndex: 'examType',
            render: text => <p>{
                text
            }</p>
        },
        {
            title: '操作',
            dataIndex: 'operation',
            render: (_, record) =>
                <span>
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
    const [arr, setarr] = useState([])
    // 获取考试计划列表
    async function getlist(page, limit) {
        let { data } = await getExamlist({
            page,
            limit,
        })
        console.log(data);
        const { total } = data
        let { records } = data
        records.forEach(item => {
            item.key = item.id;
            item.examDesc = `<div>
            <Switch checkedChildren="开启" unCheckedChildren="关闭" defaultChecked />
            </div> `
        })
        console.log('records：', records)
        setarr(records)
        settotal(total)
       
    }

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
    // 分页
    const onChange = (page, limit) => {
        console.log(page, limit);
        setLimit(limit)
        // setPage(page)
        getlist(page, limit)
    };

    return (
        <div>
            <Input placeholder="请输入" style={{ width: '200px', }} />
            <Button size='middle' style={{ backgroundColor: '#009688', color: '#fff', marginLeft: '10px', marginRight: '10px' }}>
                查询
            </Button>
            <Button size='middle' style={{ backgroundColor: '#009688', color: '#fff', marginBottom: '10px' }}>
                导出全部
            </Button>
            <br />
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
                bordered
                dataSource={arr}
                columns={columns}
                pagination={false}
            />
            {/* 分页器 */}
            <Pagination
                onChange={onChange}
                total={total}
                showSizeChanger
                showQuickJumper
                showTotal={(total) => `Total ${total} items`}
            />
            
            <Modal title="Basic Modal" visible={handleModal} width={1200} footer={null} onCancel={handleClose} style={{ marginLeft: '200px' }}
            >
                <ModalBox sethandleModal={sethandleModal} />
            </Modal>

        </div>
    );
};

export default Plan;