<template>
  <div id="user">
    
    <!--搜索-->
    <a-form :model="Search" layout="inline">
      <a-space>
        <a-form-item field="username" label="姓名">
          <a-select allow-clear :style="{width:'150px'}" v-model="Search.username" allow-search>
            <a-option v-for="(item, index) in usernameList"
            :value="item"
            :key="index">{{ item }}</a-option>
          </a-select>
        </a-form-item>
        <a-form-item field="gxy_info" label="是否有签到信息">
          <a-select v-model="Search.gxy_info" :style="{width:'100px'}"  allow-clear>
            <a-option value="false">无</a-option>
            <a-option value="true">有</a-option>
          </a-select>
        </a-form-item>
        <a-form-item>
          <a-button @click="GetData">搜索</a-button>
        </a-form-item>
      </a-space>
    </a-form>
    
    <!--表格-->
    <a-table :data="data" :scroll="scroll">
      <template #columns>
      <a-table-column align="center" title="用户ID" data-index="id"/>
      <a-table-column align="center" title="用户姓名" data-index="username"/>
      <a-table-column align="center" title="手机号" data-index="phone"/>
      <a-table-column align="center" title="是否有签到信息">
        <template #cell="{ record }">
          <n-tag type="success" v-if="record.gxy_info === 'true'">
            有
          </n-tag>
          <n-tag type="error"  v-else-if="record.gxy_info === 'false'">
            无
          </n-tag>
        </template>
      </a-table-column>
      <a-table-column align="center" title="角色">
        <template #cell="{ record }">
          <n-tag type="info" v-if="record.role === 'admin'">
            管理员
          </n-tag>
          <n-tag v-else-if="record.role === 'user'">
            用户
          </n-tag>
        </template>
      </a-table-column>
        <a-table-column align="center" title="操作">
          <template #cell="{ record }">
            <a-space>
              <a-popconfirm content="确定要删除吗" type="warning" @ok="del(record)">
                <a-button>删除</a-button>
              </a-popconfirm>
            </a-space>
          </template>
        </a-table-column>
      
      </template>
    </a-table>
    
    <!--修改信息弹窗-->
  </div>
</template>
<script setup>
import {onMounted, reactive, ref} from "vue";
import {Del, GetInfo} from "@/request/api";
import { useCounterStore } from '@/pinia'
import {Message} from "@arco-design/web-vue";
const pinia = useCounterStore()

const scroll = {
  y: '100%'
};

const data = ref([]); // 表格数据
const usernameList = ref([]) //名称搜索

// 搜索表单
const Search = reactive({
  "name": pinia.UserData.username,
  "username": "",
  "gxy_info": ""
})

// 请求数据
const GetData = () => {
  pinia.handleStart()
  GetInfo(Search)
    .then((res) => {
      if (res.code === 200){
        data.value = res.data
        usernameList.value = []
        res.data.forEach((item) => {
          usernameList.value.push(item.username)
        })
        pinia.handleFinish()
      }else {
        Message.error(res.message)
        pinia.handleError()
      }
    })
    .catch(() => {
      Message.error("网络连接超时")
      pinia.handleError()
    })
}

// 删除
const del = (record) => {
  Del({
    "id": record.id,
    "username": record.username
  }).then((res) => {
    if (res.code === 200){
      Message.success(res.message)
      GetData()
    }else {
      Message.error(res.message)
      pinia.handleError()
    }
  })
    .catch(() => {
      Message.error("网络连接超时")
    })
  
}

onMounted(() => {
  GetData()
})


</script>
<style scoped>

</style>
