<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
// import Component from 'vue-class-component'
// import request from '@/uitls/request'
// request({
//   method: 'GET',
//   url: '/boss'
// }).then(res => {
//   console.log(res)
// })
export default Vue.extend({
})
</script>
<style lang="scss" scoped>
.btn {
  width: 100px;
  height: 30px;
  background-color: $danger-color;
  color: $warning-color;
}
</style>
