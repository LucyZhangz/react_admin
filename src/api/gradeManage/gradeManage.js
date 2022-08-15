import request from "../../utils/request";
// 获取列表
export async function getGradejectList(data){
    let res=await request({
        url:'/dlGrade/listByPage',
        method:'post',
        data,
     })
     return res;
}
// 删除
export async function deleList(data){
    let res=await request({
        url:'/dlGrade/delete',
        method:'DELETE',
        data,
     })
     return res;
}
// 增加
export async function addList(data){
    let res=await request({
        url:'/dlGrade/add',
        method:'post',
        data,
     })
     return res;
}
// 编辑
export async function editList(data){
    let res=await request({
        url:'/dlGrade/update',
        method:'put',
        data,
     })
     return res;
}
// 获取年级二级菜单的数据
export async function getClassList(data){
    let res=await request({
        url:'sysDict/getTypeByNameAndValueLike',
        method:'post',
        data,
     })
     return res;
}