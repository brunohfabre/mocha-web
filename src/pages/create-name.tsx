import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { LoaderCircle } from 'lucide-react'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { api } from '@/lib/api'
import { useAuthStore } from '@/stores/auth-store'
import { zodResolver } from '@hookform/resolvers/zod'

const formSchema = z.object({
  name: z.string().min(1),
})

type FormData = z.infer<typeof formSchema>

export function CreateName() {
  const navigate = useNavigate()

  const user = useAuthStore((state) => state.user)

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
  })

  const [loading, setLoading] = useState(false)

  async function createName(data: FormData) {
    try {
      setLoading(true)

      const { name } = data

      await api.put(`/users/${user?.id}`, {
        name,
      })

      navigate('/verification')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto flex h-screen max-w-96 flex-1 flex-col justify-center gap-8">
      <h1 className="text-2xl font-semibold">Create name</h1>

      <form
        onSubmit={form.handleSubmit(createName)}
        className="flex flex-col gap-8"
      >
        <div className="flex flex-col gap-1">
          <Label htmlFor="email">Email</Label>
          <Input id="name" placeholder="Name" {...form.register('name')} />
          {form.formState.errors.name?.message && (
            <span className="text-sm text-red-500">
              {form.formState.errors.name?.message}
            </span>
          )}
        </div>

        <Button type="submit" disabled={loading}>
          {loading ? (
            <LoaderCircle className="size-4 animate-spin" />
          ) : (
            'Create name'
          )}
        </Button>
      </form>
    </div>
  )
}