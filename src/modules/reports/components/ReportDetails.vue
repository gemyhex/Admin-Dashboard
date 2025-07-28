<template>
  <BaseModal v-model="isOpen">
    <template #header>
      <h2 class="text-lg font-semibold">Report Details</h2>
    </template>

    <template #default>
      <div v-if="report">
        <p><strong>Title:</strong> {{ report.title }}</p>
        <p><strong>Type:</strong> {{ report.type }}</p>
        <p><strong>Status:</strong> {{ report.status }}</p>
        <p><strong>Description:</strong></p>
        <p class="mt-1 text-gray-600 dark:text-gray-300">{{ report.description }}</p>
      </div>
    </template>

    <template #footer>
      <BaseButton @click="isOpen = false">Close</BaseButton>
    </template>
  </BaseModal>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  report: Object,
  isOpen: Boolean,
})
const emit = defineEmits(['update:isOpen'])

const isOpen = computed({
  get: () => props.isOpen,
  set: (val) => emit('update:isOpen', val),
})
</script>
