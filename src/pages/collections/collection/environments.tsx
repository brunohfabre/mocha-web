import { useState } from 'react'
import { useParams } from 'react-router-dom'

import { omit } from 'lodash'
import { Plus } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useQueryClient } from '@tanstack/react-query'

import type { CollectionType } from './sidebar'

export function Environments() {
  const { collectionId } = useParams<{
    collectionId: string
  }>()

  const queryClient = useQueryClient()

  const collection = queryClient.getQueryData<CollectionType>([
    'collections',
    collectionId,
  ])

  const [environments, setEnvironments] = useState<
    { id: string; name: string }[]
  >(collection?.environments.environments ?? [])
  const [variables, setVariables] = useState<{ id: string; name: string }[]>(
    collection?.environments.variables ?? [],
  )
  const [values, setValues] = useState<Record<string, string>>(
    collection?.environments.values ?? {},
  )

  function handleAddEnvironment() {
    setEnvironments((prevState) => [
      ...prevState,
      {
        id: crypto.randomUUID(),
        name: '',
      },
    ])
  }

  function handleAddVariable() {
    setVariables((prevState) => [
      ...prevState,
      {
        id: crypto.randomUUID(),
        name: '',
      },
    ])
  }

  function handleDeleteEnvironment(id: string) {
    setEnvironments((prevState) =>
      prevState.filter((environment) => environment.id !== id),
    )

    const matches: string[] = []

    for (const key of Object.keys(values)) {
      if (key.startsWith(id)) {
        matches.push(key)
      }
    }

    setValues((prevState) => omit(prevState, matches))
  }

  function handleDeleteVariable(id: string) {
    setVariables((prevState) =>
      prevState.filter((variable) => variable.id !== id),
    )

    const matches: string[] = []

    for (const key of Object.keys(values)) {
      if (key.endsWith(id)) {
        matches.push(key)
      }
    }

    setValues((prevState) => omit(prevState, matches))
  }

  function handleChangeEnvironment({
    id,
    value,
  }: {
    id: string
    value: string
  }) {
    setEnvironments((prevState) =>
      prevState.map((environment) =>
        environment.id === id ? { ...environment, name: value } : environment,
      ),
    )
  }

  function handleChangeVariable({ id, value }: { id: string; value: string }) {
    setVariables((prevState) =>
      prevState.map((variable) =>
        variable.id === id ? { ...variable, name: value } : variable,
      ),
    )
  }

  function handleChangeValue({
    environmentId,
    variableId,
    value,
  }: {
    environmentId: string
    variableId: string
    value: string
  }) {
    setValues((prevState) => ({
      ...prevState,
      [`${environmentId}-${variableId}`]: value,
    }))
  }

  return (
    <>
      <div className="flex flex-1 flex-col">
        <header className="flex h-[52px] items-center justify-between p-4">
          <p className="text-lg font-semibold">Environments</p>
        </header>

        <div>
          <table className="m-4">
            <thead>
              <tr>
                <td className="w-60" />

                {environments.map((environment) => (
                  <td className="w-60" key={environment.id}>
                    <div className="flex gap-[2px]">
                      <Input
                        value={environment.name}
                        onChange={(event) =>
                          handleChangeEnvironment({
                            id: environment.id,
                            value: event.target.value,
                          })
                        }
                      />

                      <Button
                        type="button"
                        variant="destructive"
                        onClick={() => handleDeleteEnvironment(environment.id)}
                      >
                        X
                      </Button>
                    </div>
                  </td>
                ))}

                <td>
                  <Button
                    type="button"
                    size="icon"
                    onClick={handleAddEnvironment}
                  >
                    <Plus className="size-3" />
                  </Button>
                </td>
              </tr>
            </thead>

            <tbody>
              {variables.map((variable) => (
                <tr key={variable.id}>
                  <td>
                    <div className="flex gap-[2px]">
                      <Input
                        value={variable.name}
                        onChange={(event) =>
                          handleChangeVariable({
                            id: variable.id,
                            value: event.target.value,
                          })
                        }
                      />

                      <Button
                        type="button"
                        variant="destructive"
                        onClick={() => handleDeleteVariable(variable.id)}
                      >
                        X
                      </Button>
                    </div>
                  </td>

                  {environments.map((environment) => (
                    <td key={environment.id}>
                      <Input
                        value={values[`${environment.id}-${variable.id}`]}
                        onChange={(event) =>
                          handleChangeValue({
                            environmentId: environment.id,
                            variableId: variable.id,
                            value: event.target.value,
                          })
                        }
                      />
                    </td>
                  ))}
                </tr>
              ))}

              <tr>
                <td>
                  <Button type="button" size="icon" onClick={handleAddVariable}>
                    <Plus className="size-3" />
                  </Button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
