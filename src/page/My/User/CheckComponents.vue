<template>
  <Box>
    <div class="check">
      <n-h2>
        <n-text>
          签到信息
          <n-tag v-if="info.enable === 'true'">
            开启
          </n-tag>
          <n-tag v-else>
            关闭
          </n-tag>
        </n-text>
      </n-h2>
      <n-space>
        <n-h5>
          签到地址：{{ info.address }}
        </n-h5>
        <a-divider direction="vertical" />
        <n-h5>
          经纬度：{{ info.longitude }}, {{ info.latitude }}
        </n-h5>
        <a-divider direction="vertical" />
        <n-h5>
          签到备注：{{ info.note }}
        </n-h5>
      </n-space>
      <n-space>
        <n-h5>
          签到设备类型：{{ info.type }}
        </n-h5>
        <a-divider direction="vertical" />
        <n-h5>
          签到时间：{{ info.check_time }}
        </n-h5>
        <a-divider direction="vertical" />
        <n-h5>
          推送token：{{ info.pushKey }}
        </n-h5>
      </n-space>
    </div>
  </Box>
</template>
<script setup>
import Box from "@/components/BoxComponents.vue";

const info = {
  "address": "广州市 · 天河区 · 示例地址3",
  "area": "天河区",
  "check_time": "2023-09-20 11:54:41",
  "city": "广州市",
  "country": "中国",
  "enable": "false",
  "latitude": "89.01",
  "longitude": "345.67",
  "name": "廖彬",
  "note": "示例备注3",
  "phone": "13579246801",
  "province": "广州市",
  "pushKey": "推送Key3",
  "save_time": "None",
  "type": "android"
}
</script>

<style scoped lang="less">
.check {
  height: 145px;
  width: 875px;
}
</style>
