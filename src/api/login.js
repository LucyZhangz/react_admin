import request from '../utils/request'

// 登陆接口
export function userlogin(data){
    let res=request({
        method:'post',
        url:'/sys/user/login',
        data,
    })
    return res;
}
