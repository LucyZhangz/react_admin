import style from './layout.module.less'
import { requestFullScreen, exitFullScreen, isFullscreenElement } from "../../hooks/util";
import Logo from './imgs/Logo.png'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UndoOutlined,
  FullscreenOutlined,
  FullscreenExitOutlined,
  DownOutlined,

} from '@ant-design/icons';
import { Layout, Menu, Space, Dropdown } from 'antd';
import React, { useState } from 'react';
const { Header, Sider, Content } = Layout;

export default function () {
  const [collapsed, setCollapsed] = useState(false);
  const [FullPage, setFullPage] = useState(false);
  const [originResizeFunc, setOriginResizeFunc] = useState(null);
  // 全屏模式的点击事件
  function ChangeFullPage() {
    setFullPage(!FullPage);
  }
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
  }; // eslint-disable-line react-hooks/exhaustive-deps
  function onEscCancelFull() {
  	// 用于反显状态
    setFullPage(isFullscreenElement());
  }
  

  // 页面刷新功能
  function handleReload(){
    location.reload();
  }
  // admin的下拉菜单里的内容
  const menu = (
    <Menu
      items={[
        {
          key: '1',
          label: (
            <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                基础资料
            </a>
          ),
        },
        {
          key: '2',
          label: (
            <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
                更换密码
            </a>
          ),
        },
        {
          key: '3',
          label: (
            <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
                 退出
            </a>
          ),
        },

      ]}
    />
  );
  return (
    <Layout>
      {/* 侧边菜单栏 */}
      <Sider trigger={null} collapsible collapsed={collapsed} className={style.asideStyle}>
        <div className={style.logo}>
          {collapsed? <img src={Logo} className={style.LogoImg} />: <span className={style.LogoFont}>教务管理系统</span>}
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={[
            {
              key: '1',
              icon: <UserOutlined />,
              label: 'nav 1',
            },
            {
              key: '2',
              icon: <VideoCameraOutlined />,
              label: 'nav 2',
            },
            {
              key: '3',
              icon: <UploadOutlined />,
              label: 'nav 3',
            },
          ]}
        />
      </Sider>
      <Layout className={style.siteLayout}>
        {/* 页面头部 */}
        <Header
          className={style.siteLayoutBackground}
          style={{
            padding: 0,
          }}
        >
          {/* 收缩功能 */}
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: style.trigger,
            onClick: () => setCollapsed(!collapsed),
          })}
          {/* 刷新的icon图标 */}
          <Space className={style.Reload}>
            <UndoOutlined onClick={handleReload} />
          </Space>
          {/* 全屏的icon图标 */}
          <Space className={style.FullPage} onClick={ChangeFullPage} >
            {/* FullscreenOutlined FullscreenExitOutlined */}
            {FullPage ? <FullscreenExitOutlined onClick={()=>{exitFullScreen()}}  /> : <FullscreenOutlined onClick={()=>{
              requestFullScreen(document.body)
            }}/>}
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
        </Header>
        {/* 身体部分 */}
        <Content
          className={style.siteLayoutBackground}
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
          }}
        >
          Content
        </Content>
      </Layout>
    </Layout>
  );
}


