<template>
  <a-layout class="layout-demo">
    <a-affix :offsetTop="1">
      <HeaderComponents/>
    </a-affix>
    <a-layout>
      <SiderComponents/>
      <a-layout style="padding: 0 12px; max-height: 685px">
        <BreadcrumbComponents/>
        <ContentComponents/>
        <FooterComponents/>
      </a-layout>
    </a-layout>
  </a-layout>
</template>
<script setup>
import HeaderComponents from "@/components/HeaderComponents.vue";
import SiderComponents from "@/components/SiderComponents.vue";
import BreadcrumbComponents from "@/components/BreadcrumbComponents.vue";
import ContentComponents from "@/components/ContentComponents.vue";
import FooterComponents from "@/components/FooterComponents.vue";
import {useLoadingBar} from "naive-ui";
import {useCounterStore} from '@/pinia'
import {onBeforeMount, onMounted} from "vue";
import router from "@/router";

const pinia = useCounterStore()

onBeforeMount(() => {
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

onMounted(() => {
  if (!pinia.UserData.token) {
    router.push({
      path: "/login"
    })
  }
})
</script>
<style scoped>
.layout-demo {
  height: 100vh;
  background: var(--color-fill-2);
  border: 1px solid var(--color-border);
}

.layout-demo :deep(.arco-layout-header) {
  height: 64px;
  line-height: 64px;
  background: var(--color-bg-3);
  border-bottom: var(--color-border-2) 1px solid;
}

.layout-demo :deep(.arco-layout-content) {
  color: var(--color-text-2);
  background: var(--color-bg-3);
  border-radius: var(--border-radius-medium);
  padding: 12px;
}

.layout-demo :deep(.arco-layout-footer){
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30px;
}
</style>
