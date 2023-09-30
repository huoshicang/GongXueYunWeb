<template>
  <div id="modify">
    <From :usernameList="usernameList" @get:Data="GetData" @add:AddInfo="AddInfo"/>
    <n-divider/>
    <!--表格-->
    <a-table :data="pageData" :pagination="false" :scroll="{x: 'auto',y: 'auto',}">
      <template #columns>
        <a-table-column align="center" :width="100" title="月报ID" data-index="month_id"/>
        <a-table-column align="center" :width="130" title="用户姓名" data-index="username"/>
        <a-table-column align="center" :width="120" title="月报标题" data-index="title"/>
        <a-table-column align="center" :width="120" title="月报内容" data-index="content">
          <template #cell="{ record }">
            <a-tooltip :content="record.content">
              <a-button class="button">{{ record.content.substring(0, 6) }}</a-button>
            </a-tooltip>
          </template>
        </a-table-column>
        <a-table-column align="center" :width="280" title="提交时间" data-index="month_time"/>
        <a-table-column align="center" :width="100" title="是否已交">
          <template #cell="{ record }">
            <!-- 1:已交，0：未交 -->
            <n-tag type="success" v-if="record.sub === 1">
              已交
            </n-tag>
            <n-tag type="error" v-else-if="record.sub === 0">
              未交
            </n-tag>
          </template>
        </a-table-column>
        <a-table-column align="center" fixed="right" :width="100" title="是否启用">
          <template #cell="{ record }">
            <a-switch v-model="record.enable" disabled checked-value="true" unchecked-value="false"/>
          </template>
        </a-table-column>
        <a-table-column fixed="right" :width="170" align="center" title="操作">
          <template #cell="{ record }">
            <a-space>
              <a-button @click="ModifyInfo(record)">编辑</a-button>
              <a-popconfirm content="确定要删除吗？" type="warning" @ok="del(record)">
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
    
    <!--修改信息弹窗-->
    <a-modal v-model:visible="ModifyFlag" @ok="ModifyFun" title="修改用户信息" @cancel="OffModify">
      <a-form :model="ModifyForm" ref="FormModify" :rules="Rules">
        <a-form-item field="username" label="姓名" path="username">
          <a-input v-model="ModifyForm.username"/>
        </a-form-item>
        <a-form-item field="title" label="标题" path="title">
          <a-input v-model="ModifyForm.title"/>
        </a-form-item>
        <a-form-item field="content" label="内容" path="content">
          <a-textarea v-model="ModifyForm.content" allow-clear/>
        </a-form-item>
        <a-form-item field="enable" label="是否启用" path="enable">
          <a-switch v-model="ModifyForm.enable" checked-value="true" unchecked-value="false"/>
        </a-form-item>
        <a-form-item field="modify_time" label="提交日期" path="month_time">
          <a-date-picker v-model="ModifyForm.month_time" show-time format="YYYY-MM-DD HH:mm:ss"/>
        </a-form-item>
      </a-form>
    </a-modal>
    
    <!--添加-->
    <a-modal v-model:visible="AddFlag" @ok="AddOk" title="添加" fullscreen @cancel="customValue = []">
      <n-dynamic-input v-model:value="customValue" :on-create="onCreate">
        <template #create-button-default>
          随便搞点啥
        </template>
        <template #default="{ value }">
          <div style="display: flex; align-items: center; width: 100%">
            <n-space>
              <n-input v-model:value="value.title"
                        type="text"
                        placeholder="请输入标题"
                        style="width: 250px"/>
              <n-input style="width: 700px"
                        v-model:value="value.content"
                        type="textarea"
                        placeholder="请输入内容"
                        :autosize="{maxRows: 2}"/>
              <n-input style="width: 150px"
                        v-model:value="value.username"
                        type="text"
                        placeholder="请输入所属用户"/>
              <n-date-picker style="width: 200px"
                              placeholder="请选择时间"
                              v-model:formatted-value="value.month_time"
                              value-format="yyyy-MM-dd HH:mm:ss"
                              type="datetime" clearable/>
            </n-space>
          </div>
        </template>
      </n-dynamic-input>
    </a-modal>
  
  </div>
