<template>
  <div class="flex justify-between items-center mt-4 text-sm">
    <p class="text-gray-500 dark:text-gray-400">
      Showing {{ start + 1 }}–{{ Math.min(end, total) }} of {{ total }} items
    </p>

    <div class="flex gap-2">
      <BaseButton
        :disabled="currentPage === 1"
        @click="$emit('update:currentPage', currentPage - 1)"
      >
        Previous
      </BaseButton>
      <BaseButton
        :disabled="end >= total"
        @click="$emit('update:currentPage', currentPage + 1)"
      >
        Next
      </BaseButton>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import BaseButton from "@/components/common/BaseButton.vue";

const props = defineProps({
  total: Number,
  currentPage: Number,
  perPage: Number,
})

const emit = defineEmits(['update:currentPage'])

const start = computed(() => (props.currentPage - 1) * props.perPage)
const end = computed(() => props.currentPage * props.perPage)
</script>
