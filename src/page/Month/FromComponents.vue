<template>
  <!--搜索-->
  <a-form :model="Search" layout="inline">
    <a-space>
      <a-form-item field="username" label="姓名" v-if="pinia.UserData.role !== 'user'">
        <a-select allow-clear :style="{width:'150px'}" v-model="Search.searchname" allow-search>
          <a-option v-for="(item, index) in props.usernameList"
                    :value="item"
                    :key="index">{{ item }}
          </a-option>
        </a-select>
      </a-form-item>
      <a-form-item field="username" label="开始时间">
        <a-date-picker
          v-model="Search.starttime"
          show-time
          format="YYYY-MM-DD HH:mm:ss"/>
      </a-form-item>
      <a-form-item field="gxy_info" label="结束时间">
        <a-date-picker
          v-model="Search.endtime"
          show-time
          format="YYYY-MM-DD HH:mm:ss"/>
      </a-form-item>
      <a-form-item>
        <a-space>
          <a-button @click="GetData">搜索</a-button>
          <a-button @click="AddInfo">新增</a-button>
        </a-space>
      </a-form-item>
    </a-space>
  </a-form>
</template>
<script setup>
import {useCounterStore} from '@/pinia'
import {defineProps, reactive} from "vue";

const pinia = useCounterStore()
const props = defineProps(['usernameList']);

const Search = reactive({
  "username": pinia.UserData.username,
  "searchname": "",
  "starttime": "",
  "endtime": "",
})


const emit = defineEmits();

const GetData = () => {
  emit('get:Data', Search);
};

const flag = true

const AddInfo = () => {
  emit('add:AddInfo', flag);
};

</script>

