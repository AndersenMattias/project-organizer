import { IconTrash, IconEdit } from '@tabler/icons-react'
import { formatDate } from '../../utils'
import { useState } from 'react'

type TaskProps = {
  task_id: number
  name: string
  task_description: string
  due_date: string
  task_status: string
  priority: string
  employee_name: string
  closeDeleteModal: () => void
  setDeleteTaskId: (taskId: number) => void
}

const Task = ({
  task_id,
  name,
  task_description,
  due_date,
  task_status,
  priority,
  employee_name,
  closeDeleteModal,
  setDeleteTaskId,
}: TaskProps) => {
  const [isEditMode, setIsEditMode] = useState(false)
  const [editedTask, setEditedTask] = useState({
    name,
    description: task_description,
    due_date,
    employee_name,
    priority: '',
    status: '',
  })

  const onHandleConfirm = (taskId: number) => {
    setDeleteTaskId(taskId)
    closeDeleteModal()
  }

  const onHandleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target
    setEditedTask((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <li key={task_id} className='py-4 relative group'>
      <div className='flex'>
        {isEditMode ? (
          <input
            type='text'
            id='name'
            name='name'
            value={editedTask.name}
            onChange={onHandleChange}
            className='text-xl font-bold mt-1 p-2 border border-gray-300 rounded-md w-full'
          />
        ) : (
          <h3 className='text-xl font-bold'>{name}</h3>
        )}
        <div className='opacity-0 group-hover:opacity-100 transition-opacity'>
          <button
            className='p-2 text-gray-500 hover:text-gray-700'
            onClick={() => setIsEditMode(!isEditMode)}
          >
            <IconEdit size={18} />
          </button>
          <button
            className='p-2 text-red-500 hover:text-red-700'
            onClick={() => onHandleConfirm(task_id)}
          >
            <IconTrash size={18} />
          </button>
        </div>
      </div>
      <div className='flex items-center'>
        <div>
          {isEditMode ? (
            <textarea
              id='task_description'
              name='description'
              value={editedTask.description}
              onChange={onHandleChange}
              className='mt-1 p-2 border border-gray-300 rounded-md w-full'
            />
          ) : (
            <p>{task_description}</p>
          )}
          {isEditMode ? (
            <input
              type='text'
              id='employee_name'
              name='employee_name'
              value={editedTask.employee_name}
              onChange={onHandleChange}
              className='text-gray-500 mt-1 p-2 border border-gray-300 rounded-md w-full'
            />
          ) : (
            <p className='text-gray-500'>Employee: {employee_name}</p>
          )}
        </div>
        <div className='flex items-center ml-auto'>
          {isEditMode ? (
            <input
              type='date'
              id='due_date'
              name='due_date'
              value={editedTask.due_date}
              onChange={onHandleChange}
              className='mr-4 mt-1 p-2 border border-gray-300 rounded-md w-full'
            />
          ) : (
            <>
              <div className='flex items-center ml-auto'>
                <p className='mr-4'>Due Date: {formatDate(due_date)}</p>
                <span
                  className={`px-2 py-1 text-sm font-semibold ${
                    task_status === 'Not started'
                      ? 'text-red-500'
                      : task_status === 'In progress'
                      ? 'text-yellow-500'
                      : 'text-green-500'
                  }`}
                >
                  {task_status}
                </span>
              </div>
              <span
                className={`px-2 py-1 text-sm font-semibold ${
                  priority === 'Low'
                    ? 'text-blue-500'
                    : priority === 'Medium'
                    ? 'text-yellow-500'
                    : priority === 'High'
                    ? 'text-red-500'
                    : ''
                }`}
              >
                {priority}
              </span>
            </>
          )}
        </div>
      </div>
    </li>
  )
}

export default Task