</template>
<script setup>
import From from "@/page/Month/FromComponents.vue";
import PaginationComponents from "@/components/PaginationComponents.vue";
import {computed, onMounted, reactive, ref} from "vue";
import {addMonth, delMonth, getMonth, modifyMonth} from "@/request/api";
import {useCounterStore} from '@/pinia'

const pinia = useCounterStore()

const InitSearch = {
  "username": pinia.UserData.username,
  "searchname": "",
  "starttime": "",
  "endtime": "",
}

const data = ref([]); // 表格数据
const usernameList = ref([]) //名称搜索


// 请求数据
const GetData = (Search) => {
  pinia.handleStart()
  getMonth(Search)
    .then((res) => {
      if (res.code === 200) {
        data.value = res.data
        usernameList.value = []
        if (usernameList.value.length === 0) {
          usernameList.value = []
          res.data.forEach(item => {
            const username = item.username;
            if (!usernameList.value.includes(username)) {
              usernameList.value.push(username);
            }
          });
        }
        
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


// 删除月报
const del = (record) => {
  delMonth({
    username: record.username,
    title: record.title,
    month_id: record.month_id
  })
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


// 编辑月报
/* 表单 */
const ModifyFlag = ref(false) // 弹窗开关
// 编辑表单
const ModifyForm = reactive({
  month_id: null,
  content: "",
  title: "",
  username: "",
  enable: "",
  month_time: ""
})

//编辑表单验证
const Rules = {
  title: {
    required: true,
    message: '请输入标题',
    trigger: ['blur']
  },
  content: {
    required: true,
    message: '请输入内容',
    trigger: ['blur']
  },
  username: {
    required: true,
    message: '请输入用户名',
    trigger: ['blur']
  },
  enable: {
    required: true,
    message: '请选择是否启用',
    trigger: ['blur']
  },
  month_time: {
    required: true,
    message: '请选择提交日期',
    trigger: ['blur']
  },
}

// 编辑按钮
const ModifyInfo = (record) => {
  ModifyForm.month_id = record.month_id
  ModifyForm.content = record.content
  ModifyForm.title = record.title
  ModifyForm.username = record.username
  ModifyForm.enable = record.enable
  ModifyForm.month_time = record.month_time
  
  
  ModifyFlag.value = true
}

// 编辑确定按钮
const FormModify = ref(null)
const ModifyFun = () => {
  if (FormModify.value?.validate((errors) => {
    return !errors;
  })) {
    modifyMonth(ModifyForm)
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
  ModifyForm.month_id = null
  ModifyForm.content = ""
  ModifyForm.title = ""
  ModifyForm.username = ""
  ModifyForm.enable = ""
  ModifyForm.month_time = ""
}


// 添加
const AddFlag = ref(false)

const customValue = ref([])
// 点击添加按钮时的回调，如果设定则返回值会被用作新添加的初始值
const onCreate = () => {
  return {
    content: "",
    title: "",
    username: "",
    modify_time: null
  }
}

const AddInfo = (flag) => {
  AddFlag.value = flag
  pinia.WarningNotification({
    title: "建议",
    content: '不要一次性输入太多',
    position: "topLeft"
  })
};

// 确定
const AddOk = () => {
  pinia.handleStart()
  addMonth(customValue.value)
    .then((res) => {
      if (res.data === 200){
        pinia.SuccessNotification(res.message)
        pinia.handleFinish()
      }else {
        pinia.handleError()
        customValue.value = res.data
        
        
        // 已存在
        if (res.message['exist']['num'] !== 0){
          pinia.FailureNotification({
            title: "已存在",
            content: res.message['exist']['title'].join(" "),
            duration: 3000,
          })
        }
         // 失败
        if (res.message['lose']['num'] !== 0){
          pinia.FailureNotification({
            title: "添加失败",
            content: res.message['lose']['title'].join(" "),
            duration: 3000,
          })
        }

        // 缺少参数
        if (res.message['lack']['num'] !== 0){
          pinia.FailureNotification({
            title: "缺少参数",
            content: res.message['lack']['title'].join(" "),
            duration: 3000,
          })
        }
        
        AddFlag.value = true
      }
    })
    .catch(() => {
      pinia.TimeOutNotification()
      pinia.handleError()
    })
}

onMounted(() => {
  GetData(InitSearch)
})

</script>
<style scoped>
#modify {
  padding-top: 5px;
}
</style>
