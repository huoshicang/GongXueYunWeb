<template>
  <Box>
    <div class="Info">
      <n-space vertical>
        <a-space align="end">
          <n-h1>
            {{ props.Personal.username }}
          </n-h1>
          <n-h2>，你好。</n-h2>
          <n-h4>
            手机号：{{ props.Personal.phone }}
          </n-h4>
          <a-divider direction="vertical" />
          <n-h4>
            最新登录时间：{{ props.Personal.update_time }}
          </n-h4>
          <a-divider direction="vertical" />
          <n-h4 v-if="props.Personal.role === 'user'">
            角色：用户
          </n-h4>
          <n-h4 v-else-if="props.Personal.role === 'admin'">
            角色：管理员
          </n-h4>
        </a-space>
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
.Info {
  width: 1175px;
}
</style>
