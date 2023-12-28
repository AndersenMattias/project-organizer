import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header className='border-b-gray-400 border-2'>
      <div className='flex justify-between max-w-screen-2xl mx-auto py-8 px-8'>
        <div className='flex gap-2 items-center'>
          <h1 className='text-2xl font-bold'>
            <Link to='/'> Projects</Link>
          </h1>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='icon icon-tabler icon-tabler-clipboard-list'
            width='24'
            height='24'
            viewBox='0 0 24 24'
            strokeWidth='2'
            stroke='currentColor'
            fill='none'
            strokeLinecap='round'
            strokeLinejoin='round'
          >
            <path stroke='none' d='M0 0h24v24H0z' fill='none' />
            <path d='M9 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2h-2' />
            <path d='M9 3m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v0a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z' />
            <path d='M9 12l.01 0' />
            <path d='M13 12l2 0' />
            <path d='M9 16l.01 0' />
            <path d='M13 16l2 0' />
          </svg>
        </div>

        <div>
          <input
            className='border border-gray-700'
            type='text'
            placeholder='Search projects'
          />
        </div>
      </div>
    </header>
  )
}

export default Header
