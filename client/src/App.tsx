import { Routes, Route } from 'react-router-dom'
import Footer from './components/Footer'
import Header from './components/Header'
import Home from './Pages/Home'
import NotFound from './Pages/NotFound'
import ProjectDetails from './Pages/ProjectDetails'

function App() {
  return (
    <div className='flex flex-col min-h-screen'>
      <Header />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/project/:projectId' element={<ProjectDetails />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
