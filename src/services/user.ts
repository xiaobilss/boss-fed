// 用户登录
import request from '@/uitls/request'
import qs from 'qs'
// import store from '@/store'

interface User {
  phone: string
  password: string
}

export const login = (data: User) => {
  return request({
    method: 'POST',
    url: '/front/user/login',
    // headers: { 'content-type': 'application/x-www-form-urlencoded' },
    data: qs.stringify(data)
  })
}

// 用戶信息
export const userInfo = () => {
  return request({
    method: 'GET',
    url: 'front/user/getInfo'
    // headers: {
    //   Authorization: store.state.user.access_token
    // }
  })
}
