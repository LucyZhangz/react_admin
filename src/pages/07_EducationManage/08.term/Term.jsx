import { Input, Select, Button, Table, Pagination, Modal, Tag, Popconfirm, Switch, Radio, Form, Space } from 'antd';
import React, { useContext, useEffect, useRef, useState } from 'react';
const { Option } = Select;
import style from './term.module.less'
import { getTermList, deleList } from '../../../api/termManage/termManage'
import ModalBox from './ModalBox'
import ModalBoxEdit from './ModalBoxEdit'
export default function Term() {
  const [form] = Form.useForm();
  const [selectionType, setSelectionType] = useState('checkbox');
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const [handleModal, sethandleModal] = useState(false)
  const [handleModalEdit, sethandlEditModal] = useState(false)

  // 初始化分页数据
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(5)
  const [total, settotal] = useState('')
  const [recordEdit, setrecordEdit] = useState({})

  // 初始化数组，保存返回的数组数据
  const [dataSource, setDataSource] = useState([])
  useEffect(() => {
    getlist(page, limit)
  }, [])

  // 获取年级管理数据列表
  async function getlist(page, limit, type) {
    let res = await getTermList({
      page,
      limit,
      type
    })
    console.log(res.data);
    console.log(res.data.total);
    const { records } = res.data
    console.log(records);
    const { total } = res.data
    records.forEach((item) => {
      console.log(item);
      item.key = item.id;
      if(item.term===1){
        item.term='第一学期'
      }else{
        item.term='第二学期'
      }
        
    })
    setDataSource(records)
    settotal(total)
  }

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  }
  const handleDelete = (key) => {
    console.log(key);
    deleItem([key])
    setLimit(limit)
    setPage(page)
    getlist(page, limit)
    settotal(total)
  };
  // 删除一个数据调用函数
  async function deleItem(data) {
    console.log(data);
    let res = await deleList(data)
    console.log(res);
  }
  // 删除多个
  async function deleRwsult(data) {
    console.log(data);
    let res = await deleList(data)
    console.log(res);
  }
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      setSelectedRowKeys(selectedRowKeys)
    }
  }
  // 删除多条列表数据
  function handleDele() {
    console.log(selectedRowKeys);
    deleRwsult(selectedRowKeys)
    setLimit(limit)
    setPage(page)
    getlist(page, limit)
    settotal(total)
  }
  const handleAdd = () => {
    sethandleModal(true);
  };
  function handleEdit(record) {
    sethandlEditModal(true);
    console.log(record);
    setrecordEdit(record)
  }
  const columns = [
    {
      title: '标题',
      key: 'title',
      dataIndex: 'title',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.title - b.title,
      render: text => <p>{
        text
      }</p>
    },
    {
      key: 'schoolYear',
      title: '学年',
      dataIndex: 'schoolYear',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.schoolYear - b.schoolYear,
      render: text => <p>{
        text
      }</p>
    },
    {
      key: 'term',
      title: '学期',
      dataIndex: 'term',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.term - b.term,
      render: text => (<p>{
        text
      }</p>)
    },
    {
      key: 'status',
      title: '状态',
      dataIndex: 'status',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.status - b.status,
      render: (_, { status } = record) => (<p>{
        // console.log(status)
        <Switch checkedChildren={status === 1 ? '启用' : '停用'} defaultChecked={status === 1} unCheckedChildren='停用' />
      }</p>)
    },
   
    {
      key: 'startTime',
      title: '开始时间',
      dataIndex: 'startTime',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.startTime - b.startTime,
      render: text => (<p>{
        text
      }</p>)
    },
    {
      key: 'endTime',
      title: '结束时间',
      dataIndex: 'endTime',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.endTime - b.endTime,
      render: text => (<p>{
        text
      }</p>)
    },
    {
      title: '操作',
      dataIndex: 'operation',
      render: (_, record) =>
        <span>
          <Tag color="#2db7f5" className={style.EditBtn} onClick={() => handleEdit(record)}>编辑</Tag>
          <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)} className={style.DeleteBtn}>
            <Tag color="#f50" className={style.DeleteBtn}>删除</Tag>
          </Popconfirm>
        </span>
    },
  ];
  // 分页
  const onChange = (page, limit) => {
    console.log(page, limit);
    setLimit(limit)
    getlist(page, limit)
  };
  // 点击关闭
  function handleClose() {
    sethandleModal(false);
  }
  function handleCloseEdit() {
    sethandlEditModal(false);
  }

  return (
    <div>
       <Input placeholder="请输入标题" style={{ width: '200px', marginRight: '20px' }} />
        {/* 查询 */}
      <Button size='middle' style={{ backgroundColor: '#009688', color: '#fff', marginLeft: '10px', marginRight: '10px', marginBottom:'15px'}}>
        查询
      </Button>
      <br/>
      <Button
        onClick={handleAdd}
        type="primary"
        style={{
          marginBottom: 16,
          marginRight: 20
        }}
      >
        添加
      </Button>
      <Button
        onClick={handleDele}
        type="danger"
        style={{
          marginBottom: 16,
        }}
      >
        删除
      </Button>
      {/* 表格 */}
      <Table
        bordered
        dataSource={dataSource}
        columns={columns}
        pagination={false}
        rowSelection={{
          type: selectionType,
          ...rowSelection,
        }}
      />
      {/* 分页器 */}
      <Pagination
        onChange={onChange}
        total={total}
        showSizeChanger
        showQuickJumper
        pageSizeOptions={[5, 10, 20, 50]}
        showTotal={(total) => `Total ${total} items`}
      />
      <Modal title="新增" visible={handleModal} width={1200} footer={null} onCancel={handleClose} style={{ marginLeft: '200px' }} destroyOnClose
      >
        <ModalBox sethandleModal={sethandleModal} />
      </Modal>
      <Modal title="编辑" visible={handleModalEdit} width={1200} footer={null} onCancel={handleCloseEdit} destroyOnClose style={{ marginLeft: '200px' }}
      >
        <ModalBoxEdit sethandlEditModal={sethandlEditModal} recordEdit={recordEdit} />
      </Modal>


    </div>
  )
}

