import { Button, Form, Input, Popconfirm, Table, Tag, Pagination, Modal, Checkbox, Switch } from 'antd';
import moment from 'moment'
import React, { useContext, useEffect, useRef, useState } from 'react';
import style from './plan.module.less'
import ModalBox from './ModalBox'
import { getExamlist } from '../../../api/examManage/plan';
const Plan = () => {
    // useeffct获取数据
    useEffect(() => {
        getlist()
    },[])
    // const [dataSource, setDataSource] = useState([
        
    // ]);
    const [count, setCount] = useState(2);
    const handleDelete = (key) => {
        const newData = dataSource.filter((item) => item.key !== key);
        setDataSource(newData);
    };

    const columns = [
        {   title: '考试标题',
             key:'name',
            dataIndex: 'name',
            render:text =><p>{
                text
            }</p>
        },
        {   
            key:'timeStart',
            title: '考试时间',
            dataIndex:'timeStart',
            render:text =><p>{
             text
            }</p>
        },
        { 
             key:'examType',
            title: '考试状态',
            dataIndex: 'examType',
            render:text =><p>{
                text
            }</p>
        },
        {  
             key:'examDesc',
            title: '成绩编辑',
            dataIndex: 'examDesc',
            render:text =>{
            //   console.log(arr);
            //   <Tag color="#2db7f5">#2db7f5</Tag>
              arr.map(item=>{return <Switch checkedChildren="开启" unCheckedChildren="关闭" defaultChecked key={item.id}/>})
            }
            
                    //   (<Switch checkedChildren="开启" unCheckedChildren="关闭" defaultChecked />)
        },
        {    
            key:'termName',
            title: '参考年级',
            dataIndex: 'termName',
            render:text =><p>{
                text
            }</p>
        },
        {   
            key:'examType',
            title: '考试类型',
            dataIndex: 'examType',
            render:text =><p>{
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
    const [arr,setarr]=useState([{
         timeStart:'timeStart',
         timeEnd:'timeEnd'
    }
       
    ])
    // 获取考试计划列表
    async function getlist() {
        let result = await getExamlist()
        console.log(result.data);
        const { records } = result.data
        // console.log(records);
        records.map((item,index)=>{
            item.key=item.id;
            item.timeStart=moment(item.timeStart).format('YYYY-MM-DD')
            item.examDesc=`<div>
            <Switch checkedChildren="开启" unCheckedChildren="关闭" defaultChecked />
            </div> `
            // console.log(item.timeStart);
            // item.examType=item.name.slice(16,20)
            records[0].timeStart= records[0].timeStart.slice(0,10)
            records[0].timeEnd= records[0].timeEnd.slice(0,10)
            records[1].timeStart= records[1].timeStart.slice(0,10)
            records[1].timeEnd= records[1].timeEnd.slice(0,10)
            records[0].examType= records[0].name.slice(16,20)
            records[1].examType= records[1].name.slice(20,22)
            records[2].examType= records[2].name.slice(0,10)
            records[3].examType= records[3].name.slice(0,10)

        })
        console.log(records);
        setarr(records)
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
            <Pagination size="small" total={50} showSizeChanger showQuickJumper />
            <Modal title="Basic Modal" visible={handleModal} footer={null} onCancel={handleClose} >
                <ModalBox sethandleModal={sethandleModal} style={{width:'800px'}}/>
            </Modal>

        </div>
    );
};

export default Plan;