import React from "react";
import { HomeOutlined, UserOutlined } from "@ant-design/icons";
import { Breadcrumb } from "antd";
export default function Bread() {
  return (
    <Breadcrumb>
      <Breadcrumb.Item href="#">
        <HomeOutlined />
      </Breadcrumb.Item>
      <Breadcrumb.Item href="#">
        <UserOutlined />
        <span>首页</span>
      </Breadcrumb.Item>
      <Breadcrumb.Item>菜单添加</Breadcrumb.Item>
    </Breadcrumb>
  );
}
