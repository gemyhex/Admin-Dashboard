<template>
  <div class="p-6">
    <!-- Header -->
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-xl font-bold text-gray-800 dark:text-white">User Management</h1>
      <BaseButton v-if="auth.isAdmin" @click="openForm()">+ Add User</BaseButton>
    </div>

    <!-- Filters Toolbar -->
    <UserToolbar
      :searchQuery="search"
      :filterRole="roleFilter"
      :filterStatus="statusFilter"
      @update:searchQuery="search = $event"
      @update:filterRole="roleFilter = $event"
      @update:filterStatus="statusFilter = $event"
    />

    <!-- User Table -->
    <UserTable
      :users="paginatedUsers"
      :sortKey="sortKey"
      @edit="openForm"
      @delete="deleteUser"
      @sort="sortBy"
    />

    <!-- Pagination -->
    <BasePagination
      :total="filteredUsers.length"
      :currentPage="currentPage"
      :perPage="perPage"
      @update:currentPage="currentPage = $event"
    />

    <!-- User Modal -->
    <UserForm
      v-model:is-open="showForm"
      :modelValue="selectedUser"
      @submit="saveUser"
    />
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

import { useUserStore } from '@/stores/useUserStore'
import { useAuthStore } from '@/modules/auth/store/useAuthStore'

import UserToolbar from '../components/UserToolbar.vue'
import UserForm from '../components/UserForm.vue'
import UserTable from '../components/UserTable.vue'

const auth = useAuthStore()
const usersStore = useUserStore()
usersStore.seedInitialUsers()

const search = ref('')
const roleFilter = ref('')
const statusFilter = ref('')
const sortKey = ref('')
const currentPage = ref(1)
const perPage = 5
const selectedUser = ref(null)
const showForm = ref(false)

const filteredUsers = computed(() =>
  usersStore.users
    .filter(u =>
      u.fullName.toLowerCase().includes(search.value.toLowerCase()) ||
      u.email.toLowerCase().includes(search.value.toLowerCase())
    )
    .filter(u => (roleFilter.value ? u.role === roleFilter.value : true))
    .filter(u => (statusFilter.value ? u.status === statusFilter.value : true))
    .sort((a, b) => {
      if (!sortKey.value) return 0
      return a[sortKey.value].localeCompare(b[sortKey.value])
    })
)

const start = computed(() => (currentPage.value - 1) * perPage)
const end = computed(() => currentPage.value * perPage)
const paginatedUsers = computed(() => filteredUsers.value.slice(start.value, end.value))

watch([search, roleFilter, statusFilter], () => {
  currentPage.value = 1
})

const sortBy = (key) => {
  sortKey.value = sortKey.value === key ? '' : key
}

const openForm = (user = null) => {
  selectedUser.value = user
  showForm.value = true
}

const saveUser = (user) => {
  if (user.id) {
    usersStore.updateUser(user)
  } else {
    usersStore.addUser(user)
  }
  showForm.value = false
}

const deleteUser = (id) => {
  if (confirm('Are you sure you want to delete this user?')) {
    usersStore.deleteUser(id)
  }
}
</script>
