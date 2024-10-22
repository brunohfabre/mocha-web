import { useForm } from 'react-hook-form'

import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { zodResolver } from '@hookform/resolvers/zod'

const formSchema = z.object({
  name: z.string().min(1),
})

type FormData = z.infer<typeof formSchema>

interface CreateEnvironmentProps {
  open: boolean
  onOpenChange: (data: boolean) => void

  onCreate: (data: { name: string }) => void
}

export function CreateEnvironment({
  open,
  onOpenChange,

  onCreate,
}: CreateEnvironmentProps) {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
  })

  function handleClose() {
    onOpenChange(false)
    form.reset()
  }

  async function createEnvironment(data: FormData) {
    onCreate(data)

    handleClose()
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Environment</DialogTitle>
        </DialogHeader>

        <form
          className="mt-4 flex flex-col gap-8"
          onSubmit={form.handleSubmit(createEnvironment)}
        >
          <div className="flex flex-col gap-1">
            <Label htmlFor="name">Name</Label>
            <Input id="name" placeholder="Name" {...form.register('name')} />
            {form.formState.errors.name?.message && (
              <span className="text-sm text-red-500">
                {form.formState.errors.name?.message}
              </span>
            )}
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit">Create</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
