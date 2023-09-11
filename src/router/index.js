import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: '主页',
    components: {
      App: () => import(/* webpackChunkName: "index" */ '@/views/IndexView.vue')
    },
  },
  {
    path: '/login',
    name: '登录',
    components: {
      App: () => import(/* webpackChunkName: "login" */ '@/views/LoginView.vue')
    }
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
