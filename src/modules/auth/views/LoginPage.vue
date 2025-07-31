<template>
  <AuthLayout>
    <div class="w-screen min-h-screen flex items-center justify-center bg-gradient-to-br from-[#820235] to-[#310756] px-4">
      <div class="w-full max-w-md backdrop-blur-lg bg-white/10 dark:bg-white/10 border border-white/20 rounded-xl shadow-xl p-8 space-y-6">
        <h2 class="text-center text-5xl font-bold text-white">
          {{ appName }}
        </h2>
        <LoginForm />
      </div>
    </div>
  </AuthLayout>
</template>

<script setup>
import LoginForm from '../components/LoginForm.vue'
import AuthLayout from '@/layouts/AuthLayout.vue'

const appName = import.meta.env.VITE_APP_NAME
</script>
