<template>
  <div class="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4">
    <p class="text-sm text-gray-500 dark:text-gray-300">{{ label }}</p>
    <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ value }}</p>
  </div>
</template>

<script setup>
defineProps({
  label: String,
  value: [String, Number]
})
</script>
