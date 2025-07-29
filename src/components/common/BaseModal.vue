<template>
  <transition name="fade">
    <div
      v-if="modelValue"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
      @click.self="$emit('update:modelValue', false)"
    >
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-lg p-6 relative">
        <BaseButton
          class="absolute top-3 right-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          @click="$emit('update:modelValue', false)"
        >
          &times;
        </BaseButton>

        <div v-if="$slots.header" class="mb-4">
          <slot name="header" />
        </div>

        <div class="mb-4">
          <slot />
        </div>

        <div v-if="$slots.footer" class="mt-4 flex justify-end gap-2">
          <slot name="footer" />
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
})
defineEmits(['update:modelValue'])
</script>
