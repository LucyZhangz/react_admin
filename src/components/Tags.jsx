import React from "react";
import { Tag } from "antd";
export default function Tags() {
  return (
    <div
      style={{
        width: "100%",
        padding: "5px 0 5px 10px",
        background: "#fff",
        borderBottom: "1px solid #dcdfe6",
        borderTop: "1px solid #dcdfe6",
      }}
    >
      <Tag color="#108ee9" closable>
        首页
      </Tag>
      <Tag color="#108ee9" closable>
        菜单
      </Tag>
      <Tag color="#108ee9" closable>
        111
      </Tag>
      <Tag color="#108ee9" closable>
        222
      </Tag>
    </div>
  );
}
