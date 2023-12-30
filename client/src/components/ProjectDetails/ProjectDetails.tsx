import { useParams } from 'react-router-dom'
import { useProjects } from '../../context/ProjectsContext'
import { useEffect, useState } from 'react'
import { TaskType } from '../../types/tasks'
import { formatDate } from '../../utils'
import TaskModal from '../TaskModal'

import { IconTrash, IconEdit } from '@tabler/icons-react'

const ProjectDetails = () => {
  const { projectId } = useParams()
  const { projects } = useProjects()
  const [tasks, setTasks] = useState<TaskType[]>([])
  const [isModalOpen, setModalOpen] = useState(false)

  const openModal = () => setModalOpen(true)
  const closeModal = () => setModalOpen(false)

  // Find the project with the matching id
  const selectedProject = projects.find(
    (project) => project.project_id === Number(projectId)
  )

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/tasks/${projectId}`
        )
        const data = await response.json()
        setTasks(data)
      } catch (error) {
        console.error('Error fetching tasks:', error)
      }
    }

    fetchTasks()
  }, [projectId])

  if (!selectedProject) {
    return <div>Project not found</div>
  }

  async function onDeleteTask(taskId: number) {
    try {
      const response = await fetch(
        `http://localhost:3000/api/tasks/${taskId}`,
        {
          method: 'DELETE',
        }
      )
      if (response.ok) {
        const task = await response.json()
        console.log('Task deleted:', task)
      } else {
        console.error('Failed to delete task')
      }
    } catch (e) {
      if (e instanceof Error) {
        console.error(e.message)
      }
    }
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

        {tasks.length === 0 ? (
          <p>No tasks available for this project.</p>
        ) : (
          <ul className='divide-y divide-gray-200'>
            {tasks.map((task) => (
              <li key={task.task_id} className='py-4 relative group'>
                <div className='flex'>
                  <h3 className='text-xl font-bold'>{task.name}</h3>
                  <div className='opacity-0 group-hover:opacity-100 transition-opacity'>
                    <button className='p-2 text-gray-500 hover:text-gray-700'>
                      <IconEdit size={18} />
                    </button>
                    <button className='p-2 text-red-500 hover:text-red-700'>
                      <IconTrash
                        size={18}
                        onClick={() => onDeleteTask(task.task_id)}
                      />
                    </button>
                  </div>
                </div>
                <div className='flex items-center'>
                  <div>
                    <p>{task.task_description}</p>
                    <p className='text-gray-500'>
                      Employee: {task.employee_name}
                    </p>
                  </div>
                  <div className='flex items-center ml-auto'>
                    <p className='mr-4'>
                      Due Date: {formatDate(task.due_date)}
                    </p>
                    <span
                      className={`px-2 py-1 text-sm font-semibold ${
                        task.task_status === 'Not started'
                          ? 'text-red-500'
                          : task.task_status === 'In progress'
                          ? 'text-yellow-500'
                          : 'text-green-500'
                      }`}
                    >
                      {task.task_status}
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
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
