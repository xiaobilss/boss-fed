<template>
  <div ref="editor">
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import E from 'wangeditor'
import { uploadImage } from '@/services/course'
export default Vue.extend({
  name: 'TextEditor',
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      editor: null
    }
  },
  watch: {
    value () {
      (this.editor as any).txt.html(this.value)
    }
  },
  mounted () {
    this.initEditor()
  },
  methods: {
    initEditor () {
      const editor = new E(this.$refs.editor as any)
      this.editor = editor as any
      // editor.config.uploadImgServer = '/upload-img'
      editor.config.onchange = (html:string) => {
        // 第二步，监控变化，同步更新到 textarea
        this.$emit('input', html)
      }
      editor.create()
      // editor.txt.html(this.value)
      // editor.config.customUploadImg = async (resultFiles: any, insertImgFn: any) => {
      //   const fd = new FormData()
      //   fd.append('file', resultFiles[0])
      //   const { data } = await uploadImage(fd)
      //   console.log(data)
      //   insertImgFn(data.data.name)
      // }
    }
  }
})
</script>
