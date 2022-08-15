import "@wangeditor/editor/dist/css/style.css"; // 引入 css

import React, { useState, useEffect } from "react";
import { Editor, Toolbar } from "@wangeditor/editor-for-react";

function MyEditor(props) {
  // editor 实例
  const [editor, setEditor] = useState(null); // JS 语法
  // 编辑器内容
  const [html, setHtml] = useState("");

  // 工具栏配置
  const toolbarConfig = {}; // JS 语法

  // 编辑器配置
  const editorConfig = {
    // JS 语法
    placeholder: "请输入内容...",
  };

  // 及时销毁 editor ，重要！
  useEffect(() => {
    return () => {
      if (editor == null) return;
      editor.destroy();
      setEditor(null);
    };
  }, [editor]);

  return (
    <>
      <div style={{ border: "1px solid #ccc", zIndex: 100, width: "1200px" }}>
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
            setHtml(editor.getHtml())
            props.fn(editor.getText())
          }}
          mode="default"
          style={{ height: "500px", overflowY: "hidden" }}
        />
      </div>
      <div style={{ marginTop: "15px" }}>{html}</div>
    </>
  );
}

export default MyEditor;
