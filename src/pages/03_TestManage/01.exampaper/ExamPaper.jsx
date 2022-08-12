import { Button, Table, Modal ,Switch,Tag ,Popconfirm } from "antd";
import React, { useEffect, useState } from "react";
import { getExamPaperList } from "../../../api/testManage/examPaper";
import ModalBox from "./ModalBox";
import Style from './exampaper.module.less'
export default function ExamPaper() {
  const [paperList, setPaperList] = useState([]);
  const [handleModal, setHandleModal] = useState(false);
  async function getList() {
    let { data } = await getExamPaperList();
    data.records.map((item, index) => {
      item.key = item.id;

      console.log(item);
    });

    setPaperList(data.records);
  }

  useEffect(() => {
    getList();
  }, []);
  const columns = [
    {
      title: "试卷编号",
      dataIndex: "code",
      key: "code",
      render: (text) => <p>{text}</p>,
    },
    {
      title: "试卷名称",
      dataIndex: "testName",
      key: "testName",
      render: (text) => 0
    },
    {
      title: "考试时长",
      dataIndex: "duration",
      key: "duration",
      render: (text) => <p>{text}</p>,
    },
    {
      title: "试卷总分",
      dataIndex: "score",
      key: "score",
      render: (text) => <p>{text}</p>,
    },
    {
      title: "私有",
      dataIndex: "self",
      key: "self",
      render: () => <Switch defaultChecked/>,
    },
    {
      title: "科目ID",
      dataIndex: "subjectId",
      key: "subjectId",
      render: (text) => <p>{text}</p>,
    },
    {
      title: "适用年级",
      dataIndex: "gradeType",
      key: "gradeType",
      render: (text) => <p>{text}</p>,
    },
    {
      title: "操作",
      dataIndex: "operation",
      render: (_, record) => (
        <span>
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

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);

  const onSelectChange = (newSelectedRowKeys) => {
    console.log("selectedRowKeys changed: ", selectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  function handleAdd() {
    setHandleModal(true);
  }

  function handleClose() {
    setHandleModal(false);
  }
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
          <Button
            onClick={handleAdd}
            type="primary"
            style={{ marginLeft: "10px" }}
          >
            新增
          </Button>

        </div>
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={paperList}
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
