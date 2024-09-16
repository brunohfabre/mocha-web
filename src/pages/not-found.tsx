import { Navigate } from 'react-router-dom'

import { useAuthStore } from '@/stores/auth-store'

export function NotFound() {
  const token = useAuthStore((state) => state.token)

  if (!token) {
    return <Navigate to="/sign-in" replace />
  }

  return <Navigate to="/" />
}
