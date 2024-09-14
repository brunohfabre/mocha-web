import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export function Request() {
  return (
    <div className="flex-1 flex flex-col">
      <header className="flex p-2 gap-2">
        <Select>
          <SelectTrigger className="min-w-24 w-min">
            <SelectValue placeholder="Method" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="get">GET</SelectItem>
            <SelectItem value="post">POST</SelectItem>
            <SelectItem value="put">PUT</SelectItem>
            <SelectItem value="patch">PATCH</SelectItem>
            <SelectItem value="delete">DELETE</SelectItem>
          </SelectContent>
        </Select>

        <Input />

        <Button type="submit">Send</Button>
      </header>

      <Separator orientation="horizontal" />

      <Tabs defaultValue="account" className="flex-1 flex flex-col">
        <div className="p-2">
          <TabsList>
            <TabsTrigger value="body">Body</TabsTrigger>
            <TabsTrigger value="auth">Auth</TabsTrigger>
            <TabsTrigger value="params">Params</TabsTrigger>
            <TabsTrigger value="headers">Headers</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="body" className="m-0 flex-1 bg-red-200">
          <span>body</span>
        </TabsContent>

        <TabsContent value="auth" className="m-0 flex-1 bg-violet-200">
          <span>auth</span>
        </TabsContent>

        <TabsContent value="params" className="m-0 flex-1 bg-green-200">
          <span>params</span>
        </TabsContent>

        <TabsContent value="headers" className="m-0 flex-1 bg-blue-200">
          <span>headers</span>
        </TabsContent>
      </Tabs>
    </div>
  )
}
