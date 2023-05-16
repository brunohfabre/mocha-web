import { InputHTMLAttributes } from 'react'
import { useFormContext } from 'react-hook-form'

import { ErrorMessage } from './ErrorMessage'
import { Field } from './Field'
import { Label } from './Label'

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string
  label?: string
}

export function TextInput(props: TextInputProps) {
  const { register } = useFormContext()

  return (
    <Field>
      {props.label && <Label>{props.label}</Label>}

      <input
        id={props.name}
        className="h-10 bg-red-300 px-4 text-sm w-full"
        {...props}
        {...register(props.name)}
      />

      <ErrorMessage field={props.name} />
    </Field>
  )
}
