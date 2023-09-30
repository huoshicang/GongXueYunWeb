<template>
  <div v-if="flag">
    <n-space>
      <n-space>
        <Info :Personal="Personal"/>
        <Sys :SysUserData="SysUserData"/>
        <Check :GxyUserData="GxyUserData"/>
      </n-space>
      <n-space>
        <Weekly :WeeklyData="WeeklyData"/>
        <Month :MonthData="MonthData"/>
      </n-space>
    </n-space>
  </div>
</template>
<script setup>
import {onMounted, ref} from "vue";
import {useCounterStore} from '@/pinia'
import {infoAdmin} from "@/request/api";
import Info from "@/page/My/Admin/InfoComponents.vue";
import Sys from "@/page/My/Admin/SysComponents.vue";
import Month from "@/page/My/Admin/MonthComponents.vue";
import Weekly from "@/page/My/Admin/WeeklyComponents.vue";
import Check from "@/page/My/Admin/CheckComponents.vue";


const pinia = useCounterStore()

const flag = ref(false)

const Personal = ref()
const SysUserData = ref()
const GxyUserData = ref()
const WeeklyData = ref()
const MonthData = ref()


// 请求数据
const GetData = () => {
  pinia.handleStart()
  infoAdmin({
    username: pinia.UserData.username
  })
    .then((res) => {
      if (res.code === 200) {
        Personal.value = res.data.Personal
        SysUserData.value = res.data.SysUser
        GxyUserData.value = res.data.GxyUser
        WeeklyData.value = res.data.Weekly
        MonthData.value = res.data.Month
        
        
        flag.value = true
        pinia.handleFinish()
      } else {
        pinia.FailureNotification(res.message)
        pinia.handleError()
      }
    })
    .catch(() => {
      pinia.TimeOutNotification()
      pinia.handleError()
    })
}


onMounted(() => {
  GetData()
})
</script>

<style scoped>

</style>

