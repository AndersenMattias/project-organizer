import express from 'express'
import pool from '../db/db'

const tasksRouter = express.Router()

// GET tasks
tasksRouter.get('/tasks', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM tasks')
    const tasks = result.rows
    res.json(tasks)
  } catch (e) {
    console.error(e)
    res.status(500).json({ message: 'Internal Server Error' })
  }
})

// GET tasks for a specific project
tasksRouter.get('/tasks/:projectId', async (req, res) => {
  try {
    const { projectId } = req.params

    // Perform a database query to retrieve tasks and associated employee information for the specified project
    const result = await pool.query(
      `SELECT
        tasks.task_id,
        tasks.name,
        tasks.description AS task_description,
        tasks.due_date,
        tasks.task_status,
        tasks.priority,
        employees.employee_id,
        employees.name AS employee_name
      FROM tasks
      INNER JOIN employees ON tasks.assignee_id = employees.employee_id
      WHERE tasks.project_id = $1`,
      [projectId]
    )

    const tasks = result.rows

    res.json(tasks)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
})

// CREATE one task
tasksRouter.post('/tasks', async (req, res) => {
  try {
    const {
      name,
      description,
      due_date,
      project_id,
      assignee_id,
      task_status,
      priority,
    } = req.body

    const result = await pool.query(
      'INSERT INTO tasks (name, description, due_date, project_id, assignee_id, task_status, priority) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [
        name,
        description,
        due_date,
        project_id,
        Number(assignee_id),
        task_status,
        priority,
      ]
    )
    const task = result.rows[0]
    res.json(task)
  } catch (e) {
    console.error(e)
    res.status(500).json({ message: 'Internal Server Error' })
  }
})

// DELETE one task
tasksRouter.delete('/tasks/:id', async (req, res) => {
  try {
    const { id } = req.params
    const result = await pool.query(
      'DELETE FROM tasks WHERE task_id = $1 RETURNING *',
      [id]
    )
    const deletedTask = result.rows[0]
    if (!deletedTask) {
      throw new Error('Task not found!')
    }
    res.json(deletedTask)
  } catch (e) {
    console.error(e)
    res.status(500).json({ message: 'Internal Server Error' })
  }
})

export { tasksRouter }
