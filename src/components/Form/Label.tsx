import { LabelHTMLAttributes } from 'react'

export function Label(props: LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label
      className="text-sm text-zinc-900 flex items-center justify-between"
      {...props}
    />
  )
}
