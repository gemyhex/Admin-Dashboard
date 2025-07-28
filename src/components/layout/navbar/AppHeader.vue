<template>
  <header class="flex justify-between items-center p-4 bg-white dark:bg-gray-800 shadow">
    <h1 class="text-xl font-semibold dark:text-white">Admin Dashboard</h1>
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
