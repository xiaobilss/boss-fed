/** 阿里云上传 */
import request from '@/uitls/request'
// 图片上传
export const aliyunImagUploadAddressAdnAuth = () => {
  return request({
    method: 'GET',
    url: 'boss/course/upload/aliyunImagUploadAddressAdnAuth.json'
  })
}
// 视频上传
export const aliyunVideoUploadAddressAdnAuth = (params : any) => {
  return request({
    method: 'GET',
    url: 'boss/course/upload/aliyunVideoUploadAddressAdnAuth.json',
    params
  })
}
// 阿里云转码请求
export const aliyunTransCode = (data : any) => {
  return request({
    method: 'POST',
    url: 'boss/course/upload/aliyunTransCode.json',
    data
  })
}
// 阿里云转码进度
export const aliyunTransCodePercent = (lessonId : string | number) => {
  return request({
    method: 'GET',
    url: 'boss/course/upload/aliyunTransCodePercent.json',
    params: {
      lessonId
    }
  })
}
