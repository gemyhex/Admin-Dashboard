<template>
  <div class="space-y-1">
    <label v-if="label" :for="name"
           class="block text-sm font-medium text-gray-700 dark:text-gray-300">
      {{ label }}
    </label>
    <select
      :value="modelValue"
      @change="$emit('update:modelValue', $event.target.value)"
      class="w-full px-3 py-2 border rounded-md dark:bg-gray-800 dark:text-white"
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
  </div>
</template>

<script setup>
defineProps({
  modelValue: [String, Number],
  name: String,
  label: String,
  options: {
    type: Array,
    required: true,
  },
  placeholder: String,
})
defineEmits(['update:modelValue'])
</script>
