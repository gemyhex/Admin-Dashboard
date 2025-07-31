import { reactive, toRefs } from 'vue'

/**
 * useDynamicForm composable
 *
 * Handles dynamic form data using a list of field definitions.
 * Provides reactivity, update, and reset capabilities.
 *
 * @param {Array} fields - Array of field configs ({ name, defaultValue })
 */
export function useDynamicForm(fields = []) {
  const formValues = reactive({})
  const initialValues = {}

  /**
   * Initialize or re-initialize form values from fields
   * @param {Array} fieldDefs
   */
  const initializeForm = (fieldDefs = fields) => {
    fieldDefs.forEach(field => {
      const name = field.name
      const value = field.defaultValue ?? ''
      formValues[name] = value
      initialValues[name] = value
    })
  }

  /**
   * Update a specific field value
   * @param {String} name
   * @param {*} value
   */
  const updateValue = (name, value) => {
    formValues[name] = value
  }

  /**
   * Reset all form fields to their initial values
   */
  const resetForm = () => {
    Object.keys(initialValues).forEach(name => {
      formValues[name] = initialValues[name]
    })
  }

  // Initialize form on first use
  initializeForm(fields)

  return {
    ...toRefs(formValues),
    formValues,
    updateValue,
    resetForm,
    initializeForm,
  }
}
