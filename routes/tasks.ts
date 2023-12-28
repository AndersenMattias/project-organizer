import express from 'express'
import pool from '../db/db'

const tasksRouter = express.Router()

// GET tasks for a specific project
tasksRouter.get('/tasks/:projectId', async (req, res) => {
  try {
    const { projectId } = req.params

    // Perform a database query to retrieve tasks and associated employee information for the specified project
    const result = await pool.query(
      `SELECT
        tasks.task_id,
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

    // Extract tasks and employee information from the query result
    const tasks = result.rows

    res.json(tasks)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
})

export { tasksRouter }
