import { useState } from 'react'
import axios from 'axios'

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

        <Tabs className="flex-1 flex flex-col p-4">
          <div>
            <TabsList>
              <TabsTrigger value="body" disabled>
                Body
              </TabsTrigger>

              <TabsTrigger value="headers">Headers</TabsTrigger>
            </TabsList>
          </div>

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
            <div className="flex-1 flex flex-col">
              <div className="flex p-4">{response.status}</div>

              <div className="flex-1 flex overflow-auto p-4">
                <pre className="text-sm">
                  <code>{JSON.stringify(response.data, null, 2)}</code>
                </pre>
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
