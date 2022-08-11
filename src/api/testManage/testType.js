import request from '../../utils/request'

// 获取列表
export async function getTypeTestList() {
    let res = await request({
        method: 'post',
        url: '/dlQuestionType/getList',
    })
    return res;
}
