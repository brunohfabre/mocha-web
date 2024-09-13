import { useState } from 'react'
import axios from 'axios'
import Editor from '@monaco-editor/react'

import { Button } from './components/ui/button'
import { Input } from './components/ui/input'
import { Separator } from './components/ui/separator'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs'

type Method = 'get' | 'post' | 'put' | 'patch' | 'delete'

type BodyType = 'none' | 'json'

type Header = {
  id: string
  name: string
  value: string
}

const controller = new AbortController()

export function App() {
  const [loading, setLoading] = useState(false)
  const [method, setMethod] = useState<Method>('get')
  const [routeInput, setRouteInput] = useState('')
  const [response, setResponse] = useState<Record<string, any> | null>(null)
  const [bodyType, setBodyType] = useState<BodyType>('none')
  const [body, setBody] = useState('')
  const [headers, setHeaders] = useState<Header[]>([])

  function sendRequest() {
    setLoading(true)

    const finalHeaders: Record<string, string> = {}

    for (const header of headers) {
      finalHeaders[header.name] = header.value
    }

    axios({
      method,
      url: routeInput,
      signal: controller.signal,
      headers: finalHeaders,
      data: body ? JSON.parse(body) : undefined,
    })
      .then(data => {
        setResponse(data)
      })
      .catch(error => {
        setResponse(error.response)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  function handleCancel() {
    controller.abort()
  }

  return (
    <div className="h-screen w-full flex antialiased">
      <div className="w-64 flex p-4" />

      <Separator orientation="vertical" />

      <div className="flex-1 flex flex-col">
        <div className="flex gap-2 p-4">
          <Select
            value={method}
            onValueChange={value => setMethod(value as Method)}
          >
            <SelectTrigger className="w-24">
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

          <Input
            placeholder="Route"
            onChange={event => setRouteInput(event.target.value)}
          />
          <Button type="button" onClick={sendRequest}>
            Send
          </Button>
        </div>

        <Separator orientation="horizontal" />

        <Tabs defaultValue="body" className="flex-1 flex flex-col p-4">
          <div>
            <TabsList>
              <TabsTrigger value="body">Body</TabsTrigger>

              <TabsTrigger value="headers">Headers</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="body" asChild>
            <div className="flex-1 flex flex-col gap-4">
              <div className="flex-1 flex flex-col">
                {bodyType === 'json' && (
                  <Editor
                    defaultLanguage="json"
                    defaultValue={body}
                    onChange={value => setBody(value as string)}
                  />
                )}
              </div>

              <Select
                value={bodyType}
                onValueChange={value => setBodyType(value as BodyType)}
              >
                <SelectTrigger className="w-24">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="none">NONE</SelectItem>
                  <SelectItem value="json">JSON</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </TabsContent>

          <TabsContent value="headers" asChild>
            <div className="flex-1 flex flex-col gap-4">
              <div className="flex">
                <Button
                  type="button"
                  onClick={() =>
                    setHeaders(prevState => [
                      ...prevState,
                      {
                        id: crypto.randomUUID(),
                        name: '',
                        value: '',
                      },
                    ])
                  }
                >
                  + add
                </Button>
              </div>

              <div className="flex-1 flex flex-col gap-2 overflow-auto">
                {headers.map(item => (
                  <div key={item.id} className="flex gap-2">
                    <Input
                      placeholder="Name"
                      onChange={event =>
                        setHeaders(prevState =>
                          prevState.map(header =>
                            header.id === item.id
                              ? {
                                  ...header,
                                  name: event.target.value,
                                }
                              : header
                          )
                        )
                      }
                    />
                    <Input
                      placeholder="Value"
                      onChange={event =>
                        setHeaders(prevState =>
                          prevState.map(header =>
                            header.id === item.id
                              ? {
                                  ...header,
                                  value: event.target.value,
                                }
                              : header
                          )
                        )
                      }
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      onClick={() =>
                        setHeaders(prevState =>
                          prevState.filter(header => header.id !== item.id)
                        )
                      }
                    >
                      X
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <Separator orientation="vertical" />

      {loading ? (
        <div className="flex-1 flex items-center justify-center flex-col gap-4">
          <span>loading</span>

          <Button type="button" variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
        </div>
      ) : (
        <>
          {response ? (
            <div className="flex-1 flex flex-col overflow-auto">
              <div className="flex p-4">{response.status}</div>

              <Separator orientation="horizontal" />

              <div className="flex-1 flex overflow-auto p-4">
                <Editor
                  defaultLanguage="json"
                  defaultValue={JSON.stringify(response.data, null, 2)}
                  options={{
                    readOnly: true,
                  }}
                />
                {/* <pre className="text-sm">
                  {JSON.stringify(response.data, null, 2)}
                </pre> */}
              </div>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <p>response</p>
            </div>
          )}
        </>
      )}
    </div>
  )
}
