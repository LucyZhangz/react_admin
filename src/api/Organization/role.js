import request from '../../utils/request'
// 获取所有角色列表
export function getRole(data){
   return request({
        method:'post',
        url:'sys/roles',
        data,
    })
}
// 获取所有树行菜单
export function getMenuAll(){
    return request({
         method:'get',
         url:'/sys/permission/tree/all',
     })
 }
// 新增角色 /sys/role
export function addRole(data){
    return request({
         method:'post',
         url:'sys/role',
         data,
     })
 }
//  删除角色
export function delRole(id){
    return request({
         method:'delete',
         url:'sys/role/'+id,
     })
 }
//  获取角色权限 /sys/role
export function getRoleOne(id){
    return request({
         method:'get',
         url:'sys/role/'+id,
     })
 }
//  编辑角色 /sys/role
export function editRole(data){
    return request({
         method:'put',
         url:'sys/role',
         data,
     })
 }