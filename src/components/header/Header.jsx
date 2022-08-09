import React, { useState } from "react";
import style from "./header.module.less";
const { Header } = Layout;
import { connect } from "react-redux";
import { Layout, Menu, Space, Dropdown } from "antd";
import Bread from "../Bread";
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
function LayoutHeader(props) {
  const [FullPage, setFullPage] = useState(false);

  const [originResizeFunc, setOriginResizeFunc] = useState(null);

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
  // admin的下拉菜单里的内容
  const menu = (
    <Menu
      items={[
        {
          key: "1",
          label: (
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.antgroup.com"
            >
              基础资料
            </a>
          ),
        },
        {
          key: "2",
          label: (
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.aliyun.com"
            >
              更换密码
            </a>
          ),
        },
        {
          key: "3",
          label: (
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.aliyun.com"
            >
              退出
            </a>
          ),
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
            <Dropdown overlay={menu}>
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
