import { useEffect, useState } from 'react'
import { TaskType } from '../../types/tasks'
import ConfirmDeleteModal from '../ConfirmDeleteModal'
import Task from '../Task'

type TasksProps = {
  projectId: number
}

const Tasks = ({ projectId }: TasksProps) => {
  const [tasks, setTasks] = useState<TaskType[]>([])
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false)
  const [deleteTaskId, setDeleteTaskId] = useState<number | null>(null)

  const closeDeleteModal = () => setDeleteModalOpen(false)

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
  }, [projectId, tasks])

  return (
    <>
      {tasks.length === 0 ? (
        <p>No tasks available for this project.</p>
      ) : (
        <ul className='divide-y divide-gray-200'>
          {tasks.map((task) => (
            <Task
              key={task.task_id}
              {...task}
              closeDeleteModal={closeDeleteModal}
              setDeleteTaskId={setDeleteTaskId}
            />
          ))}
        </ul>
      )}
      {deleteTaskId && isDeleteModalOpen && (
        <ConfirmDeleteModal
          isOpen={isDeleteModalOpen}
          closeDeleteModal={closeDeleteModal}
          taskId={deleteTaskId}
        />
      )}
    </>
  )
}

export default Tasks
