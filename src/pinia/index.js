import {defineStore} from 'pinia'
import {ref} from 'vue';
import {Notification} from "@arco-design/web-vue";

export const useCounterStore = defineStore(
    'counter',
    () => {
      const selectedKey = ref("用户管理")

      /*加载条*/
      const loadingBar = null
      const disabledRef = ref(true)
      // 开始
      const handleStart = () => {
      }
      // 完成
      const handleFinish = () => {
      }
      // 错误
      const handleError = () => {
      }

      const UserData = ref({})

      // 成功通知
      const SuccessNotification = (info) => {
        Notification.success(info);
      }

      // 失败通知
      const FailureNotification = (info) => {
        Notification.error(info)
      }

      // 警告通知
      const WarningNotification = (info) => {
        Notification.warning(info)
      }

      // 超时通知
      const TimeOutNotification = () => {
        Notification.error("网络超时")
      }

      return {
        selectedKey,
        loadingBar,
        disabledRef,
        handleStart,
        handleFinish,
        handleError,
        UserData,
        SuccessNotification,
        WarningNotification,
        FailureNotification,
        TimeOutNotification,
      }
    },
    {
      persist: {
        enabled: true,
        key: 'counter',
        storage: sessionStorage,
      },
    })
