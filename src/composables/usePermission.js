import { useAuthStore } from '@/modules/auth/store/useAuthStore'

export function usePermission() {
  const auth = useAuthStore()

  function hasRole(role) {
    const userRoles = auth.user?.roles
    if (!Array.isArray(userRoles)) return false

    return Array.isArray(role)
      ? role.some(r => userRoles.includes(r))
      : userRoles.includes(role)
  }

  return { hasRole }
}
