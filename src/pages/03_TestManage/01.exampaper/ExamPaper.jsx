import { Button, Table } from "antd";
import React, { useEffect, useState } from "react";
import { getExamPaperList } from "../../../api/testManage/examPaper";
export default function ExamPaper() {
  const [paperList,setPaperList] = useState({
    code:'',
    delete:'',
    duration:'',
    gradeType:'',
    id:'',
    notes:'',
    score:'',
    self:'',
    subjectId:'',
    testName:''
  })
    async function getList(){
        let {data} = await getExamPaperList(); 
        console.log(data);
        data.records.map((item,index)=>{
          // setPaperList(item)
          console.log(item);
        })
    }
    useEffect(()=>{
        getList()
    },[])
  const columns = [
    {
      title: "试卷编号",
      dataIndex: "createId",
    },
    {
      title: "试卷名称",
      dataIndex: "testName",
    },
    {
      title: "考试时长",
      dataIndex: "createTime",
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
      dataIndex: "",
    },
  ];
 
  const List = [];

 
  for (let i = 0; i < 46; i++) {
    List.push({
      key: i,
      name: `Edward King ${i}`,
      age: 32,
      address: `London, Park Lane no. ${i}`,
    });
  }
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);

  const start = () => {
    setLoading(true); // ajax request after empty completing

    setTimeout(() => {
      setSelectedRowKeys([]);
      setLoading(false);
    }, 1000);
  };

  const onSelectChange = (newSelectedRowKeys) => {
    console.log("selectedRowKeys changed: ", selectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
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
          <Button
            type="primary"
            onClick={start}
            disabled={!hasSelected}
            loading={loading}
          >
            Reload
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
          dataSource={List}
        />
      </div>
    </>
  );
}
