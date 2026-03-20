// LOBES: Zustand task store with localStorage persist

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const taskSchema = {
  id: '',
  title: '',
  area: 'personal', // personal | startup1 | job | startup2 (+ custom)
  status: 'backlog', // backlog | todo | inprogress | done
  priority: 'medium', // urgent | high | medium | low
  importance: 'important', // important | not_important (Eisenhower)
  dueDate: null,
  createdAt: '',
  notes: '',
  subtasks: [],
  tags: [],
  recurring: {
    enabled: false,
    frequency: 'weekly',
    days: [1, 2, 3, 4, 5],
    lastGenerated: null,
  },
}

export const useTaskStore = create(
  persist(
    (set) => ({
      tasks: [],
      inbox: [], // Brain Dump unprocessed items: { id, text, createdAt }

      setTasks: (tasks) => set({ tasks }),
      setInbox: (inbox) => set({ inbox }),

      addTask: (task) =>
        set((state) => ({
          tasks: [
            ...state.tasks,
            {
              ...taskSchema,
              ...task,
              id: task.id || crypto.randomUUID(),
              createdAt: task.createdAt || new Date().toISOString(),
            },
          ],
        })),

      updateTask: (id, updates) =>
        set((state) => ({
          tasks: state.tasks.map((t) =>
            t.id === id ? { ...t, ...updates } : t
          ),
        })),

      removeTask: (id) =>
        set((state) => ({
          tasks: state.tasks.filter((t) => t.id !== id),
        })),

      addInboxItem: (textOrItem) =>
        set((state) => {
          const item =
            typeof textOrItem === 'string'
              ? { id: crypto.randomUUID(), text: textOrItem, createdAt: new Date().toISOString() }
              : textOrItem
          return { inbox: [...state.inbox, item] }
        }),

      removeInboxItem: (id) =>
        set((state) => ({
          inbox: state.inbox.filter((i) => i.id !== id),
        })),

      processInboxToTask: (inboxId, taskData) =>
        set((state) => {
          const item = state.inbox.find((i) => i.id === inboxId)
          if (!item) return state
          const newTask = {
            ...taskSchema,
            ...taskData,
            id: crypto.randomUUID(),
            title: item.text,
            createdAt: new Date().toISOString(),
          }
          return {
            inbox: state.inbox.filter((i) => i.id !== inboxId),
            tasks: [...state.tasks, newTask],
          }
        }),
    }),
    { name: 'lobes-store', version: 1 }
  )
)
