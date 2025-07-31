<template>
  <button
    :class="buttonClass"
    :disabled="loading || $attrs.disabled"
    v-bind="$attrs"
  >
    <span v-if="loading">Please wait...</span>
    <slot v-else />
  </button>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  variant: {
    type: String,
    default: 'primary', // options: 'primary', 'danger', 'transparent'
  },
  loading: {
    type: Boolean,
    default: false,
  },
})

const buttonClass = computed(() => {
  const base = 'px-4 py-2 text-sm transition duration-200 rounded font-medium'

  const variants = {
    primary: 'bg-blue-500 text-white hover:bg-blue-600',
    danger: 'bg-red-600 text-white hover:bg-red-700',
    transparent: 'bg-transparent text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-600',
  }

  return `${base} ${variants[props.variant] || variants.primary}`
})
</script>
