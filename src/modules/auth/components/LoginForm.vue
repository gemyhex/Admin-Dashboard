<template>
  <DynamicForm
    :fields="loginFields"
    :errors="errors"
    :error-message="errorMessage"
    :loading="auth.loading"
    submit-text="Login"
    @submit="handleLogin"
  />
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/modules/auth/store/useAuthStore'
import { useInputValidation } from '@/composables/useInputValidation'

const router = useRouter()
const auth = useAuthStore()

const errorMessage = ref('')
const { errors, validateForm } = useInputValidation()

const isDev = import.meta.env.DEV

const loginFields = [
  {
    name: 'email',
    type: 'text',
    label: 'Username / Email',
    autocomplete: 'username',
    placeholder: 'Enter your email or username',
    defaultValue: isDev ? 'ahmed.gamal@digrc.com' : '',
  },
  {
    name: 'password',
    type: 'password',
    label: 'Password',
    autocomplete: 'password',
    placeholder: 'Enter your password',
    defaultValue: isDev ? 'C7y$$!PlJ9EQ' : '',
  },
]

const handleLogin = async (formData) => {
  errorMessage.value = ''

  const isValid = validateForm({
    email: { value: formData.email, rules: { required: true } },
    password: { value: formData.password, rules: { required: true, minLength: 6 } },
  })

  if (!isValid) return

  const success = await auth.login(formData.email, formData.password)

  if (success) {
    await router.push('/')
  } else {
    errorMessage.value = 'Invalid credentials'
  }
}
</script>
