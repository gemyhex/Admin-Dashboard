<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Dashboard Overview</h1>

    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      <SummaryCard label="Total Users" :value="users.total" />
      <SummaryCard label="Active Users" :value="users.activeUsers" />
      <SummaryCard label="Inactive Users" :value="users.inactiveUsers" />
      <SummaryCard label="Total Reports" :value="reports.totalReports" />
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from '@/stores/useUserStore.js'
import { useReportStore } from '@/stores/useReportStore.js'
import SummaryCard from '../components/SummaryCard.vue'

const users = useUserStore()
const reports = useReportStore()
</script>
