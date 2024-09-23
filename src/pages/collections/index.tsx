import { Empty } from '@/components/empty'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { api } from '@/lib/api'
import { useOrganizationStore } from '@/stores/organization-store'
import { useQuery } from '@tanstack/react-query'

type Collection = {
  id: string
  name: string
}

export function Collections() {
  const organization = useOrganizationStore((state) => state.organization)

  const { data, isPending } = useQuery({
    queryKey: ['collections'],
    queryFn: async () => {
      const response = await api.get<{ collections: Collection[] }>(
        `/organizations/${organization?.id}/collections`,
      )

      return response.data.collections
    },
  })

  if (isPending) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <span>is loading</span>
      </div>
    )
  }

  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <header className="flex justify-between">
        <p className="text-lg font-semibold">Collections</p>
        <Button type="button">+ Collection</Button>
      </header>

      {data?.length === 0 ? (
        <Empty />
      ) : (
        <div className="flex flex-1 rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Method</TableHead>
                <TableHead>Amount</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {data?.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>INV001</TableCell>
                  <TableCell>Paid</TableCell>
                  <TableCell>Credit Card</TableCell>
                  <TableCell>$250.00</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  )
}
