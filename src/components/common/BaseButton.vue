<template>
  <button :class="buttonClass" v-bind="$attrs">
    <slot />
  </button>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  variant: {
    type: String,
    default: 'primary', // options: 'primary', 'danger'
  },
})

const buttonClass = computed(() => {
  const base = 'px-4 py-2 rounded text-sm font-medium transition'

  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    danger: 'bg-red-600 text-white hover:bg-red-700',
  }

  return `${base} ${variants[props.variant] || variants.primary}`
})
</script>
