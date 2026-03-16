// LOBES: Task helpers — filtering, sorting, due today, etc.

import { isToday, isWithinInterval, parseISO } from 'date-fns'

export const getTasksByArea = (tasks, areaId) =>
  tasks.filter((t) => t.area === areaId)

export const getTasksDueToday = (tasks) =>
  tasks.filter((t) => t.dueDate && isToday(parseISO(t.dueDate)))

export const getTasksDueIn48h = (tasks) => {
  const now = new Date()
  const in48 = new Date(now.getTime() + 48 * 60 * 60 * 1000)
  return tasks.filter(
    (t) =>
      t.dueDate &&
      isWithinInterval(parseISO(t.dueDate), { start: now, end: in48 })
  )
}

export const getUrgentTasks = (tasks) =>
  tasks.filter((t) => t.priority === 'urgent' && t.status !== 'done')

export const getTasksByStatus = (tasks, status) =>
  tasks.filter((t) => t.status === status)
