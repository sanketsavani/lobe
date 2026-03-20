// LOBES: TaskForm — title, area, status, priority, due date, notes, importance

import { useState } from 'react'
import { BASE_AREAS, DEFAULT_ENABLED_AREA_IDS } from '../../data/areas'
import { useSettingsStore } from '../../store/useSettingsStore'
import { cn } from '../../utils/cn'

const STATUSES = [
  { id: 'backlog', label: 'Backlog' },
  { id: 'todo', label: 'To Do' },
  { id: 'inprogress', label: 'In Progress' },
  { id: 'done', label: 'Done' },
]

const PRIORITIES = [
  { id: 'urgent', label: 'Urgent' },
  { id: 'high', label: 'High' },
  { id: 'medium', label: 'Medium' },
  { id: 'low', label: 'Low' },
]

const IMPORTANCE = [
  { id: 'important', label: 'Important' },
  { id: 'not_important', label: 'Not important' },
]

const defaultTask = {
  title: '',
  area: DEFAULT_ENABLED_AREA_IDS[0],
  status: 'todo',
  priority: 'medium',
  importance: 'important',
  dueDate: '',
  notes: '',
}

export function TaskForm({ task = null, onSubmit, onCancel, compact = false }) {
  const enabledAreas = useSettingsStore((s) => s.enabledAreas)
  const customAreas = useSettingsStore((s) => s.customAreas)
  const allAreas = [...BASE_AREAS, ...customAreas].filter((a) => enabledAreas.includes(a.id))
  const [form, setForm] = useState(() => {
    if (task) {
      return {
        title: task.title,
        area: task.area,
        status: task.status,
        priority: task.priority,
        importance: task.importance || 'important',
        dueDate: task.dueDate ? task.dueDate.slice(0, 10) : '',
        notes: task.notes || '',
      }
    }
    return { ...defaultTask }
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    const payload = {
      ...form,
      dueDate: form.dueDate ? new Date(form.dueDate).toISOString() : null,
    }
    onSubmit(payload)
  }

  const inputClass =
    'w-full rounded-md border border-[var(--border-default)] bg-[var(--bg-base)] px-3 py-2 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[var(--accent)] focus:outline-none'

  if (compact) {
    return (
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          value={form.title}
          onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
          placeholder="Task title..."
          className={inputClass}
          autoFocus
          required
        />
        <div className="grid grid-cols-2 gap-2">
          <select
            value={form.area}
            onChange={(e) => setForm((f) => ({ ...f, area: e.target.value }))}
            className={cn(inputClass, 'cursor-pointer')}
          >
            {allAreas.map((a) => (
              <option key={a.id} value={a.id}>
                {a.label}
              </option>
            ))}
          </select>
          <select
            value={form.priority}
            onChange={(e) => setForm((f) => ({ ...f, priority: e.target.value }))}
            className={cn(inputClass, 'cursor-pointer')}
          >
            {PRIORITIES.map((p) => (
              <option key={p.id} value={p.id}>
                {p.label}
              </option>
            ))}
          </select>
        </div>
        <input
          type="date"
          value={form.dueDate}
          onChange={(e) => setForm((f) => ({ ...f, dueDate: e.target.value }))}
          className={inputClass}
        />
        <div className="flex gap-2">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 rounded-md border border-[var(--border-default)] px-3 py-2 text-sm text-[var(--text-secondary)] hover:bg-[var(--bg-hover)]"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex-1 rounded-md bg-[var(--accent)] px-3 py-2 text-sm font-medium text-white hover:bg-[var(--accent-hover)]"
          >
            {task ? 'Save' : 'Add task'}
          </button>
        </div>
      </form>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="mb-1 block text-xs font-medium text-[var(--text-secondary)]">
          Title
        </label>
        <input
          type="text"
          value={form.title}
          onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
          placeholder="What needs to be done?"
          className={inputClass}
          required
        />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="mb-1 block text-xs font-medium text-[var(--text-secondary)]">
            Area
          </label>
          <select
            value={form.area}
            onChange={(e) => setForm((f) => ({ ...f, area: e.target.value }))}
            className={cn(inputClass, 'cursor-pointer')}
          >
            {allAreas.map((a) => (
              <option key={a.id} value={a.id}>
                {a.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-[var(--text-secondary)]">
            Status
          </label>
          <select
            value={form.status}
            onChange={(e) => setForm((f) => ({ ...f, status: e.target.value }))}
            className={cn(inputClass, 'cursor-pointer')}
          >
            {STATUSES.map((s) => (
              <option key={s.id} value={s.id}>
                {s.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="mb-1 block text-xs font-medium text-[var(--text-secondary)]">
            Priority
          </label>
          <select
            value={form.priority}
            onChange={(e) => setForm((f) => ({ ...f, priority: e.target.value }))}
            className={cn(inputClass, 'cursor-pointer')}
          >
            {PRIORITIES.map((p) => (
              <option key={p.id} value={p.id}>
                {p.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-[var(--text-secondary)]">
            Importance (Eisenhower)
          </label>
          <select
            value={form.importance}
            onChange={(e) => setForm((f) => ({ ...f, importance: e.target.value }))}
            className={cn(inputClass, 'cursor-pointer')}
          >
            {IMPORTANCE.map((i) => (
              <option key={i.id} value={i.id}>
                {i.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <label className="mb-1 block text-xs font-medium text-[var(--text-secondary)]">
          Due date
        </label>
        <input
          type="date"
          value={form.dueDate}
          onChange={(e) => setForm((f) => ({ ...f, dueDate: e.target.value }))}
          className={inputClass}
        />
      </div>
      <div>
        <label className="mb-1 block text-xs font-medium text-[var(--text-secondary)]">
          Notes
        </label>
        <textarea
          value={form.notes}
          onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
          placeholder="Optional notes..."
          rows={3}
          className={cn(inputClass, 'resize-none')}
        />
      </div>
      <div className="flex gap-2 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 rounded-md border border-[var(--border-default)] px-3 py-2 text-sm text-[var(--text-secondary)] hover:bg-[var(--bg-hover)]"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="flex-1 rounded-md bg-[var(--accent)] px-3 py-2 text-sm font-medium text-white hover:bg-[var(--accent-hover)]"
        >
          {task ? 'Save' : 'Add task'}
        </button>
      </div>
    </form>
  )
}

export default TaskForm
