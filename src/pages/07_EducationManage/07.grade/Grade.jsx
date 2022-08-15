import { Input, Select, Button, Table, Pagination, Modal, Tag, Popconfirm, Switch, Radio, Form, Space } from 'antd';
import { FileOutlined } from '@ant-design/icons'
import React, { useContext, useEffect, useRef, useState } from 'react';
const { Option } = Select;
import style from './grade.module.less'
import { getGradejectList, deleList } from '../../../api/gradeManage/gradeManage'
import ModalBox from './ModalBox'
import ModalBoxEdit from './ModalBoxEdit'
export default function Grade() {
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
    let res = await getGradejectList({
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
      item.gradeName = item.gradeName + '级'
      item.gradeNameLabel = item.gradeNameLabel.slice(0, 2)
      let edclass = parseInt((item.gradeNum % 10000) / 1000)
      let gradeClass = parseInt((item.gradeNum % 100) / 10)
      let updown = item.gradeNum % 10
      console.log(updown);
      if (updown === 1) {
        updown = '上册'
      } else {
        updown = '下册'
      }
      console.log(edclass);
      if (edclass === 1) {
        edclass = '小学'
        if (gradeClass === 1) {
          gradeClass = '一年级'
        } else if (gradeClass === 2) {
          gradeClass = '二年级'
        } else if (gradeClass === 3) {
          gradeClass = '三年级'
        } else if (gradeClass === 4) {
          gradeClass = '四年级'
        } else if (gradeClass === 5) {
          gradeClass = '五年级'
        } else {
          gradeClass = '六年级'
        }


        console.log(gradeClass);
      } else if (edclass === 2) {
        edclass = '初中'
        if (gradeClass === 1) {
          gradeClass = '七年级'
        } else if (gradeClass === 2) {
          gradeClass = '八年级'
        } else {
          gradeClass = '九年级'
        }
      } else {
        edclass = '高中'
      }
      console.log(edclass);
      //给年级上下册赋值
      item.gradeNum = gradeClass + updown
      if (item.status === 1) {
        item.status === '在校'
      } else {
        item.status === '结业'
      }
      if (item.classType === 1) {
        item.classType = '小学'
      } else {
        item.classType = '初中'
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
      title: '年级名称',
      key: 'gradeName',
      dataIndex: 'gradeName',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.gradeName - b.gradeName,
      render: text => <p>{
        text
      }</p>
    },
    {
      key: 'gradeNameLabel',
      title: '教育阶段',
      dataIndex: 'gradeNameLabel',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.gradeNameLabel - b.gradeNameLabel,
      render: text => <p>{
        text
      }</p>
    },
    {
      key: 'status',
      title: '状态',
      dataIndex: 'status',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.status - b.status,
      render: (_, { status } = record) => (<p>{
        // console.log(status)
        <Switch checkedChildren={status === 1 ? '在校' : '毕业'} defaultChecked={status === 1} unCheckedChildren='毕业' />
      }</p>)
    },
    {
      key: 'gradeNum',
      title: '年级',
      dataIndex: 'gradeNum',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.gradeNum - b.gradeNum,
      render: text => (<p>{
        text
      }</p>)
    },
    {
      key: 'remark',
      title: '备注',
      dataIndex: 'remark',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.remark - b.remark,
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
  // 根据教育阶段查询数据 小学
  async function handleClick() {
    let res = await getlist(1, 10, '1')
    console.log(res.data);
    const { pages, size, total, records } = res.data
    console.log(pages, size, total, records);
    setLimit(size)
    setPage(pages)
  }
// 根据教育阶段查询数据 初中
async function handleClick2() {
  let res = await getlist(1, 10, '2')
  console.log(res.data);
  const { pages, size, total, records } = res.data
  console.log(pages, size, total, records);
  setLimit(size)
  setPage(pages)
}
  return (
    <div>
      <Space>
        <FileOutlined style={{ marginLeft: "50px", marginBottom: '10px' }} />
        <span><a href="#" onClick={handleClick}>小学</a></span>
      </Space>
      <br />
      <Space>
        <FileOutlined style={{ marginLeft: "50px", marginBottom: '15px' }} />
        <span><a href="#" onClick={handleClick2}>初中</a></span>
      </Space>
      <br />

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
