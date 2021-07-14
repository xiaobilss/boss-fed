<template>
  <div class="menu-create">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>{{isEdit ? '编辑菜单' : '菜单添加'}}</span>
      </div>
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="菜单名称" placeholder="请输入菜单名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="菜单路径" placeholder="请输入菜单路径">
          <el-input v-model="form.href"></el-input>
        </el-form-item>
        <el-form-item label="上级菜单">
          <el-select v-model="form.parentId" placeholder="请选择上级菜单">
            <el-option
              :value="parentMenuList[0].id"
              :label="parentMenuList[0].name"
            >
            </el-option>
            <el-option
              v-for="item in parentMenuList"
              :key='item.id'
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="form.description" placeholder="请输入描述"></el-input>
        </el-form-item>
        <el-form-item label="前置图标">
          <el-input v-model="form.icon" placeholder="请输入前置图标"></el-input>
        </el-form-item>
        <el-form-item label="是否显示">
          <el-radio-group v-model="form.shown">
            <el-radio :label="true">是</el-radio>
            <el-radio :label="false">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="排序">
          <el-input-number v-model="form.orderNum" :min="1" :max="10" label="描述文字"></el-input-number>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit">提交</el-button>
            <el-button v-if="!isEdit">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { createMenu, getMenuInfo } from '@/services/menu'

export default Vue.extend({
  name: 'MenuCreate',
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      form: {
        name: '',
        href: '',
        parentId: 1,
        description: '',
        icon: '',
        shown: true,
        orderNum: 0
      },
      parentMenuList: []
    }
  },
  created () {
    this.getMenuInfo()
  },
  methods: {
    async onSubmit () {
      const { data } = await createMenu(this.form)
      if (data.code === '000000') {
        this.$message.success(data.mesg)
        return this.$router.back()
      }
      this.$message.error(data.mesg)
    },
    async getMenuInfo () {
      const { data } = await getMenuInfo(this.$route.params.id || -1)
      console.log('getMenuInfo =>', data)
      if (data.data.menuInfo != null) {
        this.form = data.data.menuInfo
      }
      if (data.code === '000000') {
        this.parentMenuList = data.data.parentMenuList
      }
    }
  }
})
</script>
