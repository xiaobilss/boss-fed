<template>
    <el-form>
      <el-form-item label="角色名称">
        <el-input v-model="role.name"></el-input>
      </el-form-item>
      <el-form-item label="角色编码">
        <el-input v-model="role.code"></el-input>
      </el-form-item>
      <el-form-item label="角色描述">
        <el-input v-model="role.description" rows=5 type="textarea"></el-input>
      </el-form-item>
      <el-form-item class="item-footer">
        <el-button @click="exit">取消</el-button>
        <el-button type="primary" @click="onSubmit">确认</el-button>
      </el-form-item>
    </el-form>
</template>

<script lang="ts">
import Vue from 'vue'
import { saveUpdate, seleteRole } from '@/services/role'

export default Vue.extend({
  name: 'CreateOrEdit',
  props: {
    roleId: {
      type: [String, Number]
    },
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      role: {
        name: '',
        code: '',
        description: ''
      }
    }
  },
  created () {
    if (this.isEdit) {
      this.getseleteRole()
    }
  },
  methods: {
    async getseleteRole () {
      const { data } = await seleteRole(this.roleId)
      this.role = data.data
    },
    exit () {
      this.$emit('cancel')
    },
    async onSubmit () {
      const { data } = await saveUpdate(this.role)
      if (data.code === '000000') {
        this.$message.success(data.mesg)
        this.$emit('success')
      }
    }
  }
})
</script>

<style scoped>
.item-footer >>> .el-form-item__content{
  text-align: center;
}
</style>
