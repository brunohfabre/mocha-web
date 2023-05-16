import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'

import clsx from 'clsx'

import { PageHeader } from '@/components/PageHeader'
import { useProjectStore } from '@/stores/project'
import { CaretUpDown } from '@phosphor-icons/react'

export function DefaultLayout() {
  const navigate = useNavigate()
  const location = useLocation()

  const projectSelected = useProjectStore((state) => state.projectSelected)

  const isHome = location.pathname === '/'

  function navigateToHome() {
    navigate('/')
  }

  function navigateToProjects() {
    navigate('/projects')
  }

  return (
    <div className="h-screen w-screen flex">
      <div
        className={clsx(' bg-zinc-100 flex flex-col', isHome ? 'w-64' : 'w-12')}
      >
        <div
          className="h-12 flex items-center px-4 text-sm"
          onClick={navigateToHome}
        >
          {isHome ? 'Mocha' : 'M'}
        </div>

        <button
          className="h-12 bg-red-200 flex items-center justify-between px-4 cursor-pointer hover:bg-red-300"
          onClick={navigateToProjects}
        >
          {isHome && <p className="text-sm">{projectSelected?.name}</p>}

          <CaretUpDown size={16} />
        </button>

        <div className="py-2 flex flex-col">
          <NavLink
            className={({ isActive }) =>
              clsx(
                'h-10 px-4 flex items-center text-sm hover:bg-zinc-200',
                isActive && 'bg-zinc-200',
              )
            }
            to={`/notes`}
          >
            {isHome ? 'Notes' : 'N'}
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              clsx(
                'h-10 px-4 flex items-center text-sm hover:bg-zinc-200',
                isActive && 'bg-zinc-200',
              )
            }
            to={`/collections`}
          >
            {isHome ? 'Collections' : 'C'}
          </NavLink>
        </div>
      </div>

      <main className="flex-1 flex flex-col">
        <PageHeader />

        <Outlet />
      </main>
    </div>
  )
}
