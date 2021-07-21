<template>
  <div class="course">
    <course-list/>
  </div>
</template>

<script lang="ts">
import CourseList from './components/CourseList.vue'
import Vue from 'vue'

export default Vue.extend({
  name: 'CourseIndex',
  components: {
    CourseList
  }
})
</script>

<style lang="scss" scoped></style>
