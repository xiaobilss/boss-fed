import request from '@/uitls/request'

// 查询所有用户角色
export const getAllRole = () => {
  return request({
    method: 'GET',
    url: '/boss/role/all'
  })
}

// 保存或者更新角色
export const saveUpdate = (data: any) => {
  return request({
    method: 'POST',
    url: '/boss/role/saveOrUpdate',
    data
  })
}

// 查询用户角色
export const seleteRole = (id: string | number) => {
  return request({
    method: 'GET',
    url: `/boss/role/${id}`
  })
}

export const delRole = (id: string | number) => {
  return request({
    method: 'DELETE',
    url: `/boss/role/${id}`
  })
}

// 查询
export const getRolePages = (data: any) => {
  return request({
    method: 'POST',
    url: 'boss/role/getRolePages',
    data
  })
}
