import React, { createContext, useContext, useState, useEffect } from 'react'
import { ProjectType } from '../types/projects'

interface ProjectsContextProps {
  projects: ProjectType[]
}

const ProjectsContext = createContext<ProjectsContextProps | undefined>(
  undefined
)

const ProjectsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [projects, setProjects] = useState<ProjectType[]>([])

  useEffect(() => {
    const fetchProjects = async () => {
      const res = await fetch('http://localhost:3000/api/projects')
      const data = await res.json()
      setProjects(data)
      return data
    }

    fetchProjects()
  }, [])

  return (
    <ProjectsContext.Provider value={{ projects }}>
      {children}
    </ProjectsContext.Provider>
  )
}

// Custom hook to use the projects context
const useProjects = () => {
  const context = useContext(ProjectsContext)
  if (!context) {
    throw new Error('useProjects must be used within a ProjectsProvider')
  }
  return context
}

export { ProjectsProvider, useProjects }
