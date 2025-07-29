import './assets/styles/main.scss'
// Components
import BaseInput from '@/components/common/BaseInput.vue'
import BaseButton from '@/components/common/BaseButton.vue'
import BaseSelect from '@/components/common/BaseSelect.vue'
import BaseTable from '@/components/common/Table/BaseTable.vue'
import BasePagination from '@/components/common/BasePagination.vue'
import BaseModal from '@/components/common/BaseModal.vue'
import BaseToolbar from '@/components/common/Table/BaseToolbar.vue'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router/index.js'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.component('BaseInput', BaseInput)
app.component('BaseButton', BaseButton)
app.component('BaseSelect', BaseSelect)
app.component('BaseTable', BaseTable)
app.component('BaseToolbar', BaseToolbar)
app.component('BaseModal', BaseModal)
app.component('BasePagination', BasePagination)

app.mount('#app')
