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
  //获取多选框的内容
  export function  list(id){
    return request({
      method: "post",
      url: "/dlArrGrade/list",
      data: {
        arrId:null,
        termId:id
      },
    });
  }
  //新增发送
  export function add(data){
    return request({
      method: "post",
      url: "/dlArrangingCourse/add",
      data
    });
  }
  //页面数据删除
  export function delect(id){
    return request({
      method: "delete",
      url: "/dlArrangingCourse/delete",
      params:id
    });
  }

  
  //获取老师的上课班级数据
  export function tableData(data){
    return request({
      method: "post",
      url: "/dlCourseTable/tableData",
      data
    });
  }