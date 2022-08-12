import { Tag } from "antd";
// import { useLocation } from "react-router-dom";
// import { getMenuList } from "../api/menuList";
import React, { useEffect, useState } from "react";

import routes from "../router";
export default function Tags(props) {
  // const location = useLocation();
  // const [tagsList, setTagsList] = useState([]);
  // let tags = [];
  // useEffect(() => {
  //   getlist();
  //   tags.push(location.pathname);
  // });
  // let list = [];
  // async function getlist() {
  //   let { data } = await getMenuList();
  //   let urlList = data.children;
  //   urlList.map((item) => {
  //     item.children.map((item1) => {
  //       list.push({
  //         title: item1.title,
  //         url: item1.url.slice(6),
  //       });
  //     });
  //   });
  // }
  return (
    <div
      style={{
        width: "100%",
        padding: "5px 0 5px 10px",
        background: "#fff",
        borderBottom: "1px solid #dcdfe6",
        borderTop: "1px solid #dcdfe6",
      }}
    >
      {}
      <Tag color="#108ee9" closable>
        首页
      </Tag>
      <Tag color="#2db7f5">#2db7f5</Tag>
      <Tag color="#108ee9" closable>
        菜单
      </Tag>
      <Tag color="#108ee9" closable>
        111
      </Tag>
      <Tag color="#108ee9" closable>
        222
      </Tag>
    </div>
  );
}

// }

// export default class Tags extends Component {

//   componentDidMount() {
//       // 监听路由的变化,如果路由发生变化则进行相应操作
//       this.props.history.listen(location => {
//           // 最新路由的 location 对象，可以通过比较 pathname 是否相同来判断路由的变化情况
//           if (this.props.location.pathname !== location.pathname) {
//              // 路由发生了变化
//              console.log(111);
//           }
//       })
//   }

//   render(){
//     return (
//       <div>Tags</div>
//     )
//   }
// }
