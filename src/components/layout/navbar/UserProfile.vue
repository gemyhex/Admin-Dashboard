<script setup>
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/modules/auth/store/useAuthStore.js'

const auth = useAuthStore()
const router = useRouter()

const handleLogout = () => {
  auth.logout()
  router.push('/login')
}
</script>

<template>
  <div class="flex items-center space-x-2">
    <span class="text-gray-700 dark:text-gray-200 text-sm font-semibold">{{ auth.user?.first_name }}</span>
    <BaseButton @click="handleLogout">Logout</BaseButton>
  </div>
</template>
