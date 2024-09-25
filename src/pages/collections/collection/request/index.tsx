import { useParams } from 'react-router-dom'

export function Request() {
  const { requestId } = useParams<{ requestId: string }>()

  return (
    <div className="flex flex-1 p-4">
      <span>Request - {requestId}</span>
    </div>
  )
}
