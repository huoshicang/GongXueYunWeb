<template>
  <a-layout-header id="header">
    <a-space style="margin-left: auto">
        <a-dropdown trigger="hover">
          <a-avatar :size="40" shape="square"></a-avatar>
          <template #content>
            <a-doption @click="LogOut">退出登录</a-doption>
            <a-doption @click="Reset">重置密码</a-doption>
          </template>
        </a-dropdown>
    </a-space>
  </a-layout-header>
</template>
<script setup>
import router from "@/router";
import {useCounterStore} from '@/pinia'

const pinia = useCounterStore()


const LogOut = () => {
  pinia.UserData = {}
  router.push({
    path: "/login",
  })
}

const Reset = () => {
  pinia.UserData = {}
  router.push({
    path: "/reset",
  })
  
}


</script>

<style scoped lang="less">
#header {
  padding: 0 30px;
  display: flex;
}
</style>
