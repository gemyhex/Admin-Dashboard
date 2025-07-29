<template>
  <form @submit.prevent="onLogin" class="space-y-4">
    <BaseInput
      v-model="email"
      label="Username / Email"
      placeholder="Enter Email / Username"
      :error="errors.email"
    />

    <BaseInput
      v-model="password"
      type="password"
      label="Password"
      placeholder="Enter password"
      :error="errors.password"
    />

    <p v-if="errorMessage" class="text-red-500 text-sm">{{ errorMessage }}</p>

    <BaseButton
      class="btn-primary w-full"
      type="submit"
      :loading="auth.loading"
    >
      Login
    </BaseButton>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/modules/auth/store/useAuthStore'
import { useInputValidation } from '@/composables/useInputValidation.js'

const { errors, validateForm } = useInputValidation()

const email = ref('ahmed.gamal@digrc.com')
const password = ref('C7y$$!PlJ9EQ')
const errorMessage = ref('')
const auth = useAuthStore()
const router = useRouter()

const onLogin = async () => {
  errorMessage.value = ''
  const isValid = validateForm({
    email: {
      value: email.value,
      rules: { required: true },
    },
    password: {
      value: password.value,
      rules: { required: true, minLength: 6 },
    },
  })

  if (!isValid) return

  const success = await auth.login(email.value, password.value)

  if (success) {
    router.push('/dashboard')
  } else {
    errorMessage.value = 'Invalid credentials'
  }
}
</script>
