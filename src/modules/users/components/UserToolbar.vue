<template>
  <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
    <!-- Search -->
    <BaseInput
      :modelValue="searchQuery"
      :required="false"
      @update:modelValue="$emit('update:searchQuery', $event)"
      placeholder="Search by name or email"
      class="w-full md:max-w-sm"
    />

    <!-- Filters -->
    <div class="flex gap-2">
      <BaseSelect
        :modelValue="filterRole"
        @update:modelValue="$emit('update:filterRole', $event)"
        :options="roleOptions"
        placeholder="All Roles"
      />
      <BaseSelect
        :modelValue="filterStatus"
        @update:modelValue="$emit('update:filterStatus', $event)"
        :options="statusOptions"
        placeholder="All Statuses"
      />

      <BaseButton @click="reset" class="btn-secondary">Reset</BaseButton>
    </div>
  </div>
</template>

<script setup>
defineProps(['searchQuery', 'filterRole', 'filterStatus'])
const emit = defineEmits(['update:searchQuery', 'update:filterRole', 'update:filterStatus'])

const roleOptions = [
  { value: 'admin', label: 'Admin' },
  { value: 'user', label: 'User' },
]

const statusOptions = [
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
]

const reset = () => {
  emit('update:searchQuery', '')
  emit('update:filterRole', '')
  emit('update:filterStatus', '')
}
</script>

<style scoped>
.btn-secondary {
  @apply px-3 py-2 border rounded-md bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white;
}
</style>
