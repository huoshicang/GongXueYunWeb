<template>
  <a-layout class="layout-demo">
    <SiderComponents/>
  <a-layout>
    <a-affix :offsetTop="1">
      <HeaderComponents />
    </a-affix>
    <a-layout style="padding: 0 10px;">
      <BreadcrumbComponents/>
        <a-scrollbar style="height:590px;overflow: auto;">
      <a-layout-content>
          <router-view name="Cont"/>
      </a-layout-content>
        </a-scrollbar>
    </a-layout>
  </a-layout>
  </a-layout>
</template>
<script setup>
import HeaderComponents from "@/components/HeaderComponents.vue";
import SiderComponents from "@/components/SiderComponents.vue";
import BreadcrumbComponents from "@/components/BreadcrumbComponents.vue";
import ContentComponents from "@/components/ContentComponents.vue";
import {useLoadingBar} from "naive-ui";
import { useCounterStore } from '@/pinia'
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
  if (!pinia.UserData.token){
    router.push({
      path: "/login"
    })
  }
})

</script>
<style scoped lang="less">
.layout-demo {
  height: 100vh;
  background: var(--color-fill-2);
  border: 1px solid var(--color-border);
}

.layout-demo :deep(.arco-layout-sider-light) .logo {
  height: 64px;
  background: var(--color-fill-2);
  text-align: center;
  line-height: 60px;
}

.layout-demo :deep(.arco-layout-header) {
  height: 64px;
  line-height: 64px;
  background: var(--color-bg-3);
}

.layout-demo :deep(.arco-layout-content) {
  background: var(--color-bg-3);
  overflow:hidden;
  padding: 24px 24px 5px 24px;
}
</style>
