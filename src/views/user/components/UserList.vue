<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <el-form :model="form" ref="form" label-position="top">
        <el-form-item label="手机" prop="phone">
          <el-input v-model="form.phone"></el-input>
        </el-form-item>
         <el-form-item label="注册时间" prop="time">
            <el-date-picker
              v-model="form.time"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
         </el-form-item>
         <el-form-item>
             <el-button @click="resetForm()">重置</el-button>
             <el-button type="primary" @click="submitForm()">查询</el-button>
         </el-form-item>
      </el-form>
    </div>
    <el-table
        :data="userList"
        style="width: 100%">
        <el-table-column
          type="index"
          align="center"
          label="编号"
          min-width="150">
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          align="center"
          min-width="150">
        </el-table-column>
        <el-table-column
          prop="phone"
          label="手机号"
          align="center"
          min-width="150">
        </el-table-column>
        <el-table-column
          label="注册时间"
          align="center"
          min-width="150">
          <template slot-scope="scope">
            <span >
              {{scope.row.createdTime | date}}
            </span>
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          align="center"
          min-width="150">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="distribution(scope.row)">分配角色</el-button>
          </template>
        </el-table-column>
      </el-table>

    <div class="pagination">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="form.currentPage"
        :page-sizes="[2, 5, 10, 20]"
        :page-size="form.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>

    <el-dialog
        title="分配角色"
        v-if="dialogVisible"
        :visible.sync="dialogVisible"
        width="50%">
        <el-select v-model="roleIdList" multiple placeholder="请选择">
        <el-option
          v-for="item in roles"
          :key="item.id"
          :label="item.name"
          :value="item.id">
        </el-option>
      </el-select>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitClcik">确 定</el-button>
        </span>
      </el-dialog>
  </el-card>
</template>
<script lang="ts">
import { userList, getAllRole, allocateUserRoles, getUserRole } from '@/services/user'
import { Form } from 'element-ui'
import Vue from 'vue'

export default Vue.extend({
  name: 'UserList',
  data () {
    return {
      form: {
        phone: '',
        time: [],
        currentPage: 1,
        startCreateTime: '',
        endCreateTime: '',
        pageSize: 10
      },
      userList: [],
      dialogVisible: false,
      currentUser: {},
      roles: [],
      roleIdList: [],
      total: 0
    }
  },
  created () {
    this.loaderUserList()
    this.getAllRole()
  },
  methods: {
    handleSizeChange (val:any) {
      console.log(`每页 ${val} 条`)
      this.form.pageSize = val
      this.form.currentPage = 1
      this.loaderUserList()
    },
    handleCurrentChange (val:any) {
      console.log(`当前页: ${val}`)
      this.form.currentPage = val
      this.loaderUserList()
    },
    async getAllRole () {
      const { data } = await getAllRole()
      console.log('getAllRole => ', data)
      if (data.code === '000000') {
        this.roles = data.data
      }
    },
    async submitForm () {
      this.form.currentPage = 1
      this.loaderUserList()
    },
    resetForm () {
      (this.$refs.form as Form).resetFields()
    },
    async loaderUserList () {
      const { time } = this.form
      if (time) {
        this.form.startCreateTime = time[0]
        this.form.endCreateTime = time[1]
      } else {
        this.form.startCreateTime = ''
        this.form.endCreateTime = ''
      }

      const { data } = await userList(this.form)
      if (data.code === '000000') {
        this.userList = data.data.records
      }
      console.log('submitForm=> ', data)
      this.form.pageSize = data.data.size
      this.total = data.data.total
      // const { data } = await userList(this.form)
      // console.log('userList => ', data)
      // if (data.code === '000000') {
      //   this.userList = data.data.records
      // }
    },
    async distribution (role : any) {
      // this.$message.info('distribution')
      this.currentUser = role
      this.dialogVisible = true
      const { data } = await getUserRole((this.currentUser as any).id)
      if (data.code === '000000') {
        this.roleIdList = data.data.map((item:any) => item.id)
      }
    },
    async submitClcik () {
      const { data } = await allocateUserRoles({
        userId: (this.currentUser as any).id,
        roleIdList: this.roleIdList
      })
      if (data.code === '000000') {
        this.$message.success(data.mesg)
        this.dialogVisible = false
      }
    }
  }
})
</script>

<style lang="scss" scoped>
.pagination{
  margin-top: 30px;
  text-align: right;
}
</style>
