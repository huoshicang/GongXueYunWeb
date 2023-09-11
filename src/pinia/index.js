import {defineStore} from 'pinia'
import {ref} from 'vue';

export const useCounterStore = defineStore(
    'counter',
    () => {
      const selectedKey = ref("用户管理")

      /*加载条*/
      const loadingBar = null
      const disabledRef = ref(true)
      // 开始
      const handleStart = () => {}
      // 完成
      const handleFinish = () => {}
      // 错误
      const handleError = () => {}

      const UserData = ref({})

      return {
        selectedKey,
        loadingBar,
        disabledRef,
        handleStart,
        handleFinish,
        handleError,
        UserData,
      }
    },
    {
      persist: {
        enabled: true,
        key: 'counter',
        storage: sessionStorage,
      },
    })
