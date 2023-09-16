<template>
  <div id="reset">
    
    
    <a-card :style="{ width: '460px' }">
      <a-result status="warning" title="请重置密码">
        <n-form ref="formReset"
                :rules="ResetRules"
                :model="ResetForm">
          <n-form-item-row label="用户名" path="userName">
            <n-input type="text" disabled v-model:value="ResetForm.userName" placeholder="请输入用户名"/>
          </n-form-item-row>
          <n-form-item-row label="密码" path="passWord">
            <n-input type="password" show-password-on="click" v-model:value="ResetForm.passWord"
                     placeholder="请输入密码"/>
          </n-form-item-row>
          <n-form-item-row label="重复密码" path="repeatPassword">
            <n-input type="password" show-password-on="click" v-model:value="ResetForm.repeatPassword"
                     placeholder="请重复密码"/>
          </n-form-item-row>
        </n-form>
      </a-result>
      <n-button type="primary" block secondary strong @click="ResetFun">
        重置
      </n-button>
      {{ ResetForm }}
    </a-card>
  </div>
</template>
<script setup>
import {useRoute} from "vue-router";
import {reactive, ref} from "vue";
import {change} from "@/request/api";
import {useCounterStore} from '@/pinia'
import router from "@/router";

const pinia = useCounterStore()

// 表单
const ResetForm = reactive({
  userName: useRoute().query.username,
  phone: useRoute().query.phone,
  passWord: "",
  repeatPassword: "",
})

// 表单校验规则
const ResetRules = {
  userName: {
    required: true,
    message: '请输入用户名',
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

const formReset = ref(null)
const ResetFun = () => {
  pinia.handleStart()
  if (formReset.value?.validate((errors) => {
    return !errors;
  })) {
    
    if (ResetForm.passWord !== ResetForm.repeatPassword){
      pinia.FailureNotification("两次密码不一致")
      return
    }
    
    change(ResetForm)
      .then((res) =>{
        if (res.code === 200){
          pinia.SuccessNotification(res.message)
          router.push({
            path: "/login"
          })
          pinia.handleFinish()
        }else {
          pinia.FailureNotification(res.message)
          pinia.handleError()
        }
      })
      .catch(() => {
        pinia.TimeOutNotification()
        pinia.handleError()
      })
  }
  

}


</script>
<style scoped>
#reset {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
