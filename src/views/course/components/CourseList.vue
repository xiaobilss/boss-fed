<template>
  <div class="courseLise">
    <el-card class="box-card">
        <div slot="header" class="clearfix">
        <span>数据筛选</span>
      </div>
      <el-form ref="form" :model="form" label-position="left" label-width="80px" >
        <el-form-item label="课程名称" prop="courseName">
          <el-input
            v-model="form.courseName"
            >
          </el-input>
        </el-form-item>
        <el-form-item label="状态" prop='status'>
          <el-select v-model="form.status" placeholder="全部">
            <el-option label="上架" value="1"></el-option>
            <el-option label="下架" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button @click="resetForm">重置</el-button>
          <el-button type="primary" @click="submitForm">查询</el-button>
        </el-form-item>
      </el-form>
    </el-card>

     <el-card class="box-card mtop">
      <div slot="header" class="clearfix">
        <span>查询结果:</span>
        <el-button style="float: right" class="btnprimary" type="primary" @click="addCurriculum">添加课程</el-button>
      </div>
      <el-table
        :data="couresList"
        style="width: 100%">
        <el-table-column
          prop="id"
          label="ID"
          min-width="150"
          align="center">
        </el-table-column>
        <el-table-column
          prop="courseName"
          label="课程名称"
          min-width="150"
          align="center">
        </el-table-column>
        <el-table-column
          prop="price"
          label="价格"
          min-width="150"
          align="center">
        </el-table-column>
        <el-table-column
          prop="sortNum"
          label="排序"
          min-width="150"
          align="center">
        </el-table-column>
        <el-table-column

          label="上架状态"
          min-width="150"
          align="center">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.status"
              active-color="#13ce66"
              inactive-color="#ff4949"
              :active-value="1"
              :inactive-value="0"
              :disabled = 'scope.row.isDisabled'
              @change="switchClick(scope.row)">
            </el-switch>
          </template>
        </el-table-column>
         <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.row)">编辑</el-button>
            <el-button
              size="mini"
              @click="handleAdministration(scope.row)">内容管理</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="form.currentPage"
          :page-sizes="[2, 5, 10, 20]"
          :page-size="form.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts">
import { getQueryCourses, changeState } from '@/services/course'
import { Form } from 'element-ui'
import Vue from 'vue'

export default Vue.extend({
  name: 'CourseLise',
  data () {
    return {
      form: {
        currentPage: 1,
        pageSize: 10,
        courseName: '',
        status: ''
      },
      couresList: [],
      total: 0
    }
  },
  created () {
    this.getQueryCourses()
  },
  methods: {
    addCurriculum () {
      this.$router.push({
        name: 'course-create'
      })
    },
    async getQueryCourses () {
      const { data } = await getQueryCourses(this.form)
      console.log('getQueryCourses => ', data)
      if (data.code === '000000') {
        // disabled
        data.data.records.forEach((item:any) => {
          item.isDisabled = false
        })
        this.couresList = data.data.records
        this.total = data.data.total
        this.form.currentPage = data.data.current
        this.form.pageSize = data.data.size
      }
    },
    resetForm () {
      (this.$refs.form as Form).resetFields()
    },
    submitForm () {
      console.log('submitForm=>', this.form)
      this.form.currentPage = 1
      this.getQueryCourses()
    },
    handleSizeChange (val:number) {
      console.log(`每页 ${val} 条`)
      this.form.pageSize = val
      this.form.currentPage = 1
      this.getQueryCourses()
    },
    handleCurrentChange (val:number) {
      console.log(`当前页: ${val}`)
      this.form.currentPage = val
      console.log('this.form=>', this.form)
      this.getQueryCourses()
    },
    handleEdit (item: any) {
      // console.log(item)
      this.$router.push({
        name: 'course-edit',
        params: {
          couresId: item.id
        }
      })
    },
    handleAdministration (item:any) {
      // console.log('handleAdministration')
      this.$router.push({
        name: 'course-section',
        params: {
          courseId: item.id
        }
      })
    },
    async switchClick (course:any) {
      course.isDisabled = true
      const { data } = await changeState({
        courseId: course.id,
        status: course.status
      })
      if (data.code === '000000') {
        this.$message.success(course.status === 0 ? '成功下架' : '成功上架')
      }
      course.isDisabled = false
    }
  }
})
</script>

<style lang="scss" scoped>
.mtop{
  margin-top: 20px;
  .clearfix{
    margin-bottom: 20px;
  }
}
.pagination{
  margin-top: 20px;
}

</style>
