<template>
  <el-card class="box-card">
      <div slot="header" class="clearfix">
      <span>分配权限</span>
    </div>
    <el-tree
      ref="menu-tree"
      node-key='id'
      :data="menus"
      :props="defaultProps"
      :default-checked-keys="checkedkeys"
      @node-click="handleNodeClick"
      show-checkbox
      default-expand-all
    ></el-tree>
    <div class="save">
      <el-button @click="esc">清空</el-button>
      <el-button type="primary" @click="save">保存</el-button>
    </div>
  </el-card>
</template>
<script lang="ts">
import { getMenuNodeList, allocateRoleMenus, getRoleMenus } from '@/services/menu'
import { Tree } from 'element-ui'
import Vue from 'vue'

export default Vue.extend({
  name: 'allocMenu',
  props: {
    roleId: {
      type: [String, Number],
      required: true
    }
  },
  data () {
    return {
      menus: [],
      defaultProps: {
        children: 'subMenuList',
        label: 'name'
      },
      checkedkeys: []
    }
  },
  created () {
    this.loaderMenus()
    this.loaderRoleMenus()
  },
  methods: {
    async loaderRoleMenus () {
      const { data } = await getRoleMenus(this.roleId)
      if (data.code === '000000') {
        this.getcheckedkeys(data.data)
      }
    },
    getcheckedkeys (menuList: any) {
      menuList.forEach((item:any) => {
        if (item.selected) {
          // this.checkedkeys.push(item.id as never)
          this.checkedkeys = [...this.checkedkeys, item.id] as any
        }
        if (item.subMenuList) {
          this.getcheckedkeys(item.subMenuList)
        }
      })
    },
    async loaderMenus () {
      const { data } = await getMenuNodeList()
      console.log('loaderMenus=>', data)
      if (data.code === '000000') {
        this.menus = data.data
      }
    },
    async save () {
      const menuIdList = (this.$refs['menu-tree'] as Tree).getCheckedKeys()
      console.log('menuIdList', menuIdList)
      const { data } = await allocateRoleMenus({
        roleId: this.roleId,
        menuIdList
      })
      if (data.code === '000000') {
        this.$message.success(data.mesg)
        this.$router.back()
      }
    },
    esc () {
      (this.$refs['menu-tree'] as Tree).setCheckedKeys([])
    }
  }
})
</script>

<style lang="scss" scoped>
.save {
  text-align: center;
  margin-top: 20px;
}
</style>
