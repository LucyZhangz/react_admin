import { Button, Table,Modal } from "antd";
import React, { useEffect, useState } from "react";
import { getExamPaperList } from "../../../api/testManage/examPaper";
import ModalBox from './ModalBox'
export default function ExamPaper() {
  const [paperList, setPaperList] = useState({
    code: "",
    delete: "",
    duration: "",
    gradeType: "",
    id: "",
    notes: "",
    score: "",
    self: "",
    subjectId: "",
    testName: "",
  });
  const [handleModal,setHandleModal] = useState(false)
  // const [list,setList] = useState([])
  let list = [];
  async function getList() {
    let { data } = await getExamPaperList();
    console.log(data);
    data.records.map((item, index) => {
      list.push(item);
    });
  }

  useEffect(() => {
    getList();
  }, []);
  const columns = [
    {
      title: "试卷编号",
      dataIndex: "code",
    },
    {
      title: "试卷名称",
      dataIndex: "testName",
    },
    {
      title: "考试时长",
      dataIndex: "duration",
    },
    {
      title: "试卷总分",
      dataIndex: "score",
    },
    {
      title: "私有",
      dataIndex: "self",
    },
    {
      title: "科目ID",
      dataIndex: "subjectId",
    },
    {
      title: "适用年级",
      dataIndex: "gradeType",
    },
    {
      title: "操作",
      dataIndex: "operation",
      render: () => <Button type="primary">编辑</Button>,
    },
  ];

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);

  

  const onSelectChange = (newSelectedRowKeys) => {
    console.log("selectedRowKeys changed: ", selectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  function handleAdd() {
    setHandleModal(true)
  };

  function handleClose(){
    setHandleModal(false)
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelected = selectedRowKeys.length > 0;
  return (
    <>
      <div>
        <div
          style={{
            marginBottom: 16,
          }}
        >
          <Button type="primary" disabled={!hasSelected} loading={loading}>
            Reload
          </Button>
          <Button
            onClick={handleAdd}
            type="primary"
            style={{ marginLeft: "10px" }}
          >
            新增
          </Button>
          <span
            style={{
              marginLeft: 8,
            }}
          >
            {hasSelected ? `Selected ${selectedRowKeys.length} items` : ""}
          </span>
        </div>
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={list}
        />
        <Modal
          title="Basic Modal"
          visible={handleModal}
          footer={null}
          onCancel={handleClose}
        >
          <ModalBox handleModal={setHandleModal} />
        </Modal>
      </div>
    </>
  );
}
