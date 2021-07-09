<template>
  <div class="login">
    <div class="login-from">
      <h3>登 录</h3>
      <el-form
        :model="form"
        :rules="rules"
        ref="form"
      >
        <el-form-item  prop="phone">
          <el-input
            autocomplete="off"
            v-model="form.phone"
            prefix-icon="el-icon-mobile-phone"
            placeholder="请输入用户名">
          </el-input>
        </el-form-item>
        <el-form-item prop="password" >
          <el-input
            v-model="form.password"
            @keypress.native.enter="onSubmit"
            prefix-icon="el-icon-lock"
            placeholder="请输入密码"
           >
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            :loading="isLoginLoading"
            @click="onSubmit">
            登录
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { login } from '@/services/user'
import { Form } from 'element-ui'

export default Vue.extend({
  name: 'LoginIndex',
  data () {
    return {
      isLoginLoading: false,
      form: {
        phone: '18201288771',
        password: '111111'
      },
      rules: {
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { Pattern: /^1{\d{10}$/, message: '请输入正确的手机号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur' }
        ]
      }
    }
  },

  methods: {
    async onSubmit () {
      try {
        await (this.$refs.form as Form).validate()
        this.isLoginLoading = true
        const { data } = await login(this.form)
        if (data.state !== 1) {
          this.isLoginLoading = false
          return this.$message.error(data.message)
        }
        this.$store.commit('setUser', data.content)
        this.$router.push(this.$route.query.redirect as string || '/')
        this.isLoginLoading = false
        this.$message.success(data.message)
      } catch (err) {
        console.log('登录失败', err)
      }
    }
  }
})
</script>

<style lang="scss" scoped>
.login{
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  h3{
    text-align: center;
    margin-top: 10px;
  }
  .login-from{
    width: 300px;
    border-radius: 5px;
    background-color: #fff;
    padding: 20px;

    button{
      width: 100%;
      margin-top: 30px;
    }
  }
}
</style>
