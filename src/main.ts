import { createApp } from 'vue'
import router from './router'
import App from './App.vue'

import 'uno.css'
import '@unocss/reset/normalize.css'
import './styles/main.css'

// 处理naiveui样式被覆盖的问题
const meta = document.createElement('meta')
meta.name = 'naive-ui-style'
document.head.appendChild(meta)

console.log(import.meta.env)

const app = createApp(App)
app.use(router)
app.mount('#app')

