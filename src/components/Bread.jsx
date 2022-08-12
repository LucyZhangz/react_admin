import React from "react";
import { HomeOutlined, UserOutlined } from "@ant-design/icons";
import { Breadcrumb } from "antd";
import { getMenuList } from "../api/menuList";
export default function Bread() {
  let breadList = [];

  async function getMenu() {
    const { data } = await getMenuList();
    console.log(data);
    // let res = data.children.find()
  }
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
