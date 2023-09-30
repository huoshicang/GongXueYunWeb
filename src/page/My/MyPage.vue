<template>
  <User v-if="pinia.UserData.role === 'user'" />
  <Admin v-if="pinia.UserData.role === 'admin'" />
</template>
<script setup>
import {useCounterStore} from '@/pinia'

const pinia = useCounterStore()

import User from "@/page/My/User/UserComponents.vue";
import Admin from "@/page/My/Admin/AdminComponents.vue";
</script>
<style scoped>

</style>
