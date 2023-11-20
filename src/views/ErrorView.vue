<template>
  <a-result
    status="403"
    subtitle="没有权限">
    <template #extra>
      <a-space>
        <router-link to="/My">
          <a-button type="primary">去首页</a-button>
        </router-link>
      </a-space>
    </template>
  </a-result>
</template>
<script setup>
</script>
