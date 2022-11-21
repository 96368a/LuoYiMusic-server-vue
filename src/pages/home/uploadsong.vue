<script setup lang="ts">
import type { UploadCustomRequestOptions, UploadFileInfo } from 'naive-ui'
const message = useMessage()
const dialog = useDialog()
const defaultFileList: UploadFileInfo[] = [
  {
    id: 'razars',
    name: '刀',
    status: 'finished',
  },
  {
    id: 'edge',
    name: '锋',
    status: 'finished',
  },
]
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
  formData.append(file.name, file.file as File)
  lyla.post(action as string, {
    withCredentials,
    headers: headers as Record<string, string>,
    body: formData,
    onUploadProgress: ({ percent }) => {
      onProgress({ percent: Math.ceil(percent) })
    },
  })
    .then(({ json }) => {
      message.success(JSON.stringify(json))
      onFinish()
    })
    .catch((error) => {
      message.success(error.message)
      onError()
    })
}
</script>

<template>
  <n-layout :native-scrollbar="true" bordered>
    <n-card class="w-40 mt-20">
      <n-upload
        action="https://www.mocky.io/v2/5e4bafc63100007100d8b70f"
        :default-file-list="defaultFileList"
        :custom-request="customRequest"
      >
        <n-button>上传文件</n-button>
      </n-upload>
    </n-card>
  </n-layout>
</template>

<style scoped>

</style>
