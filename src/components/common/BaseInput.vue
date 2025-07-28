<template>
  <div class="space-y-1">
    <label v-if="label" :for="name" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
      {{ label }}
    </label>

    <input
      :id="name"
      :type="type"
      :placeholder="placeholder"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      :class="[
        inputClass,
        errorText ? 'border-red-500' : 'border-gray-300',
      ]"
      v-bind="$attrs"
    />

    <p v-if="errorText" class="text-sm text-red-500">{{ errorText }}</p>
  </div>
</template>

<script setup>
import { watch } from 'vue'
import { useInputValidation } from '@/composables/useInputValidation'

const props = defineProps({
  modelValue: [String, Number],
  name: String,
  type: { type: String, default: 'text' },
  label: String,
  placeholder: String,
  required: { type: Boolean, default: true },
  minLength: Number,
})

const { error: errorText, validate } = useInputValidation()

const inputClass =
  'w-full px-4 py-2 border rounded-md bg-white dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring focus:border-blue-500'

watch(
  () => props.modelValue,
  (val) => {
    validate(val, {
      type: props.type,
      required: props.required,
      minLength: props.minLength,
    })
  }
)
</script>
