import userRoutes from '@/modules/users/router/routes.js'
import reportRoutes from '@/modules/reports/router/routes.js'

export default [
  {
    path: '/',
    component: () => import('@/layouts/DashboardLayout.vue'),
    meta: {requiresAuth: true},
    children: [
      {
        path: '',
        redirect: 'dashboard',
      },
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/modules/dashboard/views/DashboardPage.vue'),
        meta: {
          name: 'Dashboard',
        }
      },

      ...userRoutes,
      ...reportRoutes
    ],
  }
]
