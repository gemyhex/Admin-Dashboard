import axios from 'axios'
import { useAuthStore } from '@/modules/auth/store/useAuthStore'

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  }
})

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token')
    if (token) config.headers['Authorization'] = 'Bearer ' + token
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    switch (error.response?.status) {
      case 401: // Unauthorized
        useAuthStore().logout()
        break
      case 422: // Unprocessable Content
        console.log('Validation Error')
        break
      case 404: // Request Not Found
        console.log('No Data Found')
        break
      default:
        console.log('Unhandled error', error.response?.status)
    }
    return Promise.reject(error)
  }
)

export default instance
