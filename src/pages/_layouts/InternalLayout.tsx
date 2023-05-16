import { Outlet } from 'react-router-dom'

import { PageHeader } from '@/components/PageHeader'

export function InternalLayout() {
  return (
    <div className="h-screen w-screen flex flex-col">
      <PageHeader showBackButton />

      <Outlet />
    </div>
  )
}
