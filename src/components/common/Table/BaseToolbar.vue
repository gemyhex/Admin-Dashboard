<template>
  <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
    <BaseInput
      v-if="search !== undefined"
      :modelValue="search"
      placeholder="Search..."
      @update:modelValue="$emit('update:search', $event)"
      class="w-full md:max-w-sm"
    />

    <div class="flex gap-2 flex-wrap">
      <component
        v-for="(filter, index) in filters"
        :key="index"
        :is="resolveComponent(filter.type)"
        v-bind="filter.props"
        :modelValue="filter.modelValue"
        @update:modelValue="$emit('update:filter', { key: filter.label, value: $event })"
      />

      <BaseButton
        v-if="filters.length"
        @click="resetFilters"
        class="btn-secondary"
      >
        Reset
      </BaseButton>
    </div>
  </div>
</template>

<script setup>
import BaseInput from "@/components/common/BaseInput.vue";
import BaseSelect from "@/components/common/BaseSelect.vue";

const props = defineProps({
  search: String,
  filters: Array,
})
const emit = defineEmits(['update:search', 'update:filter'])

const resolveComponent = (type) => {
  const map = {
    text: BaseInput,
    selectBox: BaseSelect,
  }
  return map[type] || 'div'
}

const resetFilters = () => {
  props.filters.forEach((filter) => {
    emit('update:filter', { key: filter.label, value: '' })
  })
  if (props.search !== undefined) {
    emit('update:search', '')
  }
}
</script>


<style scoped>
.btn-secondary {
  @apply px-3 py-2 border rounded-md bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white;
}
</style>
