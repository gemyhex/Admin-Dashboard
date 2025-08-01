<template>
  <BaseTable
    :headers="headers"
    :items="paginatedReports"
    :search="search"
    :filters="computedFilters"
    :loading="false"
    @update:search="search = $event"
    @update:filter="handleFilterChange"
    @sort="sortReports"
  >
    <template #row="{ item }">
      <td class="px-5 py-3">{{ item.title }}</td>
      <td class="px-5 py-3 capitalize">{{ item.type }}</td>
      <td class="px-5 py-3 capitalize">{{ item.status }}</td>
      <td class="px-5 py-3">{{ item.createdAt }}</td>
      <td class="px-5 py-3 flex gap-2 items-center">
        <BaseButton
          v-if="hasRole('admin')"
          size="sm"
          @click="emit('view', item)"
        >
          View
        </BaseButton>
        <BaseSelect
          v-if="hasRole('admin')"
          class="w-28"
          :modelValue="item.status"
          :options="StatusOptions"
          @update:modelValue="(val) => emit('update-status', { id: item.id, status: val })"
        />
      </td>
    </template>

    <template #footer>
      <BasePagination
        :total="filteredReports.length"
        :currentPage="currentPage"
        :perPage="perPage"
        @update:currentPage="currentPage = $event"
      />
    </template>
  </BaseTable>
</template>

<script setup>
import { ref, computed } from 'vue'
import { usePermission } from '@/composables/usePermission.js'
import { TypeOptions, StatusOptions } from '../enums/enums'

const props = defineProps({
  reports: {
    type: Array,
    required: true,
  },
})
const emit = defineEmits(['view', 'update-status'])

const { hasRole } = usePermission()

const headers = [
  { key: 'title', label: 'Title', sortable: true },
  { key: 'type', label: 'Type', sortable: true },
  { key: 'status', label: 'Status', sortable: true },
  { key: 'createdAt', label: 'Created', sortable: true },
  { key: 'actions', label: 'Actions' },
]

const search = ref('')
const sortKey = ref('')
const currentPage = ref(1)
const perPage = 5
const filtersData = ref({
  type: '',
  status: '',
})

const computedFilters = computed(() => [
  {
    type: 'selectBox',
    label: 'type',
    modelValue: filtersData.value.type,
    props: {
      options: TypeOptions,
      placeholder: 'All Types',
    },
  },
  {
    type: 'selectBox',
    label: 'status',
    modelValue: filtersData.value.status,
    props: {
      options: StatusOptions,
      placeholder: 'All Statuses',
    },
  },
])

const handleFilterChange = ({ key, value }) => {
  filtersData.value[key] = value
  currentPage.value = 1
}

const sortReports = (key) => {
  sortKey.value = sortKey.value === key ? '' : key
}

const filteredReports = computed(() => {
  return props.reports
    .filter((r) => r.title.toLowerCase().includes(search.value.toLowerCase()))
    .filter((r) => !filtersData.value.type || r.type === filtersData.value.type)
    .filter((r) => !filtersData.value.status || r.status === filtersData.value.status)
    .sort((a, b) => {
      if (!sortKey.value) return 0
      return a[sortKey.value]?.localeCompare?.(b[sortKey.value]) ?? 0
    })
})

const paginatedReports = computed(() => {
  const start = (currentPage.value - 1) * perPage
  return filteredReports.value.slice(start, start + perPage)
})
</script>
