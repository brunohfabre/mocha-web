import { DragLayerMonitorProps } from '@minoru/react-dnd-treeview'

interface CustomDragPreviewProps {
  monitorProps: DragLayerMonitorProps<any>
}

export function CustomDragPreview({ monitorProps }: CustomDragPreviewProps) {
  const { item } = monitorProps

  return (
    <div>
      <span>{item.text}</span>
    </div>
  )
}
