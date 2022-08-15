import request from '../../utils/request'
// 获取所有菜单列表
export function getMenu(){
   return request({
        method:'get',
        url:'/sys/permission/tree',
    })
}
// 新增菜单列表

export function addMenu(data){
    return request({
         method:'post',
         url:'/sys/permission',
         data,
     })
 }
// 删除菜单中的某一项 /sys/permission
export function delMenu(pid){
    return request({
         method:'delete',
         url:'/sys/permission/'+pid,         
     })
 }
//  编辑菜单接口 /sys/permission
export function editMenu(data){
    return request({
         method:'put',
         url:'/sys/permission',
         data,         
     })
 }