import dotenv from 'dotenv'
import express, { Express, Request, Response } from 'express'
import cors from 'cors'
import { employeesRouter, projectsRouter, tasksRouter } from './routes'

dotenv.config()

const app: Express = express()

app.use(express.json())
app.use(cors())

app.use('/api', projectsRouter)
app.use('/api', tasksRouter)
app.use('/api', employeesRouter)

app.get('/', async (req: Request, res: Response) => {
  res.json({ message: 'Hello from server side!' })
})

const port = process.env.PORT || 8000

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})
