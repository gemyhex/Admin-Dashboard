import { ref } from 'vue'

export function useInputValidation() {
  const error = ref('')

  const validate = (value, { type = 'text', required = true, minLength = null } = {}) => {
    if (required && !value) {
      error.value = 'This field is required.'
      return false
    }

    if (type === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(value)) {
        error.value = 'Enter a valid email address.'
        return false
      }
    }

    if (minLength && value.length < minLength) {
      error.value = `Minimum length is ${minLength} characters.`
      return false
    }

    error.value = ''
    return true
  }

  return { error, validate }
}
