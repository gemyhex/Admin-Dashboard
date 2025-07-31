<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
    <template v-if="loading">
      <SkeletonCard v-for="i in 4" :key="'skeleton-card-' + i" />
    </template>
    <template v-else>
      <SummaryCard label="Total Assets" :value="data.asset_count" />
      <SummaryCard label="Total Locations" :value="data.location_count" />
      <SummaryCard label="Asset Groups" :value="data.group_count" />
      <SummaryCard label="CVEs Detected" :value="data.cve_count" />
    </template>
  </div>
</template>

<script setup>
defineProps({
  data: Object,
  loading: Boolean,
})
</script>
