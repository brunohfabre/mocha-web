import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { z } from 'zod'

import { IconButton } from '@/components/IconButton'
import { zodResolver } from '@hookform/resolvers/zod'
import { CaretLeft } from '@phosphor-icons/react'

import { Button } from '../components/Button'
import { Form } from '../components/Form'
import { api } from '../lib/api'
import { useAuthStore } from '../stores/auth'

const signUpUserFormSchema = z
  .object({
    name: z
      .string()
      .nonempty()
      .transform((name) => {
        return name
          .trim()
          .split(' ')
          .map((word) => word[0].toLocaleUpperCase().concat(word.substring(1)))
          .join(' ')
      }),
    email: z.string().email().nonempty(),
    phone: z.string().nonempty(),
    password: z.string().min(6),
    confirmPassword: z.string().min(6),
  })
  .superRefine((val, ctx) => {
    if (val.password !== val.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Password not match',
        path: ['confirmPassword'],
      })
    }
  })

type SignUpUserFormData = z.infer<typeof signUpUserFormSchema>

export function SignUp() {
  const navigate = useNavigate()

  const setCredentials = useAuthStore((state) => state.setCredentials)

  const signUpForm = useForm<SignUpUserFormData>({
    resolver: zodResolver(signUpUserFormSchema),
  })

  const { handleSubmit } = signUpForm

  const [loading, setLoading] = useState(false)

  async function signUp(data: SignUpUserFormData) {
    try {
      const { name, email, phone, password } = data

      setLoading(true)

      const response = await api.post('/users', {
        name,
        email,
        phone: `+55${phone}`,
        password,
      })

      const { token, user } = response.data

      setCredentials({ token, user })
    } finally {
      setLoading(false)
    }
  }

  function navigateGoBack() {
    navigate(-1)
  }

  function navigateToSignIn() {
    navigate('/sign-in')
  }

  return (
    <div className="h-screen w-screen flex flex-col">
      <div className="mx-auto max-w-5xl w-full p-4">
        <IconButton type="button" onClick={navigateGoBack}>
          <CaretLeft size={16} weight="bold" />
        </IconButton>
      </div>

      <div className="flex-1 flex items-center justify-center">
        <div className="flex flex-col w-80 gap-8">
          <h1 className="font-medium text-3xl self-center">Sign up</h1>

          <FormProvider {...signUpForm}>
            <form
              onSubmit={handleSubmit(signUp)}
              className="flex flex-col gap-2"
            >
              <Form.TextInput
                name="name"
                label="Name"
                placeholder="Name"
                type="text"
              />

              <Form.TextInput
                name="email"
                label="E-mail"
                placeholder="E-mail"
                type="email"
              />

              <Form.PhoneInput
                name="phone"
                label="Phone"
                placeholder="Phone"
                type="text"
              />

              <Form.PasswordInput
                name="password"
                label="Password"
                placeholder="Password"
                type="password"
              />

              <Form.PasswordInput
                name="confirmPassword"
                label="Confirm password"
                placeholder="Confirm password"
                type="password"
              />

              <Button isLoading={loading} className="mt-6">
                Sign up
              </Button>
            </form>
          </FormProvider>

          <p className="text-sm self-center">
            Already have an account?{' '}
            <span
              className="text-emerald-300 cursor-pointer hover:underline"
              onClick={navigateToSignIn}
            >
              Sign in
            </span>
          </p>
        </div>
      </div>

      <div className="h-16"></div>
    </div>
  )
}
