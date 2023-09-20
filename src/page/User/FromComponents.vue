<template>
  <!--搜索-->
  <a-form :model="Search" layout="inline">
    <a-space>
      <a-form-item field="username" label="姓名">
        <a-select allow-clear :style="{width:'150px'}" v-model="Search.username" allow-search>
          <a-option v-for="(item, index) in props.usernameList"
                    :value="item"
                    :key="index">{{ item }}
          </a-option>
        </a-select>
      </a-form-item>
      <a-form-item field="username" label="手机号">
        <a-select allow-clear :style="{width:'170px'}" v-model="Search.phone" allow-search>
          <a-option v-for="(item, index) in props.phoneList"
                    :value="item"
                    :key="index">{{ item }}
          </a-option>
        </a-select>
      </a-form-item>
      <a-form-item field="gxy_info" label="是否有签到信息">
        <a-select v-model="Search.gxy_info" :style="{width:'100px'}" allow-clear>
          <a-option value="false">无</a-option>
          <a-option value="true">有</a-option>
        </a-select>
      </a-form-item>
      <a-form-item>
        <a-button @click="GetData">搜索</a-button>
      </a-form-item>
    </a-space>
  </a-form>
</template>
<script setup>
import {useCounterStore} from '@/pinia'
import {defineProps, reactive} from "vue";

const pinia = useCounterStore()
const props = defineProps(['usernameList', 'phoneList']);

const Search = reactive({
  "name": pinia.UserData.username,
  "username": "",
  "phone": "",
  "gxy_info": ""
})

const emit = defineEmits();

const GetData = () => {
  emit('get:Data', Search);
};

</script>

