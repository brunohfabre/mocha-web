import { toast } from 'react-hot-toast'
import { redirect } from 'react-router-dom'

import axios from 'axios'

import { useAuthStore } from '../stores/auth'

export const api = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
})

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    toast.error(error.response.data.message)

    if (error.response.status === 403) {
      useAuthStore.getState().setCredentials({
        token: '',
        user: null,
      })

      redirect('/sign-in')
    }

    return Promise.reject(error.response)
  },
)
