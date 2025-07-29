<template>
  <div class="p-6">
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-xl font-bold text-gray-800 dark:text-white">Reports</h1>
    </div>
    <ReportTable
      :reports="filteredReports"
      @view="openDetails"
      @update-status="handleUpdateStatus"
    />

    <ReportDetails
      v-model:is-open="showModal"
      :report="selectedReport"
    />
  </div>
</template>

<script setup>
import {ref, computed, onMounted} from 'vue'
import {useReportStore} from '@/stores/useReportStore'

import ReportTable from '../components/ReportTable.vue'
import ReportDetails from '../components/ReportDetails.vue'
import BaseButton from "@/components/common/BaseButton.vue";

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

const handleUpdateStatus = ({id, status}) => {
  store.updateStatus(id, status)
}
</script>
