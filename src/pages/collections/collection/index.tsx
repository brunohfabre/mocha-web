import { Separator } from '@/components/ui/separator'

import { Request } from './request'
import { Response } from './response'

export function Collection() {
  return (
    <div className="flex h-screen w-full antialiased">
      <Request />

      <Separator orientation="vertical" />

      <Response />
    </div>
  )
}
