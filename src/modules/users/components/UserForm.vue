<template>
  <BaseModal v-model="isOpen">
    <template #header>
      <h2 class="text-xl font-semibold">
        {{ form.id ? 'Edit User' : 'Add User' }}
      </h2>
    </template>

    <template #default>
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <BaseInput
          v-model="form.fullName"
          label="Full Name"
          required
          :error="fullNameError"
        />

        <BaseInput
          v-model="form.email"
          label="Email"
          type="email"
          required
          :error="emailError"
        />

        <BaseSelect
          v-model="form.role"
          label="Role"
          placeholder="Select Role"
          :options="rolesOptions"
          :error="roleError"
        />

        <BaseSelect
          v-model="form.status"
          label="Status"
          placeholder="Select Status"
          :options="statusesOptions"
          :error="statusError"
        />
      </form>
    </template>

    <!-- Footer -->
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
import { reactive, watch, computed } from 'vue'
import { useInputValidation } from '@/composables/useInputValidation'

const props = defineProps({
  modelValue: Object,
  isOpen: Boolean,
})
const emit = defineEmits(['submit', 'update:isOpen'])

const form = reactive({
  id: null,
  fullName: '',
  email: '',
  role: '',
  status: '',
})

const { error: fullNameError, validate: validateFullName } = useInputValidation()
const { error: emailError, validate: validateEmail } = useInputValidation()
const { error: roleError, validate: validateRole } = useInputValidation()
const { error: statusError, validate: validateStatus } = useInputValidation()

const rolesOptions = [
  { value: 'admin', label: 'Admin' },
  { value: 'user', label: 'User' },
]

const statusesOptions = [
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
]

watch(
  () => props.modelValue,
  (val) => {
    Object.assign(form, val || {
      id: null,
      fullName: '',
      email: '',
      role: '',
      status: '',
    })
    clearAllErrors()
  },
  { immediate: true }
)

const isOpen = computed({
  get: () => props.isOpen,
  set: (val) => emit('update:isOpen', val),
})

function clearAllErrors() {
  fullNameError.value = ''
  emailError.value = ''
  roleError.value = ''
  statusError.value = ''
}

const handleSubmit = () => {
  const isValid =
    validateFullName(form.fullName) &
    validateEmail(form.email, { type: 'email' }) &
    validateRole(form.role) &
    validateStatus(form.status)

  if (isValid) {
    emit('submit', { ...form })
    isOpen.value = false
  }
}

const close = () => {
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
