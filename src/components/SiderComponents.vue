<template>
  <a-layout-sider>
      <n-menu
        v-model:value="pinia.selectedKey"
        :options="options"
        @update:value="showOption"
      />
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
    show: pinia.UserData.role === 'user' || pinia.UserData.role === 'admin',
    label: () => h(
      RouterLink,
      {
        to: {
          path: "/My",
        }
      },
      { default: () => "我的" }
    ),
    key: "我的",
    path: "/My"
  },
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
    path: "/User",
  },
  {
    show: pinia.UserData.role === 'admin',
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
    path: "/CheckInUser",
  },
  {
    show: pinia.UserData.role === 'user' || pinia.UserData.role === 'admin',
    label: () => h(
      RouterLink,
      {
        to: {
          path: "/Weekly",
        }
      },
      { default: () => "周报" }
    ),
    key: "周报",
    path: "/Weekly",
  },
  {
    show: pinia.UserData.role === 'user' || pinia.UserData.role === 'admin',
    label: () => h(
      RouterLink,
      {
        to: {
          path: "/Month",
        }
      },
      { default: () => "月报" }
    ),
    key: "月报",
    path: "/Month",
  },
]

const showOption = (key, item) => {
  pinia.selectedKey = key
  pinia.selectedRouter = item.path
  router.push({
    path: item.path
  })
}

onMounted(() => {
  router.push({
    path: pinia.selectedRouter
  })
})

</script>
<style scoped>

</style>
