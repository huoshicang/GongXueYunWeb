<template>
  <a-layout-sider>
    <a-menu
      :default-open-keys="['1']"
      :default-selected-keys="['0_3']"
      :style="{ width: '100%' }"
    >
      <n-menu
        v-model:value="pinia.selectedKey"
        :options="options"
        @update:value="showOption"
      />
    </a-menu>
  </a-layout-sider>
</template>
<script setup>
import {h, onMounted} from "vue";
import { RouterLink } from "vue-router";
import { useCounterStore } from "@/pinia";
import router from "@/router";
const pinia = useCounterStore()
const options = [
  {
    type: 'group',
    show: pinia.UserData.role === 'admin',
    label: () => h(
      RouterLink,
      {
        to: {
          path: "/User",
        }
      },
      { default: () => "用户管理" }
    ),
    key: "用户管理",
  },
  {
    show: pinia.UserData.role === 'user' || pinia.UserData.role === 'admin',
    label: () => h(
      RouterLink,
      {
        to: {
          path: "/CheckInUser",
        }
      },
      { default: () => "签到用户" }
    ),
    key: "签到用户",
  },
  {
    show: pinia.UserData.role === 'user' || pinia.UserData.role === 'admin',
    label: () => h(
      RouterLink,
      {
        to: {
          path: "/CheckInUser",
        }
      },
      { default: () => "周报" }
    ),
    key: "周报",
  },
  {
    show: pinia.UserData.role === 'user' || pinia.UserData.role === 'admin',
    label: () => h(
      RouterLink,
      {
        to: {
          path: "/CheckInUser",
        }
      },
      { default: () => "月报" }
    ),
    key: "月报",
  },
  {
    show: pinia.UserData.role === 'user' || pinia.UserData.role === 'admin',
    label: () => h(
      RouterLink,
      {
        to: {
          path: "/CheckInUser",
        }
      },
      { default: () => "定时任务" }
    ),
    key: "定时任务",
  },
]

const showOption = (key) => {
  pinia.selectedKey = key
}

onMounted(() => {
  router.push({
    path: "/User"
  })
})
</script>
<style scoped>

</style>
