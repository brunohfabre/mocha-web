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

type Method = 'get' | 'post' | 'put' | 'patch' | 'delete'

export function App() {
  const [method, setMethod] = useState<Method>('get')
  const [routeInput, setRouteInput] = useState('')
  const [response, setResponse] = useState<Record<string, any> | null>(null)

  function sendRequest() {
    axios({
      method,
      url: routeInput,
    })
      .then(data => {
        setResponse(data)
      })
      .catch(error => {
        setResponse(error.response)
      })
  }

  return (
    <div className="h-screen w-full flex antialiased">
      <div className="w-64 flex p-4" />

      <Separator orientation="vertical" />

      <div className="flex-1 flex p-4 flex-col">
        <div className="flex gap-2">
          <div>
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
          </div>

          <Input
            placeholder="Route"
            onChange={event => setRouteInput(event.target.value)}
          />
          <Button type="button" onClick={sendRequest}>
            Send
          </Button>
        </div>
      </div>

      <Separator orientation="vertical" />

      {response ? (
        <div className="flex-1 flex flex-col">
          <div className="flex p-4">{response.status}</div>

          <div className="flex-1 flex overflow-auto">
            {String(response.status).startsWith('2') && (
              <pre className="text-sm">
                <code>{JSON.stringify(response.data, null, 2)}</code>
              </pre>
            )}
          </div>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center">
          <p>response</p>
        </div>
      )}
    </div>
  )
}
