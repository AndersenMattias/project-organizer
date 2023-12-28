import express from 'express'
import pool from '../db/db'

const employeesRouter = express.Router()

// GET employees
employeesRouter.get('/employees', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM employees')
    const employees = result.rows
    res.json(employees)
  } catch (e) {
    console.error(e)
    res.status(500).json({ message: 'Internal Server Error' })
  }
})

// GET one employee
employeesRouter.get('/employees/:id', async (req, res) => {
  try {
    const { id } = req.params
    const result = await pool.query(
      'SELECT * FROM employees WHERE employee_id = $1',
      [id]
    )
    const employee = result.rows[0]
    res.json(employee)
  } catch (e) {
    console.error(e)
    res.status(500).json({ message: 'Internal Server Error' })
  }
})

// CREATE one employee
employeesRouter.post('/employees', async (req, res) => {
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
      'INSERT INTO employees (name, description, start_date, end_date, project_manager_id, status, image_url, client_name, client_email, client_phone) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *',
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
    const employee = result.rows[0]
    res.json(employee)
  } catch (e) {
    console.error(e)
    res.status(500).json({ message: 'Internal Server Error' })
  }
})

// UPDATE one employee
employeesRouter.put('/employees/:id', async (req, res) => {
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

    // Dynamically set the fields specified in the setClause
    // Update only those fields for the employee with the given updates
    const result = await pool.query(
      `UPDATE employees SET ${setClause} WHERE employee_id = $${
        Object.keys(updatedFields).length + 1
      } RETURNING *`,
      [...Object.values(updatedFields), id]
    )

    const updatedEmployee = result.rows[0]
    res.json(updatedEmployee)
  } catch (e) {
    console.error(e)
    res.status(500).json({ message: 'Internal Server Error' })
  }
})

// DELETE Employee
employeesRouter.delete('/employees/:id', async (req, res) => {
  try {
    const { id } = req.params
    const result = await pool.query(
      'DELETE FROM employees WHERE employee_id = $1 RETURNING *',
      [id]
    )
    const deletedEmployee = result.rows[0]
    if (!deletedEmployee) {
      throw new Error('Employee not found!')
    }
    res.json(deletedEmployee)
  } catch (e) {
    console.error(e)
    res.status(500).json({ message: 'Internal Server Error' })
  }
})

export { employeesRouter }
