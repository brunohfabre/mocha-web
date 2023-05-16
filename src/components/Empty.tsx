interface EmptyProps {
  title: string
  description?: string
}

export function Empty({ title, description }: EmptyProps) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center">
      <p className="text-md">{title}</p>
      {description && <p className="text-sm">{description}</p>}
    </div>
  )
}
