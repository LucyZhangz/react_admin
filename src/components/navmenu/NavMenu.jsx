import React, { useState, useEffect } from "react";
import Logo from "./imgs/logo.png";
import { Layout, Menu } from "antd";
import style from "./nav.module.less";
import { createCollapseAction } from "../../store/actions/collaspe_action";
import { connect } from "react-redux";
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";

const { Sider } = Layout;
function NavMenu(props) {
  return (
    <Sider style={{ height: "100vh" }} trigger={null} collapsible collapsed={props.collapsed}>
      <div className={style.logo}>
        {props.collapsed ? (
          <img src={Logo} className={style.LogoImg} />
        ) : (
          <span className={style.LogoFont}>教务管理系统</span>
        )}
      </div>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["1"]}
        items={[
          {
            key: "1",
            icon: <UserOutlined />,
            label: "nav 1",
          },
          {
            key: "2",
            icon: <VideoCameraOutlined />,
            label: "nav 2",
          },
          {
            key: "3",
            icon: <UploadOutlined />,
            label: "nav 3",
          },
        ]}
      />
    </Sider>
  );
}
export default connect(
  (state) => ({
    collapsed: state.collapse,
  }),
  {
    createCollapseAction,
  }
)(NavMenu);
