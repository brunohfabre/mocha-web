import { ButtonHTMLAttributes, forwardRef } from 'react'

import clsx from 'clsx'

type VariantType = 'primary' | 'secondary' | 'danger'

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean
  variant?: VariantType
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ isLoading, className, variant, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={clsx(
          'h-8 w-8 bg-emerald-300 flex items-center justify-center hover:enabled:bg-emerald-400',
          variant === 'secondary' && 'bg-zinc-300 hover:enabled:bg-zinc-400',
          variant === 'danger' && 'bg-red-300 hover:enabled:bg-red-400',
          (props.disabled || isLoading) && 'opacity-50 cursor-not-allowed',
          className,
        )}
        {...props}
      />
    )
  },
)
