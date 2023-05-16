import { SelectHTMLAttributes } from 'react'
import { useController, useFormContext } from 'react-hook-form'

import clsx from 'clsx'

import { Check, Square } from '@phosphor-icons/react'

interface CheckboxProps extends SelectHTMLAttributes<HTMLSelectElement> {
  name: string
}

export function Checkbox({ name }: CheckboxProps) {
  const { control } = useFormContext()
  const {
    field: { value, onChange },
  } = useController({
    control,
    name,
    defaultValue: false,
  })

  function handleChangeValue() {
    onChange(!value)
  }

  return (
    <button
      type="button"
      className={clsx(
        'w-10 h-10 bg-blue-200 flex items-center justify-center',
        value && 'bg-blue-300',
      )}
      onClick={handleChangeValue}
    >
      {value ? (
        <Check size={16} weight="bold" />
      ) : (
        <Square size={16} weight="bold" />
      )}
    </button>
  )
}
