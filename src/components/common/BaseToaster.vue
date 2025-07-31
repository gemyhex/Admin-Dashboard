<template>
  <div class="fixed top-6 right-6 z-50 flex flex-col gap-3 max-w-sm">
    <TransitionGroup name="toast" tag="div">
      <div
        v-for="toast in toasts"
        :key="toast.id"
        :class="['rounded-lg p-4 mb-2 text-sm border shadow-md flex justify-between items-start', getToastClass(toast.type)]"
      >
        <span class="pr-2">{{ toast.message }}</span>
        <button @click="remove(toast.id)" class="text-lg leading-none text-gray-600 hover:text-black">&times;</button>
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup>
import { useToaster } from '@/composables/useToaster'

const { toasts, remove } = useToaster()

const getToastClass = (type) => {
  switch (type) {
    case 'success':
      return 'bg-green-100 text-green-800 border-green-300'
    case 'error':
      return 'bg-red-100 text-red-800 border-red-300'
    case 'warning':
      return 'bg-yellow-100 text-yellow-800 border-yellow-300'
    default:
      return 'bg-gray-100 text-gray-800 border-gray-300'
  }
}
</script>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}
.toast-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}
.toast-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>
