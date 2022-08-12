import React, { useEffect, useState } from "react";
import {
  Button,
  Form,
  Input,
  Select,
  Table,
  Tag,
  Popconfirm,
  Modal,
  Radio,
} from "antd";
import { Link } from "react-router-dom";
import ModalBox from "./ModalBox";
import Style from "./question.module.less";
import {
  getQusetionList,
  getSubjectList,
} from "../../../api/testManage/question";
import { getTypeTestList } from "../../../api/testManage/testType";
const { Option, OptGroup } = Select;
export default function Question() {
  const [ContentList, setContentList] = useState([]);
  const [SubjectList, setSubjectList] = useState([]);
  const [typeList, setTypeList] = useState([]);
  const [handleModal, setHandleModal] = useState(false);
  useEffect(() => {
    getlist();
    getTypes();
  }, []);
  async function getlist() {
    let { data } = await getQusetionList();
    console.log(data.records);
    data.records.map((item, index) => {
      item.key = item.id;
    });
    setContentList(data.records);
  }
  async function getTypes() {
    let { data } = await getTypeTestList();
    setTypeList(data.records);
  }
  function handleAdd() {
    setHandleModal(true);
  }
  async function getPageContentByType(id) {
    let { data } = await getQusetionList(id);
    data.records.map((item, index) => {
      item.key = item.id;
    });
    setContentList(data.records);
  }
  function handleClose() {
    setHandleModal(false);
  }
  function handleChangeAsync(e) {
    console.log(e.target.value);
    getPageContentByType(e.target.value);
  }
  const columns = [
    {
      title: "试题",
      dataIndex: "content",
      key: "content",
      render: (text) => <p>{text}</p>,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <span>
          {console.log(record.id)}
          <Link to={`/addQuestion/${record.id}`}>
            <Tag color="#2db7f5" className={Style.EditBtn} onClick={handleAdd}>
              编辑
            </Tag>
          </Link>

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

  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };
  async function getBygrade(params) {
    let { data } = await getSubjectList(params);

    setSubjectList(data);
  }
  const handleSubject = (value) => {
    getBygrade({ grade: value });
  };
  return (
    <div className={Style.container}>
      <div className="leftForm" style={{ width: "250px" }}>
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="试题名"
            name="testname"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="年级名" name="grade">
            <Select
              style={{
                width: 200,
              }}
              onChange={handleSubject}
            >
              <OptGroup label="小学">
                <Option value="1611">一年级上册</Option>
                <Option value="1612">一年级下册</Option>
                <Option value="1621">二年级上册</Option>
                <Option value="1622">二年级下册</Option>
                <Option value="1631">三年级上册</Option>
                <Option value="1632">三年级下册</Option>
                <Option value="1641">四年级上册</Option>
                <Option value="1642">四年级下册</Option>
                <Option value="1651">五年级上册</Option>
                <Option value="1652">五年级下册</Option>
                <Option value="1661">六年级上册</Option>
                <Option value="1662">六年级下册</Option>
              </OptGroup>
              <OptGroup label="初中">
                <Option value="2311">七年级上册</Option>
                <Option value="2312">七年级下册</Option>
                <Option value="2321">八年级上册</Option>
                <Option value="2322">八年级下册</Option>
                <Option value="2331">九年级上册</Option>
                <Option value="2332">九年级下册</Option>
              </OptGroup>
            </Select>
          </Form.Item>
          <Form.Item label="科目" name="subject">
            <Select
              style={{
                width: 120,
              }}
              onChange={handleChange}
            >
              {SubjectList.map((item) => {
                return (
                  <Option value={item.name} key={item.id}>
                    {item.name}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              查询
            </Button>
          </Form.Item>
        </Form>
      </div>
      <div className="rightTable" style={{ width: "800px" }}>
        <div className="topBox">
          <Radio.Group defaultValue="a" size="large">
            {typeList.map((item) => {
              return (
                <Radio.Button
                  onChange={handleChangeAsync}
                  value={item.id}
                  key={item.id}
                >
                  {item.typeName}
                </Radio.Button>
              );
            })}
          </Radio.Group>
        </div>
        <div className="addBtn" style={{ marginTop: "20px" }}>
          <Link to="/addQuestion">
            <Button
              onClick={handleAdd}
              type="primary"
              style={{ marginLeft: "10px" }}
            >
              新增
            </Button>
          </Link>
        </div>
        <div className="bottomBox" style={{ marginTop: "20px" }}>
          <Table columns={columns} dataSource={ContentList} />
          <Modal
            title="Basic Modal"
            visible={handleModal}
            footer={null}
            onCancel={handleClose}
          >
            <ModalBox handleModal={setHandleModal} />
          </Modal>
        </div>
      </div>
    </div>
  );
}
