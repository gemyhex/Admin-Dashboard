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
    <span class="text-gray-700 dark:text-gray-200 text-sm">{{ auth.user?.fullName }}</span>
    <BaseButton @click="handleLogout" class="text-sm bg-transparent hover:bg-transparent text-red-500 hover:underline">Logout</BaseButton>
  </div>
</template>
