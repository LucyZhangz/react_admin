import request from "../../utils/request";
//获取课表
export  function arranging(limit,page) {
  return request({
    method: "post",
    url: "/dlArrangingCourse/listByPage",
    data: {
      limit: limit,
      page: page,
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
  //修改密码
  export function user(data){
    return request({
      method: "put",
      url: "/sys/user/pwd",
      data
    });
  }
  //获得个人信息
  export function home(){
    return request({
      method: "get",
      url: "/sys/user",
    });
  }
  //保存新的个人信息
  export function save(data){
    return request({
      method: "put",
      url: "/sys/user/info",
      data
    });
  }
  //获取菜单信息
  export function dlArrGrade(data){
    return request({
      method: "post",
      url: "/dlArrGrade/list",
      data
    });
  }
  //
  export function listByPage(data){
    return request({
      method: "post",
      url: "dlArrBase/listByPage",
      data
    });
  }
  
  //更新数据
  export function update(data){
    return request({
      method: "put",
      url: "/dlArrangingCourse/update",
      data
    });
  }
//根据id删除多个内容
export function dele(data){
  return request({
    method: "delete",
    url: "/dlArrangingCourse/delete",
    data
  });
}
//获取

export function listByPagePlan(data){
  return request({
    method: "post",
    url: "/dlExamPlan/listByPage",
    data
  });
}
//删除考试管理的列表
export function testdelete(data){
  return request({
    method: "delete",
    url: "/dlExamPlan/delete",
    data
  });
}
//获取教师资料
export function testlistByPage(data){
  return request({
    method: "post",
    url: "/dlRoom/listByPage",
    data
  });
}