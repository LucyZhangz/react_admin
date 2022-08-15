import request from '../../utils/request'

// 获取列表
// export async function getTypeTestList() {
//     let res = await request({
//         method: 'post',
//         url: '/dlQuestionType/getList',
//     })
//     return res;
// }
// 获取列表
export async function getTypeTestList(page,limit) {
    let res = await request({
        method: 'post',
        url: '/dlQuestionType/listByPage',
        data:{
            page,
            limit,
        }   
    })
    return res;
}
//添加类型
export async function addTypeTestList(data) {
    let res = await request({
        method: 'post',
        url: 'dlQuestionType/add',
        data,
    })
    return res;
}
export async function deleteTypeTestList(id) {
    let res = await request({
        method: 'delete',
        url: '/dlQuestionType/delete',
        data:id
    })
    return res;
}
export async function editTypeTestList(params) {
    let res = await request({
        method: 'put',
        url: '/dlQuestionType/update',
        data:params
    })
    return res;
}
export async function getEditDatabyId(id) {
    let res = await request({
        method: 'post',
        url: '/dlQuestionType/listByPage',
        data:id
    })
    return res;
}
