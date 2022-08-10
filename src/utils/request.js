import axios from 'axios'
// 导入进度条插件
import useNProgress from "../hook/useNprogress";
const NProgress = useNProgress();

const service = axios.create({
    baseURL: 'http://192.168.0.253:8091',
    timeout: 1000 * 60 * 60,
})
// 添加请求拦截器
service.interceptors.request.use(function (config) {
    NProgress.start();
    console.log(config);
    // 在请求发送之前给headers设置token
    // console.log(localStorage.getItem('VUE_ADMIN_TOKEN'));
    if (!config.url.includes("/sys/user/login")) {
        config.headers.authorization= localStorage.getItem('VITE_ADMIN_TOKEN')
        // 给请求头设置token
        
    }
    return config;

}, function (error) { // 做一些请求错误的事情
    return Promise.reject(error);
});
// 添加响应拦截器
service.interceptors.response.use(function (response) {
 
      // 关闭进度条
    NProgress.done();
    if (response.code === 0) {
    //   登录成功
    // <Route path='/home' element={<Home />}></Route>
    }

    // 对响应数据执行操作
    return response.data;
}, function (error) {
    // 对响应错误执行操作
    return Promise.reject(error);
});
export default service;