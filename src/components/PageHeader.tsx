import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useAuthStore } from '@/stores/auth'
import { Bell, CaretDown, CaretLeft } from '@phosphor-icons/react'
import * as AlertDialog from '@radix-ui/react-alert-dialog'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'

import { Avatar } from './Avatar'
import { Button } from './Button'
import { IconButton } from './IconButton'

interface PageHeaderProps {
  showBackButton?: boolean
}

export function PageHeader({ showBackButton }: PageHeaderProps) {
  const navigate = useNavigate()

  const { user, setCredentials } = useAuthStore((state) => ({
    user: state.user,
    setCredentials: state.setCredentials,
  }))

  const [signOutDialogVisible, setSignOutDialogVisible] = useState(false)

  function navigateToProfile() {
    navigate('/profile')
  }

  function navigateToNotifications() {
    navigate('/notifications/invites')
  }

  function handleSignOut() {
    setCredentials({
      token: '',
      user: null,
    })
  }

  function handleGoBack() {
    navigate(-1)
  }

  return (
    <>
      <AlertDialog.Root
        open={signOutDialogVisible}
        onOpenChange={setSignOutDialogVisible}
      >
        <AlertDialog.Portal>
          <AlertDialog.Overlay className="fixed inset-0 bg-black/50" />

          <AlertDialog.Content className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-white focus:outline-none flex flex-col p-4 gap-4">
            <div>
              <AlertDialog.Title className="text-lg font-medium">
                Sign out?
              </AlertDialog.Title>
              <AlertDialog.Description className="text-md">
                Really want to sign out?
              </AlertDialog.Description>
            </div>

            <div className="flex gap-2 justify-end">
              <Button
                type="button"
                onClick={() => setSignOutDialogVisible(false)}
                variant="secondary"
              >
                Cancel
              </Button>
              <Button type="button" onClick={handleSignOut}>
                Yes, sign out
              </Button>
            </div>
          </AlertDialog.Content>
        </AlertDialog.Portal>
      </AlertDialog.Root>

      <div className="bg-blue-200 h-12 flex px-2 justify-between">
        <div className="flex items-center">
          {showBackButton && (
            <IconButton onClick={handleGoBack}>
              <CaretLeft size={16} weight="bold" />
            </IconButton>
          )}
        </div>

        <div className="flex gap-4">
          <div className="flex items-center">
            <IconButton type="button" onClick={navigateToNotifications}>
              <Bell size={16} weight="bold" />
            </IconButton>
          </div>

          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
              <div className="flex gap-2 items-center cursor-pointer hover:bg-blue-300 px-2">
                <Avatar name={user?.name ?? ''} />

                <div className="flex gap-4 items-center">
                  <CaretDown size={16} weight="bold" />
                </div>
              </div>
            </DropdownMenu.Trigger>

            <DropdownMenu.Portal>
              <DropdownMenu.Content
                className="w-48 bg-violet-200 py-2"
                align="end"
              >
                <DropdownMenu.Item
                  className="h-8 px-3 flex items-center text-sm hover:cursor-pointer hover:bg-violet-300"
                  onClick={navigateToProfile}
                >
                  Profile
                </DropdownMenu.Item>

                <DropdownMenu.Item
                  className="h-8 px-3 flex items-center text-sm hover:cursor-pointer hover:bg-violet-300"
                  onClick={() => setSignOutDialogVisible(true)}
                >
                  Sign out
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>
        </div>
      </div>
    </>
  )
}
