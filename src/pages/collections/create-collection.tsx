import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { LoaderCircle } from 'lucide-react'
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
import { api } from '@/lib/api'
import { useOrganizationStore } from '@/stores/organization-store'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'

import type { Collection } from '.'

const formSchema = z.object({
  name: z.string().min(1),
})

type FormData = z.infer<typeof formSchema>

interface CreateCollectionProps {
  open: boolean
  onOpenChange: (value: boolean) => void
}

export function CreateCollection({
  open,
  onOpenChange,
}: CreateCollectionProps) {
  const navigate = useNavigate()

  const organization = useOrganizationStore((state) => state.organization)

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
  })

  const [loading, setLoading] = useState(false)

  const queryClient = useQueryClient()

  async function createCollection(data: FormData) {
    try {
      setLoading(true)

      const { name } = data

      const response = await api.post(
        `/organizations/${organization?.id}/collections`,
        {
          name,
        },
      )

      queryClient.setQueryData(['collections'], (prevState: Collection[]) => [
        ...prevState,
        response.data.collection,
      ])

      navigate(`/collections/${response.data.collection.id}`)
    } finally {
      setLoading(false)
    }
  }

  function handleCloseModal() {
    onOpenChange(false)
    form.reset()
  }

  return (
    <Dialog open={open} onOpenChange={handleCloseModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create collection</DialogTitle>
        </DialogHeader>

        <form
          className="mt-4 flex flex-col gap-8"
          onSubmit={form.handleSubmit(createCollection)}
        >
          <div className="flex flex-col gap-1">
            <Label htmlFor="name">Name</Label>
            <Input id="name" placeholder="Name" {...form.register('name')} />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleCloseModal}>
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
