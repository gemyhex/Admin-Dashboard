<template>
  <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center">
    <div class="text-xl font-semibold text-gray-800 dark:text-white">{{ value }}</div>
    <div class="text-sm text-gray-500 dark:text-gray-300">{{ label }}</div>
  </div>
</template>

<script setup>
defineProps({
  label: String,
  value: [Number, String],
})
</script>
