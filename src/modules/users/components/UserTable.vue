<template>
  <BaseTable :headers="tableHeaders" :items="users">
    <template #default="{ item: user }">
      <td class="p-3">{{ user.fullName }}</td>
      <td class="p-3">{{ user.email }}</td>
      <td class="p-3 capitalize">{{ user.role }}</td>
      <td class="p-3 capitalize">{{ user.status }}</td>
      <td class="p-3">{{ user.createdAt }}</td>
      <td class="p-3 space-x-2">
        <BaseButton @click="$emit('edit', user)">Edit</BaseButton>
        <BaseButton variant="danger" @click="$emit('delete', user.id)">Delete</BaseButton>
      </td>
    </template>
  </BaseTable>
</template>

<script setup>
defineProps({
  users: Array,
  sortKey: String,
})
defineEmits(['edit', 'delete', 'sort'])

const tableHeaders = [
  { key: 'fullName', label: 'Name', sortable: true },
  { key: 'email', label: 'Email', sortable: true },
  { key: 'role', label: 'Role' },
  { key: 'status', label: 'Status' },
  { key: 'createdAt', label: 'Created At' },
  { key: 'actions', label: 'Actions' },
]
</script>
