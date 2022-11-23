<script setup lang="ts">
import { Buffer } from 'buffer'
import type { UploadCustomRequestOptions, UploadFileInfo } from 'naive-ui'
import { parseBuffer } from 'music-metadata'
import axios from '~/api'

window.Buffer = Buffer

const message = useMessage()
const customRequest = ({
  file,
  data,
  headers,
  withCredentials,
  action,
  onFinish,
  onError,
  onProgress,
}: UploadCustomRequestOptions) => {
  const formData = new FormData()
  if (data) {
    Object.keys(data).forEach((key) => {
      formData.append(
        key,
        data[key as keyof UploadCustomRequestOptions['data']],
      )
    })
  }
  const ext = file.name.split('.').pop()
  if (ext === 'mp3') {
    (async () => {
      console.log(await parseBuffer(Buffer.from(await file.file!.arrayBuffer())))
    })()
  }

  formData.append('file', file.file as File)
  // console.log(formData)
  axios.post('/api/song/uploads', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    onUploadProgress: (progressEvent) => {
      onProgress({ percent: Math.ceil((progressEvent.loaded / progressEvent.total! * 100 | 0)) })
    },
  }).then((res) => {
    if (res.data.code === 200) {
      onFinish()
      message.success('上传成功')
    }
    else {
      onError()
      message.error('上传失败')
    }
  }).catch((err) => {
    console.log(err)
    onError()
  })
}
const handleFinish = ({
  file,
  event,
}: {
  file: UploadFileInfo
  event?: ProgressEvent
}) => {
  console.log(file)
  file.thumbnailUrl = 'https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg'

  return file
}
const fileList = $ref<UploadFileInfo[]>([])
// function createThumbnailUrl(file: File | null): Promise<string> | undefined {
//   if (!file)
//     return undefined
//   console.log(fileList)

//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve(
//         'data:image/jpeg;base64,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',
//       )
//     }, 1000)
//   })
// }
</script>

<template>
  <n-layout :native-scrollbar="true" bordered>
    <n-card class="w-40 mt-20">
      <n-upload
        v-model:file-list="fileList"
        multiple
        directory-dnd
        :custom-request="customRequest"
        list-type="image"
        @finish="handleFinish"
      >
        <n-button>上传文件</n-button>
      </n-upload>
    </n-card>
  </n-layout>
</template>

<style scoped>

</style>
