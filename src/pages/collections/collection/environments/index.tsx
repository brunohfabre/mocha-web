import { useState } from 'react'
import { useParams } from 'react-router-dom'

import { omit } from 'lodash'
import { Trash } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useQueryClient } from '@tanstack/react-query'

import type { CollectionType, EnvironmentType, VariableType } from '../sidebar'
import { CreateEnvironment } from './create-environment'

export function Environments() {
  const { collectionId } = useParams<{
    collectionId: string
    requestId: string
  }>()

  const queryClient = useQueryClient()

  const collection = queryClient.getQueryData<CollectionType>([
    'collections',
    collectionId,
  ])

  const [createEnvironmentVisible, setCreateEnvironmentVisible] =
    useState(false)
  const [environments, setEnvironments] = useState<EnvironmentType[]>(
    collection?.environments?.environments || [],
    //   [
    //   {
    //     id: 'id-1',
    //     name: 'Local',
    //     variables: {
    //       '1c4cf357-b4d5-4feb-94bd-c0e4f4b34b3f': 'localhost',
    //       '36271624-b973-46da-bd56-ffc5ffce8a85': 'token-1',
    //     },
    //   },
    //   {
    //     id: 'id-2',
    //     name: 'Staging',
    //     variables: {
    //       '1c4cf357-b4d5-4feb-94bd-c0e4f4b34b3f': 'staging',
    //       '36271624-b973-46da-bd56-ffc5ffce8a85': 'token-2',
    //     },
    //   },
    //   {
    //     id: 'id-3',
    //     name: 'Production',
    //     variables: {
    //       '1c4cf357-b4d5-4feb-94bd-c0e4f4b34b3f': 'production',
    //       '36271624-b973-46da-bd56-ffc5ffce8a85': 'token-3',
    //     },
    //   },
    // ]
  )
  const [variables, setVariables] = useState<VariableType[]>(
    collection?.environments?.variables || [],
  )

  function handleAddEnvironment({ name }: { name: string }) {
    const newEnvironment = {
      id: crypto.randomUUID(),
      name,
      variables: variables.reduce(
        (acc: Record<string, string>, item: VariableType) => ({
          ...acc,
          [item.id]: '',
        }),
        {},
      ),
    }

    setEnvironments((prevState) => [...prevState, newEnvironment])
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

  function handleChangeVariable({ id, value }: { id: string; value: string }) {
    setVariables((prevState) =>
      prevState.map((variable) =>
        variable.id === id ? { id, name: value } : variable,
      ),
    )
  }

  function handleChangeValue({
    variableId,
    environmentId,
    value,
  }: {
    variableId: string
    environmentId: string
    value: string
  }) {
    setEnvironments((prevState) =>
      prevState.map((environment) =>
        environment.id === environmentId
          ? {
            ...environment,
            variables: {
              ...environment.variables,
              [variableId]: value,
            },
          }
          : environment,
      ),
    )
  }

  function handleDeleteVariable(id: string) {
    setVariables((prevState) =>
      prevState.filter((variable) => variable.id !== id),
    )

    setEnvironments((prevState) =>
      prevState.map((environment) => ({
        ...environment,
        variables: omit(environment.variables, id),
      })),
    )
  }

  return (
    <>
      <CreateEnvironment
        open={createEnvironmentVisible}
        onOpenChange={setCreateEnvironmentVisible}
        onCreate={handleAddEnvironment}
      />

      <div className="flex flex-1 flex-col">
        <header className="flex h-[52px] items-center justify-between p-4">
          <p className="text-lg font-semibold">Environments</p>

          <Button
            type="button"
            onClick={() => setCreateEnvironmentVisible(true)}
          >
            + Environment
          </Button>
        </header>

        {environments.length > 0 && (
          <Tabs defaultValue={environments[0].id} className="flex flex-col">
            <div className="flex justify-between px-4 py-2">
              <TabsList>
                {environments.map((environment) => (
                  <TabsTrigger key={environment.id} value={environment.id}>
                    {environment.name}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            {environments.map((environment) => (
              <TabsContent
                key={environment.id}
                value={environment.id}
                className="mt-0"
                asChild
              >
                <div className="flex flex-col gap-1 p-4">
                  {variables.map((variable) => (
                    <div key={variable.id} className="flex gap-1">
                      <Input
                        placeholder="Variable name"
                        className="w-64"
                        value={variable.name}
                        onChange={(event) =>
                          handleChangeVariable({
                            id: variable.id,
                            value: event.target.value,
                          })
                        }
                      />

                      <div className="flex-1">
                        <Input
                          placeholder="Value"
                          value={environment.variables[variable.id]}
                          onChange={(event) =>
                            handleChangeValue({
                              variableId: variable.id,
                              environmentId: environment.id,
                              value: event.target.value,
                            })
                          }
                        />
                      </div>

                      <Button
                        type="button"
                        size="icon"
                        variant="destructive"
                        onClick={() => handleDeleteVariable(variable.id)}
                      >
                        <Trash className="size-4" />
                      </Button>
                    </div>
                  ))}

                  <div>
                    <Button type="button" onClick={handleAddVariable}>
                      + Variable
                    </Button>
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        )}
      </div>
    </>
  )
}
