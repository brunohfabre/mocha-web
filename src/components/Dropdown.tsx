import { ComponentProps, ReactNode } from 'react'

import * as DropdownMenu from '@radix-ui/react-dropdown-menu'

interface DropdownProps {
  children: ReactNode[]
}

function Root({ children }: DropdownProps) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>{children[0]}</DropdownMenu.Trigger>

      {children[1]}
    </DropdownMenu.Root>
  )
}

interface DropdownContentProps extends DropdownMenu.MenuContentProps {
  children: ReactNode
}

function Content({ children, ...props }: DropdownContentProps) {
  return (
    <DropdownMenu.Portal>
      <DropdownMenu.Content
        className="w-48 bg-violet-200 py-2"
        align="end"
        {...props}
      >
        {children}
      </DropdownMenu.Content>
    </DropdownMenu.Portal>
  )
}

interface DropdownItemProps extends ComponentProps<typeof DropdownMenu.Item> {
  children: ReactNode
}

function Item({ children, ...props }: DropdownItemProps) {
  return (
    <DropdownMenu.Item
      className="h-8 px-3 flex items-center text-sm hover:cursor-pointer hover:bg-violet-300"
      {...props}
    >
      {children}
    </DropdownMenu.Item>
  )
}

export const Dropdown = {
  Root,
  Content,
  Item,
}
