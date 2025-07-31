<template>
  <div class="overflow-x-auto space-y-4 rounded-xl">
    <slot name="toolbar">
      <BaseToolbar
        v-if="showSearch"
        :search="search"
        :filters="filters"
        @update:search="$emit('update:search', $event)"
        @update:filter="$emit('update:filter', $event)"
      />
    </slot>

    <table class="min-w-full text-sm text-left bg-white dark:bg-gray-900 rounded-xl">
      <thead class="sticky top-0 z-10 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 border-b border-gray-200 dark:border-gray-700">
      <tr>
        <th
          v-for="header in headers"
          :key="header.key"
          class="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-600 dark:text-gray-300"
          @click="header.sortable && $emit('sort', header.key)"
          :class="[
              header.sortable ? 'cursor-pointer hover:text-primary-500' : '',
              'whitespace-nowrap select-none'
            ]"
        >
          {{ header.label }}
        </th>
      </tr>
      </thead>

      <tbody>
      <tr v-if="loading">
        <td :colspan="headers.length" class="px-6 py-6 text-center text-gray-400 dark:text-gray-500">
          Loading...
        </td>
      </tr>

      <template v-else-if="items.length">
        <tr
          v-for="(item, index) in items"
          :key="item.id || index"
          class="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
        >
          <slot name="row" :item="item" :index="index" />
        </tr>
      </template>

      <tr v-else>
        <td :colspan="headers.length" class="px-6 py-6 text-center text-gray-400 dark:text-gray-500">
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
  headers: {
    type: Array,
    required: true,
    default: () => [],
  },
  items: {
    type: Array,
    required: true,
    default: () => [],
  },
  search: {
    type: String,
    default: '',
  },
  filters: {
    type: Array,
    default: () => [],
  },
  showSearch: {
    type: Boolean,
    default: true,
  },
  loading: {
    type: Boolean,
    default: false,
  },
})

defineEmits(['sort', 'update:search', 'update:filter'])
</script>
