<template>
  <a-space id="info" direction="vertical" fill align="center">
    <a-card style="width: 1200px;">
      <a-steps changeable :current="curren" @change="current">
        <a-step>信息</a-step>
        <a-step>地址</a-step>
        <a-step>其他信息</a-step>
        <a-step>结果</a-step>
      </a-steps>
    </a-card>
    
    <n-form ref="infoFrom"
            :rules="Rules"
            :model="info">
      <a-card style="width: 500px;" v-show="curren === 1">
        <n-form-item-row label="是否签到" path="enable">
          <a-switch v-model="info.enable" checked-color="#18a058" checked-value="true" unchecked-value="false"/>
        </n-form-item-row>
        <n-form-item-row label="姓名" path="name">
          <n-input type="text" v-model:value="info.name" placeholder="请输入姓名"/>
        </n-form-item-row>
        <n-form-item-row label="手机号" path="phone">
          <n-input type="text" v-model:value="info.phone" placeholder="请输入手机号"/>
        </n-form-item-row>
        <n-form-item-row label="密码" path="password">
          <n-input type="password" v-model:value="info.password" placeholder="请输入密码"/>
        </n-form-item-row>
      </a-card>
      
      <a-card style="width: 500px;" v-show="curren === 2">
        <a-alert type="warning">地址可以看以前签到的信息</a-alert>
        <n-divider/>
        <n-scrollbar style="max-height: 400px">
          
          <n-form-item-row label="国家" path="country">
            <n-input type="text" v-model:value="info.country" placeholder="请输入国家"/>
          </n-form-item-row>
          <n-form-item-row label="省份" path="province">
            <n-input type="text" v-model:value="info.province" placeholder="请输入省份"/>
          </n-form-item-row>
          <n-form-item-row label="城市" path="city">
            <n-input type="text" v-model:value="info.city" placeholder="请输入城市"/>
          </n-form-item-row>
          <n-form-item-row label="区/县" path="area">
            <n-input type="text" v-model:value="info.area" placeholder="请输入区/县"/>
          </n-form-item-row>
          <n-form-item-row label="具体地址" path="juti">
            <n-input type="text" v-model:value="info.juti" placeholder="请输入具体地址"/>
          </n-form-item-row>
          <n-form-item-row label="经度" path="longitude">
            <n-input type="password" v-model:value="info.longitude" placeholder="请输入经度"/>
          </n-form-item-row>
          <n-form-item-row label="纬度" path="latitude">
            <n-input type="password" v-model:value="info.latitude" placeholder="请输入纬度"/>
          </n-form-item-row>
          
          <a-card>
            {{ info.country }} · {{ info.province }} · {{ info.city }} · {{ info.area }} · {{ info.juti }}
          </a-card>
        </n-scrollbar>
      </a-card>
      
      <a-card style="width: 500px;" v-show="curren === 3">
        <a-alert type="warning">
          <a-link href="https://www.pushplus.plus/">推送token点这里</a-link>
        </a-alert>
        <n-divider/>
        <n-form-item-row label="签到备注" path="note">
          <n-input type="text" v-model:value="info.note" placeholder="请输入签到备注"/>
        </n-form-item-row>
        <n-form-item-row label="签到设备类型" path="type">
          <n-select v-model:value="info.type" :options="['android', 'ios']" placeholder="请选择签到设备类型"/>
        </n-form-item-row>
        <n-form-item-row label="推送" path="pushKey">
          <n-input type="text" v-model:value="info.pushKey" placeholder="请输入推送token"/>
        </n-form-item-row>
      </a-card>
    </n-form>
    
    
    <a-result v-if="curren === 4" :status="status" title="获取结果">
      <template #subtitle>
        <span v-if="status === 'warning'">正在获取，请稍后</span>
        <span v-else-if="status === 'success'">成功，请登录</span>
        <span v-else-if="status === 'error'">失败，点击重来</span>
      </template>
      <template #extra>
        <a-space>
          <a-button v-if="status === 'success'" type='primary' @click="tologin" status="success">去登录</a-button>
          <a-button v-else-if="status === 'error'" type="primary" @click="again" status="warning">重来</a-button>
        </a-space>
      </template>
    </a-result>
    
    <a-space>
      <router-link to="/login">
        <n-button v-if="curren === 1" type="primary" block secondary strong>
          登&nbsp;&nbsp;录
        </n-button>
      </router-link>
      <n-button v-if="curren > 1 && curren < 4" type="primary" @click="--curren" block secondary strong>
        上一步
      </n-button>
      <n-button v-if="curren >= 1 && curren < 3" type="primary" @click="++curren" block secondary strong>
        下一步
      </n-button>
      <n-button v-if="curren === 3" @click="submin" type="primary" block secondary strong>
        提&nbsp;&nbsp;交
      </n-button>
    </a-space>
  </a-space>
