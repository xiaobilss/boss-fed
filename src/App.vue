<template>
  <div id="app">
    <h1>雨泣</h1>
    <!-- <button @click="text" class="btn">{{ a }}</button> -->
    <el-button>默认按钮</el-button>
    <router-view />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
// import Component from 'vue-class-component'
import request from '@/uitls/request'

request({
  method: 'GET',
  url: '/boss'
}).then(res => {
  console.log(res)
})

export default Vue.extend({
  data () {
    return {
      a: 12
    }
  },
  methods: {
    text () {
      console.log(this.a)
    }
  }
})
</script>
<!--
 <script>
// export default {
//   data () {
//     return {
//       a: '111',
//       b: 1,
//       c: {
//         name: 'zhangsan',
//         age: 12
//       }
//     }
//   },
//   methods: {
//     text () {
//       console.log(this.b.age)
//     }
//   }
// }
// </!-->
-->
<style lang="scss" scoped>

.btn {
  width: 1  00px;
  height: 30px;
  background-color: $danger-color;
  color: $warning-color;
}
</style>
