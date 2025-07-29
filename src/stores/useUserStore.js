import { defineStore } from 'pinia'
import { safeParse } from '@/utils/helpers'

const STORAGE_KEY = 'users'

export const useUserStore = defineStore('users', {
  state: () => ({
    users: safeParse(localStorage.getItem(STORAGE_KEY)) || [],
  }),

  getters: {
    total: (state) => state.users.length,
    getById: (state) => (id) => state.users.find((u) => u.id === id),
    activeUsers: (state) => state.users.filter((u) => u.status === 'active').length,
    inactiveUsers: (state) => state.users.filter((u) => u.status === 'inactive').length,
  },

  actions: {
    saveToStorage() {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.users))
    },

    addUser(user) {
      user.id = Date.now()
      user.createdAt = new Date().toISOString().split('T')[0]
      this.users.unshift(user)
      this.saveToStorage()
    },

    updateUser(updatedUser) {
      const index = this.users.findIndex((u) => u.id === updatedUser.id)
      if (index !== -1) {
        this.users[index] = { ...updatedUser }
        this.saveToStorage()
      }
    },

    deleteUser(id) {
      this.users = this.users.filter((u) => u.id !== id)
      this.saveToStorage()
    },

    seedInitialUsers() {
      if (!this.users.length) {
        this.users = [
          {
            id: 1,
            fullName: 'Vue User',
            email: 'user@test.com',
            role: 'admin',
            status: 'active',
            createdAt: '2025-07-15',
          },
        ]
        this.saveToStorage()
      }
    },
  },
})
