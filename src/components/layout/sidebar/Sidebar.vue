<template>
  <aside class="w-64 bg-white dark:bg-gray-800 h-screen shadow">
    <nav class="flex flex-col p-4 space-y-2">
      <SidebarLink to="/dashboard">Dashboard</SidebarLink>
      <SidebarLink to="/users">Users Management</SidebarLink>
      <SidebarLink to="/reports">Reports</SidebarLink>
    </nav>
  </aside>
</template>

<script setup>
import SidebarLink from './SidebarLink.vue'
</script>
