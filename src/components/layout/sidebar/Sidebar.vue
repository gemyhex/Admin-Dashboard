<template>
  <aside class="w-56 bg-white dark:bg-gray-800 min-h-screen shadow pt-6">
    <h1 class="text-xl font-semibold dark:text-white text-center">Rezilens Dashboard</h1>
    <nav class="flex flex-col p-4 mt-6 ">
      <SidebarLink to="/dashboard">Dashboard</SidebarLink>
      <SidebarLink to="/users">Users Management</SidebarLink>
      <SidebarLink to="/reports">Reports</SidebarLink>
    </nav>
  </aside>
</template>

<script setup>
import SidebarLink from './SidebarLink.vue'
</script>
