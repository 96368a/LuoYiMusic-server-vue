<script setup lang="ts">
import type { FormInst } from 'naive-ui'
import { useMessage } from 'naive-ui'
import axios from '~/api'
let hitokoto = $ref('永远不要高估一个后端程序员的审美  -- logs404')

const formRef = ref<FormInst | null>(null)
const message = useMessage()

onBeforeMount(() => {
  console.log(2333)
  axios.get('https://v1.hitokoto.cn/?c=c&c=a&max_length=15').then((res) => {
    // console.log(res);
    hitokoto = `${res.data.hitokoto}  -- ${res.data.from}`
  })
  axios.get('/api/user')
})

const formValue = $ref({
  user: {
    name: '',
    password: '',
  },
})

const rules = {
  user: {
    name: {
      required: true,
      message: '请输入用户名',
      trigger: 'blur',
    },
    password: {
      required: true,
      message: '请输入密码',
      trigger: 'blur',
    },
  },
}
function handleValidateClick() {
  formRef.value?.validate((errors) => {
    if (!errors) {
      message.success('Valid')
      localStorage.setItem('Ltoken', 'asdasdasd')
    }
    else {
      console.log(errors)
      message.error('Invalid')
    }
  })
}

function handleLogin() {
  formRef.value?.validate((errors) => {
    if (!errors) {
      axios.post('/user/login', {
        username: formValue.user.name,
        password: formValue.user.password,
      }).then((res) => {
        const { data } = res
        if (data.code === 200)
          message.success(data.msg)

        else
          message.error(data.msg)

        // console.log(res.data);
      })
    }
    else {
      console.log(errors)
      message.error('Invalid')
    }
  })
}
</script>

<template>
  <div flex justify-center items-center h-full>
    <div shadow-xl rounded-2 p-4 w-xs>
      <div i-pixelarticons-android text-4xl inline-block />

      <h2 text-xl>
        登录后台
      </h2>

      <p>
        <em text-sm op75>{{ hitokoto }}</em>
      </p>

      <div py-4 />

      <div>
        <n-form ref="formRef" label-placement="left" :label-width="80" :model="formValue" :rules="rules" size="medium">
          <n-form-item label="" path="user.name">
            <n-input v-model:value="formValue.user.name" placeholder="输入用户名" />
          </n-form-item>
          <n-form-item label="" path="user.password">
            <n-input
              v-model:value="formValue.user.password" type="password" placeholder="输入密码"
              @keyup.enter="handleLogin"
            />
          </n-form-item>
        </n-form>
      </div>

      <div flex justify-between px-12>
        <n-button type="tertiary" @click="handleValidateClick">
          Go
        </n-button>
        <n-button strong secondary type="tertiary">
          Cancel
        </n-button>
      </div>
    </div>
  </div>
</template>
