import axios from 'axios'
const service = axios.create({
    baseURL: 'http://127.0.0.1:5173',
    // timeout: 1000 * 60 * 60,
})
// 添加请求拦截器
service.interceptors.request.use(function (config) {
    console.log(config);
    // 在请求发送之前给headers设置token
    // console.log(localStorage.getItem('VUE_ADMIN_TOKEN'));
    if (!config.url.includes("/sys/user/login")) {
        // config.headers.authorization= localStorage.getItem('VUE_ADMIN_TOKEN')
        // 给请求头设置token
    }
    return config;

}, function (error) { // 做一些请求错误的事情
    return Promise.reject(error);
});
// 添加响应拦截器
// service.interceptors.response.use(function (response) {
//     // console.log(response.status);
//     if (response.status == 200) {
//         // Message({
//         //     showClose: true,
//         //     message: '登录成功',
//         //     type: 'success'
//         // });
//     }
//     // 对响应数据执行操作
//     return response.data;
// }, function (error) {
//     // 对响应错误执行操作
//     return Promise.reject(error);
// });
export default service;