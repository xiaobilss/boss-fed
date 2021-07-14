import dayjs from 'dayjs'
import Vue from 'vue'

// {{ 表达式 | 过滤器 }}
Vue.filter('date', (value: any, format = 'YYYY-MM-DD HH:mm:ss') => {
  return dayjs(value).format(format)
})
