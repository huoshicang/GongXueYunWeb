<template>
  <!--搜索-->
  <a-form :model="Search" layout="inline">
    <a-space>
      <a-form-item field="username" label="姓名">
        <a-select allow-clear :style="{width:'150px'}" v-model="Search.name" allow-search>
          <a-option v-for="(item, index) in props.usernameList"
                    :value="item"
                    :key="index">{{ item }}
          </a-option>
        </a-select>
      </a-form-item>
      <a-form-item field="phone" label="手机号">
        <a-select allow-clear :style="{width:'170px'}" v-model="Search.phone" allow-search>
          <a-option v-for="(item, index) in props.phoneList"
                    :value="item"
                    :key="index">{{ item }}
          </a-option>
        </a-select>
      </a-form-item>
      <a-form-item field="gxy_info" label="是否开启签到">
        <a-select v-model="Search.enable" :style="{width:'100px'}" allow-clear>
          <a-option value="false">关闭</a-option>
          <a-option value="true">开启</a-option>
        </a-select>
      </a-form-item>
      <a-form-item>
        <a-button @click="GetData">搜索</a-button>
      </a-form-item>
    </a-space>
  </a-form>
</template>
<script setup>
import {reactive} from "vue"
import { defineProps } from "vue";
import {useCounterStore} from '@/pinia'

const pinia = useCounterStore()

const props = defineProps(['usernameList', 'phoneList']);

const Search = reactive({
  name: "",
  phone: "",
  role: pinia.UserData.username,
  enable: "",
})

const emit = defineEmits();

const GetData = () => {
  emit('get:Data', Search);
};


</script>

<style scoped>

</style>
