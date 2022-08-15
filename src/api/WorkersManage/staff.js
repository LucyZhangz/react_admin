import request from '../../utils/request'
// 获取所有部门列表
export function getDepartment(){
   return request({
        method:'get',
        url:'/sys/depts',
        params:{
            _:1660219238636,
        }
    })
}
// 获取用户表格数据
export function getUsers(data){
    return request({
         method:'post',
         url:'/sys/users',
         data,
     })
 }
//  新增职工
 export function addWorkers(data){
    return request({
         method:'post',
         url:'/sys/user',
         data,
     })
 }
//  删除职工 /sys/user
export function delWorkers(data){
    return request({
         method:'delete',
         url:'/sys/user',
         data,
     })
 }
//  编辑职工 
export function editWorkers(data){
    return request({
         method:'put',
         url:'/sys/user',
         data,
     })
 }
//  赋予角色
export function giveUsers(id){
    return request({
         method:'get',
         url:'/sys/user/roles/'+id,
     })
 }
 //  添加赋予角色
export function addUsers(id,data){
    return request({
         method:'put',
         url:'/sys/user/roles/'+id,
         data,
     })
 }