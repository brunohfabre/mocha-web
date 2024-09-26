import { Separator } from '@/components/ui/separator'

import { Request } from './request'
import { Response } from './response'

export function CollectionRequest() {
  return (
    <div className="flex flex-1">
      <Request />

      <Separator orientation="vertical" />

      <Response />
    </div>
  )
}
