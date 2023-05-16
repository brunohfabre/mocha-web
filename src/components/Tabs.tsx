import clsx from 'clsx'

import * as RadixTabs from '@radix-ui/react-tabs'

function Root({ className, ...props }: RadixTabs.TabsProps) {
  return (
    <RadixTabs.Root
      className={clsx('flex-1 flex flex-col', className)}
      {...props}
    />
  )
}

function List(props: RadixTabs.TabsListProps) {
  return <RadixTabs.List className="flex bg-blue-200" {...props} />
}

function Item(props: RadixTabs.TabsTriggerProps) {
  return (
    <RadixTabs.Trigger
      className="flex items-center h-10 px-4 text-sm hover:enabled:bg-blue-300 data-[state=active]:bg-blue-300 disabled:opacity-50 disabled:cursor-not-allowed"
      {...props}
    />
  )
}

function Content(props: RadixTabs.TabsContentProps) {
  return (
    <RadixTabs.Content
      className="grow data-[state=active]:flex data-[state=active]:flex-col"
      {...props}
    />
  )
}

export const Tabs = { Root, List, Item, Content }
