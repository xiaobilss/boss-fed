import store from '@/store'
import axios from 'axios'
const request = axios.create({
  // 配置选项
  // baseURL:"http://edufront.lagou.com",
  // timeout:5000
})
// 请求拦截器
request.interceptors.request.use(function (config) {
  // console.log(config)
  const { user } = store.state
  if (user && user.access_token) {
    config.headers.Authorization = user.access_token
  }
  return config
}, function (error) {
  return Promise.reject(error)
})
// 响应拦截器
export default request
