<template>
  <div class="app-header">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/">活动管理</a></el-breadcrumb-item>
      <el-breadcrumb-item>活动列表</el-breadcrumb-item>
      <el-breadcrumb-item>活动详情</el-breadcrumb-item>
    </el-breadcrumb>
    <el-dropdown>
      <span class="el-dropdown-link">
        <el-avatar :size="size" :src="userInfo.portrait"></el-avatar>
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>{{userInfo.userName}}</el-dropdown-item>
        <el-dropdown-item divided @click.native="loginOut">退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script lang="ts">
import { userInfo } from '@/services/user'
import Vue from 'vue'

export default Vue.extend({
  name: 'AppHeader',
  data () {
    return {
      userInfo: {
        portrait: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
      },
      size: 40
    }
  },
  created () {
    this.getUserInfo()
  },
  methods: {
    async getUserInfo () {
      const { data } = await userInfo()
      this.userInfo = data.content
      console.log(this.userInfo)
    },
    loginOut () {
      this.$confirm('确定退出吗?', '退出提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.commit('setUser', null)
        this.$router.push({
          name: 'login'
        })
        this.$message({
          type: 'success',
          message: '退出成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消退出'
        })
      })
    }
  }

})

</script>

<style lang="scss" scoped>
.app-header{
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .el-dropdown-link{
    display: flex;
    align-items: center;
  }
}
</style>
