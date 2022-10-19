<script setup lang="ts">
// const showModal = $ref(false)
import type { FormInst, FormItemRule } from 'naive-ui'
import { addUser, changPwUser, updateUser } from '~/api'
import type { UserInfo } from '~/types'

const { mode, user, show } = defineProps<{
  show: boolean
  mode: string
  user: UserInfo
}>()
const emit = defineEmits(['update:show', 'refresh'])
const formRef = ref<FormInst | null>(null)
const isEdit = computed(() => mode === 'edit')
const modelTitle = computed(() => {
  if (mode === 'add')
    return '添加用户'
  if (mode === 'edit')
    return '编辑用户'
  if (mode === 'changpw')
    return '更改密码'
  else
    return '？？？'
})
let userValue = $ref({} as UserInfo)
watchEffect(() => {
  // 会在 props 变化时重新赋值
  userValue = { ...user }
})

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
  if (mode === 'edit') {
    // 编辑用户
    console.log(userValue)
    formRef.value?.validate((errors) => {
      if (!errors) {
        console.log(userValue)
        updateUser(userValue).then((res) => {
          console.log(res)
          if (res.data.code === 200) {
            message.success('更新成功')
            emit('refresh')
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
  else if (mode === 'add') {
    // 添加用户
    formRef.value?.validate((errors) => {
      if (!errors) {
        console.log(userValue)
        addUser(userValue).then((res) => {
          console.log(res)
          if (res.data.code === 200) {
            message.success('添加成功')
            emit('refresh')
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
  else if (mode === 'changpw') {
    changPwUser(userValue).then((res) => {
      if (res.data.code === 200) {
        message.success('更改成功')
        userValue.password = ''
        handelClose()
      }
      else {
        message.error(res.data.msg)
      }
    })
  }
}
const handelReset = () => {
  if (!isEdit)
    userValue.username = ''
  userValue.nickname = ''
  userValue.password = ''
  userValue.signature = ''
}
</script>

<template>
  <n-modal
    :show="show" class="custom-card" preset="card" :title="modelTitle"
    :style="{ width: '600px' }" size="huge" :bordered="false" @close="handelClose"
  >
    <n-form ref="formRef" :label-width="80" :model="userValue" label-placement="left" :rules="rules">
      <n-form-item v-if="mode === 'edit' || mode === 'changpw'" label="ID" path="id">
        <n-input-number v-model:value="userValue.id" placeholder="ID" disabled :show-button="false" />
      </n-form-item>
      <n-form-item label="用户名" path="username">
        <n-input v-model:value="userValue.username" placeholder="输入用户名" :disabled="mode === 'edit' || mode === 'changpw'" />
      </n-form-item>
      <n-form-item label="昵称" path="nickname">
        <n-input v-model:value="userValue.nickname" placeholder="输入昵称" :disabled="mode === 'changpw'" />
      </n-form-item>
      <n-form-item v-if="mode === 'edit'" label="签名" path="signature">
        <n-input v-model:value="userValue.signature" placeholder="输入签名" />
      </n-form-item>
      <n-form-item v-if="mode === 'add' || mode === 'changpw'" label="密码" path="password">
        <n-input v-model:value="userValue.password" placeholder="输入密码" />
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
