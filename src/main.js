import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router/index.js'
import axios from '@/plugins/axios'
import GlobalComponents from '@/plugins/global-components'
import './assets/styles/main.scss'

const app = createApp(App)

app.config.globalProperties.$axios = axios

app.use(createPinia())
app.use(router)
app.use(GlobalComponents)

app.mount('#app')
