import React, { createContext, useContext, useState, useEffect } from 'react'
import { EmployeeType } from '../types/employees'

interface EpmloyeesContextProps {
  employees: EmployeeType[]
}

const EmployeeContext = createContext<EpmloyeesContextProps | undefined>(
  undefined
)

const EmployeeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [employees, setEmployees] = useState<EmployeeType[]>([])

  useEffect(() => {
    const fetchEmployees = async () => {
      const res = await fetch('http://localhost:3000/api/employees')
      const data = await res.json()
      setEmployees(data)
      return data
    }

    fetchEmployees()
  }, [])

  return (
    <EmployeeContext.Provider value={{ employees }}>
      {children}
    </EmployeeContext.Provider>
  )
}

// Custom hook to use the projects context
const useEmployees = () => {
  const context = useContext(EmployeeContext)
  if (!context) {
    throw new Error('useEmployees must be used within a EmployeeProvider')
  }
  return context
}

export { EmployeeProvider, useEmployees }
