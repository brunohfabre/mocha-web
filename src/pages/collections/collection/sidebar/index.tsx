import { useState } from 'react'
import { DndProvider } from 'react-dnd'
import { useParams } from 'react-router-dom'

import { LoaderCircle } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { api } from '@/lib/api'
import {
  getBackendOptions,
  MultiBackend,
  Tree,
  type NodeModel,
} from '@minoru/react-dnd-treeview'
import { useQueryClient } from '@tanstack/react-query'

import { CreateFolder } from './create-folder'
import { CustomDragPreview } from './custom-drag-preview'
import { CustomNode } from './custom-node'
import { Placeholder } from './placeholder'

type Request = {
  id: string
  parentId?: string
  type: string
  method: string
  url: string
  name: string
}

export type Collection = {
  id: string
  name: string
  requests: Request[]
}

export function Sidebar() {
  const { collectionId } = useParams<{ collectionId: string }>()

  const [loading, setLoading] = useState(false)

  const queryClient = useQueryClient()
  const collection = queryClient.getQueryData<Collection>([
    'collections',
    collectionId,
  ])

  const treeData =
    collection?.requests.map((request) => ({
      id: request.id,
      parent: request.parentId ?? 0,
      text: '',
    })) ?? []

  function handleDrop(newTreeData: NodeModel[]) {
    console.log(newTreeData)
  }

  async function createRequest() {
    try {
      setLoading(true)

      const response = await api.post(
        `/collections/${collection?.id}/requests`,
        {
          type: 'REQUEST',
        },
      )

      queryClient.setQueryData(
        ['collections', collectionId],
        (prevState: Collection) => ({
          ...prevState,
          requests: [...prevState.requests, response.data.request],
        }),
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex w-80 flex-col">
      <div className="flex h-[52px] items-center px-4">
        <span className="text-sm font-semibold">{collection?.name}</span>
      </div>

      <Separator />
      {collection?.requests.length ? (
        <div className="flex flex-1 flex-col py-2 pr-2">
          <DndProvider backend={MultiBackend} options={getBackendOptions()}>
            <Tree
              tree={treeData}
              rootId={0}
              render={(node, { isOpen, onToggle }) => (
                <CustomNode node={node} isOpen={isOpen} onToggle={onToggle} />
              )}
              classes={{
                container: 'flex-1 pl-2',
                draggingSource: 'opacity-30',
                placeholder: 'relative',
              }}
              dragPreviewRender={(monitorProps) => (
                <CustomDragPreview monitorProps={monitorProps} />
              )}
              onDrop={handleDrop}
              sort={false}
              insertDroppableFirst={false}
              canDrop={(_, { dragSource, dropTargetId }) => {
                if (dragSource?.parent === dropTargetId) {
                  return true
                }
              }}
              dropTargetOffset={10}
              placeholderRender={() => <Placeholder />}
            />
          </DndProvider>
        </div>
      ) : (
        <div className="flex flex-1 flex-col items-center justify-center gap-3">
          <Button type="button" variant="outline" onClick={createRequest}>
            {loading ? (
              <LoaderCircle className="size-4 animate-spin" />
            ) : (
              'Create request'
            )}
          </Button>

          <span className="text-sm">or</span>

          <CreateFolder>
            <Button type="button" variant="outline">
              Create folder
            </Button>
          </CreateFolder>
        </div>
      )}

      {/* <Separator />

      <div className="h-[52px]">
        <span>environments</span>
      </div> */}
    </div>
  )
}
