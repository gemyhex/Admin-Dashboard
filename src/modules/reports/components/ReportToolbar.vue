<template>
  <div class="flex flex-col md:flex-row justify-between gap-4 mb-4">
    <BaseInput
      :modelValue="searchQuery"
      @update:modelValue="$emit('update:searchQuery', $event)"
      placeholder="Search reports"
      class="w-full md:max-w-sm"
    />

    <div class="flex gap-2">
      <BaseSelect
        :modelValue="filterType"
        @update:modelValue="$emit('update:filterType', $event)"
        :options="typeOptions"
        placeholder="All Types"
        label="Type"
      />
      <BaseSelect
        :modelValue="filterStatus"
        @update:modelValue="$emit('update:filterStatus', $event)"
        :options="statusOptions"
        placeholder="All Statuses"
        label="Status"
      />
    </div>
  </div>
</template>

<script setup>
defineProps(['searchQuery', 'filterType', 'filterStatus'])
defineEmits(['update:searchQuery', 'update:filterType', 'update:filterStatus'])

const typeOptions = [
  { value: 'bug', label: 'Bug' },
  { value: 'feature', label: 'Feature' },
]

const statusOptions = [
  { value: 'pending', label: 'Pending' },
  { value: 'resolved', label: 'Resolved' },
]
</script>
