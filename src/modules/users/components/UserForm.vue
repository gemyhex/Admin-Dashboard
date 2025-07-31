<template>
  <BaseModal v-model="isOpen">
    <template #header>
      <h2 class="text-xl font-semibold">
        {{ formValues.id ? 'Edit User' : 'Add User' }}
      </h2>
    </template>

    <template #default>
      <DynamicForm
        :fields="fields"
        :errors="errors"
        :error-message="errorMessage"
        :loading="false"
        has-external-actions
      />
    </template>

    <template #footer>
      <BaseButton type="button" class="btn-secondary" @click="close">
        Cancel
      </BaseButton>
      <BaseButton type="submit" class="btn-primary" @click="handleSubmit">
        Save
      </BaseButton>
    </template>
  </BaseModal>
</template>

<script setup>
import {ref, computed, watch} from 'vue'
import {useInputValidation} from '@/composables/useInputValidation'
import {useDynamicForm} from '@/composables/useDynamicForm'
import {
  RoleOptions,
  UserStatusOptions
} from '../enums/enums'

const props = defineProps({
  modelValue: Object,
  isOpen: Boolean,
})

const emit = defineEmits(['submit', 'update:isOpen'])

const isOpen = computed({
  get: () => props.isOpen,
  set: (val) => emit('update:isOpen', val),
})

const errorMessage = ref('')
const {errors, validateForm} = useInputValidation()

const fields = [
  {
    name: 'fullName',
    type: 'text',
    label: 'Full Name',
    placeholder: 'Enter full name',
    defaultValue: '',
  },
  {
    name: 'email',
    type: 'text',
    label: 'Email',
    placeholder: 'Enter email',
    defaultValue: '',
  },
  {
    name: 'role',
    type: 'select',
    label: 'Role',
    placeholder: 'Select Role',
    options: RoleOptions,
    defaultValue: '',
  },
  {
    name: 'status',
    type: 'select',
    label: 'Status',
    placeholder: 'Select Status',
    options: UserStatusOptions,
    defaultValue: '',
  },
]

const {
  formValues,
  resetForm,
  initializeForm,
} = useDynamicForm(fields)

watch(
  () => props.modelValue,
  (val) => {
    initializeForm([
      ...fields.map(field => ({
        ...field,
        defaultValue: val?.[field.name] ?? field.defaultValue ?? '',
      })),
    ])
    errorMessage.value = ''
    errors.value = {}
  },
  {immediate: true}
)

const close = () => {
  isOpen.value = false
  resetForm()
}

const handleSubmit = (formData) => {
  const isValid = validateForm({
    fullName: {value: formData.fullName, rules: {required: true}},
    email: {value: formData.email, rules: {required: true, type: 'email'}},
    role: {value: formData.role, rules: {required: true}},
    status: {value: formData.status, rules: {required: true}},
  })

  if (!isValid) return

  emit('submit', formData)
  isOpen.value = false
}
</script>

<style scoped>
.btn-primary {
  @apply bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700;
}

.btn-secondary {
  @apply bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white px-4 py-2 rounded;
}
</style>
