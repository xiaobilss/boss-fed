<template>
  <div class="resource">
    <el-card class="box-card">
      <el-form :inline="true" :model="form" ref="form" class="demo-form-inline">
        <el-form-item label="资源名称" prop="name">
          <el-input v-model="form.name" placeholder="资源名称"></el-input>
        </el-form-item>
        <el-form-item label="资源路径" prop="url">
          <el-input v-model="form.url" placeholder="资源路径"></el-input>
        </el-form-item>
        <el-form-item label="资源分类" prop="categoryId">
          <el-select v-model="form.categoryId" clearable  placeholder="请选择资源分类">
            <el-option
              v-for="item in resourceCategorys"
              :key='item.id'
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="onSubmit"
            :disabled="isLoading"
          >
            查询
          </el-button>
          <el-button  @click="resetForm()" :disabled="isLoading">重置</el-button>
        </el-form-item>
      </el-form>

      <div class="dv-btn">
         <el-button plain :disabled="isLoading" @click="AddResource">添加资源</el-button>
          <el-button plain :disabled="isLoading" @click="AddCategory">资源分类</el-button>
      </div>
      <el-table
        :data="resources"
        show-header="true"
        stripe
        border
        style="width: 100%; margin-bottom: 20px"
        v-loading="isLoading"
        >
        <!-- type="index" -->
        <el-table-column
          align='center'
          prop="id"
          width="100"
          label="编号">
        </el-table-column>
        <el-table-column
          prop="name"
          align='center'
          label="资源名称"
          min-width="150">
        </el-table-column>
        <el-table-column
          align='center'
          prop="url"
          label="资源路径"
          min-width="150">
        </el-table-column>
        <el-table-column
          prop="description"
          align='center'
          label="描述"
          min-width="150">
        </el-table-column>
        <el-table-column
          label="添加时间"
          align='center'
          min-width="150">
          <template slot-scope="scope">
            <span >
              {{scope.row.createdTime | date}}
            </span>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          align='center'
          min-width="150">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEdit(scope.row)">编辑</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.row)">删除</el-button>
            </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :disabled="isLoading"
        :current-page.sync="form.current"
        :page-sizes="[2, 5, 10, 20]"
        :page-size="form.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </el-card>
  </div>
</template>

<script lang="ts">
import { getResourcePages, getResourceCategory } from '@/services/resource'
import { Form } from 'element-ui'
import Vue from 'vue'

export default Vue.extend({
  name: 'ResourceIndex',
  data () {
    return {
      form: {
        current: 1,
        size: 2,
        total: 0,
        categoryId: null
      },
      resources: [],
      total: 0,
      resourceCategorys: [],
      isLoading: true
    }
  },
  // filters: {
  //   date (value: string) {
  //     return value + '11111'
  //   }
  // },
  created () {
    this.loaderResources()
    this.loaderResourceCategory()
  },
  methods: {
    AddResource () {
      this.$message.info('待完成')
    },
    AddCategory () {
      this.$message.info('待完成')
      // this.$router.push({
      //   name: 'resource-category'
      // })
    },
    async loaderResourceCategory () {
      const { data } = await getResourceCategory()
      console.log('ResourceCategory => ', data)
      if (data.code === '000000') {
        this.resourceCategorys = data.data
      }
    },
    onSubmit () {
      console.log('onSubmit')
      this.form.current = 1
      this.loaderResources()
    },
    resetForm () {
      (this.$refs.form as Form).resetFields()
    },
    async loaderResources () {
      this.isLoading = true
      const { data } = await getResourcePages(this.form)
      console.log('getResourcePages => ', data)
      if (data.code === '000000') {
        this.resources = data.data.records
        this.total = data.data.total
      }
      this.isLoading = false
    },
    handleEdit (item: any) {
      this.$message.info('待完成')
      console.log('handleEdit')
    },
    handleDelete (item: any) {
      this.$message.info('待完成')
      console.log('handleDelete')
    },
    handleSizeChange (val: number) {
      console.log(`每页 ${val} 条`)
      this.form.size = val
      this.form.current = 1
      this.loaderResources()
    },
    handleCurrentChange (val: number) {
      console.log(`当前页: ${val}`)
      this.form.current = val
      this.loaderResources()
    }
  }
})
</script>

<style lang="scss" scoped>
.dv-btn{
  margin-top: 20px;
  margin-bottom: 30px;
}
</style>
