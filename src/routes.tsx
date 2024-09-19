import { createBrowserRouter } from 'react-router-dom'

import { AppLayout } from './components/layouts/app-layout'
import { AuthLayout } from './components/layouts/auth-layout'
import { InternalLayout } from './components/layouts/internal-layout'
import { Protected } from './components/layouts/protected'
import { Collection } from './pages/collections/collection'
import { CreateName } from './pages/create-name'
import { NotFound } from './pages/not-found'
import { SignIn } from './pages/sign-in'
import { VerifyAccount } from './pages/verify-account'

export const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [
      {
        path: '/sign-in',
        element: <SignIn />,
      },
      {
        path: '/verify-account',
        element: <VerifyAccount />,
      },
    ],
  },
  {
    element: <Protected />,
    children: [
      {
        element: <AppLayout />,
        children: [
          {
            path: '/',
            element: <Collection />,
          },
        ],
      },
      {
        element: <InternalLayout />,
        children: [
          {
            path: '/create-name',
            element: <CreateName />,
          },
        ],
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
])
