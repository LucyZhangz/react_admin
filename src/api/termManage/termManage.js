import request from "../../utils/request";
// 获取学期列表
export async function getTermList(data){
    let res=await request({
        url:'/dlTerm/listByPage',
        method:'post',
        data,
     })
     return res;
}
// 删除
export async function deleList(data){
    let res=await request({
        url:'/dlTerm/delete',
        method:'DELETE',
        data,
     })
     return res;
}
// 增加
export async function addList(data){
    let res=await request({
        url:'/dlTerm/add',
        method:'post',
        data,
     })
     return res;
}
// 编辑
export async function editList(data){
    let res=await request({
        url:'/dlTerm/update',
        method:'put',
        data,
     })
     return res;
}