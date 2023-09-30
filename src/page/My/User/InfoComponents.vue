<template>
  <Box>
    <div class="Info">
      <n-space vertical>
        <a-space align="end">
          <n-h1>
            {{ props.Personal.username }}
          </n-h1>
          <n-h2>，你好。</n-h2>
        </a-space>
        <n-text>
          手机号：{{ props.Personal.phone }}
        </n-text>
        <n-text>
          最新登录时间：{{ props.Personal.update_time }}
        </n-text>
        <n-text v-if="props.Personal.role === 'user'">
          角色：用户
        </n-text>
        <n-text v-else-if="props.Personal.role === 'admin'">
          角色：管理员
        </n-text>
      </n-space>
    </div>
  </Box>
</template>
<script setup>
import Box from "@/components/BoxComponents.vue";
import {defineProps} from "vue";
const props = defineProps(['Personal']);
</script>

<style scoped>
.check {
  height: 145px;
}
</style>
