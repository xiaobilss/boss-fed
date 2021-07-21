<template>
  <div>
    <el-card>
      <div slot="header" class="clearfix">
        <span>{{ course.courseName }}</span>
      </div>
      <el-tree
        :data="sections"
        :props="defaultProps"
        draggable
        :allow-drop="allowDrop"
        @node-drop="handleSort"
        >
        <div class="inner" slot-scope="{ node, data }">
          <span>{{ node.label }}</span>
          <span v-if='data.sectionName' class="action">
            <el-button @click.stop="classHoourClick(data)">编辑</el-button>
            <el-button @click.stop="addclassHoourClick(data)"  type="primary">添加课时</el-button>
            <el-select  placeholder="请选择" @change="hourClick(data)"  v-model="data.status">
              <el-option label="已隐藏" :value="0"></el-option>
              <el-option label="待更新" :value="1"></el-option>
              <el-option label="已更新" :value="2"></el-option>
            </el-select>
          </span>
          <span v-if='data.theme' class="action">
            <el-button @click="editLessonClick(data, node.parent.data)">编辑</el-button>
            <el-button
              type="success"
              @click="$router.push({
                name: 'course-video',
                params: {
                  courseId
                }
                })">上传视频</el-button>
            <el-select
              placeholder="请选择"
              @change="handleThemeClick(data)"
              v-model="data.status">
              <el-option label="已隐藏" :value="0"></el-option>
              <el-option label="待更新" :value="1"></el-option>
              <el-option label="已更新" :value="2"></el-option>
            </el-select>
          </span>
        </div>
      </el-tree>
    </el-card>
    <el-dialog
      title="添加课程阶段"
      :visible.sync="isClassHourVisible">
      <el-form ref='section' label-width="80px">
        <el-form-item label="课程名称">
          <el-input :value="course.courseName" disabled></el-input>
        </el-form-item>
        <el-form-item label="章节名称">
          <el-input v-model="section.sectionName" disabled autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="章节描述">
          <el-input type="textarea" v-model="section.description"></el-input>
        </el-form-item>
        <el-form-item label="章节排序">
          <el-input-number v-model="section.orderNum" label="描述文字"></el-input-number>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isClassHourVisible = false">取 消</el-button>
        <el-button type="primary" @click="hanldHourClick">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="添加课时"
      :visible.sync="isaddHourVisible"
    >
      <el-form ref="lesson" :model="lesson" label-width="100px">
        <el-form-item label="课程名称">
          <el-input
            :value="course.courseName"
            autocomplete="off"
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item label="章节名称" prop="sectionName">
          <el-input :value="lesson.sectionName" disabled autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="课时名称" prop="sectionName">
          <el-input v-model="lesson.theme" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="时长" prop="description">
          <el-input v-model.number="lesson.duration" type="number" autocomplete="off">
            <template slot="append">分钟</template>
          </el-input>
        </el-form-item>
        <el-form-item label="是否开放试听" prop="description">
          <el-switch v-model="lesson.isFree"></el-switch>
        </el-form-item>
        <el-form-item label="课时排序" prop="description">
          <el-input-number v-model="lesson.orderNum"></el-input-number>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isAddLessonShow = false">取 消</el-button>
        <el-button type="primary" @click="handleAddLesson">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {
  getSectionAndLesson,
  saveOrUpdateSection,
  saveOrUpdateLesson,
  getBySectionId
} from '@/services/course-section'
import { saveOrUpdate } from '../../services/course'
import { Form } from 'element-ui'

export default Vue.extend({
  name: 'CourseSection',
  props: {
    courseId: {
      type: [String, Number],
      required: true
    }
  },
  data () {
    return {
      sections: [],
      defaultProps: {
        children: 'lessonDTOS',
        label (data: any) {
          return data.sectionName || data.theme
        }
      },
      isClassHourVisible: false,
      isaddHourVisible: false,
      isLoading: false,
      lesson: {
        sectionName: '',
        sectionId: undefined,
        courseId: this.courseId,
        theme: '',
        duration: 0,
        isFree: false,
        orderNum: 0,
        status: 0
      },
      course: {},
      section: {}
    }
  },
  created () {
    this.loaderLesson()
    this.loadergetCourseById()
  },
  methods: {
    // 课时
    async classHoourClick (section: any) {
      const { data } = await getBySectionId(section.id)
      if (data.code === '000000') {
        this.section = data.data
      }
      this.isClassHourVisible = true
    },
    async addclassHoourClick (data: any) {
      // console.log('isaddHourVisible=> ', data)
      this.lesson = {
        sectionName: data.sectionName,
        sectionId: data.id,
        courseId: this.courseId,
        theme: '',
        duration: 0,
        isFree: false,
        orderNum: 0,
        status: 0
      }
      this.isaddHourVisible = true
    },
    editLessonClick (data:any, node: any) {
      this.lesson = data
      this.lesson.sectionName = node.sectionName
      this.isaddHourVisible = true
    },
    async handleThemeClick (sData:any) {
      const { data } = await saveOrUpdateLesson(sData)
      if (data.code === '000000') {
        this.$message.success(data.mesg)
      }
    },
    async handleAddLesson () {
      await saveOrUpdateLesson(this.lesson)
      this.$message.success('操作成功')
      this.loaderLesson()
      this.isaddHourVisible = false
    },
    async hanldHourClick () {
      const { data } = await saveOrUpdateSection(this.section)
      if (data.code === '000000') {
        (this.$refs.section as Form).resetFields()
        this.$message.success(data.mesg)
        this.isClassHourVisible = false
        console.log(this.section)
      }
      // (this.$refs[section] as Form)
    },
    async hourClick (section:any) {
      console.log('111=> ', section)
      const { data } = await saveOrUpdateSection(section)
      if (data.code === '000000') {
        this.$message.success(data.mesg)
      }
    },
    async loadergetCourseById () {
      const { data } = await saveOrUpdate(this.courseId)
      if (data.code === '000000') {
        this.course = data.data
      }
    },
    async loaderLesson () {
      const { data } = await getSectionAndLesson(this.courseId)
      // console.log('loaderLesson=>', data)
      if (data.code === '000000') {
        this.sections = data.data
      }
      console.log('sections=>', this.sections)
    },
    allowDrop (draggingNode:any, dropNode:any, type:any) {
      return draggingNode.data.sectionId === dropNode.data.sectionId && type !== 'inner'
    },
    async handleSort (draggingNode:any, dropNode:any, type:any, event: any) {
      // console.log(123)
      // console.log('draggingNode= > ', draggingNode.data.lessonDTOS)
      console.log('dropNode= > ', dropNode.parent)
      try {
        await Promise.all(
          dropNode.parent.childNodes.map((item:any, index:number) => {
            if (item.data.lessonDTOS) {
              // 阶段
              return saveOrUpdateSection({
                id: item.data.id,
                orderNum: index + 1
              })
            } else {
              // 课时
              return saveOrUpdateLesson({
                id: item.data.id,
                orderNum: index + 1
              })
            }
          })
        )
        this.$message.success('排序成功')
      } catch (error) {
        console.log(error)
        this.$message.error('排序失败')
      }
    }
  }
})
</script>

<style scoped>
.inner{
  display: flex;
  flex: 1;
  justify-content: space-between;
  align-items: center;
  padding: 5px;
}
::v-deep .el-tree-node__content {
  height: auto;
}
::v-deep .el-select{
  margin-left: 10px;
  width: 88px;
}
</style>
