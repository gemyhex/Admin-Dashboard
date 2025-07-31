import { ref } from 'vue'

const toasts = ref([])

let idCounter = 0

export function useToaster() {
  const notify = (msg, variant = 'error', duration = 3000) => {
    const id = ++idCounter

    toasts.value.push({
      id,
      message: msg,
      type: variant,
    })

    setTimeout(() => {
      toasts.value = toasts.value.filter(t => t.id !== id)
    }, duration)
  }

  const remove = (id) => {
    toasts.value = toasts.value.filter(t => t.id !== id)
  }

  return {
    toasts,
    notify,
    remove,
  }
}
