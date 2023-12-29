import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'

import App from './App.tsx'
import './index.css'
import { ProjectsProvider } from './context/ProjectsContext.tsx'
import { EmployeeProvider } from './context/EmployeesContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Router>
    <ProjectsProvider>
      <EmployeeProvider>
        <App />
      </EmployeeProvider>
    </ProjectsProvider>
  </Router>
)
