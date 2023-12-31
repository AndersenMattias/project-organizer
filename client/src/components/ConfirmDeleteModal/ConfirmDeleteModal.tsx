import { useRef } from 'react'
import useModal from '../../hooks/useModal'

type ConfirmDeleteModalProps = {
  isOpen: boolean
  closeDeleteModal: () => void
  taskId: number
}

const ConfirmDeleteModal = ({
  isOpen,
  closeDeleteModal,
  taskId,
}: ConfirmDeleteModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null)
  const {} = useModal({
    isOpen,
    onClose: closeDeleteModal,
    modalRef: modalRef as React.MutableRefObject<HTMLDivElement>,
  })

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
        closeDeleteModal()
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
    isOpen && (
      <div className='fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center'>
        <div ref={modalRef} className='bg-white p-6 rounded-md'>
          <p>Are you sure you want to delete this task?</p>
          <div className='flex justify-end mt-4'>
            <button
              onClick={closeDeleteModal}
              className='mr-2 bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400'
            >
              Cancel
            </button>
            <button
              onClick={() => onDeleteTask(taskId)}
              className='bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600'
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    )
  )
}

export default ConfirmDeleteModal
