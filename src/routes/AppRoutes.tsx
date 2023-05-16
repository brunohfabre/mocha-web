import { Route, Routes } from 'react-router-dom'

import { DefaultLayout } from '@/pages/_layouts/DefaultLayout'
import { Projects } from '@/pages/Projects'
import { SignUp } from '@/pages/SignUp'

import { Home } from '../pages/Home'
import { SignIn } from '../pages/SignIn'
import { Protected } from './Protected'

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<Protected isProtected />}>
        <Route element={<DefaultLayout />}>
          <Route path="" element={<Home />} />
        </Route>

        <Route path="projects" element={<Projects />} />
      </Route>

      <Route element={<Protected isProtected={false} />}>
        <Route path="sign-in" element={<SignIn />} />
        <Route path="sign-up" element={<SignUp />} />
      </Route>
    </Routes>
  )
}
