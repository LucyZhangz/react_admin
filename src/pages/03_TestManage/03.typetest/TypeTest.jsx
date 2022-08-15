import React, { useEffect, useState } from "react";
import { Table, Tag, Button, Popconfirm, Modal, Pagination } from "antd";
import {
  deleteTypeTestList,
  getTypeTestList,
} from "../../../api/testManage/testType";
import ModalBox from "./ModalBox";
import EditBox from "./EditBox";
import Style from "./typetest.module.less";
export default function TypeTest() {
  const [List, setList] = useState([]);
  const [handleModal, setHandleModal] = useState(false);
  const [handleEditModal, setHandleEditModal] = useState(false);
  const [editRecord, setEditRecord] = useState();
  const [total, settotal] = useState("");
  // 初始化分页数据
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const sizeArr = [5, 10, 15, 20];
  async function getlist(page, limit) {
    let { data } = await getTypeTestList(page, limit);
    console.log(data.records);
    data.records.map((item) => {
      item.key = item.id;
    });
    setList(data.records);
    settotal(data.total);
  }
  const handleAdd = () => {
    setHandleModal(true);
  };
  useEffect(() => {
    getlist(page, limit);
  }, []);
  function handleClose() {
    setHandleModal(false);
  }
  function handleCloseEdit() {
    setHandleEditModal(false);
  }
  //点击编辑按钮弹出编辑框
  function handleEdit(record) {
    setHandleEditModal(true);
    setEditRecord(record);
  }
  // 分页
  const onChangePage = (page, limit) => {
    console.log(page, limit);
    setLimit(limit);
    // setPage(page);
    getlist(page, limit);
  };
  async function handleDelete(val) {
    console.log(val);
    let res = await deleteTypeTestList([val]);
    location.reload();
  }

  const columns = [
    {
      title: "类型名称",
      dataIndex: "typeName",
      key: "typeName",
      render: (text) => <p>{text}</p>,
    },
    {
      title: "添加时间",
      dataIndex: "createTime",
      key: "createTime",
      render: (text) => <p>{text}</p>,
    },
    {
      title: "备注",
      dataIndex: "remark",
      key: "remark",
      render: (text) => <p>{text}</p>,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <span style={{ width: "200px" }}>
          <Tag
            color="#2db7f5"
            className={Style.EditBtn}
            onClick={() => handleEdit(record)}
          >
            编辑
          </Tag>

          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => handleDelete(record.key)}
            className={Style.DeleteBtn}
          >
            <Tag color="#f50" className={Style.DeleteBtn}>
              删除
            </Tag>
          </Popconfirm>
        </span>
      ),
    },
  ];

  return (
    <div>
      <Button
        onClick={handleAdd}
        type="primary"
        style={{ marginLeft: "10px", marginBottom: "20px" }}
      >
        新增
      </Button>
      <Table columns={columns} dataSource={List} pagination={false} />
      <Pagination
        showQuickJumper
        onChange={onChangePage}
        defaultCurrent={1}
        defaultPageSize={5}
        showSizeChanger
        pageSizeOptions={sizeArr}
        total={total}
        showTotal={(total) => `Total ${total} items`}
      />
      <Modal
        title="Basic Modal"
        visible={handleModal}
        footer={null}
        onCancel={handleClose}
        destroyOnClose
      >
        <ModalBox sethandleModal={setHandleModal} />
      </Modal>
      <Modal
        title="Edit Modal"
        visible={handleEditModal}
        footer={null}
        onCancel={handleCloseEdit}
        destroyOnClose
      >
        <EditBox
          setHandleEditModal={setHandleEditModal}
          editRecord={editRecord}
        />
      </Modal>
    </div>
  );
}
