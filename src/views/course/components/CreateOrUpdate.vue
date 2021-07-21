<template>
  <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-steps :active="active" simple>
          <el-step v-for="(item, index) in steps" :key="index" :title="item.title" :icon="item.icon" @click.native="active=index"></el-step>
        </el-steps>
      </div>
      <el-form label-width="100px" label-position="left">
        <div v-show="active === 0">
          <el-form-item label="课程名称">
            <el-input v-model="form.courseName"></el-input>
          </el-form-item>
          <el-form-item label="课程介绍">
            <el-input v-model="form.brief"></el-input>
          </el-form-item>
          <el-form-item label="课程概述">
            <el-input type="textarea" v-model="form.previewFirstField" placeholder="概述1"></el-input>
            <el-input type="textarea" v-model="form.previewSecondField" placeholder="概述2" style="margin-top: 20px"></el-input>
          </el-form-item>
          <el-form-item label="讲师姓名">
            <el-input v-model="form.teacherDTO.teacherName"></el-input>
          </el-form-item>
          <el-form-item label="讲师简介">
            <el-input v-model="form.teacherDTO.description"></el-input>
          </el-form-item>
          <el-form-item label="课程排序">
            <el-input-number v-model="form.sortNum" label="描述文字"></el-input-number>
          </el-form-item>
        </div>
        <div v-show="active === 1">
          <el-form-item label="课程封面">
            <upload-image v-model="form.courseListImg"></upload-image>
          </el-form-item>
          <el-form-item label="介绍封面">
            <upload-image v-model="form.courseImgUrl" :limit="5"></upload-image>
          </el-form-item>
        </div>
        <div v-show="active === 2">
          <el-form-item label="售卖价格">
            <el-input v-model.number="form.discounts" placeholder="请输入售卖价格">
              <template slot="append">元</template>
            </el-input>
          </el-form-item>
          <el-form-item label="商品原价">
            <el-input v-model.number="form.price" placeholder="请输入商品原价">
              <template slot="append">元</template>
            </el-input>
          </el-form-item>
          <el-form-item label="销量">
            <el-input v-model.number="form.sales" placeholder="请输入销量">
              <template slot="append">单</template>
            </el-input>
          </el-form-item>
          <el-form-item label="活动标签">
            <el-input v-model="form.discountsTag"></el-input>
          </el-form-item>
        </div>
        <div v-show="active === 3">
          <el-form-item label="限时秒杀开关">
            <el-switch
              v-model="form.activityCourse"
              active-color="#13ce66"
              inactive-color="#ff4949">
            </el-switch>
          </el-form-item>
          <template v-if="form.activityCourse">
            <el-form-item label="开始时间">
              <el-date-picker
                type="date"
                v-model="form.activityCourseDTO.beginTime"
                placeholder="选择日期时间"
                format="yyyy-MM-dd">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="开始时间">
                <el-date-picker
                  type="date"
                  v-model="form.activityCourseDTO.endTime"
                  placeholder="选择日期时间"
                  format="yyyy-MM-dd">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="秒杀价">
              <el-input placeholder="请输入秒杀价" v-model="form.activityCourseDTO.amount">
                <template slot="append">元</template>
              </el-input>
            </el-form-item>
            <el-form-item label="秒杀库存">
              <el-input placeholder="请输入秒杀库存" v-model="form.activityCourseDTO.stock">
                <template slot="append">个</template>
              </el-input>
            </el-form-item>
          </template>
        </div>
        <div v-show="active === 4">
          <el-form-item label="课程详情">
            <!-- <el-input type="textarea" v-model="form.courseDescriptionMarkDown"></el-input> -->
            <text-editor v-model="form.courseDescriptionMarkDown" />
          </el-form-item>
          <el-form-item label="立即发布">
            <el-switch
              v-model="form.status"
              active-color="#13ce66"
              inactive-color="#ff4949"
              :active-value="1"
              :inactive-value="0">
            </el-switch>
          </el-form-item>
          <el-form-item label="">
            <el-button
              type="paimary"
              style="margin-top: 12px;"
              @click="handleSave"
              >
              保存
            </el-button>
          </el-form-item>
        </div>
        <div v-if="active>=0 && active< steps.length-1">
          <el-form-item label="">
            <el-button style="margin-top: 12px;" @click="active++">下一步</el-button>
          </el-form-item>
        </div>
      </el-form>

  </el-card>
</template>

<script lang="ts">
import Vue from 'vue'
import {
  saveOrUpdateCourse,
  saveOrUpdate
} from '@/services/course'
import UploadImage from './UploadImage.vue'
import TextEditor from '@/components/TextEditor/index.vue'

export default Vue.extend({
  name: 'CreateOrUpdate',
  components: {
    UploadImage,
    TextEditor
  },
  props: {
    isEdit: {
      type: Boolean,
      default: false
    },
    couresId: {
      type: [String, Number]
    }
  },
  data () {
    return {
      active: 0,
      steps: [
        {
          title: '基本信息',
          icon: 'el-icon-edit'
        },
        {
          title: '课程封面',
          icon: 'el-icon-upload'
        },
        {
          title: '销售信息',
          icon: 'el-icon-edit'
        },
        {
          title: '秒杀活动',
          icon: 'el-icon-upload'
        },
        {
          title: '课程详情',
          icon: 'el-icon-picture'
        }
      ],
      form: {
        courseName: '',
        brief: '',
        teacherDTO: {
          teacherName: '',
          teacherHeadPicUrl: '',
          position: '',
          description: ''
        },
        courseDescriptionMarkDown: '',
        price: 0,
        discounts: 0,
        priceTag: '',
        discountsTag: '',
        isNew: true,
        isNewDes: '',
        courseListImg: '',
        courseImgUrl: '',
        sortNum: 0,
        previewFirstField: '',
        previewSecondField: '',
        status: 0,
        sales: 0,
        activityCourse: true,
        activityCourseDTO: {
          beginTime: '',
          endTime: '',
          amount: 0,
          stock: 0
        },
        autoOnlineTime: ''
      }
    }
  },
  created () {
    if (this.isEdit) {
      this.loaderCreateOrUpdate()
    }
  },
  methods: {
    async handleSave () {
      const { data } = await saveOrUpdateCourse(this.form)
      if (data.code === '000000') {
        this.$message.success(data.mesg)
        this.$router.back()
      } else {
        this.$message.error(data.mesg)
      }
    },
    async loaderCreateOrUpdate () {
      const { data } = await saveOrUpdate(this.couresId)
      console.log('loaderCreateOrUpdate=> ', data)
      if (data.code === '000000') {
        this.form = data.data
      }
    }
  }
})
</script>

<style scoped>
.el-steps {
  cursor: pointer;
}
</style>
