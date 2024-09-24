import { useState, type ReactNode } from 'react'
import { useForm } from 'react-hook-form'

import { LoaderCircle } from 'lucide-react'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { api } from '@/lib/api'
import { zodResolver } from '@hookform/resolvers/zod'

const formSchema = z.object({
  name: z.string().min(1),
})

type FormData = z.infer<typeof formSchema>

interface CreateFolderProps {
  children: ReactNode
  parentId?: string
}

export function CreateFolder({ children, parentId }: CreateFolderProps) {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
  })

  const [loading, setLoading] = useState(false)

  async function createFolder(data: FormData) {
    try {
      setLoading(true)

      const { name } = data

      const response = await api.post('/requests', {
        type: 'FOLDER',
        name,
      })

      console.log(response.data)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create folder</DialogTitle>
        </DialogHeader>

        <form
          className="mt-4 flex flex-col gap-8"
          onSubmit={form.handleSubmit(createFolder)}
        >
          <div className="flex flex-col gap-1">
            <Label htmlFor="name">Name</Label>
            <Input id="name" placeholder="Name" {...form.register('name')} />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline">
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? (
                <LoaderCircle className="size-4 animate-spin" />
              ) : (
                'Create'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
