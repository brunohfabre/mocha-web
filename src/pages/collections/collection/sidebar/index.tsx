import { useState } from 'react'
import { DndProvider } from 'react-dnd'

import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { type NodeModel } from '@minoru/react-dnd-treeview'

import { CreateFolderModal } from './create-folder-modal'

const initialData = [
  {
    id: 1,
    parent: 0,
    droppable: true,
    text: '',
  },
  {
    id: 2,
    parent: 1,
    text: '',
  },
  {
    id: 3,
    parent: 1,
    text: '',
  },
  {
    id: 4,
    parent: 0,
    droppable: true,
    text: '',
  },
  {
    id: 5,
    parent: 4,
    droppable: true,
    text: '',
  },
  {
    id: 6,
    parent: 5,
    text: '',
  },
]

export const items = {
  1: {
    id: '1',
    method: 'GET',
    type: 'FOLDER',
    name: 'Folder 1',
  },
  2: {
    id: '2',
    method: 'GET',
    type: 'REQUEST',
    name: 'get 1',
  },
  3: {
    id: '3',
    method: 'POST',
    type: 'REQUEST',
    name: 'post 1',
  },
  4: {
    id: '4',
    method: 'GET',
    type: 'FOLDER',
    name: 'Folder 2',
  },
  5: {
    id: '5',
    method: 'GET',
    type: 'FOLDER',
    name: 'Folder 3',
  },
  6: {
    id: '6',
    method: 'PUT',
    type: 'REQUEST',
    name: 'put 1',
  },
}

export function Sidebar() {
  const [treeData, setTreeData] = useState<NodeModel[]>(initialData)
  function handleDrop(newTreeData: NodeModel[]) {
    console.log(newTreeData)

    setTreeData(newTreeData)
  }

  return (
    <div className="flex w-80 flex-col">
      <div className="flex h-[52px] items-center px-4">
        <span className="text-sm font-semibold">Collection name</span>
      </div>

      <Separator />

      <div className="flex flex-1 flex-col items-center justify-center gap-3">
        <Button type="button" variant="outline">
          Create request
        </Button>

        <span className="text-sm">or</span>

        <CreateFolderModal>
          <Button type="button" variant="outline">
            Create folder
          </Button>
        </CreateFolderModal>
      </div>

      {/* <div className="flex flex-1 flex-col py-2 pr-2">
        
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
      </div> */}

      {/* <Separator />

      <div className="h-[52px]">
        <span>environments</span>
      </div> */}
    </div>
  )
}
