import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: '主页',
    components: {
      App: () => import(/* webpackChunkName: "index" */ '@/views/IndexView.vue')
    },
    children: [
      {
        path: 'User',
        name: '用户管理',
        components: {
          Cont: () => import(/* webpackChunkName: "index" */ '@/page/User/UserPage.vue'),
        }
      },
      {
        path: 'CheckInUser',
        name: '签到用户',
        components: {
          Cont: () => import(/* webpackChunkName: "index" */ '@/page/Check/CheckInUserPage.vue'),
        }
      },
      {
        path: 'Weekly',
        name: '周报',
        components: {
          Cont: () => import(/* webpackChunkName: "index" */ '@/page/Weekly/WeeklyPage.vue'),
        }
      },
      {
        path: 'Month',
        name: '月报',
        components: {
          Cont: () => import(/* webpackChunkName: "index" */ '@/page/Month/MonthPage.vue'),
        }
      },
      {
        path: 'Quest',
        name: '任务',
        components: {
          Cont: () => import(/* webpackChunkName: "index" */ '@/page/Quest/QuestPage.vue'),
        }
      },
    ]
  },
  {
    path: '/login',
    name: '登录',
    components: {
      App: () => import(/* webpackChunkName: "login" */ '@/views/LoginView.vue')
    }
  },
  {
    path: '/info',
    name: '信息',
    components: {
      App: () => import(/* webpackChunkName: "info" */ '@/views/InfoView.vue')
    },
    props: true
  },
  {
    path: '/reset',
    name: '重置密码',
    components: {
      App: () => import(/* webpackChunkName: "info" */ '@/views/ResetView.vue')
    },
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
