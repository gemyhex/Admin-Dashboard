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
      :class="[
        baseClass,
        error ? 'border-red-500' : 'border-gray-300',
      ]"
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
defineProps({
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

const baseClass =
  'w-full px-4 py-2 rounded-lg bg-white/10 backdrop-blur-md border border-white/30 text-white focus:outline-none focus:ring-2 focus:ring-blue-500'

</script>
