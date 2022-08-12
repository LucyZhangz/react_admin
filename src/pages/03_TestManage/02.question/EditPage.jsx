import "@wangeditor/editor/dist/css/style.css"; // 引入 css
import { Button, Form, Input, Select, Switch } from "antd";
import React, { useState, useEffect } from "react";
import { Editor, Toolbar } from "@wangeditor/editor-for-react";
import {
  getQusetionList,
  getSubjectList,
} from "../../../api/testManage/question";
// import { IDomEditor, IEditorConfig, IToolbarConfig } from '@wangeditor/editor'
const { Option, OptGroup } = Select;
export default function MyEditor() {
  // editor 实例
  const [editor, setEditor] = useState(null); // JS 语法

  // 编辑器内容
  const [html, setHtml] = useState("<p>hello</p>");

  // 模拟 ajax 请求，异步设置 html
  useEffect(() => {
    setTimeout(() => {
      setHtml("<p>hello world</p>");
    }, 1500);
  }, []);

  // 工具栏配置
  const toolbarConfig = {}; // JS 语法

  // 编辑器配置
  const editorConfig = {
    // JS 语法
    placeholder: "请输入内容...",
  };
  //提交成功时的回调
  const onFinish = (values) => {
    console.log("Success:", values);
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
  useEffect(() => {
    getlist();
  }, []);
  async function getlist() {
    let { data } = await getQusetionList();
    console.log(data.records);
    data.records.map((item, index) => {
      item.key = item.id;

      console.log(item);
    });
    setList(data.records);
  }
  function handleAdd() {
    setHandleModal(true);
  }

  function handleClose() {
    setHandleModal(false);
  }
;

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
    <>
      <Form
        style={{ margin: "0 auto", width: "100vw !important" }}
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
        <div style={{ display: "flex" }}>
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
            <Input style={{ width: "100px" }} />
          </Form.Item>
          <Form.Item label="年级名" name="grade">
            <Select style={{ width: "150px" }} onChange={handleSubject}>
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
          <Form.Item label="科目" name="subject" style={{ marginLeft: "30px" }}>
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
            style={{ width: "100px", marginLeft: "30px" }}
            valuePropName="checked"
          >
            <Switch
              style={{
                // position: "relative !important",
                // left: "10px",
                // top: "0px !important",
              }}
            />
          </Form.Item>
          <Form.Item label="难易程度" style={{ marginLeft: "30px" }} name="difficult">
          <Input />
          </Form.Item>
          <Form.Item label="备注" name="notes">
            <Input />
          </Form.Item>
        </div>
        <Form.Item>
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
              onChange={(editor) => setHtml(editor.getHtml())}
              mode="default"
              style={{ height: "500px", overflowY: "hidden" }}
            />
          </div>
          <div style={{ marginTop: "15px" }}>{html}</div>
        </Form.Item>
        <Form.Item name="answer">
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
              onChange={(editor) => setHtml(editor.getHtml())}
              mode="default"
              style={{ height: "500px", overflowY: "hidden" }}
            />
          </div>
          <div style={{ marginTop: "15px" }}>{html}</div>
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
