<template>
  <button @click="toggleTheme" class="text-xl">
    <span v-if="theme === 'light'">🌞</span>
    <span v-else>🌙</span>
  </button>
</template>

<script setup>
import { ref, watchEffect } from 'vue'

const theme = ref(localStorage.getItem('theme') || 'light')

const toggleTheme = () => {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
  localStorage.setItem('theme', theme.value)
}

watchEffect(() => {
  document.documentElement.classList.toggle('dark', theme.value === 'dark')
})
</script>
