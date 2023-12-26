import express from 'express'
import pool from '../db/db'

const projectsRouter = express.Router()

// GET projects
projectsRouter.get('/projects', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM projects')
    const projects = result.rows
    res.json(projects)
  } catch (e) {
    console.error(e)
    res.status(500).json({ message: 'Internal Server Error' })
  }
})

// GET one project
projectsRouter.get('/projects/:id', async (req, res) => {
  try {
    const { id } = req.params
    const result = await pool.query(
      'SELECT * FROM projects WHERE project_id = $1',
      [id]
    )
    const project = result.rows[0]
    res.json(project)
  } catch (e) {
    console.error(e)
    res.status(500).json({ message: 'Internal Server Error' })
  }
})

// CREATE one project
projectsRouter.post('/projects', async (req, res) => {
  try {
    const {
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
    } = req.body
    const result = await pool.query(
      'INSERT INTO projects (name, description, start_date, end_date, project_manager_id, status, image_url, client_name, client_email, client_phone) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *',
      [
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
      ]
    )
    const project = result.rows[0]
    res.json(project)
  } catch (e) {
    console.error(e)
    res.status(500).json({ message: 'Internal Server Error' })
  }
})

// UPDATE one project
projectsRouter.put('/projects/:id', async (req, res) => {
  try {
    const { id } = req.params
    const updatedFields = req.body

    // If no fields to update were sent, send an error message
    if (Object.keys(updatedFields).length === 0) {
      return res.status(400).json({ message: 'No fields provided for update.' })
    }

    // Transform each key-value pair into a string in the form of "key = $index" for use in the SQL SET clause
    // This creates a string like "name = $1, description = $2"
    const setClause = Object.entries(updatedFields)
      .map(([key, value], index) => `${key} = $${index + 1}`)
      .join(', ')

    // Dynamically sets the fields specified in the setClause
    // Updates only those fields for the project with the given updates
    const result = await pool.query(
      `UPDATE projects SET ${setClause} WHERE project_id = $${
        Object.keys(updatedFields).length + 1
      } RETURNING *`,
      [...Object.values(updatedFields), id]
    )

    const updatedProject = result.rows[0]
    res.json(updatedProject)
  } catch (e) {
    console.error(e)
    res.status(500).json({ message: 'Internal Server Error' })
  }
})

// DELETE one project
projectsRouter.delete('/projects/:id', async (req, res) => {
  try {
    const { id } = req.params
    const result = await pool.query(
      'DELETE FROM projects WHERE project_id = $1 RETURNING *',
      [id]
    )
    const deletedProject = result.rows[0]
    if (!deletedProject) {
      throw new Error('Project not found!')
    }
    res.json(deletedProject)
  } catch (e) {
    console.error(e)
    res.status(500).json({ message: 'Internal Server Error' })
  }
})

export { projectsRouter }
