import {createRouter, createWebHistory} from 'vue-router'
import authRoutes from '@/modules/auth/router/routes'
import dashboardRoutes from '@/modules/dashboard/router/routes'
import {useAuthStore} from '@/modules/auth/store/useAuthStore'

const baseRoutes = [
  {
    path: '/',
    redirect: '/dashboard',
    meta: {requiresAuth: true, name: 'Dashboard'},
  },
]

const appName = import.meta.env.VITE_APP_NAME || 'Vue App'
const routes = [...authRoutes, ...dashboardRoutes, ...baseRoutes]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

const updateTitle = async (to) => {
  document.title = `${to?.meta?.name} - ${appName}`
}

router.beforeEach((to, from, next) => {
  updateTitle(to)
  const auth = useAuthStore()

  // Skip guard for public pages like login
  if (to.path === '/login') return next()

  // Protect authenticated pages
  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    return next('/login')
  }

  // Protect admin-only routes
  if (to.meta.requiresAdmin && !auth.isAdmin) {
    return next('/')
  }

  next()
})

export default router
