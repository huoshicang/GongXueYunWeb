<template>
  <Box>
    <div class="check">
      <n-h2>
        <n-text>
          签到信息
          <n-tag v-if="props.CheckInfo.enable === 'true'">
            开启
          </n-tag>
          <n-tag v-else>
            关闭
          </n-tag>
        </n-text>
      </n-h2>
      <n-space>
        <n-h5>
          签到地址：{{ props.CheckInfo.address }}
        </n-h5>
        <a-divider direction="vertical" />
        <n-h5>
          经纬度：{{ props.CheckInfo.longitude }}, {{ props.CheckInfo.latitude }}
        </n-h5>
        <a-divider direction="vertical" />
        <n-h5>
          签到备注：{{ props.CheckInfo.note }}
        </n-h5>
      </n-space>
      <n-space>
        <n-h5>
          签到设备类型：{{ props.CheckInfo.type }}
        </n-h5>
        <a-divider direction="vertical" />
        <n-h5>
          签到时间：{{ props.CheckInfo.check_time }}
        </n-h5>
        <a-divider direction="vertical" />
        <n-h5>
          推送token：{{ props.CheckInfo.pushKey }}
        </n-h5>
      </n-space>
    </div>
  </Box>
</template>
<script setup>
import Box from "@/components/BoxComponents.vue";
import {defineProps} from "vue";
const props = defineProps(['CheckInfo']);
</script>

<style scoped lang="less">
.check {
  height: 145px;
  width: 875px;
}
</style>
