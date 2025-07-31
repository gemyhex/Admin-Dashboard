import axios from 'axios'
import { useAuthStore } from '@/modules/auth/store/useAuthStore'
import { useToaster } from '@/composables/useToaster.js'

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token')
    if (token) config.headers['Authorization'] = 'Bearer ' + token
    return config
  },
  (error) => Promise.reject(error)
)

instance.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const notify = useToaster().notify

    switch (error.response?.status) {
      case 401:
        notify('Session expired. Please login again.', 'error')
        useAuthStore().logout()
        break
      case 422:
        notify('Validation error. Please check your input.', 'error')
        break
      case 404:
        notify('Requested resource not found.', 'error')
        break
      default:
        notify('Something went wrong. Please try again.', 'error')
    }

    return Promise.reject(error)
  }
)

export default instance
