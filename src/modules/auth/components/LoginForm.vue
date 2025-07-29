<template>
  <form @submit.prevent="onLogin" class="space-y-4">
    <BaseInput
      v-model="email"
      name="email"
      label="Username/Email"
      placeholder="admin@reza.com"
    />

    <BaseInput
      v-model="password"
      name="password"
      type="password"
      label="Password"
      placeholder="Enter password"
    />

    <BaseButton class="btn-primary w-full" type="submit">Login</BaseButton>
  </form>
</template>

<script setup>
import {ref} from 'vue'
import {useRouter} from 'vue-router'
import {useAuthStore} from '../store/useAuthStore'

const email = ref('')
const password = ref('')
const auth = useAuthStore()
const router = useRouter()

const onLogin = async () => {
  const response = await auth.login(email.value, password.value)
  if (response) router.push('/dashboard')
  else alert('Invalid credentials')
}
</script>
