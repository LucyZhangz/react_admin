import React, { useState, useEffect} from "react";
import Logo from "./imgs/logo.png";
import { Layout, Menu } from "antd";
import style from "./nav.module.less";
import { createCollapseAction } from "../../store/actions/collaspe_action";
import { connect } from "react-redux";
import {useNavigate} from 'react-router-dom'
import { getMenuList } from '../../api/menuList'
import {
  UsergroupDeleteOutlined,
  UserOutlined,
  CopyOutlined,
  EditOutlined,
  FileTextOutlined,
  TableOutlined,
  ProjectOutlined,
  SettingOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
const { Sider } = Layout;
function NavMenu(props) {
const navigate = useNavigate();

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
  let rootSubmenuKeys = [
    "51",
    "1334806894995996673",
    "1334807138768945153",
    "1334808090397802498",
    "784480084118470656",
    "1334808707124068353",
    "1334822791945027585",
    "54",
    "21",
  ];
  const [menu, setmenu] = useState([]);
  let iconsList = [
    <UsergroupDeleteOutlined />,
    <UserOutlined />,
    <CopyOutlined />,
    <EditOutlined />,
    <FileTextOutlined />,
    <TableOutlined />,
    <ProjectOutlined />,
    <SettingOutlined />,
    <CalendarOutlined />,
  ];
  async function MenuList() {
    const { data } = await getMenuList();
    const resMenu = transformMenu(data.menus);
    resMenu.map((item) => {
      if (item.children) {
        items.push(getItem(item.lable, item.key, item.icon, item.children));
      } else {
        items.push(getItem(item.lable, item.key, ""));
      }
      setmenu(resMenu);
    });
  }
  
  function transformMenu(data) {
    const res = data.map((item,idx) => {
      const obj = {
        label: item.title,
        key: item.id,
        type: item.type,
        url:item.url,
        ordernum:item.ordernum,
      }

      if (item.children && item.children.length) {
        obj.children = transformMenu(item.children)
        obj.icon = iconsList[idx];
      }else if(item.icon){
          obj.icon = icon
      }else if(item.url!==''){
          obj.key = item.url
      }
      

      return obj
    })
    return res
  }
  const onClick = (e) => {
    console.log('click ', e.key.slice(6));
    navigate(e.key.slice(6))
  };
  const [openKeys, setOpenKeys] = useState(["51"]);

  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);

    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };
  useEffect(() => {
    MenuList();
  }, [])

  return (
    <Sider  className={style.navAside} trigger={null} collapsible collapsed={props.collapsed}>
      <div className={style.logo}> 
        {props.collapsed ? (
          <img src={Logo} className={style.LogoImg} />
        ) : (
          <span className={style.LogoFont}>教务管理系统</span>
        )}
      </div>
      <Menu
        onClick={onClick}
        mode="inline"
        items={menu}
        theme="dark"
        onOpenChange={onOpenChange}
        openKeys={openKeys}
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