<script setup lang="ts">
// const showModal = $ref(false)
import type { FormInst, FormItemRule } from 'naive-ui'
import { addUser } from '~/api'
import type { UserInfo } from '~/types'

const props = defineProps({
  show: Boolean,
  mode: String,
  user: {},
})
const emit = defineEmits(['update:show'])
const userValue = toReactive(props.user as UserInfo)
const { user } = toRefs(props)
const formRef = ref<FormInst | null>(null)
const isEdit = computed(() => props.mode === 'edit')
// const userValue = reactive({
//   id: 0,
//   username: '',
//   nickname: '',
//   password: '',
// })
const message = useMessage()
const rules = {
  nickname: {
    required: true,
    message: '请输入昵称',
    trigger: 'blur',
    validator(rule: FormItemRule, value: string) {
      if (!value)
        return new Error('需要年龄')

      return true
    },
  },
  username: {
    required: true,
    message: '请输入用户名',
    trigger: ['input', 'blur'],
  },
  password: {
    required: true,
    message: '请输入密码',
    trigger: ['blur'],
  },
}
const handelClose = () => {
  emit('update:show', false)
}
const handelClick = () => {
  if (isEdit.value) {
    // 编辑用户
    console.log(user)
  }
  else {
    // 添加用户
    formRef.value?.validate((errors) => {
      if (!errors) {
        console.log(userValue)
        addUser(userValue).then((res) => {
          console.log(res)
          if (res.data.code === 200) {
            message.success('添加成功')
            handelClose()
          }
          else {
            message.error(res.data.msg)
          }
        })
      }
      else {
        console.log(errors)
        message.error('不好')
      }
    })
  }
}
const handelReset = () => {
  userValue.nickname = ''
  userValue.username = ''
  userValue.password = ''
}
</script>

<template>
  <n-modal
    :show="props.show" class="custom-card" preset="card" :title="isEdit ? '编辑用户' : '添加用户'" :style="{ width: '600px' }" size="huge"
    :bordered="false" @close="handelClose"
  >
    <n-form ref="formRef" :label-width="80" :model="user" label-placement="left" :rules="rules">
      <n-form-item v-if="isEdit" label="ID" path="id">
        <n-input-number v-model:value="user.id" placeholder="输入姓名" disabled :show-button="false" />
      </n-form-item>
      <n-form-item label="昵称" path="nickname">
        <n-input v-model:value="user.nickname" placeholder="输入昵称" />
      </n-form-item>
      <n-form-item label="用户名" path="username">
        <n-input v-model:value="user.username" placeholder="输入用户名" />
      </n-form-item>
      <n-form-item v-if="!isEdit" label="密码" path="password">
        <n-input v-model:value="user.password" placeholder="输入密码" />
      </n-form-item>
    </n-form>
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
