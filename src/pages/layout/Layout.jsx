import style from './layout.module.less'
import Header from '../../components/header/Header';
import NavMenu from '../../components/navmenu/NavMenu';
import { Layout} from 'antd';
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
const {  Content } = Layout;

export default function () {
  return (
    <Layout>
      {/* 侧边菜单栏 */}
     < NavMenu />
      <Layout className={style.siteLayout}>
        {/* 页面头部 */}
        <Header />
        {/* 身体部分 */}
        <Content
          className={style.siteLayoutBackground}
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
          }}
        >
          <Outlet/>
        </Content>
      </Layout>
    </Layout>
  );
}


