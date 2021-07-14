<template>
  <div class="menu-create">
    <create-or-eit/>
  </div>
</template>

<script lang="ts">
import CreateOrEit from './components/CreateOrEdit.vue'
import Vue from 'vue'

export default Vue.extend({
  name: 'MenuCreate',
  components: {
    CreateOrEit
  }
})
</script>
