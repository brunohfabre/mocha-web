import { useAtom } from 'jotai'
import { LoaderCircle } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { Editor } from '@monaco-editor/react'

import { controller, loadingAtom, responseAtom } from './state'

type StatusType =
  | 'informational'
  | 'success'
  | 'redirection'
  | 'client-error'
  | 'server-error'
  | 'error'

export function Response() {
  const [loading] = useAtom(loadingAtom)
  const [response] = useAtom(responseAtom)

  const startOfStatus = response?.response?.status.toString()[0]
  const statusType: StatusType =
    startOfStatus === '1'
      ? 'informational'
      : startOfStatus === '2'
      ? 'success'
      : startOfStatus === '3'
      ? 'redirection'
      : startOfStatus === '4'
      ? 'client-error'
      : startOfStatus === '5'
      ? 'server-error'
      : 'error'

  function handleCancelRequest() {
    controller.abort()
  }

  if (!loading && !response) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <p className="text-sm">To view the response, send a request.</p>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-8">
        <LoaderCircle className="size-4 animate-spin" />

        <Button type="button" variant="outline" onClick={handleCancelRequest}>
          Cancel
        </Button>
      </div>
    )
  }

  return (
    <div className="flex flex-1 flex-col">
      <header className="flex h-[52px] items-center gap-2 p-2">
        <div
          className={cn(
            'h-7 px-2.5 flex items-center text-sm rounded-md font-bold text-white',
            statusType === 'informational' && 'bg-amber-500',
            statusType === 'success' && 'bg-green-500',
            statusType === 'redirection' && 'bg-blue-500',
            statusType === 'client-error' && 'bg-red-500',
            statusType === 'server-error' && 'bg-orange-500',
            statusType === 'error' && 'bg-red-500',
          )}
        >
          {response?.response?.status ?? 'Error'}
        </div>

        <div className="flex h-7 items-center rounded-md bg-muted px-2.5 text-sm font-semibold">
          {response?.time}ms
        </div>

        {/* <div className="flex h-7 items-center rounded-md bg-gray-100 px-2.5 text-sm font-semibold">
          1017 B
        </div> */}
      </header>

      <Separator orientation="horizontal" />

      {statusType === 'error' && (
        <div className="flex flex-1 items-center justify-center p-4">
          <p className="text-sm">Error: Couldn&apos;t connect to server</p>
        </div>
      )}

      {response?.response?.config.headers.Accept?.toString().includes(
        'application/json',
      ) && (
        <div className="flex-1">
          <Editor
            defaultLanguage="json"
            value={JSON.stringify(response.response.data, null, 2)}
            options={{
              readOnly: true,
              tabSize: 2,
            }}
            theme="vs-dark"
          />
        </div>
      )}
    </div>
  )
}
