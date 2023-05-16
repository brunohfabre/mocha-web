import { Navigate, Outlet } from 'react-router-dom'

import { useAuthStore } from '../stores/auth'

type ProtectedProps = {
  isProtected: boolean
}

export function Protected({ isProtected }: ProtectedProps) {
  const token = useAuthStore((state) => state.token)

  const isSigned = !!token

  if (!isSigned && isProtected) {
    return <Navigate to="/sign-in" />
  }

  if (isSigned && !isProtected) {
    return <Navigate to="/" />
  }

  return <Outlet />
}
