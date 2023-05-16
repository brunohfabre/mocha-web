import { SelectHTMLAttributes } from 'react'
import { useFormContext } from 'react-hook-form'

type OptionType = {
  value: string
  label: string
}

interface SelectInputProps extends SelectHTMLAttributes<HTMLSelectElement> {
  name: string
  options: OptionType[]
}

export function SelectInput({ name, options, ...props }: SelectInputProps) {
  const { register } = useFormContext()

  return (
    <select
      id={name}
      className="h-10 bg-red-300 px-4 text-sm"
      {...props}
      {...register(name)}
    >
      {options.map((item) => (
        <option key={item.value} value={item.value}>
          {item.label}
        </option>
      ))}
    </select>
  )
}
