import request from '@/uitls/request'
// import qs from 'qs'
export const createMenu = (data: any) => {
  return request({
    method: 'POST',
    url: 'boss/menu/saveOrUpdate',
    data
  })
}
export const getMenuInfo = (id: string | number = -1) => {
  return request({
    method: 'GET',
    url: 'boss/menu/getEditMenuInfo',
    params: {
      id: id
    }
  })
}
// 所有菜单
export const getAllMenu = () => {
  return request({
    url: 'boss/menu/getAll',
    method: 'GET'
  })
}
// 删除菜单
export const deleteMenu = (id: number) => {
  return request({
    method: 'DELETE',
    url: `boss/menu/${id}`
  })
}
// 获取所有菜单并按层级展示
export const getMenuNodeList = () => {
  return request({
    method: 'GET',
    url: 'boss/menu/getMenuNodeList'
  })
}

// 角色分配菜单
export const allocateRoleMenus = (data: any) => {
  return request({
    method: 'POST',
    url: 'boss/menu/allocateRoleMenus',
    data
  })
}

// 获取角色拥有的菜单列表
export const getRoleMenus = (roleId: string | number) => {
  return request({
    method: 'GET',
    url: 'boss/menu/getRoleMenus',
    params: {
      roleId
    }
  })
}
