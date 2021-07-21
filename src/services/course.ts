import request from '@/uitls/request'
import { parse } from 'qs'

export const getQueryCourses = (data: any) => {
  return request({
    method: 'POST',
    url: 'boss/course/getQueryCourses',
    data
  })
}

export const changeState = (params:any) => {
  return request({
    method: 'GET',
    url: 'boss/course/changeState',
    params
  })
}

export const saveOrUpdateCourse = (data:any) => {
  return request({
    method: 'POST',
    url: 'boss/course/saveOrUpdateCourse',
    data
  })
}

export const uploadImage = (data:any, onUploadProgress?: (progressEvent : ProgressEvent) => void) => {
  return request({
    method: 'POST',
    url: 'boss/course/upload',
    data,
    onUploadProgress
  })
}

export const saveOrUpdate = (courseId: string|number) => {
  return request({
    method: 'GET',
    url: 'boss/course/getCourseById',
    params: {
      courseId
    }
  })
}
