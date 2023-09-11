<template>
  <div id="CheckInUser">
    <a-table :columns="columns" :data="data" :scroll="scroll">
      <template #note="{ rowIndex }">
        <n-ellipsis style="max-width: 80px">
          {{ data[rowIndex].note }}
        </n-ellipsis>
      </template>
      <template #area="{ rowIndex }">
        <n-ellipsis style="max-width: 80px">
          {{ data[rowIndex].area }}
        </n-ellipsis>
      </template>
      <template #address="{ rowIndex }">
        <n-ellipsis style="max-width: 210px">
          {{ data[rowIndex].address }}
        </n-ellipsis>
      </template>
      <template #pushKey="{ rowIndex }">
        <n-ellipsis style="max-width: 100px">
          {{ data[rowIndex].pushKey }}
        </n-ellipsis>
      </template>
      <template #save_time="{ rowIndex }">
        <n-ellipsis style="max-width: 80px">
          {{ data[rowIndex].save_time }}
        </n-ellipsis>
      </template>
      <template #enable="{ rowIndex }">
        <n-ellipsis style="max-width: 80px">
          <a-switch disabled v-model="data[rowIndex].enable" checked-value="true" unchecked-value="false" />
        </n-ellipsis>
      </template>
    </a-table>
  </div>
</template>
<script setup>
import {onMounted, ref} from "vue";
import {CheckInfo} from "@/request/api";
import { useCounterStore } from '@/pinia'
import {Message} from "@arco-design/web-vue";
const pinia = useCounterStore()

const scroll = {
  x: 2000,
  y: 200
}
const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    fixed: 'left',
    align: "center",
    width: 80
  },
  {
    title: '姓名',
    dataIndex: 'name',
    fixed: 'left',
    align: "center",
    width: 80
  },
  {
    title: '手机号',
    dataIndex: 'phone',
    align: "center",
    width: 180
  },
  {
    title: '国家',
    dataIndex: 'country',
    align: "center",
    width: 80
  },
  {
    title: '省份',
    dataIndex: 'province',
    align: "center",
    width: 80
  },
  {
    title: '城市',
    dataIndex: 'city',
    align: "center",
    width: 100
  },
  {
    title: '区/县',
    dataIndex: 'area',
    align: "center",
    width: 80,
    slotName: 'area',
  },
  {
    title: '详细地址',
    dataIndex: 'address',
    align: "center",
    slotName: 'address',
    width: 190
  },
  {
    title: '经度',
    dataIndex: 'longitude',
    align: "center",
    width: 110
  },
  {
    title: '纬度',
    dataIndex: 'latitude',
    align: "center",
    width: 110
  },
  {
    title: '签到设备',
    dataIndex: 'type',
    align: "center",
    width: 100
  },
  {
    title: '签到备注',
    dataIndex: 'note',
    align: "center",
    width: 100,
    slotName: 'note'
  },
  {
    title: '推送token',
    dataIndex: 'pushKey',
    align: "center",
    width: 100,
    slotName: 'pushKey',
  },
  {
    title: '最新的一次签到时间',
    dataIndex: 'save_time',
    align: "center",
    width: 80,
    slotName: 'save_time',
  },
  {
    title: '是否开启签到',
    dataIndex: 'enable',
    align: "center",
    width: 80,
    slotName: 'enable',
  },];

const data = ref();

onMounted(() => {
  pinia.handleStart()
  CheckInfo(pinia.UserData.username)
    .then((res) => {
    if (res.code === 200){
      data.value = res.data
      pinia.handleFinish()
    }else {
      Message.error(res.message)
      pinia.handleError()
    }
    })
    .catch(() => {
      Message.error("网络连接超时")
      pinia.handleError()
    })
})

</script>

<style scoped>

</style>
