import { Separator } from '@/components/ui/separator'

import { Request } from './request'
import { Response } from './response'
import { Sidebar } from './sidebar'

export function Collection() {
  return (
    <div className="flex h-screen w-full antialiased">
      <Sidebar />

      <Separator orientation="vertical" />

      <Request />

      <Separator orientation="vertical" />

      <Response />
    </div>
  )
}
