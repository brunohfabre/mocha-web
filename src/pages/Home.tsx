import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { useProjectStore } from '@/stores/project'

export function Home() {
  const navigate = useNavigate()

  const projectSelected = useProjectStore((state) => state.projectSelected)

  useEffect(() => {
    if (!projectSelected) {
      navigate('/projects')
    }
  }, [projectSelected, navigate])

  return (
    <div>
      <span>home page</span>
    </div>
  )
}
