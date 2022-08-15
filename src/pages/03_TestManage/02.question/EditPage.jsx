import "@wangeditor/editor/dist/css/style.css"; // 引入 css
import { Button, Form, Input, Select, Switch } from "antd";
import React, { useState, useEffect, useRef } from "react";
import { Editor, Toolbar } from "@wangeditor/editor-for-react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  addTestList,
  getQusetionList,
  getSubjectList,
} from "../../../api/testManage/question";
import TestAnswer from "./EditAnswer";
import { getTypeTestList } from "../../../api/testManage/testType";
import { formateGrade, gradeList } from "../../../hooks/formateGrade";
// import { IDomEditor, IEditorConfig, IToolbarConfig } from '@wangeditor/editor'
const { Option, OptGroup } = Select;

export default function MyEditor(props) {
  const formRef = useRef();
  // editor 实例
  const navigate = useNavigate();
  const location = useLocation();
  const recordData = JSON.parse(decodeURIComponent(location.search).slice(6));
  const [editor, setEditor] = useState(null); // JS 语法
  const [editorText, setEditorText] = useState("");
  const [answerText, setAnswerText] = useState("");

  // 编辑器内容
  const [html, setHtml] = useState("");

  // 工具栏配置
  const toolbarConfig = {}; // JS 语法

  // 编辑器配置
  const editorConfig = {
    // JS 语法
    placeholder: "请输入内容...",
  };
  async function addList(data) {
    let res = await addTestList(data);
    console.log(res);
    navigate("/dlQuestionBank");
  }
  //提交成功时的回调
  const onFinish = (values) => {
    if (values.self == true) {
      values.self = 1;
    } else if (values.self == false) {
      values.self = 0;
    }
    console.log("Success:", values);
    addList(values);
  };
  //表单验证失败的回调
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  // 及时销毁 editor ，重要！
  useEffect(() => {
    return () => {
      if (editor == null) return;
      editor.destroy();
      setEditor(null);
    };
  }, [editor]);
  const [List, setList] = useState([]);
  const [SubjectList, setSubjectList] = useState([]);
  const [handleModal, setHandleModal] = useState(false);
  const [typeList, setTypeList] = useState([]);

  useEffect(() => {
    getlist();
    getTypes();
  }, []);
  const fn = function (answer) {
    setAnswerText(answer);
  };
  useEffect(() => {
    console.log("$$$", recordData);
    formRef.current.setFieldsValue({
      answer: answerText,
      content: editorText,
      difficulty: recordData.difficulty,
      file: "",
      gradeType: formateGrade(recordData.gradeType),
      id: recordData.id,
      questionType: recordData.questionType,
      remark: recordData.remark,
      self: recordData.self,
      subjectId: recordData.subjectId,
    });
  });

  async function getlist() {
    let { data } = await getQusetionList();
    console.log(data.records);
    data.records.map((item, index) => {
      item.key = item.id;
    });
    setList(data.records);
  }
  function handleAdd() {
    setHandleModal(true);
  }
  function selfChange(value) {
    console.log(value);
  }
  async function getTypes() {
    let { data } = await getTypeTestList();
    setTypeList(data.records);
  }
  function handleClose() {
    setHandleModal(false);
  }
  const handleChange = (value) => {};
  async function getBygrade(params) {
    let { data } = await getSubjectList(params);

    setSubjectList(data);
  }
  const handleSubject = (value) => {
    console.log("@@@", value);
    // getBygrade({ grade: value });
  };

  

  return (
    <>
      <Form
        style={{ margin: "0 auto", width: "100vw !important" }}
        name="basic"
        ref={formRef}
        initialValues={recordData}
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <div style={{ display: "flex" }}>
          <Form.Item
            label="试题类别"
            name="questionType"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Select
           
              style={{
                width: 120,
              }}
            >
              {typeList.map((item) => {
                return (
                  <Option value={item.name} key={item.id}>
                    {item.typeName}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>
          <Form.Item label="年级名" name="gradeType">
            <Select  style={{ width: "150px" }} onChange={handleSubject}>
              {gradeList.map((item) => {
                return (
                  <Option value={item.value} key={item.value}>
                    {item.label}
                  </Option>
                );
              })}
              {/* <OptGroup label="小学">
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
              </OptGroup> */}
            </Select>
          </Form.Item>
          <Form.Item
            label="科目"
            name="subjectId"
            style={{ marginLeft: "30px" }}
          >
            <Select style={{ width: "100px" }} onChange={handleChange}>
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
            label="私有"
            name="self"
            style={{ width: "100px", marginLeft: "30px" }}
            valuePropName="checked"
          >
            <Switch onChange={selfChange} />
          </Form.Item>
          <Form.Item
            label="难易程度"
            style={{ marginLeft: "30px" }}
            name="difficulty"
          >
            <Select style={{ width: "100px" }} onChange={handleChange}>
              <Option value="1">难</Option>
              <Option value="2">中</Option>
              <Option value="3">易</Option>
            </Select>
          </Form.Item>
          <Form.Item label="备注" name="remark">
            <Input />
          </Form.Item>
        </div>
        <Form.Item name="content">
          <div
            style={{ border: "1px solid #ccc", zIndex: 100, width: "1200px" }}
          >
            <Toolbar
              editor={editor}
              defaultConfig={toolbarConfig}
              mode="default"
              style={{ borderBottom: "1px solid #ccc" }}
            />
            <Editor
              defaultConfig={editorConfig}
              value={html}
              onCreated={setEditor}
              onChange={(editor) => {
                setHtml(editor.getHtml());
                setEditorText(editor.getText());
              }}
              mode="default"
              style={{ height: "500px", overflowY: "hidden" }}
            />
          </div>
          <div style={{ marginTop: "15px" }}>{html}</div>
        </Form.Item>
        <Form.Item name="answer">
          <TestAnswer fn={fn} />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}
