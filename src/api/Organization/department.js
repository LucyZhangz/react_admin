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
// 新增部门
export function addDepartment(data){
    return request({
         method:'post',
         url:'/sys/dept',
         data,
     })
 }
//  删除部门 /sys/dept/
export function delDepartment(id){
    return request({
         method:'delete',
         url:'/sys/dept/'+id,
     })
 }
//  编辑部门
export function editDepartment(data){
    return request({
         method:'put',
         url:'/sys/dept',
         data,
     })
 }