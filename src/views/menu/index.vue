<template>
  <div class="menu">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-button @click="addMenu">添加菜单</el-button>
        <!-- <span>卡片名称</span> -->
        <!-- <el-button style="float: let; padding: 3px 0" type="text">操作按钮</el-button> -->
      </div>
       <el-table
        :data="menus"
        stripe
        border
        style="width: 100%">
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
          label="菜单名称"
          min-width="150">
        </el-table-column>
        <el-table-column
          align='center'
          prop="level"
          label="菜单级数"
          min-width="150">
        </el-table-column>
        <el-table-column
          prop="icon"
          align='center'
          label="前端图标"
          min-width="150">
        </el-table-column>
        <el-table-column
          prop="orderNum"
          label="排序"
          align='center'
          min-width="150">
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
    </el-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { getAllMenu, deleteMenu } from '@/services/menu'

export default Vue.extend({
  name: 'MenuIndex',
  data () {
    return {
      menus: []
    }
  },
  created () {
    this.getAllMenus()
  },
  methods: {
    addMenu () {
      this.$router.push({
        name: 'menu-create'
      })
    },
    async getAllMenus () {
      const { data } = await getAllMenu()
      if (data.code === '000000') {
        this.menus = data.data
      }
      console.log('menus => ', this.menus)
    },
    handleEdit (item: any) {
      console.log('handleEdit')
      console.log(item.id)
      this.$router.push({
        name: 'menu-edit',
        params: {
          id: item.id
        }
      })
    },
    handleDelete (item: any) {
      console.log('handleDelete')
      console.log(item)
      this.$confirm('确定要删除吗?', '删除提示', {})
        .then(async () => {
          const { data } = await deleteMenu(item.id)
          console.log('confirm', data)
          if (data.code === '000000') {
            this.$message.success(data.mesg)
            this.getAllMenus()
          }
        })
        .catch(err => {
          console.log(err)
          this.$message.info('取消删除')
        })
    }
  }
})
</script>

<style lang="scss" scoped>
  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
</style>
