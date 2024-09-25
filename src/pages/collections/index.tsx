import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Ellipsis, LoaderCircle } from 'lucide-react'

import { Empty } from '@/components/empty'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { api } from '@/lib/api'
import { useOrganizationStore } from '@/stores/organization-store'
import { useQuery, useQueryClient } from '@tanstack/react-query'

import { CreateCollection } from './create-collection'

export type Collection = {
  id: string
  name: string
}

export function Collections() {
  const navigate = useNavigate()

  const organization = useOrganizationStore((state) => state.organization)

  const queryClient = useQueryClient()

  const [createModalVisible, setCreateModalVisible] = useState(false)
  const [deleteLoading, setDeleteLoading] = useState(false)

  const { data, isPending } = useQuery({
    queryKey: ['collections'],
    queryFn: async () => {
      const response = await api.get<{ collections: Collection[] }>(
        `/organizations/${organization?.id}/collections`,
      )

      return response.data.collections
    },
  })

  async function deleteCollection(id: string) {
    try {
      setDeleteLoading(true)

      await api.delete(`/organizations/${organization?.id}/collections/${id}`)

      queryClient.setQueryData(['collections'], (prevState: Collection[]) =>
        prevState.filter((item) => item.id !== id),
      )
    } finally {
      setDeleteLoading(false)
    }
  }

  if (isPending) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <span>is loading</span>
      </div>
    )
  }

  return (
    <>
      <CreateCollection
        open={createModalVisible}
        onOpenChange={setCreateModalVisible}
      />

      <div className="flex flex-1 flex-col gap-4 p-4">
        <header className="flex justify-between">
          <p className="text-lg font-semibold">Collections</p>

          <Button type="button" onClick={() => setCreateModalVisible(true)}>
            + Collection
          </Button>
        </header>

        {data?.length === 0 ? (
          <Empty title="No collections found" />
        ) : (
          <div className="grid grid-cols-4 gap-2">
            {data?.map((item) => (
              <Card
                key={item.id}
                className="flex cursor-pointer items-center p-3 hover:bg-muted/50"
                onClick={() => navigate(`/collections/${item.id}`)}
              >
                <div className="flex-1 pl-1">
                  <span>{item.name}</span>
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Button size="icon" variant="outline">
                      <Ellipsis className="size-4" />
                    </Button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={(event) => {
                        event.stopPropagation()

                        console.log('edit')
                      }}
                    >
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={(event) => {
                        event.stopPropagation()

                        deleteCollection(item.id)
                      }}
                    >
                      {deleteLoading ? (
                        <LoaderCircle className="size-4 animate-spin" />
                      ) : (
                        'Delete'
                      )}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </Card>
            ))}
          </div>
        )}
      </div>
    </>
  )
}