import { ButtonHTMLAttributes, ReactNode, forwardRef } from 'react'

import clsx from 'clsx'

import { Spinner } from './Spinner'

type VariantType = 'primary' | 'secondary' | 'danger'
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  isLoading?: boolean
  variant?: VariantType
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, isLoading, className, variant, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={clsx(
          'bg-emerald-300 h-10 flex items-center justify-center text-sm px-4 hover:enabled:bg-emerald-400',
          className,
          variant === 'secondary' && 'bg-zinc-300 hover:enabled:bg-zinc-400',
          variant === 'danger' && 'bg-red-300 hover:enabled:bg-red-400',
          (props.disabled || isLoading) && 'opacity-50 cursor-not-allowed',
        )}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {isLoading ? <Spinner /> : children}
      </button>
    )
  },
)
