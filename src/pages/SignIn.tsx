import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { z } from 'zod'

import { Button } from '@/components/Button'
import { Form } from '@/components/Form'
import { api } from '@/lib/api'
import { useAuthStore } from '@/stores/auth'
import { zodResolver } from '@hookform/resolvers/zod'

const signInUserFormSchema = z.object({
  email: z.string().email().nonempty(),
  password: z.string().min(6),
})

type SignInUserFormData = z.infer<typeof signInUserFormSchema>

export function SignIn() {
  const navigate = useNavigate()

  const setCredentials = useAuthStore((state) => state.setCredentials)

  const signInForm = useForm<SignInUserFormData>({
    resolver: zodResolver(signInUserFormSchema),
  })
  const { handleSubmit } = signInForm

  const [loading, setLoading] = useState(false)

  async function signIn(data: SignInUserFormData) {
    try {
      const { email, password } = data

      setLoading(true)

      const response = await api.post('/sessions', {
        email,
        password,
      })

      const { token, user } = response.data

      setCredentials({ token, user })
    } finally {
      setLoading(false)
    }
  }

  function navigateToSignUp() {
    navigate('/sign-up')
  }

  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <div className="flex flex-col w-80 gap-8">
        <h1 className="font-medium text-3xl self-center">Sign in</h1>

        <FormProvider {...signInForm}>
          <form onSubmit={handleSubmit(signIn)} className="flex flex-col gap-2">
            <Form.TextInput name="email" label="E-mail" placeholder="E-mail" />

            <Form.PasswordInput
              name="password"
              label="Password"
              placeholder="Password"
            />

            <Button isLoading={loading} className="mt-6">
              Sign in
            </Button>

            <div className="py-2 flex justify-center">
              <span className="text-sm">or</span>
            </div>

            <Button type="button" variant="secondary" disabled>
              GitHub
            </Button>
          </form>
        </FormProvider>

        <p className="text-sm self-center">
          Don&apos;t have an account?{' '}
          <span
            className="text-emerald-300 cursor-pointer hover:underline"
            onClick={navigateToSignUp}
          >
            Sign up for free
          </span>
        </p>
      </div>
    </div>
  )
}
