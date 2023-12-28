export type TaskType = {
  task_id: number
  name: string
  task_description: string
  due_date: string
  task_status: 'Not started' | 'In progress' | 'Completed' | 'On hold'
  priority: 'Low' | 'Medium' | 'High'
  employee_id: number
  employee_name: string
}
