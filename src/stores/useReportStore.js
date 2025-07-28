import { defineStore } from 'pinia'

const STORAGE_KEY = 'reports'

function loadReports() {
  const saved = localStorage.getItem(STORAGE_KEY)
  return saved ? JSON.parse(saved) : []
}

export const useReportStore = defineStore('reports', {
  state: () => ({
    reports: loadReports(),
  }),
  getters: {
    totalReports: (state) => state.reports.length,
  },
  actions: {
    loadMockData() {
      if (this.reports.length === 0) {
        this.reports = [
          {
            id: 101,
            title: 'Login bug',
            type: 'bug',
            status: 'pending',
            createdAt: '2025-07-01',
            description: 'User can log in with invalid email.',
          },
          {
            id: 102,
            title: 'Feature request: Dark mode',
            type: 'feature',
            status: 'resolved',
            createdAt: '2025-07-02',
            description: 'Add dark mode to user dashboard.',
          },
        ]
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.reports))
      }
    },

    updateStatus(id, status) {
      const report = this.reports.find((r) => r.id === id)
      if (report) {
        report.status = status
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.reports))
      }
    },
  },
})
