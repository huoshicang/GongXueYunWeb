<template>
  <div id="CheckInUser">
    <From :usernameList="usernameList" :phoneList="phoneList" @get:Data="GetData"/>
    <n-divider />
    <!--表格-->
    <a-table :data="pageData" stripe :pagination="false" :scroll="{x: 'auto',y: 'auto',}">
      <template #columns>
        <a-table-column align="center" :width="100" fixed="left" title="ID" data-index="id"/>
        <a-table-column align="center" :width="100" fixed="left" title="姓名" data-index="name"/>
        <a-table-column align="center" :width="125" title="手机号" data-index="phone"/>
        <a-table-column align="center" :width="100" title="国家" data-index="country"/>
        <a-table-column align="center" :width="100" title="省份" data-index="province"/>
        <a-table-column align="center" :width="120" title="城市" data-index="city"/>
        <a-table-column align="center" :width="150" title="区/县" data-index="area"/>
        <a-table-column align="center" :width="350" title="详细地址" data-index="address"/>
        <a-table-column align="center" :width="110" title="经度" data-index="longitude"/>
        <a-table-column align="center" :width="110" title="纬度" data-index="latitude"/>
        <a-table-column align="center" :width="120" title="签到备注" ellipsis tooltip data-index="note"/>
        <a-table-column align="center" :width="100" title="签到设备类型" data-index="type"/>
        <a-table-column align="center" :width="200" title="签到时间" ellipsis tooltip data-index="check_time"/>
        <a-table-column align="center" :width="130" title="推送token" ellipsis tooltip data-index="pushKey"/>
        <a-table-column align="center" fixed="right" :width="100" title="是否开启签到">
          <template #cell="{ record }">
            <n-tag type="success" v-if="record.enable = 'true'">
              开启
            </n-tag>
            <n-tag type="error" v-else>
              关闭
            </n-tag>
          </template>
        </a-table-column>
        <a-table-column fixed="right" :width="160" align="center" title="操作">
          <template #cell="{ record }">
            <a-space>
              <a-button @click="Modify(record)">编辑</a-button>
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
    
    <!--修改信息-->
    <a-modal v-model:visible="visible" @ok="handleOk" @cancel="handleCancel" fullscreen>
      <template #title>
        编辑信息
      </template>
      <a-row class="grid-demo">
        <a-col :span="4">
          <div>
            <a-typography-title :heading="6">
              是否开启签到
            </a-typography-title>
          </div>
        </a-col>
        <a-col :span="4">
          <div>
            <a-switch v-model="info.enable" checked-value="true" unchecked-value="false"/>
          </div>
        </a-col>
        <a-col :span="4">
          <div>
            <a-typography-title :heading="6">
              姓名
            </a-typography-title>
          </div>
        </a-col>
        <a-col :span="4">
          <div>
            <a-input v-model="info.name" size="large" allow-clear/>
          </div>
        </a-col>
        <a-col :span="4">
          <div>
            <a-typography-title :heading="6">
              手机号
            </a-typography-title>
          </div>
        </a-col>
        <a-col :span="4">
          <div>
            <a-input v-model="info.phone" size="large" allow-clear />
          </div>
        </a-col>
        <a-col :span="4">
          <div>
            <a-typography-title :heading="6">
              密码
            </a-typography-title>
          </div>
        </a-col>
        <a-col :span="4">
          <div>
            <a-input v-model="info.password" size="large" allow-clear placeholder="填写了密码，将会修改密码"/>
          </div>
        </a-col>
      </a-row>
      
      <a-divider orientation="center">地址</a-divider>
      
      <a-row class="grid-demo">
        <a-col :span="4">
          <div>
            <a-typography-title :heading="6">
              国家
            </a-typography-title>
          </div>
        </a-col>
        <a-col :span="4">
          <div>
            <a-input v-model="info.country" size="large" disabled/>
          </div>
        </a-col>
        <a-col :span="4">
          <div>
            <a-typography-title :heading="6">
              省份
            </a-typography-title>
          </div>
        </a-col>
        <a-col :span="4">
          <div>
            <a-input v-model="info.province" size="large" allow-clear/>
          </div>
        </a-col>
        <a-col :span="4">
          <div>
            <a-typography-title :heading="6">
              城市
            </a-typography-title>
          </div>
        </a-col>
        <a-col :span="4">
          <div>
            <a-input v-model="info.city" size="large" allow-clear/>
          </div>
        </a-col>
        <a-col :span="4">
          <div>
            <a-typography-title :heading="6">
              区/县
            </a-typography-title>
          </div>
        </a-col>
        <a-col :span="4">
          <div>
            <a-input v-model="info.area" size="large" allow-clear/>
          </div>
        </a-col>
        <a-col :span="4">
          <div>
            <a-typography-title :heading="12">
              详细地址
            </a-typography-title>
          </div>
        </a-col>
        <a-col :span="4">
          <div>
            <a-input v-model="info.address" size="large" allow-clear :style="{width:'620px'}"/>
          </div>
        </a-col>
      </a-row>
      
      <a-divider orientation="center">其他</a-divider>
      
      <a-row class="grid-demo">
        <a-col :span="4">
          <div>
            <a-typography-title :heading="6">
              经度
            </a-typography-title>
          </div>
        </a-col>
        <a-col :span="4">
          <div>
            <a-input v-model="info.longitude" size="large" allow-clear/>
          </div>
        </a-col>
        <a-col :span="4">
          <div>
            <a-typography-title :heading="6">
              纬度
            </a-typography-title>
          </div>
        </a-col>
        <a-col :span="4">
          <div>
            <a-input v-model="info.latitude" size="large" allow-clear/>
          </div>
        </a-col>
        <a-col :span="4">
          <div>
            <a-typography-title :heading="6">
              备注
            </a-typography-title>
          </div>
        </a-col>
        <a-col :span="4">
          <div>
            <a-input v-model="info.note" size="large" allow-clear/>
          </div>
        </a-col>
        <a-col :span="4">
          <div>
            <a-typography-title :heading="6">
              设备类型
            </a-typography-title>
          </div>
        </a-col>
        <a-col :span="4">
          <div>
            <a-select v-model="info.type">
              <a-option value="android">android</a-option>
              <a-option value="ios">ios</a-option>
            </a-select>
          </div>
        </a-col>
        <a-col :span="4">
          <div>
            <a-typography-title :heading="6">
              签到时间
            </a-typography-title>
          </div>
        </a-col>
        <a-col :span="4">
          <div>
            <a-date-picker
              v-model="info.check_time"
              show-time
              format="YYYY-MM-DD HH:mm:ss"/>
          </div>
        </a-col>
        <a-col :span="4">
          <div>
            <a-typography-title :heading="6">
              推送
            </a-typography-title>
          </div>
        </a-col>
        <a-col :span="4">
          <div>
            <a-input v-model="info.pushKey" size="large" allow-clear/>
          </div>
        </a-col>
      </a-row>
    </a-modal>
    
  </div>
