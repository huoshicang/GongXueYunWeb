<template>
  <n-loading-bar-provider>
    <n-config-provider :locale="zhCN" :date-locale="dateZhCN">
      <router-view name="App"/>
    </n-config-provider>
  </n-loading-bar-provider>
</template>
<script setup>
import { zhCN, dateZhCN } from 'naive-ui'

</script>
