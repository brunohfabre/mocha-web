import { ComponentProps, ReactNode } from 'react'

import * as RadixContextMenu from '@radix-ui/react-context-menu'

interface ContextMenuProps {
  children: ReactNode[]
}

export function ContextMenu({ children }: ContextMenuProps) {
  return (
    <RadixContextMenu.Root>
      <RadixContextMenu.Trigger asChild>{children[0]}</RadixContextMenu.Trigger>

      {children[1]}
    </RadixContextMenu.Root>
  )
}

interface ContextMenuContentProps {
  children: ReactNode
}

export function ContextMenuContent({ children }: ContextMenuContentProps) {
  return (
    <RadixContextMenu.Portal>
      <RadixContextMenu.Content className="w-48 bg-violet-200 py-2">
        {children}
      </RadixContextMenu.Content>
    </RadixContextMenu.Portal>
  )
}

interface ContextMenuItemProps
  extends ComponentProps<typeof RadixContextMenu.Item> {
  children: ReactNode
}

export function ContextMenuItem({ children, ...props }: ContextMenuItemProps) {
  return (
    <RadixContextMenu.Item
      className="h-8 px-3 flex items-center text-sm hover:cursor-pointer hover:bg-violet-300"
      {...props}
    >
      {children}
    </RadixContextMenu.Item>
  )
}
