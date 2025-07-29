<template>
  <BaseTable
    :headers="headers"
    :items="paginatedUsers"
    :search="search"
    :filters="filterConfig"
    @update:search="search = $event"
    @update:filter="handleFilterChange"
    @sort="sortBy"
  >
    <template #default="{ item }">
      <td class="p-3">{{ item.fullName }}</td>
      <td class="p-3">{{ item.email }}</td>
      <td class="p-3 capitalize">{{ item.role }}</td>
      <td class="p-3 capitalize">{{ item.status }}</td>
      <td class="p-3">{{ item.createdAt }}</td>
      <td class="p-3 space-x-2">
        <BaseButton v-if="hasRole('admin')" @click="$emit('edit', item)">Edit</BaseButton>
        <BaseButton v-if="hasRole('admin')" variant="danger" @click="$emit('delete', item.id)">Delete</BaseButton>
      </td>
    </template>

    <template #footer>
      <BasePagination
        :total="filteredUsers.length"
        :currentPage="currentPage"
        :perPage="perPage"
        @update:currentPage="currentPage = $event"
      />
    </template>
  </BaseTable>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useUserStore } from '@/stores/useUserStore'
import { RoleOptions, UserStatusOptions } from '../enums/enums'
import {usePermission} from "@/composables/usePermission.js";

const emit = defineEmits(['edit', 'delete'])
const { hasRole } = usePermission()

const headers = [
  { key: 'fullName', label: 'Name', sortable: true },
  { key: 'email', label: 'Email', sortable: true },
  { key: 'role', label: 'Role' },
  { key: 'status', label: 'Status' },
  { key: 'createdAt', label: 'Created' },
  { key: 'actions', label: 'Actions' },
]

const search = ref('')
const filters = ref({ role: '', status: '' })
const sortKey = ref('')
const currentPage = ref(1)
const perPage = 5

const userStore = useUserStore()

const filteredUsers = computed(() => {
  return userStore.users
    .filter(u =>
      u.fullName.toLowerCase().includes(search.value.toLowerCase()) ||
      u.email.toLowerCase().includes(search.value.toLowerCase())
    )
    .filter(u => !filters.value.role || u.role === filters.value.role)
    .filter(u => !filters.value.status || u.status === filters.value.status)
    .sort((a, b) => {
      if (!sortKey.value) return 0
      return a[sortKey.value]?.localeCompare(b[sortKey.value])
    })
})

const paginatedUsers = computed(() => {
  const start = (currentPage.value - 1) * perPage
  return filteredUsers.value.slice(start, start + perPage)
})

const filterConfig = [
  {
    type: 'selectBox',
    label: 'role',
    modelValue: filters.value.role,
    props: {
      options: RoleOptions,
      placeholder: 'All Roles',
    },
  },
  {
    type: 'selectBox',
    label: 'status',
    modelValue: filters.value.status,
    props: {
      options: UserStatusOptions,
      placeholder: 'All Statuses',
    },
  },
]

const handleFilterChange = ({ key, value }) => {
  filters.value[key] = value
  currentPage.value = 1
}

const sortBy = (key) => {
  sortKey.value = sortKey.value === key ? '' : key
}
</script>
