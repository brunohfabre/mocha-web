import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type ProjectType = {
  id: string
  name: string
  organization_id: string
}

interface Store {
  projectSelected: ProjectType | null
  selectProject: (project: ProjectType | null) => void
}

export const useProjectStore = create(
  persist<Store>(
    (set) => ({
      projectSelected: null,
      selectProject: (project: ProjectType | null) =>
        set(() => ({
          projectSelected: project,
        })),
    }),
    {
      name: 'project',
    },
  ),
)
