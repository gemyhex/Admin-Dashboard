<template>
  <div class="space-y-8">
    <AssetSummary :data="assetData.summery" :loading="loading" />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <template v-if="loading">
        <SkeletonChart />
        <SkeletonChart />
      </template>
      <template v-else>
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4">
          <h2 class="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
            Assets by Location
          </h2>
          <DynamicChart type="bar" :chartData="locationChart" />
        </div>
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4">
          <h2 class="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
            Assets by Group
          </h2>
          <DynamicChart type="bar" :chartData="groupChart" />
        </div>
      </template>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-1 gap-6">
      <div v-if="!loading">
        <h2 class="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
          Hot Assets
        </h2>
        <AssetTable :columns="assetColumns" :items="assetData.table.hot_asset" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import AssetSummary from '../components/AssetSummary.vue'
import AssetTable from '../components/AssetTable.vue'
import { fetchDashboardOverview } from "@/modules/dashboard/services/dashboardService.js"
import { formatSimpleBarChart } from '@/utils/chartHelpers'

const loading = ref(true)
const assetData = ref({ summery: {}, chart: {}, table: { hot_asset: [], new_cve: [] } })

const locationChart = ref(null)
const groupChart = ref(null)

const assetColumns = [
  { key: 'title', label: 'Title' },
  { key: 'location', label: 'Location' },
  { key: 'group', label: 'Group' },
  { key: 'key1', label: 'Key 1' },
  { key: 'key2', label: 'Key 2' },
]

const cveColumns = [
  { key: 'title', label: 'Title' },
  { key: 'date', label: 'Date' },
  { key: 'priority', label: 'Priority' },
  { key: 'asset_count', label: 'Assets Affected' },
  { key: 'key1', label: 'Key 1' },
]

onMounted(async () => {
  const response = await fetchDashboardOverview()
  const { asset_status } = response.data
  assetData.value = asset_status
  locationChart.value = formatSimpleBarChart(asset_status.chart.location)
  groupChart.value = formatSimpleBarChart(asset_status.chart.group)
  loading.value = false
})
</script>
