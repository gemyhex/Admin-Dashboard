<template>
  <header class="flex justify-end items-center p-4 bg-white dark:bg-gray-800 shadow">
    <div class="flex items-center space-x-4">
      <ThemeToggle />
      <UserProfile />
    </div>
  </header>
</template>

<script setup>
import ThemeToggle from './ThemeToggle.vue'
import UserProfile from './UserProfile.vue'
</script>
