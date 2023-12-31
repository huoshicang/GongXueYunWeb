<template>
  <div id="login">
    <a-typography-title>
      欢迎{{ title }}
    </a-typography-title>
    <n-card class="card">
      <a-alert v-if="title === '注册'" type="warning">建议注册的账号密码和工学云相同</a-alert>
      <n-tabs
        class="card-tabs"
        default-value="signin"
        size="large"
        animated
        pane-wrapper-style="margin: 0 -4px"
        pane-style="padding-left: 4px; padding-right: 4px; box-sizing: border-box;"
        @update:value="update">
        <n-tab-pane name="signin" tab="登录">
          <n-form ref="formLogin"
                  :rules="LogRules"
                  :model="LogFrom">
            <n-form-item label="用户名" path="login.userName">
              <n-input type="text" v-model:value="LogFrom.login.userName" placeholder="请输入用户名"/>
            </n-form-item>
            <n-form-item label="密码" path="login.passWord">
              <n-input type="password" show-password-on="click" v-model:value="LogFrom.login.passWord"
                       placeholder="请输入密码"/>
            </n-form-item>
          </n-form>
          <n-space vertical>
            <n-button type="primary" @click="LoginFun" block secondary strong>
              登录
            </n-button>
            <router-link to="/reset">
              <n-button type="primary" block secondary strong>
                重置密码
              </n-button>
            </router-link>
            <a-button type="primary" long @click="admin">管理员登录（有30%概率出现密码错误）</a-button>
            <a-button type="primary" long @click="users">用户登录</a-button>
            <a-button type="primary" long @click="reset">去重置密码的</a-button>
            <a-button type="primary" long @click="no">没有签到信息</a-button>
          </n-space>
        </n-tab-pane>
        <n-tab-pane name="signup" tab="注册">
          <n-form ref="formLogup"
                  :rules="LogRules"
                  :model="LogFrom">
            <n-form-item-row label="用户名" path="logup.userName">
              <n-input type="text" v-model:value="LogFrom.logup.userName" placeholder="请输入用户名"/>
            </n-form-item-row>
            <n-form-item-row label="手机号" path="logup.phone">
              <n-input type="text" v-model:value="LogFrom.logup.phone" placeholder="请输入手机号码"/>
            </n-form-item-row>
            <n-form-item-row label="密码" path="logup.passWord">
              <n-input type="password" show-password-on="click" v-model:value="LogFrom.logup.passWord"
                       placeholder="请输入密码"/>
            </n-form-item-row>
            <n-form-item-row label="重复密码" path="logup.repeatPassword">
              <n-input type="password" show-password-on="click" v-model:value="LogFrom.logup.repeatPassword"
                       placeholder="请重复密码"/>
            </n-form-item-row>
          </n-form>
          <n-button type="primary" block secondary strong @click="LogupFun">
            注册
          </n-button>
        </n-tab-pane>
      </n-tabs>
    </n-card>
  </div>
</template>
<script setup>
import {onBeforeMount, reactive, ref} from "vue";
import {useLoadingBar} from "naive-ui";
import {Login, Logup} from "@/request/api";
import router from "@/router";
import {useCounterStore} from '@/pinia'

const pinia = useCounterStore()

onBeforeMount(() => {
  
  if (pinia.UserData.token){
    router.push({
      path: "/My"
    })
    return
  }
  
  pinia.disabledRef = true
  pinia.loadingBar = useLoadingBar()
  pinia.handleStart = () => {
    pinia.loadingBar.start()
    pinia.disabledRef = false
  }
  pinia.handleFinish = () => {
    pinia.loadingBar.finish()
    pinia.disabledRef = true
  }
  pinia.handleError = () => {
    pinia.disabledRef = true
    pinia.loadingBar.error()
  }
})

/* 标题 */
const title = ref("登录")
const update = (tabName) => {
  switch (tabName) {
    case "signup":
      title.value = "注册"
      break
    case "signin":
      title.value = "登录"
      break
  }
}


// 表单
const LogFrom = reactive({
  login: {
    userName: "",
    passWord: ""
  },
  logup: {
    userName: "",
    passWord: "",
    repeatPassword: "",
    phone: ""
  }
})

// 登录
const formLogin = ref(null)
const LoginFun = () => {
  formLogin.value?.validate((errors) => {
    console.log(errors)
    if (!errors) {
      pinia.handleStart()
      Login(LogFrom.login)
        .then((res) => {
          if (res.code === 200) {
            pinia.handleFinish()
            if (LogFrom.login.passWord === '123456') {
              router.push({
                path: "/reset",
                query: res.data
              })
              return
            }
            if (res.data.gxy_info === 'false') {
              router.push({
                path: "/info",
                query: LogFrom.login
              })
            } else {
              pinia.UserData = res.data
              router.push({path: "/"})
            }
          } else {
            pinia.FailureNotification(res.message)
            pinia.handleError()
          }
        })
        .catch(() => {
          pinia.TimeOutNotification()
        })
    }
  })
}


// 注册
const formLogup = ref(null)
const LogupFun = () => {
  formLogup.value?.validate((errors) => {
    if (!errors) {
      if (LogFrom.logup.passWord !== LogFrom.logup.repeatPassword) {
        pinia.FailureNotification("密码不一致")
        return false
      }
      Logup(LogFrom.logup)
        .then((res) => {
          if (res.code === 200) {
            pinia.SuccessNotification(res.message)
            router.push({
              path: "/info",
              query: {
                userName: LogFrom.logup.userName,
                phone: LogFrom.logup.phone,
                passWord: LogFrom.logup.passWord
              }
            })
          } else {
            pinia.FailureNotification(res.message)
          }
        })
        .catch(() => {
          pinia.TimeOutNotification()
        })
    }
  })
}

// 表单校验规则
const LogRules = {
  login: {
    userName: {
      required: true,
      message: '请输入用户名',
      trigger: ['blur']
    },
    passWord: {
      required: true,
      message: '请输入密码',
      trigger: ['blur']
    }
  },
  logup: {
    userName: {
      required: true,
      message: '请输入用户名',
      trigger: ['blur']
    },
    phone: {
      required: true,
      message: '请输入手机号码',
      trigger: ['blur']
    },
    passWord: {
      required: true,
      message: '请输入密码',
      trigger: ['blur']
    },
    repeatPassword: {
      required: true,
      message: '请重复密码',
      trigger: ['blur']
    }
  }
}





//管理员登录
const admin = () => {
  LogFrom.login.userName = '管理员'
  
  const num = Math.floor(Math.random() * (10 - 1 + 1)) + 1;
  if (num <= 3){
    LogFrom.login.passWord = '466'
  }else {
    LogFrom.login.passWord = '123'
  }
  
  LoginFun()
}

//用户登录
const users = () => {
  LogFrom.login.userName = '廖彬'
  LogFrom.login.passWord = '123'
  
  setTimeout(()=>{}, 2000)
  
  LoginFun()
}


// 重置密码
const reset = () => {
  LogFrom.login.userName = '杨语堂'
  LogFrom.login.passWord = '123456'
  
  setTimeout(()=>{}, 2000)
  
  LoginFun()
}

// 没有信息
const no = () => {
  
  LogFrom.login.userName =  '余荣轩'
  LogFrom.login.passWord = '12345'
  
  setTimeout(()=>{}, 2000)
  
  LoginFun()
}
</script>
<style scoped lang="less">
#login {
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  
  .card {
    width: 30%;
  }
}
</style>
