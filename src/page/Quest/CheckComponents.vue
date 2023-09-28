<template>
  <a-space wrap>
    <a-card hoverable class="card" v-for="(item, index) in data" :key="index" :title="item.name">
      <template #extra>
        <a-popover>
          <a-switch v-model="item.enable" checked-value="true" unchecked-value="false"/>
          <template #content>
            <p v-if="item.enable === 'true'">已启用</p>
            <p v-else>未启用</p>
          </template>
        </a-popover>
        
      </template>
      <a-space>
        <a-date-picker
          v-model="item.check_time"
          show-time
          format="YYYY-MM-DD HH:mm:ss"/>
      </a-space>
      <template #actions>
        <a-button type="text" size="mini" @click="Sub(item)">提交</a-button>
      </template>
    </a-card>
  </a-space>
</template>
<script setup>
import {defineProps, onMounted, ref} from "vue";
import {useCounterStore} from '@/pinia'
import {checkQuest} from "@/request/api";

const pinia = useCounterStore()


const props = defineProps(['InitSearch']);

const data = ref()
const usernameList = ref([])

const GetData = (Search) => {
  pinia.handleStart()
  checkQuest(Search)
    .then((res) => {
      if (res.code === 200) {
        data.value = res.data
        pinia.handleFinish()
        
        if (usernameList.value.length === 0) {
          usernameList.value = []
          res.data.forEach((item) => {
            usernameList.value.push(item.name)
          })
        }
        
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

// 编辑
const Sub = () =>{

}


onMounted(() => {
  GetData(props.InitSearch)
})

</script>

<style scoped>
.card{
  width: 235px
}
</style>
