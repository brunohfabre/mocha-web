import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { useProjectStore } from './project'

type User = {
  id: string
  name: string
  email: string
  created_at: string
}

type SetCredentialsData = {
  token: string
  user: User | null
}

interface Store {
  token: string
  user: User | null
  setCredentials: (data: SetCredentialsData) => void
  updateUser: (data: User) => void
}

export const useAuthStore = create(
  persist<Store>(
    (set) => ({
      token: '',
      user: null,
      setCredentials: (data: SetCredentialsData) =>
        set(() => {
          useProjectStore.getState().selectProject(null)

          return data
        }),
      updateUser: (data: User) =>
        set(() => ({
          user: data,
        })),
    }),
    {
      name: '@mocha:auth',
    },
  ),
)
