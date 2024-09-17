import { useEffect } from 'react'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'

import { LogOut } from 'lucide-react'

import LogoImage from '@/assets/logo.png'
import { api } from '@/lib/api'
import { CreateName } from '@/pages/create-name'
import { useAuthStore } from '@/stores/auth-store'

import { Button } from '../ui/button'
import { Separator } from '../ui/separator'

export function DefaultLayout() {
  const navigate = useNavigate()

  const token = useAuthStore((state) => state.token)
  const user = useAuthStore((state) => state.user)
  const setUser = useAuthStore((state) => state.setUser)
  const clearCredentials = useAuthStore((state) => state.clearCredentials)

  useEffect(() => {
    async function loadUser() {
      const response = await api.get('/me')

      setUser(response.data.user)
    }

    loadUser()
  }, [setUser, navigate])

  function handleSignOut() {
    clearCredentials()
  }

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
      <div className="flex flex-col justify-between">
        <div className="flex size-[52px] items-center justify-center">
          <img src={LogoImage} alt="Mocha" className="w-9" />
        </div>

        <div className="flex size-[52px] items-center justify-center">
          <Button variant="outline" size="icon" onClick={handleSignOut}>
            <LogOut className="size-4" />
          </Button>
        </div>
      </div>

      <Separator orientation="vertical" />

      <Outlet />
    </div>
  )
}
