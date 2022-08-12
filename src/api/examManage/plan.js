import request from '../../utils/request'
export async function getExamlist(data){
   let res=await request({
    url:'/dlExamPlan/listByPage',
    method:"post",
    data,
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
export async function getTermlist(data){
    let res=await request({
        url:'/dlGrade/getGradeListByClassType',
        method:"post",
        data,
    })
    return res;
}