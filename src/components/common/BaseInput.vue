<template>
  <div class="space-y-1">
    <label
      v-if="label"
      :for="name"
      class="block text-sm font-medium text-gray-700 dark:text-gray-300"
    >
      {{ label }}
    </label>

    <input
      :id="name"
      :type="type"
      :placeholder="placeholder"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      :class="computedInputClasses"
      v-bind="$attrs"
    />

    <p v-if="error" class="text-sm text-red-500">{{ error }}</p>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: [String, Number],
  name: String,
  type: { type: String, default: 'text' },
  label: String,
  placeholder: String,
  error: String,
})

defineEmits(['update:modelValue'])

const baseInputClass =
  'w-full px-4 py-2 border rounded-md bg-white dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none'

const computedInputClasses = computed(() => [
  baseInputClass,
  {
    'border-red-500': !!props.error,
  },
])
</script>
