import { useEffect, useRef, useState } from 'react'

type taskModalProps = {
  isOpen: boolean
  onClose: () => void
}

const TaskModal = ({ isOpen, onClose }: taskModalProps) => {
  const [taskData, setTaskData] = useState({
    name: '',
    description: '',
    employeeName: '',
    dueDate: '',
    taskStatus: 'Not started',
  })
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function onHandleClickOutside(e: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        // Click occurred outside the modal, close it
        onClose()
      }
    }

    if (isOpen) {
      document.body.style.overflow = 'hidden'
      document.addEventListener('keydown', onHandleKeyPress)
      document.addEventListener('mousedown', onHandleClickOutside)
    } else {
      document.body.style.overflow = 'auto'
      document.removeEventListener('keydown', onHandleKeyPress)
      document.removeEventListener('mousedown', onHandleClickOutside)
    }

    return () => {
      // Cleanup the event listeners when the component unmounts
      document.removeEventListener('mousedown', onHandleClickOutside)
    }
  }, [isOpen])

  function onHandleKeyPress(e: KeyboardEvent) {
    if (e.key === 'Escape') {
      onClose()
    }
  }

  function onHandleInputChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target
    setTaskData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  function onHandleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    console.log(taskData)
  }

  return (
    <div
      className={`${
        isOpen ? 'block' : 'hidden'
      } fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center`}
    >
      <div ref={modalRef} className='bg-white p-6 rounded-md'>
        <h2 className='text-2xl font-bold mb-4'>Add Task</h2>
        <form onSubmit={onHandleSubmit}>
          <div className='mb-4'>
            <label
              htmlFor='name'
              className='block text-sm font-medium text-gray-700'
            >
              Name
            </label>
            <input
              type='text'
              id='name'
              name='name'
              value={taskData.name}
              onChange={onHandleInputChange}
              className='mt-1 p-2 border border-gray-300 rounded-md w-full'
              required
            />
          </div>
          <div className='mb-4'>
            <label
              htmlFor='description'
              className='block text-sm font-medium text-gray-700'
            >
              Task Description
            </label>
            <textarea
              id='description'
              name='description'
              value={taskData.description}
              onChange={onHandleInputChange}
              className='mt-1 p-2 border border-gray-300 rounded-md w-full'
              required
            />
          </div>
          <div className='mb-4'>
            <label
              htmlFor='employeeName'
              className='block text-sm font-medium text-gray-700'
            >
              Employee Name
            </label>
            <input
              type='text'
              id='employeeName'
              value={taskData.employeeName}
              onChange={onHandleInputChange}
              className='mt-1 p-2 border border-gray-300 rounded-md w-full'
              required
            />
          </div>
          <div className='mb-4'>
            <label
              htmlFor='dueDate'
              className='block text-sm font-medium text-gray-700'
            >
              Due Date
            </label>
            <input
              type='text' // You might want to use a date picker here
              id='dueDate'
              value={taskData.dueDate}
              onChange={onHandleInputChange}
              className='mt-1 p-2 border border-gray-300 rounded-md w-full'
              required
            />
          </div>
          <button
            type='submit'
            className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600'
          >
            Add Task
          </button>
        </form>
        <button
          onClick={onClose}
          className='mt-2 text-gray-500 hover:text-gray-700 focus:outline-none'
        >
          Cancel
        </button>
      </div>
    </div>
  )
}

export default TaskModal
