import { Button } from '@/components/ui/button'

export function Collections() {
  return (
    <div className="flex flex-1 flex-col gap-6 p-4">
      <header className="flex justify-between">
        <p className="text-lg font-medium">Collections</p>
        <Button type="button">+ Collection</Button>
      </header>

      <div className="flex-1 bg-red-200" />
    </div>
  )
}
