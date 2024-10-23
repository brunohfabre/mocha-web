import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { useAtom } from 'jotai'
import { Check, ChevronsUpDown, LoaderCircle, Plus } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from '@/components/ui/context-menu'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Separator } from '@/components/ui/separator'
import { api } from '@/lib/api'
import { useQueryClient } from '@tanstack/react-query'

import { updateLoadingAtom } from '../state'
import { CreateFolder } from './create-folder'
import { Item } from './item'
import { RenameRequest } from './rename-request'

export type Request = {
  id: string
  parentId?: string
  type: string
  method: string
  url: string
  name: string
  headers: any[]
  params: any[]
}

export type EnvironmentType = {
  id: string
  name: string
  variables: Record<string, string>
}

export type VariableType = {
  id: string
  name: string
}

export type CollectionType = {
  id: string
  name: string
  requests: Request[]
  environments: {
    environments: { id: string; name: string }[]
    variables: { id: string; name: string }[]
    values: Record<string, string>
  }
}

export function Sidebar() {
  const { collectionId, requestId } = useParams<{
    collectionId: string
    requestId: string
  }>()
  const navigate = useNavigate()

  const [updateLoading] = useAtom(updateLoadingAtom)

  const [loading, setLoading] = useState(false)
  const [createFolderVisible, setCreateFolderVisible] = useState(false)
  const [createFolderParentId, setCreateFolderParentId] = useState<string>('')
  const [renameRequestVisible, setRenameRequestVisible] = useState(false)
  const [requestToRename, setRequestToRename] = useState<Request | null>(null)

  const queryClient = useQueryClient()
  const collection = queryClient.getQueryData<CollectionType>([
    'collections',
    collectionId,
  ])

  async function createRequest(parentId?: string) {
    try {
      setLoading(true)

      const response = await api.post(`/collections/${collectionId}/requests`, {
        type: 'REQUEST',
        parentId,
      })

      queryClient.setQueryData(
        ['collections', collectionId],
        (prevState: CollectionType) => ({
          ...prevState,
          requests: [...prevState.requests, response.data.request],
        }),
      )

      navigate(
        `/collections/${collectionId}/requests/${response.data.request.id}`,
      )
    } finally {
      setLoading(false)
    }
  }

  function handleCloseFolderModal() {
    setCreateFolderParentId('')
    setCreateFolderVisible(false)
  }

  async function deleteRequest(id: string) {
    try {
      setLoading(true)

      const response = await api.delete(
        `/collections/${collectionId}/requests/${id}`,
      )

      queryClient.setQueryData(
        ['collections', collectionId],
        (prevState: CollectionType) => ({
          ...prevState,
          requests: prevState.requests.filter(
            (request) => !response.data.ids.includes(request.id),
          ),
        }),
      )

      if (response.data.ids.includes(requestId)) {
        navigate(`/collections/${collectionId}`)
      }
    } finally {
      setLoading(false)
    }
  }

  function handleNavigateToEnvironments() {
    navigate(`/collections/${collectionId}/environments`)
  }

  const itemsToRender = collection?.requests.filter((item) => !item.parentId)

  return (
    <>
      {loading && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/50">
          <LoaderCircle className="animate-spin" />
        </div>
      )}

      <CreateFolder
        open={createFolderVisible}
        onOpenChange={handleCloseFolderModal}
        parentId={createFolderParentId}
      />

      <RenameRequest
        open={renameRequestVisible}
        onOpenChange={setRenameRequestVisible}
        request={requestToRename}
      />

      <div className="flex w-80 flex-col">
        <div
          className="flex h-[52px] items-center justify-between px-4"
          onClick={() => navigate(`/collections/${collectionId}`)}
        >
          <span className="text-sm font-semibold">{collection?.name}</span>

          {updateLoading && (
            <LoaderCircle className="size-4 animate-spin text-muted-foreground" />
          )}
        </div>

        <Separator />

        <div className="flex justify-between p-2">
          <span />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button type="button" variant="outline" size="icon">
                <Plus className="size-4" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => createRequest()}>
                Create request
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setCreateFolderVisible(true)}>
                Create folder
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <Separator />

        <ContextMenu>
          <ContextMenuTrigger asChild>
            {collection?.requests.length ? (
              <div className="flex flex-1 flex-col p-2">
                {itemsToRender?.map((item) => (
                  <Item
                    key={item.id}
                    item={item}
                    items={collection.requests}
                    createRequest={createRequest}
                    createFolder={(parentId = '') => {
                      setCreateFolderParentId(parentId)
                      setCreateFolderVisible(true)
                    }}
                    deleteRequest={deleteRequest}
                    renameRequest={(request) => {
                      setRequestToRename(request)
                      setRenameRequestVisible(true)
                    }}
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-1 flex-col items-center justify-center gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => createRequest()}
                >
                  Create request
                </Button>

                <span className="text-sm text-muted-foreground">or</span>

                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setCreateFolderVisible(true)}
                >
                  Create folder
                </Button>
              </div>
            )}
          </ContextMenuTrigger>

          <ContextMenuContent>
            <ContextMenuItem onClick={() => createRequest()}>
              Create request
            </ContextMenuItem>
            <ContextMenuItem onClick={() => setCreateFolderVisible(true)}>
              Create folder
            </ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>

        <Separator />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex h-[52px] items-center justify-between px-4 hover:bg-muted">
              <span className="text-sm">No environment</span>

              <ChevronsUpDown className="size-4 text-neutral-500" />
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="w-[calc(var(--radix-dropdown-menu-trigger-width)_-8px)]">
            <DropdownMenuItem>No environment</DropdownMenuItem>

            {collection?.environments?.environments.map((environment) => (
              <DropdownMenuItem
                key={environment.id}
                className="flex items-center justify-between bg-muted"
              >
                <span>Local</span>
                <Check className="size-3" />
              </DropdownMenuItem>
            ))}

            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleNavigateToEnvironments}>
              Manage environments
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  )
}
