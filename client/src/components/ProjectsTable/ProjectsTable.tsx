import { useProjects } from '../../context/ProjectsContext'
import Project from '../Project'

const ProjectsTable = () => {
  const { projects } = useProjects()

  return (
    <section className='projects max-w-screen-2xl mx-auto py-8 px-8'>
      <table className='table-auto w-full'>
        <thead>
          <tr className='border-b'>
            <th className='px-4 py-2 text-left'>Project</th>
            <th className='px-4 py-2 text-left'>Status</th>
            <th className='px-4 py-2 text-left'>End date</th>
            {/* Add more headers as needed */}
          </tr>
        </thead>
        <tbody>
          {projects.map((project, index) => (
            <Project
              key={project.project_id}
              {...project}
              isLast={index === projects.length - 1}
            />
          ))}
        </tbody>
      </table>
    </section>
  )
}

export default ProjectsTable
