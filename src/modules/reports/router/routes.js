export default [
  {
    path: '/reports',
    name: 'Reports',
    component: () => import('@/modules/reports/views/ReportsPage.vue'),
    meta: { requiresAuth: true, name: "Reports" },
  }
]
