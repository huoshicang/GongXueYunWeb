<template>
  <div id="CheckInUser">
    <!--表格-->
    <a-table :data="pageData" stripe :pagination="false" :scroll="{
      x: 'auto',
      y: 'auto',
    }">
      <template #columns>
        <a-table-column align="center" width="100" fixed="left" title="ID" data-index="id"/>
        <a-table-column align="center" width="100" fixed="left" title="姓名" data-index="name"/>
        <a-table-column align="center" width="125" title="手机号" data-index="phone"/>
        <a-table-column align="center" width="100" title="国家" data-index="country"/>
        <a-table-column align="center" width="100" title="省份" data-index="province"/>
        <a-table-column align="center" width="120" title="城市" data-index="city"/>
        <a-table-column align="center" width="150" title="区/县" data-index="area"/>
        <a-table-column align="center" width="120" title="详细地址" ellipsis tooltip data-index="address"/>
        <a-table-column align="center" width="110" title="经度" data-index="longitude"/>
        <a-table-column align="center" width="110" title="纬度" data-index="latitude"/>
        <a-table-column align="center" width="120" title="签到备注" ellipsis tooltip data-index="note"/>
        <a-table-column align="center" width="100" title="签到设备类型" data-index="type"/>
        <a-table-column align="center" width="130" title="推送token" ellipsis tooltip data-index="pushKey"/>
        <a-table-column align="center" width="100" title="是否开启签到">
          <template #cell="{ record }">
            <n-tag type="success" v-if="record.enable">
              开启
            </n-tag>
            <n-tag type="error" v-else>
              关闭
            </n-tag>
          </template>
        </a-table-column>
        <a-table-column fixed="right" width="160" align="center" title="操作">
          <template #cell="{ record }">
            <a-space>
              <a-button @click="ModifyInfo(record)">编辑</a-button>
              <a-popconfirm content="确定要删除吗" type="warning" @ok="del(record)">
                <a-button>删除</a-button>
              </a-popconfirm>
            </a-space>
          </template>
        </a-table-column>
      </template>
    </a-table>
    
    <!--分页-->
    <PaginationComponents
      :total="data.length"
      :currentPage="currentPage"
      :pageSize="pageSize"
      @update:currentPage="handlePageChange"
      @update:pageSize="handleSizeChange"/>
  </div>
</template>
<script setup>
import {computed, onMounted, reactive, ref} from "vue";
import {CheckInfo} from "@/request/api";
import {useCounterStore} from '@/pinia'
import PaginationComponents from "@/components/PaginationComponents.vue";

const pinia = useCounterStore()

const data = ref([]);

const GetData = () => {
  pinia.handleStart()
  CheckInfo(pinia.UserData.username)
    .then((res) => {
      if (res.code === 200) {
        data.value = res.data
        pinia.handleFinish()
      } else {
        pinia.FailureNotification(res.message)
        pinia.handleError()
      }
    })
    .catch(() => {
      pinia.TimeOutNotification()
      pinia.handleError()
    })
}

// 分页
const currentPage = ref(1);
const pageSize = ref(15);

const pageData = computed(() => {
  const startIndex = (currentPage.value - 1) * pageSize.value;
  const endIndex = startIndex + pageSize.value;
  return data.value.slice(startIndex, endIndex);
});

// 处理切换页码
const handlePageChange = (newPage) => {
  currentPage.value = newPage;
};

// 处理切换每页大小
const handleSizeChange = (newSize) => {
  pageSize.value = newSize;
};

// 编辑
const info = reactive({
  enable: "", // 是否开启签到
  name: "", // 姓名
  phone: "",// 手机号
  password: "", // 密码
  country: "中国", // 国家
  province: "", // 省份
  city: "", // 城市
  area: "", // 区/县
  address: "", // 具体地址，没啥用最后换成address
  longitude: "", // 经度
  latitude: "", // 纬度
  note: "", // 备注
  type: "android", // 设备类型
  pushKey: "", // 推送token
})

onMounted(() => {
  GetData()
})

</script>

<style scoped>
#CheckInUser{
  padding-top: 5px;
}
</style>
