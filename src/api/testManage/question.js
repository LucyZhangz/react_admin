import request from '../../utils/request'

// 获取列表
export async function getQusetionList(id) {
    let res = await request({
        method: 'post',
        url: '/dlQuestionBank/listByPage',
        data: {
            page: 1,
            limit: 5,
            content: '',
            gradeType: "",
            questionType: id,
            subjectId: ""
        }
    })
    return res;
}

export async function getInitPage(pageObj) {
    let res = await request({
        method: 'post',
        url: '/dlQuestionBank/listByPage',
        data: pageObj
    })
    return res;
}
export async function getSubjectList(data) {
    let res = await request({
        method: 'post',
        url: 'dlCourse/getListByClassType',
        data,
    })
    return res;
}
//新增题目
export async function addTestList(params) {
    let res = await request({
        method: 'post',
        url: '/dlQuestionBank/add',
        data:params
    })
    return res;
}
export async function deleteTest(id) {
    let res = await request({
        method: 'delete',
        url: '/dlQuestionBank/delete',
        data:id
    })
    return res;
}
export async function searchTest(params) {
    let res = await request({
        method: 'post',
        url: '/dlQuestionBank/listByPage',
        data:params
    })
    return res;
}
