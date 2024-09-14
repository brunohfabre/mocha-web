import { Controller, useFieldArray, useForm, useWatch } from 'react-hook-form'

import { X } from 'lucide-react'
import { z } from 'zod'

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
import { zodResolver } from '@hookform/resolvers/zod'
import Editor from '@monaco-editor/react'

const formSchema = z.object({
  method: z.enum(['get', 'post', 'put', 'patch', 'delete']),
  url: z.string(),

  bodyType: z.enum(['none', 'json']),
  body: z.string().optional(),

  authType: z.enum(['none', 'bearer']),
  auth: z.record(z.string(), z.string()).optional(),

  headers: z.array(
    z.object({
      name: z.string(),
      value: z.string(),
    }),
  ),

  params: z.array(
    z.object({
      name: z.string(),
      value: z.string(),
    }),
  ),
})

type FormData = z.infer<typeof formSchema>

// const controller = new AbortController()

export function Request() {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      method: 'get',

      bodyType: 'none',

      authType: 'none',
    },
  })
  const headersField = useFieldArray({
    control: form.control,
    name: 'headers',
  })
  const paramsField = useFieldArray({
    control: form.control,
    name: 'params',
  })

  const bodyType = useWatch({ control: form.control, name: 'bodyType' })
  const authType = useWatch({ control: form.control, name: 'authType' })

  function sendRequest(data: FormData) {
    console.log(data)
    // axios({
    //   method,
    //   url: routeInput,
    //   signal: controller.signal,
    //   headers: finalHeaders,
    //   data: body ? JSON.parse(body) : undefined,
    // })
    //   .then((data) => {
    //     setResponse(data)
    //   })
    //   .catch((error) => {
    //     setResponse(error.response)
    //   })
    //   .finally(() => {
    //     setLoading(false)
    //   })
  }

  return (
    <div className="flex flex-1 flex-col">
      <form
        className="flex gap-2 p-2"
        onSubmit={form.handleSubmit(sendRequest)}
      >
        <Controller
          control={form.control}
          name="method"
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger className="w-min min-w-24">
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
          )}
        />

        <Input placeholder="Route" {...form.register('url')} />

        <Button type="submit">Send</Button>
      </form>

      <Separator orientation="horizontal" />

      <Tabs defaultValue="body" className="flex flex-1 flex-col">
        <div className="p-2">
          <TabsList>
            <TabsTrigger value="body">Body</TabsTrigger>
            <TabsTrigger value="auth">Auth</TabsTrigger>
            <TabsTrigger value="headers">Headers</TabsTrigger>
            <TabsTrigger value="params">Params</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="body" className="m-0" asChild>
          <div className="flex flex-1 flex-col">
            <div className="flex-1">
              {bodyType === 'json' && (
                <Controller
                  control={form.control}
                  name="body"
                  render={({ field }) => (
                    <Editor
                      defaultLanguage="json"
                      value={field.value}
                      onChange={(value) => field.onChange(value)}
                    />
                  )}
                />
              )}
            </div>

            <div className="p-2">
              <Controller
                control={form.control}
                name="bodyType"
                render={({ field }) => (
                  <Select
                    value={field.value}
                    onValueChange={(value) => {
                      field.onChange(value)

                      if (value === 'none') {
                        form.setValue('body', '')
                      }
                    }}
                  >
                    <SelectTrigger className="w-min min-w-20">
                      <SelectValue placeholder="Body type" />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem value="none">None</SelectItem>
                      <SelectItem value="json">Json</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="auth" className="m-0" asChild>
          <div className="flex flex-1 flex-col">
            <div className="flex-1 px-2 py-6">
              {authType === 'bearer' && <Input placeholder="Token" />}
            </div>

            <div className="p-2">
              <Controller
                control={form.control}
                name="authType"
                render={({ field }) => (
                  <Select
                    value={field.value}
                    onValueChange={(value) => {
                      field.onChange(value)

                      if (value === 'none') {
                        form.setValue('auth', {})
                      }
                    }}
                  >
                    <SelectTrigger className="w-min min-w-24">
                      <SelectValue placeholder="Auth type" />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem value="none">None</SelectItem>
                      <SelectItem value="bearer">Bearer</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="headers" className="m-0" asChild>
          <div className="flex flex-1 flex-col gap-4 p-2">
            <div className="flex justify-end">
              <Button
                type="button"
                onClick={() => headersField.append({ name: '', value: '' })}
              >
                + Header
              </Button>
            </div>

            <div className="flex flex-col gap-2 overflow-auto">
              {headersField.fields.map((field, index) => (
                <div key={field.id} className="flex gap-2">
                  <Input
                    className="flex-1"
                    placeholder="Name"
                    {...form.register(`headers.${index}.name`)}
                  />
                  <Input
                    className="flex-1"
                    placeholder="Value"
                    {...form.register(`headers.${index}.value`)}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => headersField.remove(index)}
                  >
                    <X className="size-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="params" className="m-0" asChild>
          <div className="flex flex-1 flex-col gap-4 p-2">
            <div className="flex justify-end">
              <Button
                type="button"
                onClick={() => paramsField.append({ name: '', value: '' })}
              >
                + Param
              </Button>
            </div>

            <div className="flex flex-col gap-2 overflow-auto">
              {paramsField.fields.map((field, index) => (
                <div key={field.id} className="flex gap-2">
                  <Input
                    className="flex-1"
                    placeholder="Name"
                    {...form.register(`params.${index}.name`)}
                  />
                  <Input
                    className="flex-1"
                    placeholder="Value"
                    {...form.register(`params.${index}.value`)}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => paramsField.remove(index)}
                  >
                    <X className="size-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
