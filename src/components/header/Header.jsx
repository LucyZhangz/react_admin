import React, { useState } from "react";
import style from "./header.module.less";
const { Header } = Layout;
import { connect } from "react-redux";
import { Layout, Menu, Space, Dropdown } from "antd";
import Bread from "../Bread";
import {Route, useNavigate}from 'react-router-dom'
import {
  requestFullScreen,
  exitFullScreen,
  isFullscreenElement,
} from "../../hooks/util";
import { createCollapseAction } from "../../store/actions/collaspe_action";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UndoOutlined,
  FullscreenOutlined,
  FullscreenExitOutlined,
  DownOutlined,
} from "@ant-design/icons";
import Basic  from "../../pages/basic/basic";
function LayoutHeader(props) {
  const [FullPage, setFullPage] = useState(false);

  const [originResizeFunc, setOriginResizeFunc] = useState(null);
  const navigate=useNavigate()
  // 定义进入全屏和退出全屏事件
  function useEffect() {
    props.getMenu();
    setActiveKey(panes[0].key);
    // 监听 键盘ESC 退出全屏(可以使用屏幕大小监听，触发对应的事件)
    if (window.addEventListener) {
      window.addEventListener("resize", onEscCancelFull, false);
    } else {
      setOriginResizeFunc(window.onresize);
      window.onresize = onEscCancelFull;
    }
    // 销毁清除事件
    return () => {
      if (window.removeEventListener) {
        window.removeEventListener("resize", onEscCancelFull, false);
      } else {
        window.onresize = originResizeFunc;
      }
    };
  } // eslint-disable-line react-hooks/exhaustive-deps
  function onEscCancelFull() {
    // 用于反显状态
    setFullPage(isFullscreenElement());
  }
  function handleClick(e){
    navigate("/"+e.key)
    console.log(e.key);
  }
  // admin的下拉菜单里的内容
  const menu = (
    <Menu
    onClick={handleClick}
      items={[
        {
          key: "profile",
          label:"基本资料",
        },
        {
          key: "paddword",
          label:'更换密码',
        },
        {
          key: "login",
          label: '退出'
          
        },
      ]}
    />
  );
  return (
    <div>
      <Header
        style={{
          padding: 0,
          background: "#fff",
        }}
        className={style.Header}
      >
        <div className={style.headerLeft}>
          {/* 收缩功能 */}
          {React.createElement(
            props.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: style.trigger,
              onClick: () => handlecollapse(),
            }
          )}
          {/* 面包屑 */}
          <Bread />
        </div>
        <div className={style.headerRight}>
          {/* 刷新的icon图标 */}
          <Space className={style.Reload}>
            <UndoOutlined onClick={handleReload} />
          </Space>
          {/* 全屏的icon图标 */}
          <Space className={style.FullPage} onClick={ChangeFullPage}>
            {/* FullscreenOutlined FullscreenExitOutlined */}
            {FullPage ? (
              <FullscreenExitOutlined
                onClick={() => {
                  exitFullScreen();
                }}
              />
            ) : (
              <FullscreenOutlined
                onClick={() => {
                  requestFullScreen(document.body);
                }}
              />
            )}
          </Space>
          {/* 管理员下拉菜单 */}
          <Space className={style.Admin}>
            <Dropdown overlay={menu} >
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  admin
                  <DownOutlined />
                </Space>
              </a>
            </Dropdown>
          </Space>
        </div>
      </Header>
    </div>
  );
  function handlecollapse() {
    props.createCollapseAction();
  }
  // 页面刷新功能
  function handleReload() {
    location.reload();
  }
  // 全屏模式的点击事件
  function ChangeFullPage() {
    setFullPage(!FullPage);
  }
}
export default connect(
  (state) => ({
    // console.log(state);
    collapsed: state.collapse,
  }),
  {
    createCollapseAction,
  }
)(LayoutHeader);
