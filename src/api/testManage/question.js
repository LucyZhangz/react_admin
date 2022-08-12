import request from '../../utils/request'

// 获取列表
export async function getQusetionList(id) {
    let res = await request({
        method: 'post',
        url: '/dlQuestionBank/listByPage',
        data: {
            page: 1,
            limit: 10,
            content: '',
            gradeType: "",
            questionType: id,
            subjectId: ""
        }
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
