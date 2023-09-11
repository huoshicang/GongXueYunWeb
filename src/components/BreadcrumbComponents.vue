<template>
  <a-breadcrumb :style="{ margin: '16px 0' }">
    <a-breadcrumb-item>首页</a-breadcrumb-item>
    <a-breadcrumb-item>{{ pinia.selectedKey }}</a-breadcrumb-item>
  </a-breadcrumb>
</template>
<script setup>
import {useCounterStore} from "@/pinia";
const pinia = useCounterStore()
</script>

<style scoped>

</style>
