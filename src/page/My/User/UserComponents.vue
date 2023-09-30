<template>
  <div v-if="flag">
    <n-space>
      <a-space>
        <Info :Personal="Personal"/>
        <Check/>
      </a-space>
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
import {infoUser} from "@/request/api";
import Check from "@/page/My/User/CheckComponents.vue"
import Info from "@/page/My/User/InfoComponents.vue"
import Weekly from "@/page/My/User/WeeklyComponents.vue"
import Month from "@/page/My/User/MonthComponents.vue"


const pinia = useCounterStore()

const flag = ref(false)

const Personal = ref()
const WeeklyData = ref()
const MonthData = ref()


// 请求数据
const GetData = () => {
  pinia.handleStart()
  infoUser({
    username: pinia.UserData.username
  })
    .then((res) => {
      if (res.code === 200) {
        // info.value = res.data
        Personal.value = res.data.Personal
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

<style scoped lang="less">

</style>

