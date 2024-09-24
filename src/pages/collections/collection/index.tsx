import { Outlet, useParams } from 'react-router-dom'

import { Separator } from '@/components/ui/separator'
import { api } from '@/lib/api'
import { useOrganizationStore } from '@/stores/organization-store'
import { useQuery } from '@tanstack/react-query'

import { Sidebar } from './sidebar'

export function Collection() {
  const { collectionId } = useParams<{ collectionId: string }>()

  const organization = useOrganizationStore((state) => state.organization)

  const { data, isPending } = useQuery({
    queryKey: ['collections', collectionId],
    queryFn: async () => {
      const response = await api.get(
        `/organizations/${organization?.id}/collections/${collectionId}`,
      )

      return response.data.collection
    },
  })

  if (!data && isPending) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <span>is loading</span>
      </div>
    )
  }

  return (
    <div className="flex h-screen w-full antialiased">
      <Sidebar />

      <Separator orientation="vertical" />

      <Outlet />

      {/* <Request />

      <Separator orientation="vertical" />

      <Response /> */}
    </div>
  )
}
