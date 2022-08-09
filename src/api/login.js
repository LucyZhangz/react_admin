import request from '../utils/request'

// 登陆接口
export async function userlogin(data){
    let res=await request({
        method:'post',
        url:'/sys/user/login',
        data,
    })
    return res;
}

