import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
const app = createApp(App)

import { createPinia } from 'pinia'
const pinia = createPinia()
import piniaPlug from "pinia-plugin-persistedstate";
pinia.use(piniaPlug);

import ArcoVue from '@arco-design/web-vue';
import ArcoVueIcon from '@arco-design/web-vue/es/icon';
import '@arco-design/web-vue/dist/arco.css';

import naive from "naive-ui";

import less from 'less'

import '@/assets/index.css'

import axios from "axios";

axios.defaults.baseURL = process.env.VUE_APP_BASEURL

app.use(pinia)
    .use(router)
    .use(ArcoVue)
    .use(ArcoVueIcon)
    .use(naive)
    .use(less)
    .mount('#app')
