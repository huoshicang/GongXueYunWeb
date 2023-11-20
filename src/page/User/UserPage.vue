<template>
  <div id="user">
    <From :usernameList="usernameList" :phoneList="phoneList" @get:Data="GetData"/>
    <n-divider/>
    <!--表格-->
    <a-table :data="pageData" :pagination="false" :scroll="{x: 'auto',y: 'auto',}">
      <template #columns>
        <a-table-column align="center" :width="100" title="用户ID" data-index="id"/>
        <a-table-column align="center" :width="130" title="用户姓名" data-index="username"/>
        <a-table-column align="center" :width="120" title="手机号" data-index="phone"/>
        <a-table-column align="center" :width="290" title="最新登录时间" data-index="update_time"/>
        <a-table-column align="center" fixed="right" :width="100" title="是否有签到信息">
          <template #cell="{ record }">
            <n-tag type="success" v-if="record.gxyInfo === 'true'">
              有
            </n-tag>
            <n-tag type="error" v-else-if="record.gxyInfo === 'false'">
              无
            </n-tag>
          </template>
        </a-table-column>
        <a-table-column align="center" fixed="right" :width="150" title="角色">
          <template #cell="{ record }">
            <n-tag type="info" v-if="record.role === 'admin'">
              管理员
            </n-tag>
            <n-tag v-else-if="record.role === 'user'">
              用户
            </n-tag>
          </template>
        </a-table-column>
        <a-table-column fixed="right" :width="270" align="center" title="操作">
          <template #cell="{ record }">
            <a-space>
              <a-button @click="ModifyInfo(record)">编辑</a-button>
              <a-popconfirm content="确定要删除吗？如果有签到信息会一起删除" type="warning" @ok="del(record)">
                <a-button>删除</a-button>
              </a-popconfirm>
              <a-popconfirm content="确定要重置密码？" type="warning" @ok="ResetPassword(record)">
                <a-button>重置密码</a-button>
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
    
    <!--修改信息弹窗-->
    <a-modal v-model:visible="ModifyFlag" @ok="ModifyFun" title="修改用户信息" @cancel="OffModify">
      <a-form :model="ModifyForm" ref="FormModify" :rules="Rules">
        <a-form-item field="username" label="姓名" path="username">
          <a-input v-model="ModifyForm.username"/>
        </a-form-item>
        <a-form-item field="phone" label="手机号" path="phone">
          <a-input v-model="ModifyForm.phone"/>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>
<script setup>
import {computed, onMounted, reactive, ref} from "vue";
import {Del, GetInfo, modify, reset} from "@/request/api";
import {useCounterStore} from '@/pinia'
import PaginationComponents from "@/components/PaginationComponents.vue";
import From from "@/page/User/FromComponents.vue";

const pinia = useCounterStore()

const InitSearch = {
  "name": pinia.UserData.username,
  "username": "",
  "phone": "",
  "gxyInfo": "",
}

const data = ref([]); // 表格数据
const usernameList = ref([]) //名称搜索
const phoneList = ref([]);



// 请求数据
const GetData = (Search) => {
  pinia.handleStart()
  GetInfo(Search)
    .then((res) => {
      if (res.code === 200) {
        data.value = res.data
        usernameList.value = []
        
        if (usernameList.value.length === 0 || phoneList.value.length === 0) {
          usernameList.value = []
          phoneList.value = []
          res.data.forEach((item) => {
            usernameList.value.push(item.username)
            phoneList.value.push(item.phone)
          })
        }
        
        pinia.handleFinish()
      } else {
        pinia.FailureNotification(res.message)
        pinia.handleError()
      }
    })
    .catch(() => {
      pinia.TimeOutNotification()
      pinia.TimeOutNotification()
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

// 删除
const del = (record) => {
  Del({
    "id": record.id,
    "username": record.username
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
      pinia.handleError()
    })
}


/* 表单 */
const ModifyFlag = ref(false) // 弹窗开关
// 编辑表单
const ModifyForm = reactive({
  id: "",
  username: "",
  phone: ""
})

//编辑表单验证
const Rules = {
  username: {
    required: true,
    message: '请输入用户名',
    trigger: ['blur']
  },
  phone: [
    {
      required: true,
      message: '请输入手机号',
      trigger: ['blur']
    },
    {
      pattern: /^1[3456789]\d{9}$/,
      message: '手机号码格式不正确',
      trigger: ['change']
    }
  ],
}

// 编辑按钮
const ModifyInfo = (record) => {
  ModifyForm.id = record.id
  ModifyForm.username = record.username
  ModifyForm.phone = record.phone
  ModifyFlag.value = true
}

// 编辑确定按钮
const FormModify = ref(null)
const ModifyFun = () => {
  if (FormModify.value?.validate((errors) => {
    return !errors;
  })) {
    modify(ModifyForm)
      .then((res) => {
        if (res.code === 200) {
          pinia.SuccessNotification(res.message)
          GetData(InitSearch)
        } else {
          pinia.FailureNotification(res.message)
        }
      })
      .catch(() => {
        pinia.TimeOutNotification()
      })
  }
}

// 编辑关闭
const OffModify = () => {
  ModifyForm.id = ""
  ModifyForm.username = ""
  ModifyForm.phone = ""
}

// 重置密码
const ResetPassword = (record) => {
  pinia.WarningNotification({
    id: 'ResetPassword',
    title: '修改密码',
    content: `密码将会重置为：123456 请尽快登录修改密码`,
    duration: 2000,
  })
  
  reset({
    id: record.id,
    username: record.username
  })
    .then((res) => {
      if (res.code === 200) {
        pinia.SuccessNotification({
          id: 'ResetPassword',
          title: '修改密码',
          content: '密码重置完成',
          duration: 2000,
        })
      } else {
        pinia.SuccessNotification({
          id: 'ResetPassword',
          title: '修改密码',
          content: res.message,
          duration: 3000,
        })
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
#user {
  padding-top: 5px;
}
</style>
