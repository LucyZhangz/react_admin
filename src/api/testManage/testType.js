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
export async function getTypeTestList() {
    let res = await request({
        method: 'post',
        url: '/dlQuestionType/listByPage',
        data:{
            page:1,
            limit:20
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
