<template>
  <div class="overflow-x-auto space-y-4">
    <slot name="toolbar">
      <BaseToolbar
        v-if="showSearch"
        :search="search"
        :filters="filters"
        @update:search="$emit('update:search', $event)"
        @update:filter="$emit('update:filter', $event)"
      />
    </slot>

    <table class="w-full text-sm text-left border-collapse">
      <thead class="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200">
      <tr>
        <th
          v-for="header in headers"
          :key="header.key"
          class="p-3 font-medium"
          @click="header.sortable && $emit('sort', header.key)"
          :class="{ 'cursor-pointer': header.sortable }"
        >
          {{ header.label }}
        </th>
      </tr>
      </thead>
      <tbody>
      <tr
        v-for="(item, index) in items"
        :key="item.id || index"
        class="border-b hover:bg-gray-50 dark:hover:bg-gray-700"
      >
        <slot :item="item" :index="index" />
      </tr>
      <tr v-if="!items.length">
        <td :colspan="headers.length" class="p-4 text-center text-gray-400">
          No data found.
        </td>
      </tr>
      </tbody>
    </table>

    <div class="pt-2">
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup>
defineProps({
  headers: Array,
  items: Array,
  search: String,
  filters: { type: Array, default: () => [] },
  showSearch: { type: Boolean, default: true },
})
defineEmits(['sort', 'update:search', 'update:filter'])
</script>
