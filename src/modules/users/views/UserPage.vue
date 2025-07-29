<template>
  <div class="p-6">
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-xl font-bold text-gray-800 dark:text-white">User Management</h1>
      <BaseButton v-if="hasRole('admin')" @click="openForm()">+ Add User</BaseButton>
    </div>

    <UserTable
      :users="filteredUsersPaginated"
      @edit="openForm"
      @delete="deleteUser"
    />

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
import { usePermission } from '@/composables/usePermission'

import UserForm from '../components/UserForm.vue'
import UserTable from '../components/UserTable.vue'
import BaseButton from '@/components/common/BaseButton.vue'

const userStore = useUserStore()
userStore.seedInitialUsers()

const { hasRole } = usePermission()

const search = ref('')
const filters = ref({ role: '', status: '' })
const sortKey = ref('')
const currentPage = ref(1)
const perPage = 5
const showForm = ref(false)
const selectedUser = ref(null)

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

const filteredUsersPaginated = computed(() => {
  const start = (currentPage.value - 1) * perPage
  return filteredUsers.value.slice(start, start + perPage)
})

const openForm = (user = null) => {
  selectedUser.value = user
  showForm.value = true
}

const saveUser = (user) => {
  if (user.id) userStore.updateUser(user)
  else userStore.addUser(user)
  showForm.value = false
}

const deleteUser = (id) => {
  if (confirm('Are you sure you want to delete this user?')) {
    userStore.deleteUser(id)
  }
}

watch([search, filters], () => {
  currentPage.value = 1
})
</script>
