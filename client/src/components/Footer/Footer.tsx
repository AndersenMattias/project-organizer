const Footer = () => {
  return (
    <footer className='bg-orange'>
      <div className='flex gap-8 max-w-screen-2xl mx-auto py-8 px-8'>
        <div className='flex-1'>
          <h2 className='text-white mb-4'>Contact</h2>
          <p className='text-white'>Project Oversight</p>
          <p className='text-white'>
            <strong>Address:</strong> 123 Main Street, Cityville, State, 12345
          </p>
          <p className='text-white'>
            <strong>Email:</strong> support@example.com
          </p>
          <p className='text-white'>
            <strong>Phone:</strong> +47 123 45 678
          </p>
        </div>
        <div className='flex-1'>
          <h2 className='text-white mb-4'>About</h2>
          <p className='text-white'>
            Welcome to Project Oversight App — your solution for streamlined
            project management. Our user-friendly interface simplifies tracking,
            monitoring, and collaboration. Project Oversight empowers project
            managers, team leads, and members with efficient task management and
            seamless communication. Stay organized, meet deadlines, and achieve
            success with our app. Explore our features for a more effective
            project management experience. Join us on the journey to successful
            project completion.
          </p>
        </div>
        <div className='flex-1'>
          <h2 className='text-white mb-4 text-2xl font-bold'>
            Subscribe to Our Newsletter
          </h2>
          <p className='text-gray-300 mb-6'>
            Stay updated with the latest news, project releases, and exclusive
            offers.
          </p>
          <div className='flex'>
            <input
              type='email'
              placeholder='Enter your email'
              className='bg-white text-black p-2 rounded-l-md w-full'
            />
            <button
              type='button'
              className='bg-blue-500 text-white p-2 rounded-r-md hover:bg-blue-600'
            >
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
