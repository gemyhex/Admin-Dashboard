import {defineStore} from 'pinia'
import {safeParse} from '@/utils/helpers'
import {httpRequest} from '@/services/api'

const STORAGE_KEY = 'auth_user'
const TOKEN_KEY = 'auth_token'

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
        let form = {
          email: emailOrUsername,
          credential: password,
        }
        const response = await httpRequest('/user/authentication/login', {
          method: 'POST',
          data: form
        })
        const {
          access_token,
          avatar,
          birthdate,
          company_title,
          email,
          first_name,
          last_name,
        } = response.data

        if (!access_token) throw new Error('Invalid response')

        this.user = {
          avatar,
          birthdate,
          company_title,
          email,
          first_name,
          last_name
        }
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.user))
        localStorage.setItem(TOKEN_KEY, access_token)

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
