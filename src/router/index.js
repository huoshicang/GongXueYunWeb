import {createRouter, createWebHistory} from 'vue-router'

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
        },
        meta: {requiresAuth: true, verify: ['admin']}
      },
      {
        path: 'My',
        name: '我的',
        components: {
          Cont: () => import(/* webpackChunkName: "index" */ '@/page/My/MyPage.vue'),
        },
        meta: {requiresAuth: true, verify: ['admin', 'user']}
      },
      {
        path: 'CheckInUser',
        name: '签到用户',
        components: {
          Cont: () => import(/* webpackChunkName: "index" */ '@/page/Check/CheckInUserPage.vue'),
        },
        meta: {requiresAuth: true, verify: ['admin']}
      },
      {
        path: 'Weekly',
        name: '周报',
        components: {
          Cont: () => import(/* webpackChunkName: "index" */ '@/page/Weekly/WeeklyPage.vue'),
        },
        meta: {requiresAuth: true, verify: ['admin', 'user']}

      },
      {
        path: 'Month',
        name: '月报',
        components: {
          Cont: () => import(/* webpackChunkName: "index" */ '@/page/Month/MonthPage.vue'),
        },
        meta: {requiresAuth: true, verify: ['admin', 'user']}
      },
    ]
  },
  {
    path: '/login',
    name: '登录',
    components: {
      App: () => import(/* webpackChunkName: "login" */ '@/views/LoginView.vue')
    },
    meta: {requiresAuth: false, verify: ['admin', 'user']}
  },
  {
    path: '/info',
    name: '信息',
    components: {
      App: () => import(/* webpackChunkName: "info" */ '@/views/InfoView.vue')
    },
    props: true,
    meta: {requiresAuth: false, verify: ['admin', 'user']}
  },
  {
    path: '/reset',
    name: '重置密码',
    components: {
      App: () => import(/* webpackChunkName: "reset" */ '@/views/ResetView.vue')
    },
    props: true,
    meta: {requiresAuth: false, verify: ['admin', 'user']}
  },
  {
    path: '/error',
    name: '错误',
    components: {
      App: () => import(/* webpackChunkName: "login" */ '@/views/ErrorView.vue')
    },
    meta: {requiresAuth: false, verify: ['admin', 'user']}
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const { role } = JSON.parse(sessionStorage.getItem('counter'))['UserData'];
    const canAccess = to.meta.verify.includes(role);
    canAccess ? next() : next({ path: "/error" });
  } else {
    next();
  }



})

export default router
