import request from "../../utils/request";
//获取课表
export  function arranging() {
  return request({
    method: "post",
    url: "/dlArrangingCourse/listByPage",
    data: {
      limit: 10,
      page: 1,
    },
  });
}
//获取课表排课内容
export  function arrang() {
    return request({
      method: "post",
      url: "/dlArrBase/listByPage",
      data: {
        limit: 10,
        page: 1,
        arrId:null,
        courseName:''
      },
    });
  }