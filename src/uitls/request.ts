import router from '@/router'
import store from '@/store'
import axios from 'axios'
import { Message } from 'element-ui'
import qs from 'qs'

const request = axios.create({
  // 配置选项
  // baseURL:"http://edufront.lagou.com",
  // timeout:5000
})

function redirectLogin () {
  router.push({
    name: 'login',
    query: {
      redirect: router.currentRoute.fullPath
    }
  })
}

function refreshToken () {
  return axios.create()({
    method: 'POST',
    url: '/front/user/refresh_token',
    data: qs.stringify({
      refreshtoken: store.state.user.refresh_token
    })
  })
}

// 请求拦截器
request.interceptors.request.use(function (config) {
  // 修改 config 配置信息来实现业务功能的统一处理
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
let isRfreshing = false // 控制刷新 token 的状态
let requests : any[] = [] // 存储刷新 token 期间多个网络请求(401无效token)
request.interceptors.response.use(
  // 请求成功状态
  function (response) {
    console.log(response)
    return response
  },
  // 失败状态
  async function (error) {
    if (error.response) {
      const { status } = error.response
      // token==>401 无效
      if (status === 401) {
        // 先判断有没有登录
        if (!store.state.user) {
          redirectLogin()
          return Promise.reject(error)
        }
        // 刷新 token
        if (!isRfreshing) {
          isRfreshing = true // 开启刷新的状态
          // 尝试获取新的token
          return refreshToken().then(res => {
            if (!res.data.success) {
              throw new Error('刷新 Token')
            }
            // 刷新 token 成功了
            store.commit('setUser', res.data.content)
            requests.forEach(item => item())
            requests = []
            return request(error.config)
          }).catch(err => {
            console.log(err)
            store.commit('setUser', null)
            return Promise.reject(error)
          }).finally(() => {
            isRfreshing = false
          })
        }
        return new Promise(resolve => {
          requests.push(() => {
            resolve(request(error.config))
          })
        })
      } else if (status !== 200) {
        // 没有请求成功,返回的状态
        Message.error(error.message)
      }
    } else if (error.request) {
      Message.error('请求超时,请刷新页面重试')
    } else {
      Message.error(`请求失败,${error.message}`)
    }
    return Promise.reject(error)
  }
)

export default request
