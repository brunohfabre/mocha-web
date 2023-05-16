import * as AlertDialog from '@radix-ui/react-alert-dialog'

import { Button } from './Button'

interface DialogProps {
  open: boolean
  onOpenChange: (value: boolean) => void
  title: string
  description: string
  actionText: string
  onAction: () => void
  actionIsLoading?: boolean
}

export function Dialog({
  open,
  onOpenChange,
  title,
  description,
  actionText,
  onAction,
  actionIsLoading,
}: DialogProps) {
  return (
    <AlertDialog.Root open={open} onOpenChange={onOpenChange}>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="fixed inset-0 bg-black/50" />

        <AlertDialog.Content className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-white focus:outline-none flex flex-col p-4 gap-4">
          <div>
            <AlertDialog.Title className="text-lg font-medium">
              {title}
            </AlertDialog.Title>
            <AlertDialog.Description className="text-md">
              {description}
            </AlertDialog.Description>
          </div>

          <div className="flex gap-2 justify-end">
            <Button
              type="button"
              onClick={() => onOpenChange(false)}
              variant="secondary"
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={onAction}
              isLoading={actionIsLoading}
            >
              {actionText}
            </Button>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  )
}
