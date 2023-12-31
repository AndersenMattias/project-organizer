import { useParams } from 'react-router-dom'
import { useProjects } from '../../context/ProjectsContext'
import { useState } from 'react'
import TaskModal from '../../components/TaskModal'

import Tasks from '../../components/Tasks'

const ProjectDetails = () => {
  const { projectId } = useParams()
  const { projects } = useProjects()
  const [isModalOpen, setModalOpen] = useState(false)

  const openModal = () => setModalOpen(true)
  const closeModal = () => setModalOpen(false)

  // Find the project with the matching id
  const selectedProject = projects.find(
    (project) => project.project_id === Number(projectId)
  )

  if (!selectedProject) {
    return <div>Project not found</div>
  }

  return (
    <section className='container mx-auto mt-8'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
        <div>
          <img
            src={selectedProject.image_url || 'https://placehold.co/600x400'}
            alt={selectedProject.name}
            className='object-cover rounded-md w-full h-64 md:h-auto'
          />
        </div>
        <div>
          <h2 className='text-2xl font-bold'>{selectedProject.name}</h2>
          <p className='text-gray-500'>{selectedProject.description}</p>
          <div className='mt-4'>
            <h3 className='text-lg font-semibold'>Client Information</h3>
            <p>Email: {selectedProject.client_email}</p>
            <p>Name: {selectedProject.client_name}</p>
            <p>Phone: {selectedProject.client_phone}</p>
          </div>
        </div>
      </div>

      <div className='mt-8'>
        <div className='flex justify-between items-center mb-4'>
          <h2 className='text-2xl font-bold'>Project Tasks</h2>
          <button
            type='button'
            onClick={openModal}
            className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600'
          >
            Add Task
          </button>
        </div>

        <Tasks projectId={selectedProject.project_id} />
      </div>
      <TaskModal
        isOpen={isModalOpen}
        onClose={closeModal}
        selectedProject={selectedProject}
      />
    </section>
  )
}

export default ProjectDetails
