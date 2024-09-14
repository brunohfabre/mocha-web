import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'

type StatusType =
  | 'informational'
  | 'success'
  | 'redirection'
  | 'client-error'
  | 'server-error'

const statusType: StatusType = 'server-error'

export function Response() {
  return (
    <div className="flex-1 flex items-center justify-center">
      <p className="text-sm">To view the response, send a request.</p>
    </div>
  )

  return (
    <div className="flex-1 flex flex-col">
      <header className="flex p-2 h-[52px] items-center gap-2">
        <div
          className={cn(
            'h-7 px-2.5 flex items-center text-sm rounded-md font-bold text-white',
            statusType === 'informational' && 'bg-amber-500',
            statusType === 'success' && 'bg-green-500',
            statusType === 'redirection' && 'bg-blue-500',
            statusType === 'client-error' && 'bg-red-500',
            statusType === 'server-error' && 'bg-orange-500'
          )}
        >
          200 OK
        </div>

        <div className="h-7 px-2.5 flex items-center bg-gray-100 text-sm rounded-md font-semibold">
          816ms
        </div>

        <div className="h-7 px-2.5 flex items-center bg-gray-100 text-sm rounded-md font-semibold">
          1017 B
        </div>
      </header>

      <Separator orientation="horizontal" />

      <div className="flex-1">response</div>
    </div>
  )
}
