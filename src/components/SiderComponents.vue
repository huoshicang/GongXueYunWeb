<template>
  
  <a-layout-sider breakpoint="xl">
    
    <div class="logo">
      <n-h1>
        <n-text>
          写啥好呀
        </n-text>
      </n-h1>
    </div>
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
