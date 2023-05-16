import { InputHTMLAttributes } from 'react'
import { Controller, useFormContext } from 'react-hook-form'

import { toPattern, toNumber } from 'vanilla-masker'

import { ErrorMessage } from './ErrorMessage'
import { Field } from './Field'
import { Label } from './Label'

interface PhoneInputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string
  label?: string
}

export function PhoneInput(props: PhoneInputProps) {
  const { control } = useFormContext()

  return (
    <Field>
      {props.label && <Label>{props.label}</Label>}

      <Controller
        control={control}
        name={props.name}
        render={({ field }) => (
          <div className="flex bg-red-300">
            <span className="text-sm self-center pl-4">BR +55</span>
            <input
              ref={field.ref}
              id={props.name}
              className="bg-transparent flex-1 h-10 pl-1 pr-4 text-sm"
              {...props}
              value={
                field.value
                  ? toPattern(toNumber(field.value), '(99) 99999-9999')
                  : ''
              }
              onChange={(event) => field.onChange(toNumber(event.target.value))}
            />
          </div>
        )}
      />

      <ErrorMessage field={props.name} />
    </Field>
  )
}