</template>
<script setup lang="jsx">
import {computed, onMounted, reactive, ref, shallowRef} from "vue";
import {CheckInfo, delCheck, ModifyInfo} from "@/request/api";
import {useCounterStore} from '@/pinia'
import PaginationComponents from "@/components/PaginationComponents.vue";
import From from "@/page/Check/FromComponents.vue";

const pinia = useCounterStore()

const InitSearch = {
  name: "",
  phone: "",
  role: pinia.UserData.username,
  enable: "",
}

const data = ref([]); // 表格数据
const usernameList = ref([]);
const phoneList = ref([]);


const GetData = (Search) => {
  pinia.handleStart()
  CheckInfo(Search)
    .then((res) => {
      if (res.code === 200) {
        data.value = res.data
        pinia.handleFinish()

        if (usernameList.value.length === 0 && phoneList.value.length === 0){
          usernameList.value = []
          phoneList.value = []
          res.data.forEach((item) => {
            usernameList.value.push(item.name)
            phoneList.value.push(item.phone)
          })
        }
        
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
  id: "",
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
  check_time:"", // 签到时间
})
// 对话框是否显示
const visible = shallowRef(false)
// 编辑的内容
const Modify = (record) => {
  info.id = record.id
  info.enable = record.enable
  info.name = record.name
  info.phone = record.phone
  info.country = record.country
  info.province = record.province
  info.city = record.city
  info.area = record.area
  info.address = record.address
  info.longitude = record.longitude
  info.latitude = record.latitude
  info.note = record.note
  info.type = record.type
  info.pushKey = record.pushKey
  info.check_time = record.check_time
  
  visible.value = true
}

// 提交表单
const handleOk = () => {
  pinia.handleStart()
  ModifyInfo(info)
    .then((res) => {
      if (res.code === 200) {
        pinia.SuccessNotification(res.message)
        pinia.handleStart()
        GetData(InitSearch)
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

// 关闭表单
const handleCancel = () => {
  info.enable = ""
  info.name = ""
  info.phone = ""
  info.password = ""
  info.country = ""
  info.province = ""
  info.city = ""
  info.area = ""
  info.address = ""
  info.longitude = ""
  info.latitude = ""
  info.note = ""
  info.type = ""
  info.pushKey = ""
  info.check_time = ""
  
  visible.value = false
}


// 删除
const del = (record) => {
  console.log(record)
  delCheck({
    id: record.id,
    name: record.name,
  }).then((res) => {
    if (res.code === 200) {
      pinia.SuccessNotification("删除成功")
      GetData(InitSearch)
    } else {
      pinia.FailureNotification(res.message)
      pinia.handleError()
    }
  })
    .catch(() => {
      pinia.TimeOutNotification()
    })
}

onMounted(() => {
  GetData(InitSearch)
})

</script>

<style scoped>
#CheckInUser {
  padding-top: 5px;
}

.grid-demo .arco-col {
  height: 48px;
  line-height: 48px;
  color: var(--color-text-1);
}

.grid-demo .arco-col:nth-child(2n) {
  padding-left: 10px;
  text-align: left;
}

.grid-demo .arco-col:nth-child(2n + 1) {
  padding-right: 10px;
  text-align: right;
}
</style>
