<template>
  <BaseModal v-model="isOpen">
    <!-- Header -->
    <template #header>
      <h2 class="text-xl font-semibold">
        {{ form.id ? 'Edit User' : 'Add User' }}
      </h2>
    </template>

    <!-- Default (form) content -->
    <template #default>
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <BaseInput v-model="form.fullName" label="Full Name" required/>
        <BaseInput v-model="form.email" type="email" label="Email" required/>
        <BaseSelect
          v-model="form.role"
          :options="rolesOptions"
          placeholder="All Roles"
          label="Roles"
        />
        <BaseSelect
          v-model="form.status"
          :options="statusesOptions"
          placeholder="All Statuses"
          label="Status"
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
import {reactive, watch, computed} from 'vue'

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

const rolesOptions = [
  {value: 'admin', label: 'Admin'},
  {value: 'user', label: 'User'},
]
const statusesOptions = [
  {value: 'active', label: 'Active'},
  {value: 'inactive', label: 'Inactive'},
]

watch(
  () => props.modelValue,
  (val) => {
    Object.assign(form, val || {id: null, fullName: '', email: '', role: '', status: ''})
  },
  {immediate: true}
)

const isOpen = computed({
  get: () => props.isOpen,
  set: (val) => emit('update:isOpen', val),
})

const handleSubmit = () => {
  emit('submit', {...form})
}

const close = () => {
  emit('update:isOpen', false)
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
