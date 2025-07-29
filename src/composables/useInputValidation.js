import { reactive } from 'vue'

export function useInputValidation() {
  const errors = reactive({})

  const validateField = (key, value, {
    type = 'text',
    required = true,
    minLength = null,
  } = {}) => {
    if (required && !value) {
      errors[key] = 'This field is required.'
      return false
    }

    if (type === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(value)) {
        errors[key] = 'Enter a valid email address.'
        return false
      }
    }

    if (minLength && value.length < minLength) {
      errors[key] = `Minimum length is ${minLength} characters.`
      return false
    }

    delete errors[key]
    return true
  }

  const validateForm = (fields) => {
    let isValid = true
    for (const key in fields) {
      const { value, rules } = fields[key]
      const valid = validateField(key, value, rules)
      if (!valid) isValid = false
    }
    return isValid
  }

  return {
    errors,
    validateField,
    validateForm,
  }
}
