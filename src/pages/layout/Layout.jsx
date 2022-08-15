import style from "./layout.module.less";
import Header from "../../components/header/Header";
import NavMenu from "../../components/navmenu/NavMenu";
import Tags from "../../components/Tags";
import { Layout } from "antd";
import React from "react";
import { Outlet } from "react-router-dom";
const { Content } = Layout;

export default function () {
  return (
    <Layout style={{ height: "100vh" }}>
      {/* 侧边菜单栏 */}

      <NavMenu />

      <Layout className={style.siteLayout}>
        {/* 页面头部 */}
        <Header />
        {/* 身体部分 */}
        <div className="page-main" style={{ overflow: "auto", height: "100%" }}>
          <Content
            className={style.siteLayoutBackground}
            style={{
              padding: 10,
              minHeight: 280,
            }}
          >
            <Outlet />
          </Content>
        </div>
      </Layout>
    </Layout>
  );
}
