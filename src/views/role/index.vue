<template>
  <div class="role">
    <list/>
  </div>
</template>

<script lang="ts">
import List from './components/List.vue'
import Vue from 'vue'

export default Vue.extend({
  name: 'LoginIndex',
  components: {
    List
  }
})
</script>

<style lang="scss" scoped></style>
