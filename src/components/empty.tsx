interface EmptyProps {
  title: string
}

export function Empty({ title }: EmptyProps) {
  return (
    <div className="flex flex-1 items-center justify-center rounded-md border border-dashed">
      <span className="text-base font-semibold">{title}</span>
    </div>
  )
}
