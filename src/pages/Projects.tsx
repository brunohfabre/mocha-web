import { useNavigate } from 'react-router-dom'

import { Button } from '@/components/Button'
import { PageHeader } from '@/components/PageHeader'

export function Projects() {
  const navigate = useNavigate()

  function navigateToCreateOrganization() {
    navigate('/organizations/create')
  }

  return (
    <div className="flex-1 flex flex-col">
      <PageHeader />

      <div className="flex-1 flex flex-col gap-4 p-4">
        <header className="flex justify-between">
          <p className="text-md font-medium">Organizations</p>

          <Button type="button" onClick={navigateToCreateOrganization}>
            + New organization
          </Button>
        </header>
      </div>
    </div>
  )
}
