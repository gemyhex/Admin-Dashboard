<template>
  <div>
    <ReportToolbar
      :searchQuery="searchQuery"
      :filterType="filterType"
      :filterStatus="filterStatus"
      @update:searchQuery="searchQuery = $event"
      @update:filterType="filterType = $event"
      @update:filterStatus="filterStatus = $event"
    />

    <ReportTable
      :reports="filteredReports"
      @view="openDetails"
      @update-status="handleUpdateStatus"
    />

    <ReportDetails
      v-model:visible="showModal"
      :report="selectedReport"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useReportStore } from '@/stores/useReportStore'

import ReportToolbar from '../components/ReportToolbar.vue'
import ReportTable from '../components/ReportTable.vue'
import ReportDetails from '../components/ReportDetails.vue'

const store = useReportStore()

const searchQuery = ref('')
const filterType = ref('')
const filterStatus = ref('')

const selectedReport = ref(null)
const showModal = ref(false)

onMounted(() => {
  if (!store.reports.length) {
    store.loadMockData()
  }
})

const filteredReports = computed(() => {
  return store.reports.filter((r) => {
    const matchesSearch =
      r.title.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesType = filterType.value ? r.type === filterType.value : true
    const matchesStatus = filterStatus.value ? r.status === filterStatus.value : true
    return matchesSearch && matchesType && matchesStatus
  })
})

const openDetails = (report) => {
  selectedReport.value = report
  showModal.value = true
}

const handleUpdateStatus = ({ id, status }) => {
  store.updateStatus(id, status)
}
</script>
