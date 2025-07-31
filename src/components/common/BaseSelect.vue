<template>
  <div class="space-y-1">
    <label
      v-if="label"
      :for="name"
      class="block text-sm font-medium text-gray-700 dark:text-gray-300"
    >
      {{ label }}
    </label>

    <select
      :id="name"
      :value="modelValue"
      @change="$emit('update:modelValue', $event.target.value)"
      :class="computedSelectClasses"
      v-bind="$attrs"
    >
      <option v-if="placeholder" disabled value="">{{ placeholder }}</option>
      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
      >
        {{ option.label }}
      </option>
    </select>

    <p v-if="error" class="text-sm text-red-500">{{ error }}</p>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: [String, Number],
  name: String,
  label: String,
  options: {
    type: Array,
    required: true,
  },
  placeholder: String,
  error: String,
})

defineEmits(['update:modelValue'])

const baseSelectClass =
  'w-full px-4 py-2 rounded-lg bg-white backdrop-blur-md border bg-white dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none'

const computedSelectClasses = computed(() => [
  baseSelectClass,
  {
    'border-red-500 focus:ring-red-500 focus:border-red-500': !!props.error,
  },
])
</script>
