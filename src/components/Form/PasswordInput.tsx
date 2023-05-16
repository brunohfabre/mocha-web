import { InputHTMLAttributes, useState } from 'react'
import { useFormContext } from 'react-hook-form'

import { Eye, EyeSlash } from '@phosphor-icons/react'

import { ErrorMessage } from './ErrorMessage'
import { Field } from './Field'
import { Label } from './Label'

interface PasswordInputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string
  label?: string
}

export function PasswordInput(props: PasswordInputProps) {
  const { register } = useFormContext()

  const [visible, setVisible] = useState(false)

  function toggleVisiblity() {
    setVisible((prevState) => !prevState)
  }

  return (
    <Field>
      {props.label && <Label>{props.label}</Label>}

      <div className="flex bg-red-300">
        <input
          id={props.name}
          className="flex-1 h-10 px-4 text-sm w-full bg-transparent"
          type={visible ? 'text' : 'password'}
          {...props}
          {...register(props.name)}
        />
        <button
          type="button"
          onClick={toggleVisiblity}
          className="h-10 w-10 flex items-center justify-center"
        >
          {visible ? (
            <EyeSlash size={16} weight="fill" className="text-zinc-500" />
          ) : (
            <Eye size={16} weight="fill" className="text-zinc-500" />
          )}
        </button>
      </div>

      <ErrorMessage field={props.name} />
    </Field>
  )
}
