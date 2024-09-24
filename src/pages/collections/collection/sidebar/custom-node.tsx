import { useNavigate, useParams } from 'react-router-dom'

import clsx from 'clsx'
import { ChevronRight } from 'lucide-react'

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from '@/components/ui/context-menu'
import { cn } from '@/lib/utils'
import { NodeModel } from '@minoru/react-dnd-treeview'
import { useQueryClient } from '@tanstack/react-query'

import type { Collection } from '.'

interface CustomNodeProps {
  node: NodeModel<any>
  isOpen: boolean
  onToggle: (id: NodeModel['id']) => void
}

export function CustomNode({ node, isOpen, onToggle }: CustomNodeProps) {
  const { collectionId, requestId } = useParams<{
    collectionId: string
    requestId: string
  }>()
  const navigate = useNavigate()

  const queryClient = useQueryClient()
  const collection = queryClient.getQueryData<Collection>([
    'collections',
    collectionId,
  ])

  const item = collection?.requests.find((request) => request.id === node.id)

  function handleToggle(e: MouseEvent) {
    e.stopPropagation()

    onToggle(node.id)
  }

  function handleSelectRequest() {
    navigate(`/collections/${collectionId}/requests/${node.id}`)
  }

  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        <div
          className={cn(
            'flex h-9 flex-1 cursor-pointer items-center gap-2 rounded-md pl-2 transition-colors hover:bg-muted',
            requestId === node.id && 'bg-muted',
          )}
          onClick={(event: any) =>
            node.droppable ? handleToggle(event) : handleSelectRequest()
          }
        >
          {node.droppable && (
            <ChevronRight className={cn('size-3', isOpen && 'rotate-90')} />
          )}

          {item?.type === 'REQUEST' && (
            <span
              className={clsx(
                'ml-1 w-8 text-[10px] font-bold leading-none',
                item.method === 'GET' && 'text-green-500',
                item.method === 'POST' && 'text-blue-500',
                item.method === 'PUT' && 'text-amber-500',
                item.method === 'PATCH' && 'text-orange-500',
                item.method === 'DELETE' && 'text-red-500',
              )}
            >
              {item?.method === 'DELETE' ? 'DEL' : item.method}
            </span>
          )}

          <span className="text-sm">{item?.name}</span>
        </div>
      </ContextMenuTrigger>

      <ContextMenuContent>
        <ContextMenuItem>{item?.name}</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  )
}
