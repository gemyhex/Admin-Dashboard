<template>
  <BaseTable :headers="tableHeaders" :items="reports">
    <template #default="{ item }">
      <td class="p-3">{{ item.title }}</td>
      <td class="p-3 capitalize">{{ item.type }}</td>
      <td class="p-3 capitalize">{{ item.status }}</td>
      <td class="p-3">{{ item.createdAt }}</td>
      <td class="p-3 flex gap-2">
        <BaseButton size="sm" @click="$emit('view', item)">View</BaseButton>
        <BaseSelect
          :modelValue="item.status"
          :options="statusOptions"
          @update:modelValue="(value) => $emit('update-status', { id: item.id, status: value })"
          class="w-28"
        />
      </td>
    </template>
  </BaseTable>
</template>

<script setup>
defineProps({
  reports: {
    type: Array,
    required: true,
  },
})
defineEmits(['view', 'update-status'])

const tableHeaders = [
  { key: 'title', label: 'Title' },
  { key: 'type', label: 'Type' },
  { key: 'status', label: 'Status' },
  { key: 'createdAt', label: 'Created' },
  { key: 'actions', label: 'Actions' },
]

const statusOptions = [
  { value: 'pending', label: 'Pending' },
  { value: 'resolved', label: 'Resolved' },
]
</script>
