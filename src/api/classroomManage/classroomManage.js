import request from "../../utils/request";
export async function getClassList(data){
    let res=await request({
       url:'/dlRoom/listByPage',
       method:'post',
       data,
    })
    return res;
}
export async function deleList(data){
    let res=await request({
        url:'/dlRoom/delete',
        method:'DELETE',
        data,
     })
     return res;
}

export async function addList(data){
    let res=await request({
        url:'/dlRoom/add',
        method:'post',
        data,
     })
     return res;
}
export async function editList(data){
    let res=await request({
        url:'/dlRoom/update',
        method:'put',
        data,
     })
     return res;
}