import React, { useEffect, useState } from "react";
import { Space, Table, Tag, Button,Popconfirm,Modal  } from "antd";
import { getTypeTestList } from "../../../api/testManage/testType";
import ModalBox from "./ModalBox";
import Style from './typetest.module.less'
export default function TypeTest() {
  const [List, setList] = useState([]);
  const [handleModal, setHandleModal] = useState(false);
  async function getlist() {
    let { data } = await getTypeTestList();
    console.log(data.records);
    data.records.map((item) => {
      item.key = item.id;
    });
    setList(data.records);
  }
  const handleAdd = () => {
    setHandleModal(true);
  };
  useEffect(() => {
    getlist();
  }, []);
  function handleClose() {
    setHandleModal(false);
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
        <span style={{width:'200px'}}>
          <Tag color="#2db7f5" className={Style.EditBtn} onClick={handleAdd}>
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
            style={{ marginLeft: "10px" }}
          >
            新增
          </Button>
      <Table columns={columns} dataSource={List} />
      <Modal
          title="Basic Modal"
          visible={handleModal}
          footer={null}
          onCancel={handleClose}
        >
          <ModalBox handleModal={setHandleModal} />
        </Modal>
    </div>
  );
}
