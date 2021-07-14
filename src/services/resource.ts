import request from '@/uitls/request'
// 资源管理
export const getResourcePages = (data: any) => {
  return request({
    method: 'POST',
    url: '/boss/resource/getResourcePages',
    data
  })
}

export const getAllResource = () => {
  return request({
    url: 'boss/resource/getAll',
    method: 'GET'
  })
}
// 资源分类
export const getResourceCategory = () => {
  return request({
    url: 'boss/resource/category/getAll',
    method: 'GET'
  })
}
