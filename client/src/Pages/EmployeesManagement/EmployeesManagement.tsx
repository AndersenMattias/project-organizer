import React, { useState } from 'react'
import { useEmployees } from '../../context/EmployeesContext'
import { IconTrash, IconEdit } from '@tabler/icons-react'

type Employee = {
  employee_id: number
  name: string
  email: string
  phone_number: string
  position: string
  image_url: string
}

type EmployeesManagementProps = {}

const EmployeesManagement: React.FC<EmployeesManagementProps> = () => {
  const { employees } = useEmployees()

  const [newEmployee, setNewEmployee] = useState<Employee>({
    employee_id: 0,
    name: '',
    email: '',
    phone_number: '',
    position: '',
    image_url: '',
  })

  const [searchTerm, setSearchTerm] = useState<string>('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewEmployee((prevEmployee) => ({
      ...prevEmployee,
      [name]: value,
    }))
  }

  const editEmployee = (employeeId: number) => {
    // Implement edit functionality
    console.log('Editing employee with ID:', employeeId)
  }

  const deleteEmployee = (employeeId: number) => {
    // Implement delete functionality
    console.log('Deleting employee with ID:', employeeId)
  }

  const filteredEmployees = employees.filter((employee) =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <>
      <div className='mb-4'>
        <input
          type='text'
          placeholder='Search employees'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className='p-2 border border-gray-300 rounded-md'
        />
      </div>
      <table className='min-w-full bg-white'>
        <thead className='bg-lightGrey'>
          <tr>
            <th className='text-left p-2'>Name</th>
            <th className='text-left p-2'>Email</th>
            <th className='text-left p-2'>Phone Number</th>
            <th className='text-left p-2'>Position</th>
            <th className='text-left p-2'></th>
          </tr>
        </thead>
        <tbody className='mx-4'>
          {filteredEmployees.map((employee, index) => (
            <tr
              key={employee.employee_id}
              className={`group ${
                index === filteredEmployees.length - 1 ? '' : 'border-b'
              }`}
            >
              <td className='p-2'>{employee.name}</td>
              <td className='p-2'>{employee.email}</td>
              <td className='p-2'>{employee.phone_number}</td>
              <td className='p-2'>{employee.position}</td>
              <td className='p-2 relative'>
                <div className='flex opacity-0 group-hover:opacity-100 transition-opacity'>
                  <button className='flex items-center gap-2 p-2 text-gray-500 hover:text-gray-700'>
                    <IconEdit size={18} />
                    <span>Edit employee</span>
                  </button>
                  <button className='flex items-center gap-2 p-2 text-red-500 hover:text-red-700'>
                    <IconTrash size={18} />
                    <span>Delete employee</span>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className='mt-4'>
        <h2 className='text-2xl font-bold mb-2'>Add Employee</h2>
        <div className='flex'>
          <input
            type='text'
            name='name'
            placeholder='Name'
            value={newEmployee.name}
            onChange={handleInputChange}
            className='mr-2 p-2 border border-gray-300 rounded-md'
          />
          <input
            type='text'
            name='email'
            placeholder='Email'
            value={newEmployee.email}
            onChange={handleInputChange}
            className='mr-2 p-2 border border-gray-300 rounded-md'
          />
          <input
            type='text'
            name='phone_number'
            placeholder='Phone Number'
            value={newEmployee.phone_number}
            onChange={handleInputChange}
            className='mr-2 p-2 border border-gray-300 rounded-md'
          />
          <input
            type='text'
            name='position'
            placeholder='Position'
            value={newEmployee.position}
            onChange={handleInputChange}
            className='mr-2 p-2 border border-gray-300 rounded-md'
          />
          <input
            type='text'
            name='image_url'
            placeholder='Image URL'
            value={newEmployee.image_url}
            onChange={handleInputChange}
            className='mr-2 p-2 border border-gray-300 rounded-md'
          />
          <button
            type='button'
            className='bg-blue-500 text-white p-2 rounded-md'
          >
            Add
          </button>
        </div>
      </div>
    </>
  )
}

export default EmployeesManagement
