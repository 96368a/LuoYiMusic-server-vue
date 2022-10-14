import { createRouter, createWebHistory } from 'vue-router'
import routes from 'virtual:generated-pages'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach((to) => {
  if (to.path.startsWith('/home')) {
    console.log('进入主页')
    if (!localStorage.getItem('Ltoken')) {
      // useMessage().error("用户未登录")
      return ''
    }
  }
})

export default router
