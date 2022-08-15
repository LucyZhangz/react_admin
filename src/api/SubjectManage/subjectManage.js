import request from "../../utils/request";
// 获取列表
export async function getSubjectList(data){
    let res=await request({
        url:'/dlSubject/listByPage',
        method:'post',
        data,
     })
     return res;
}
// 删除
export async function deleList(data){
    let res=await request({
        url:'/dlSubject/delete',
        method:'DELETE',
        data,
     })
     return res;
}
// 增加
export async function addList(data){
    let res=await request({
        url:'/dlSubject/add',
        method:'post',
        data,
     })
     return res;
}
// 编辑
export async function editList(data){
    let res=await request({
        url:'/dlSubject/update',
        method:'put',
        data,
     })
     return res;
}