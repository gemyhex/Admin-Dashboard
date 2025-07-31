<script setup>
import {useRouter} from 'vue-router'
import {useAuthStore} from '@/modules/auth/store/useAuthStore.js'

const auth = useAuthStore()
const router = useRouter()

const handleLogout = () => {
  auth.logout()
  router.push('/login')
}
</script>

<template>
  <div class="flex items-center space-x-2">
    <div class="flex flex-col items-center">
      <span class="text-black dark:text-gray-200 text-sm font-semibold">{{
          auth.user?.name
        }}</span>
      <span class="text-gray-700 dark:text-gray-500 text-xs font-semibold">{{
          auth.user?.company_title
        }}</span>
    </div>
    <BaseButton @click="handleLogout" variant="transparent">Logout</BaseButton>
  </div>
</template>