</template>
<script setup>
import {onMounted, reactive, ref} from "vue";
import {AddInfo, UpLog} from "@/request/api";
import router from "@/router";
import {Message} from "@arco-design/web-vue";

import {useRoute} from "vue-router";

import {useCounterStore} from '@/pinia'

const pinia = useCounterStore()

// 步骤页
const curren = ref(1)
const current = (key) => {
  curren.value = key
}

// 表单信息
const info = reactive({
  enable: "true", // 是否开启签到
  name: "", // 姓名
  phone: "",// 手机号
  password: "", // 密码
  country: "中国", // 国家
  province: "", // 省份
  city: "", // 城市
  area: "", // 区/县
  juti: "", // 具体地址，没啥用最后换成address
  longitude: "", // 经度
  latitude: "", // 纬度
  note: "", // 备注
  type: "android", // 设备类型
  pushKey: "", // 推送token
})

// 表单校验规则
const Rules = {
  enable: {
    required: true,
    message: '选择是否签到',
    trigger: ['blur']
  },
  name: {
    required: true,
    message: '请输入用户名',
    trigger: ['blur']
  },
  phone: {
    required: true,
    message: '请输入手机号码',
    trigger: ['blur']
  },
  password: {
    required: true,
    message: '请输入密码',
    trigger: ['blur']
  },
  country: {
    required: true,
    message: '请输入国家',
    trigger: ['blur']
  },
  province: {
    required: true,
    message: '请输入省份',
    trigger: ['blur']
  },
  city: {
    required: true,
    message: '请输入城市',
    trigger: ['blur']
  },
  area: {
    required: true,
    message: '请输入区/县',
    trigger: ['blur']
  },
  juti: {
    required: true,
    message: '请输入具体地址',
    trigger: ['blur']
  },
  longitude: {
    required: false,
    message: '请输入经度',
    trigger: ['blur']
  },
  latitude: {
    required: false,
    message: '请输入纬度',
    trigger: ['blur']
  },
  note: {
    required: false,
    message: '请输入备注',
    trigger: ['blur']
  },
  type: {
    required: false,
    message: '请选择签到类型',
    trigger: ['blur']
  },
  pushKey: {
    required: true,
    message: '请输入推送token',
    trigger: ['blur']
  },
}

// 结果页提示
const status = ref('warning')

// 提交表单
const submin = () => {
  curren.value = 4
  pinia.handleStart()
  info.address = `${info.country}·${info.province}·${info.city}·${info.area}·${info.juti}`
  delete info.juti
  
  AddInfo(info)
    .then((res) => {
      if (res.code === 200) {
        upData()
        pinia.handleFinish()
      } else {
        status.value = 'error'
        pinia.handleError()
        Message.error(res.message)
        if (res.message === "用户已存在") {
          router.push({
            path: "/login"
          })
        }
      }
    })
    .catch(() => {
      status.value = 'error'
      Message.error("网络连接失败")
      pinia.handleError()
    })
}

const upData = () => {
  UpLog(info.name)
    .then((res) => {
      if (res.code === 200) {
        status.value = 'success'
      } else {
        status.value = 'error'
      }
    })
    .catch(() => {
      status.value = 'error'
    })
}

const tologin = () => {
  router.push({
    path: "/login"
  })
}

const again = () => {
  info.enable = "true" // 是否开启签到
  info.name = "" // 姓名
  info.phone = ""// 手机号
  info.password = "" // 密码
  info.country = "中国" // 国家
  info.province = "" // 省份
  info.city = "" // 城市
  info.area = "" // 区/县
  info.juti = "" // 具体地址，没啥用最后换成address
  info.longitude = "" // 经度
  info.latitude = "" // 纬度
  info.note = "" // 备注
  info.type = "android" // 设备类型
  info.pushKey = "" // 推送token
  curren.value = 1
}

const query = useRoute()

onMounted(() => {
  info.name = query.userName
  info.phone = query.phone
  info.password = query.passWord
})
</script>
<style scoped lang="less">
#info {
  height: 100vh;
  width: 100vw;
  padding: 50px;
}
</style>
