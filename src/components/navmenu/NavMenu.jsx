import React, { useState, useEffect } from "react";
import Logo from "./imgs/logo.png";
import { Layout, Menu } from "antd";
import style from "./nav.module.less";
import { createCollapseAction } from "../../store/actions/collaspe_action";
import { connect } from "react-redux";
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
const { Sider } = Layout;
import { getMenuList } from '../../api/menuList'
function App(props) {

  function getItem(label, key, icon, children, type) {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  }
  let items = [];
  const [menu, setmenu] = useState([]);

  async function MenuList() {
    let allmenu = await getMenuList()
    console.log(allmenu);
    setmenu(allmenu.data[0].children)
    const resMenu = transformMenu(allmenu.data[0].children)
    console.log(resMenu);
    resMenu.map((item) => {

      if (item.children) {
        items.push(getItem(item.label, item.key, '', item.children),)
      } else {
        items.push(getItem(item.label, item.key, ''))
      }
      setmenu(items)
    })

  }
  console.log(menu);
  function transformMenu(data) {
    const res = data.map((item) => {
      const obj = {
        label: item.title,
        key: item.id,
        type: item.type,
      }

      if (item.children && item.children.length) {
        obj.children = transformMenu(item.children)
      }else if(item.icon){
          obj.icon = icon
      }


      return obj
    })
    return res
  }




  const onClick = (e) => {
    console.log('click ', e);
  };

  useEffect(() => {
    MenuList();
  }, [])

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
        onClick={onClick}
        defaultSelectedKeys={['1']}
        mode="inline"
        items={menu}
        theme="dark"
      />
    </Sider>
  );
}
export default App