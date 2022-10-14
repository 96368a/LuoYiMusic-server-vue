import { createApp } from 'vue'
import router from './router'
import App from './App.vue'

import '@unocss/reset/tailwind.css'
import './styles/main.css'
import 'uno.css'
console.log(import.meta)
const app = createApp(App)
app.use(router)
app.mount('#app')

