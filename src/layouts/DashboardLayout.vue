<template>
  <div class="min-h-screen flex bg-gray-100 dark:bg-gray-900">
    <Sidebar />

    <div class="flex flex-col flex-1">
      <AppHeader />
      <main class="p-6">
        <router-view />
      </main>
    </div>
  </div>
</template>


<script setup>
import Sidebar from '@/components/layout/sidebar/Sidebar.vue'
import AppHeader from '@/components/layout/navbar/AppHeader.vue'
</script>
