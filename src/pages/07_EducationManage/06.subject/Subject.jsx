import { Input, Select, Button, Table, Pagination, Modal, Tag, Popconfirm, Switch, Radio, Form } from 'antd';
import React, { useContext, useEffect, useRef, useState } from 'react';
const { Option } = Select;
import style from './subject.module.less'
import { getSubjectList,deleList} from '../../../api/SubjectManage/subjectManage'
import ModalBox from './ModalBox'
import ModalBoxEdit from './ModalBoxEdit'
export default function Subject() {
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
  // 获取学科数据列表
  async function getlist(page, limit) {
    let res = await getSubjectList({
      page,
      limit,
    })
    console.log(res.data);
    console.log(res.data.total);
    const { records } = res.data
    console.log(records);
    const { total } = res.data
    records.forEach((item) => {
      console.log(item);
      item.key = item.id;

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
      title: '课程名称',
      key: 'courseName',
      dataIndex: 'courseName',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.courseName - b.courseName,
      render: text => <p>{
        text
      }</p>
    },
    {
      key: 'classType',
      title: '学科所属类型',
      dataIndex: 'classType',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.classType - b.classType,
      render: text => <p>{
        text
      }</p>
    },
    {
      key: 'courseDesc',
      title: '课程描述',
      dataIndex: 'courseDesc',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.courseDesc - b.courseDesc,
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
      <Radio.Group
        onChange={({ target: { value } }) => {
          setSelectionType(value);
        }}
        value={selectionType}
      >
      </Radio.Group>
      <Input placeholder="请输入" style={{ width: '200px', marginRight: '20px' }} />
      <Select
        defaultValue="请选择"
        style={{
          width: 200,
        }}
        onChange={handleChange}
      >
        <Option value="请选择">请选择教育阶段</Option>
        <Option value="小学">小学</Option>
        <Option value="初中">初中</Option>
      </Select>
      {/* 查询 */}
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
