import { defineStore } from 'pinia'
import axios from '@/plugins/axios'

const STORAGE_KEY = 'auth_user'
const TOKEN_KEY = 'auth_token'

function safeParse(json) {
  try {
    return JSON.parse(json)
  } catch (e) {
    return null
  }
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: safeParse(localStorage.getItem(STORAGE_KEY)),
    loading: false,
  }),

  getters: {
    isAuthenticated: (state) => !!state.user,
    isAdmin: (state) => state.user?.role === 'admin',
  },

  actions: {
    async login(emailOrUsername, password) {
      this.loading = true
      try {
        const response = await axios.post('/user/authentication/login', {
          email: emailOrUsername,
          password,
        })

        const user = response.data?.data
        const token = response.data?.token

        if (!user || !token) throw new Error('Invalid response')

        this.user = user
        localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
        localStorage.setItem(TOKEN_KEY, token)

        return true
      } catch (e) {
        console.error('[Login Error]', e)
        return false
      } finally {
        this.loading = false
      }
    },

    logout() {
      this.user = null
      localStorage.removeItem(STORAGE_KEY)
      localStorage.removeItem(TOKEN_KEY)
    },
  },
})
