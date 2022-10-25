<script setup lang="ts">
// const showModal = $ref(false)

const { show } = defineProps<{
  show: boolean
}>()
const emit = defineEmits(['update:show', 'refresh'])

const handelClose = () => {
  emit('update:show', false)
}
const handelClick = () => {
  console.log('click111')
}
const handelReset = () => {
  console.log('reset')
}
</script>

<template>
  <n-modal
    :show="show" class="custom-card" preset="card" title="上传歌曲"
    :style="{ width: '600px' }" size="huge" :bordered="false" @close="handelClose"
  >
    <n-upload
      multiple
      directory-dnd
      action="http://127.0.0.1:8888/api/song/uploads"
      :max="5"
    >
      <n-upload-dragger>
        <div style="margin-bottom: 12px">
          <n-icon size="48" :depth="3">
            <archive-icon />
          </n-icon>
        </div>
        <n-text style="font-size: 16px">
          点击或者拖动文件到该区域来上传
        </n-text>
        <n-p depth="3" style="margin: 8px 0 0 0">
          请不要上传敏感数据，比如你的银行卡号和密码，信用卡号有效期和安全码
        </n-p>
      </n-upload-dragger>
    </n-upload>
    <template #footer>
      <n-space>
        <n-button attr-type="button" type="primary" @click="handelClick">
          确定
        </n-button>
        <n-button attr-type="reset" type="warning" @click="handelReset">
          重置
        </n-button>
      </n-space>
    </template>
  </n-modal>
</template>

<style scoped>

</style>
