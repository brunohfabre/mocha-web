import { useEffect, useRef, useState } from 'react'
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom'

import LogoImage from '@/assets/logo.png'
import { api } from '@/lib/api'
import { useAuthStore } from '@/stores/auth-store'

export function Protected() {
  const firstRenderRef = useRef(true)

  const navigate = useNavigate()
  const location = useLocation()

  const token = useAuthStore((state) => state.token)
  const setUser = useAuthStore((state) => state.setUser)

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadUserData() {
      const response = await api.get('/me')

      setUser(response.data.user)

      if (!response.data.user.name) {
        navigate('/create-name')
      }

      setIsLoading(false)
    }

    if (token && firstRenderRef.current) {
      firstRenderRef.current = false

      loadUserData()
    }
  }, [token, setUser, navigate, location.pathname])

  if (!token) {
    return <Navigate to="/sign-in" replace />
  }

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <img src={LogoImage} alt="Mocha" className="w-14 animate-bounce" />
      </div>
    )
  }

  return <Outlet />
}
