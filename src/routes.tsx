import { createBrowserRouter } from 'react-router-dom'

import { AuthLayout } from './components/layouts/auth-layout'
import { DefaultLayout } from './components/layouts/default-layout'
import { Collection } from './pages/collections/collection'
import { NotFound } from './pages/not-found'
import { SignIn } from './pages/sign-in'
import { Verification } from './pages/verification'

export const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [
      {
        path: '/sign-in',
        element: <SignIn />,
      },
      {
        path: '/verification',
        element: <Verification />,
      },
    ],
  },
  {
    element: <DefaultLayout />,
    children: [
      {
        path: '/',
        element: <Collection />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
])
