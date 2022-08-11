import request from '../../utils/request'
export async function getExamlist(){
    let res=await request({
        url:'/dlExamPlan/listByPage',
        method:"post",
        data:{
            page:1,
            limit:5,
        }
    })
    return res;
}
export async function addExamlist(data){
    let res=await request({
        url:'/dlExamPlan/add',
        method:"post",
        data,
    })
    return res;
}