import {useAuthStore} from '@/modules/auth/store/useAuthStore'

export function usePermission() {
  const auth = useAuthStore()

  function hasRole(role) {
    const userRole = auth.user?.role
    if (!userRole) return false

    return Array.isArray(role)
      ? role.includes(userRole)
      : userRole === role
  }

  return {hasRole}
}
