import React from 'react'
import { ProjectType } from '../../types/projects'
import { Link } from 'react-router-dom'
import { formatDate } from '../../utils'

type ProjectProps = ProjectType & {
  isLast: boolean
}

const Project: React.FC<ProjectProps> = ({
  project_id,
  name,
  description,
  start_date,
  end_date,
  project_manager_id,
  status,
  image_url,
  client_name,
  client_email,
  client_phone,
  created_at,
  updated_at,
  isLast,
}) => {
  return (
    <tr className={isLast ? '' : 'border-b'}>
      <td className='px-4 py-2'>
        <Link to={`/project/${project_id}`}>{name}</Link>
      </td>
      <td className='px-4 py-2'>{status}</td>
      <td className='px-4 py-2'>{formatDate(end_date)}</td>
    </tr>
  )
}

export default Project
