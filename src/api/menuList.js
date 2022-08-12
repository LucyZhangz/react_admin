import request from '../utils/request'

export function getMenuList(){
   return request({
        method:'get',
        url:'/sys/home',
    })
}