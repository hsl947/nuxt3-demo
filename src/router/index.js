import { createRouter, createWebHistory } from 'vue-router'
import { getToken } from '@/utils/auth'
import useUserStore from '@/stores/modules/user.js'

const imgBase = import.meta.env.VITE_CDN_URL

const router = createRouter({
  history: createWebHistory(imgBase),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/index.vue')
    }
  ]
})

const needLogin = ['/aa']

router.beforeEach((to, from, next) => {
  // 返回 false 以取消导航
  // next()

  if (needLogin.includes(to.path)) {
    if (!getToken()) {
      next({ path: '/login', query: { }, replace: true })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
