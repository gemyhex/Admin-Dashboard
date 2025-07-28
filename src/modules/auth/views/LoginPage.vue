<template>
  <AuthLayout>
    <div class="bg-white dark:bg-gray-800 p-6 rounded shadow w-full max-w-md">
      <h2 class="text-xl font-bold mb-4 text-center text-gray-800 dark:text-white">Login</h2>
      <LoginForm />
    </div>
  </AuthLayout>
</template>

<script setup>
import LoginForm from '../components/LoginForm.vue'
import AuthLayout from '@/layouts/AuthLayout.vue'
</script>
