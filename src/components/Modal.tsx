import { ReactNode } from 'react'

import { X } from '@phosphor-icons/react'
import * as Dialog from '@radix-ui/react-dialog'

import { IconButton } from './IconButton'

interface ModalProps {
  open: boolean
  onOpenChange: (value: boolean) => void
  title?: string
  children: ReactNode
}

export function Modal({
  open,
  onOpenChange,
  title = '',
  children,
}: ModalProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />

        <Dialog.Content className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-white focus:outline-none flex flex-col">
          <header className="flex justify-between p-2 pl-4 items-center gap-4">
            <Dialog.Title className="text-md">{title}</Dialog.Title>
            <Dialog.Close asChild>
              <IconButton type="button">
                <X />
              </IconButton>
            </Dialog.Close>
          </header>

          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
