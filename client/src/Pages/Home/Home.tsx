import { useState } from 'react'
import ProjectsTable from '../../components/ProjectsTable'
import CompaniesManagement from '../CompaniesManagement/CompaniesManagement'
import EmployeesManagement from '../EmployeesManagement/EmployeesManagement'

const Home = () => {
  const [activeTab, setActiveTab] = useState('projects')

  const onHandleTab = (tab: string) => {
    setActiveTab(tab)
  }

  return (
    <div className='flex h-screen'>
      <aside className='border text-black px-8 pt-8'>
        <h2 className='text-2xl font-bold mb-4'>Dashboard</h2>
        <nav>
          <button
            onClick={() => onHandleTab('projects')}
            className={`block p-2 text-lg ${
              activeTab === 'projects' ? 'bg-white text-black' : ''
            }`}
          >
            Projects
          </button>
          <button
            onClick={() => onHandleTab('companies')}
            className={`block p-2 text-lg ${
              activeTab === 'companies' ? 'bg-white text-black' : ''
            }`}
          >
            Companies
          </button>
          <button
            onClick={() => onHandleTab('employees')}
            className={`block p-2 text-lg ${
              activeTab === 'employees' ? 'bg-white text-black' : ''
            }`}
          >
            Employees
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className='flex-grow py-8'>
        <div className='bg-white rounded-md shadow-md overflow-hidden'>
          <div>
            {activeTab === 'projects' && <ProjectsTable />}
            {activeTab === 'companies' && <CompaniesManagement />}
            {activeTab === 'employees' && <EmployeesManagement />}
          </div>
        </div>
      </main>
    </div>
  )
}

export default Home
