import request from '@/uitls/request'

export const getSectionAndLesson = (courseId: string | number) => {
  return request({
    method: 'GET',
    url: 'boss/course/section/getSectionAndLesson',
    params: {
      courseId
    }
  })
}

export const saveOrUpdateSection = (data: any) => {
  return request({
    method: 'POST',
    url: 'boss/course/section/saveOrUpdateSection',
    data
  })
}

// 课程课时相关请求模块
export const saveOrUpdateLesson = (data: any) => {
  return request({
    method: 'POST',
    url: 'boss/course/lesson/saveOrUpdate',
    data
  })
}

export const getBySectionId = (sectionId: string | number) => {
  return request({
    method: 'GET',
    url: 'boss/course/section/getBySectionId',
    params: {
      sectionId
    }
  })
}
