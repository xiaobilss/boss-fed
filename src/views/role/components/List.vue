<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
       <el-form ref="formData" :model="formData" label-width="80px">
        <el-form-item label="活动名称" prop="name">
          <el-input v-model="formData.name"></el-input>
        </el-form-item>
         <el-form-item>
          <el-button type="primary" @click="submitForm">查询搜索</el-button>
          <el-button @click="resetForm">重置</el-button>
        </el-form-item>
       </el-form>
      </div>
      <el-button class="addRole" type="primary" @click="addRole">添加角色</el-button>
      <el-table
        :data="roleList"
        style="width: 100%">
        <el-table-column
          align='center'
          type="index"
          label="编号">
        </el-table-column>
        <el-table-column
          prop="name"
          align='center'
          label="角色名称">
        </el-table-column>
        <el-table-column
          prop="description"
          label="描述"
          align='center'
          min-width="150">
        </el-table-column>
        <el-table-column
          align='center'
          label="添加时间"
          min-width="150">
          <template slot-scope="scope">
            <span >
              {{scope.row.createdTime | date}}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align='center'>
          <template slot-scope="scope" >
             <el-button
              size="mini"
              @click="distributionMenu(scope.row)">分配菜单</el-button>
            <el-button
              size="mini"
              @click="distributionResources(scope.row)">分配资源</el-button>
            <br>
            <el-button
              class="mtop"
              size="mini"
              @click="handleEdit(scope.row)">编辑</el-button>
            <el-button
              class="mtop"
              size="mini"
              type="danger"
              @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog
      :title="isEdit ? '编辑角色':'添加角色'"
      :visible.sync="dialogVisible"
      width="30%"
      center>
      <!-- <span>需要注意的是内容是默认不居中的</span> -->
      <!-- <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
      </span> -->
      <create-or-edit
        v-if="dialogVisible"
        :is-edit ="isEdit"
       @success="onSuccess"
       @cancel="dialogVisible = false"
       :role-id = 'roleId'
      />
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { getAllRole, delRole, getRolePages } from '@/services/role'
import CreateOrEdit from './CreateOrEdit.vue'
import Vue from 'vue'
import { Form } from 'element-ui'

export default Vue.extend({
  name: 'RoleList',
  components: {
    CreateOrEdit
  },
  data () {
    return {
      formData: {
        name: ''
      },
      roleList: [],
      dialogVisible: false,
      roleId: null,
      isEdit: false
    }
  },
  created () {
    this.getAllRole()
  },
  methods: {
    async getAllRole () {
      const { data } = await getAllRole()
      console.log('getAllRole=> ', data)
      if (data.code === '000000') {
        this.roleList = data.data
      }
    },
    async submitForm () {
      // this.$message.info('submitForm')
      const { data } = await getRolePages(this.formData)
      console.log('getRolePages => ', data)
      if (data.code === '000000') {
        this.$message.success(data.mesg)
        // this.roleList = []
        this.roleList = data.data.records
      }
    },
    resetForm () {
      (this.$refs.formData as Form).resetFields()
    },
    handleEdit (item : any) {
      this.roleId = item.id
      this.isEdit = true
      this.dialogVisible = true
    },
    async handleDelete (item : any) {
      const { data } = await delRole(item.id)
      if (data.code === '000000') {
        this.$message.success(data.mesg)
        this.getAllRole()
      }
      console.log('handleDelete=> ', data)
    },
    addRole () {
      this.isEdit = false
      this.dialogVisible = true
    },
    onSuccess () {
      this.dialogVisible = false
      this.getAllRole()
    },
    distributionMenu (item : any) {
      console.log(item.id)
      this.$router.push({
        name: 'alloc-menu',
        params: {
          roleId: item.id
        }
      })
    },
    distributionResources (item: any) {
      // console.log(item)
      this.$message.info('distributionResources')
    }
  }
})
</script>

<style lang="scss" scoped>
.addRole{
  margin-top: 20px;
  margin-bottom: 30px;
}
.mtop{
  margin-top: 10px;
}
</style>
