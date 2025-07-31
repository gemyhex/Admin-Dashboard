<template>
  <form @submit.prevent="handleSubmit" class="space-y-4">
    <component
      v-bind="field"
      v-for="field in fields"
      :key="field.name"
      :is="getComponent(field.type)"
      v-model="formValues[field.name]"
      :label="field.label"
      :placeholder="field.placeholder"
      :type="field.type"
      :error="errors[field.name]"
    />

    <BaseButton
      v-if="!hasExternalActions"
      class="btn-primary min-w-40 max-w-full rounded mx-auto"
      type="submit"
      :loading="loading"
    >
      {{ submitText }}
    </BaseButton>
  </form>
</template>

<script setup>
import {reactive, watch} from 'vue'
import { useToaster } from '@/composables/useToaster'

const { notify } = useToaster()

const props = defineProps({
  fields: {
    type: Array,
    required: true,
  },
  initialValues: {
    type: Object,
    default: () => ({}),
  },
  errors: {
    type: Object,
    default: () => ({}),
  },
  errorMessage: String,
  loading: Boolean,
  hasExternalActions: {
    type: Boolean,
    default: false,
  },
  submitText: {
    type: String,
    default: 'Submit',
  },
})

const emit = defineEmits(['submit'])

const formValues = reactive({})

watch(
  () => [props.fields, props.initialValues],
  () => {
    props.fields.forEach((field) => {
      formValues[field.name] =
        props.initialValues[field.name] ?? field.defaultValue ?? ''
    })
  },
  {immediate: true, deep: true}
)

const handleSubmit = () => {
  emit('submit', {...formValues})
}

const getComponent = (type) => {
  switch (type) {
    case 'text':
    case 'password':
      return 'BaseInput'
    case 'select':
      return 'BaseSelect'
    default:
      return 'BaseInput'
  }
}
</script>
