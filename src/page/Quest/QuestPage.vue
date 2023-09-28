<template>
  <div id="quest">
    <FromComponents />
    <!--<n-card>-->
      <a-tabs default-active-key="签到">
        <a-tab-pane key="签到" title="签到">
          <n-scrollbar style="max-height: 435px">
            <ContentComponents :InitSearch="InitSearch"/>
          </n-scrollbar>
        </a-tab-pane>
        <a-tab-pane key="周报" title="周报">
          Content of Tab Panel 2
        </a-tab-pane>
        <a-tab-pane key="月报" title="月报">
          Content of Tab Panel 3
        </a-tab-pane>
      </a-tabs>
    <!--</n-card>-->
  
  </div>
</template>
<script setup>
import ContentComponents from "@/page/Quest/CheckComponents.vue";
import FromComponents from "@/page/Quest/FromComponents.vue";

import {useCounterStore} from '@/pinia'
const pinia = useCounterStore()

const InitSearch = {
  username: "",
  name: pinia.UserData.username,
}

</script>
<style scoped>
#quest {
  padding-top: 5px;
}
</style>
