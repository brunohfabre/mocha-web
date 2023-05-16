import clsx from 'clsx'

import { getShortName } from '@/utils/getShortName'

interface AvatarProps {
  src?: string
  name: string
}

export function Avatar({ src, name }: AvatarProps) {
  return (
    <div
      className={clsx(
        'w-8 h-8 rounded-full bg-zinc-400 flex items-center justify-center',
        src && `bg-cover bg-no-repeat bg-center`,
      )}
      style={src ? { backgroundImage: `url("${src}")` } : {}}
    >
      {!src && (
        <span className="text-sm font-semibold text-zinc-600">
          {getShortName(name)}
        </span>
      )}
    </div>
  )
}
