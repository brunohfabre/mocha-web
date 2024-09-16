import { useEffect } from 'react'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'

import { api } from '@/lib/api'
import { CreateName } from '@/pages/create-name'
import { useAuthStore } from '@/stores/auth-store'

export function DefaultLayout() {
  const navigate = useNavigate()

  const token = useAuthStore((state) => state.token)
  const user = useAuthStore((state) => state.user)
  const setUser = useAuthStore((state) => state.setUser)

  useEffect(() => {
    async function loadUser() {
      const response = await api.get('/me')

      setUser(response.data.user)
    }

    loadUser()
  }, [setUser, navigate])

  if (!token) {
    return <Navigate to="/sign-in" replace />
  }

  if (!user) {
    return (
      <div className="flex h-screen items-center justify-center">loading</div>
    )
  }

  if (!user?.name) {
    return <CreateName />
  }

  return (
    <div className="flex h-screen w-full antialiased">
      <Outlet />
    </div>
  )
}
