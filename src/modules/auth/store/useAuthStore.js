import {defineStore} from 'pinia'
import {useRouter} from "vue-router";

const STORAGE_KEY = 'auth_user'

/**
 * Safely parses a JSON string and returns the object or null on failure.
 * @param {string|null} json - JSON string to parse.
 * @returns {object|null}
 */
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
  }),

  getters: {
    isAuthenticated: (state) => !!state.user,
    isAdmin: (state) => state.user?.role === 'admin',
  },

  actions: {
    login(email, password) {
      const mockUsers = [
        {
          id: 1,
          fullName: 'Vue User',
          email: 'user@test.com',
          password: '123456',
          role: 'admin',
        },
      ]

      const user = mockUsers.find((u) => u.email === email && u.password === password)

      if (!user) return false

      this.user = user
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
      return true
    },

    logout() {
      this.user = null
      localStorage.removeItem(STORAGE_KEY)
    }
  },
})
