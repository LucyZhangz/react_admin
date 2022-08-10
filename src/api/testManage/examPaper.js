import request from '../../utils/request'

// 获取列表
export async function getExamPaperList() {
    let res = await request({
        method: 'post',
        url: '/dlTest/listByPage',
        data:{
            page:1,
            limit:5
        }
    })
    return res;
}
