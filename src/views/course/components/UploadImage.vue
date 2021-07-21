<template>
  <div class="upload-image">
    <el-progress
      v-if="isProgress"
      type="circle"
      :percentage="percentage"
      :status="percentage === 100 ? 'success' : 'default'"
      >
      </el-progress>
    <el-upload
      v-else
      class="avatar-uploader"
      action="https://jsonplaceholder.typicode.com/posts/"
      :show-file-list="false"
      :before-upload="beforeAvatarUpload"
      :http-request="udpateImg">
      <img v-if="value" :src="value" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
  </div>
</template>
<script lang="ts">
import {
  uploadImage
} from '@/services/course'
import Vue from 'vue'

export default Vue.extend({
  name: 'UploadImage',
  props: {
    value: {
      type: String
    },
    limit: {
      type: Number,
      default: 2
    }
  },
  data () {
    return {
      percentage: 0,
      isProgress: false
    }
  },
  methods: {
    beforeAvatarUpload (file: any) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < this.limit

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error(`上传头像图片大小不能超过 ${this.limit}MB!`)
      }
      return isJPG && isLt2M
    },
    async udpateImg (option:any) {
      // console.log('otpion => ', option)
      this.isProgress = true
      const fd = new FormData()
      fd.append('file', option.file)
      const { data } = await uploadImage(fd, e => {
        // console.log(e.loaded)
        // console.log(e.total)
        // console.log(Math.floor(e.loaded / e.total * 100))
        this.percentage = Math.floor(e.loaded / e.total * 100)
      })
      if (data.code === '000000') {
        // this.form.courseImgUrl = data.data.name
        this.$emit('input', data.data.name)
        this.percentage = 0
        this.isProgress = false
      }
    }
  }
})
</script>
<style scoped>
::v-deep .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
::v-deep .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
