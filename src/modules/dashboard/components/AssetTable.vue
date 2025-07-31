<template>
  <BaseTable
    :headers="columns"
    :items="items"
    :show-search="false"
    :loading="false"
  >
    <template #row="{ item }">
      <td
        v-for="col in columns"
        :key="col.key"
        class="px-4 py-2 text-sm"
      >
        {{ item[col.key] || '—' }}
      </td>
    </template>
  </BaseTable>
</template>

<script setup>
defineProps({
  items: { type: Array, required: true },
  columns: { type: Array, required: true },
})
</script>
