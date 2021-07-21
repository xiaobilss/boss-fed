<template>
  <div class="video">
    {{courseId}}
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>课程: xxx</span>
        <br>
        <span>阶段: xxx</span>
        <br>
        <span>课时: xxx</span>
        <br>
      </div>
      <el-form label-width="70px">
        <el-form-item label="视频上传">
          <input ref="video-file" type="file">
        </el-form-item>
        <el-form-item label="封面上传">
          <input ref="image-file" type="file">
        </el-form-item>
        <el-form-item label=''>
          <el-button type="primary" @click="handleUpload">开始上传</el-button>
          <el-button @click="$router.back()">返回</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { aliyunImagUploadAddressAdnAuth, aliyunVideoUploadAddressAdnAuth } from '@/services/aliyun_upload'

export default Vue.extend({
  name: 'video',
  props: {
    courseId: {
      type: [String, Number]
    }
  },
  data () {
    return {
      uploader: null,
      imageUrl: ''
    }
  },
  created () {
    this.initUplaoder()
  },
  computed: {
    image ():any {
      return this.$refs['image-file']
    },
    video (): any {
      return this.$refs['video-file']
    }
  },
  methods: {
    initUplaoder () {
      this.uploader = new window.AliyunUpload.Vod({
        // userID，必填，只需有值即可。
        userId: '1618139964448548',
        // 上传到视频点播的地域，默认值为'cn-shanghai'，//eu-central-1，ap-southeast-1
        region: '',
        // 分片大小默认1 MB，不能小于100 KB
        partSize: 1048576,
        // 并行上传分片个数，默认5
        parallel: 5,
        // 网络原因失败时，重新上传次数，默认为3
        retryCount: 3,
        // 网络原因失败时，重新上传间隔时间，默认为2秒
        retryDuration: 2,
        // 开始上传
        onUploadstarted: async function (uploadInfo: any) {
          console.log('onUploadstarted 开始上传', uploadInfo)
          // 上传后端
          let uploadAddressAndAuth
          if (uploadInfo.isImage) {
            // 图片
            const { data } = await aliyunImagUploadAddressAdnAuth()
            // console.log('image', data)
            uploadAddressAndAuth = data.data
            this.imageUrl = data.data.imageURL
          } else {
            // 视频
            const { data } = await aliyunVideoUploadAddressAdnAuth({
              fileName: uploadInfo.file.name,
              imageUrl: this.imageUrl
            })
            uploadAddressAndAuth = data.data
            console.log('video', data)
          }
          // 上传凭证 uploader.setUploadAuthAndAddress(uploadInfo, uploadAuth, uploadAddress,videoId);
          this.uploader.setUploadAuthAndAddress(
            uploadInfo,
            uploadAddressAndAuth.uploadAuth,
            uploadAddressAndAuth.uploadAddress,
            uploadAddressAndAuth.imageId || uploadAddressAndAuth.videoId
          )
        },
        // 文件上传成功
        onUploadSucceed: function (uploadInfo: any) {
          console.log('onUploadSucceed 文件上传成功:', uploadInfo)
        },
        // 文件上传失败
        onUploadFailed: function (uploadInfo: any, code: any, message: any) {
          console.log('onUploadFailed 文件上传失败:', uploadInfo, code, message)
        },
        // 文件上传进度，单位：字节
        onUploadProgress: function (uploadInfo: any, totalSize: any, loadedPercent: any) {
          console.log('onUploadProgress 文件上传进度，单位：字节', uploadInfo, totalSize, loadedPercent)
        },
        // 上传凭证或STS token超时
        onUploadTokenExpired: function (uploadInfo: any) {
          console.log('onUploadTokenExpired 上传凭证或STS token超时', uploadInfo)
        },
        // 全部文件上传结束
        onUploadEnd: function (uploadInfo: any) {
          console.log('onUploadEnd 全部文件上传结束', uploadInfo)
        }
      })
    },
    handleUpload () {
      const imageFiles = this.image.files[0]
      const videoFiles = this.video.files[0]
      const uploader = this.uploader as any
      uploader.addFile(imageFiles, null, null, null, '{ "Vod": {}}')
      uploader.addFile(videoFiles, null, null, null, '{ "Vod": {}}')
      uploader.startUpload()
    }
  }

})
</script>

<style scoped>
.clearfix span{
  margin-top: 10px;
}
::v-deep .el-input__inner{
  border: 0px;
}
</style>
