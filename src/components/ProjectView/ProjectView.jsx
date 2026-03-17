// LOBES: Project view — per-area Kanban/Table, area switcher, All/Open/Done filter

import { useState } from 'react'
import { useParams, NavLink, useOutletContext } from 'react-router-dom'
import { Plus } from 'lucide-react'
import { BASE_AREAS } from '../../data/areas'
import { useSettingsStore } from '../../store/useSettingsStore'
import { useTaskStore } from '../../store/useTaskStore'
import { getTasksByArea } from '../../utils/taskUtils'
import { EmptyState } from '../shared/EmptyState'
import { TaskCard } from './TaskCard'
import { cn } from '../../utils/cn'

const FILTER_OPTIONS = [
  { id: 'all', label: 'All' },
  { id: 'open', label: 'Open' },
  { id: 'done', label: 'Done' },
]

export default function ProjectView() {
  const { openTaskDrawer, onTaskStatusToggle } = useOutletContext()
  const { areaId } = useParams()
  const [taskFilter, setTaskFilter] = useState('all')
  const enabledAreas = useSettingsStore((s) => s.enabledAreas)
  const customAreas = useSettingsStore((s) => s.customAreas)
  const allAreas = [...BASE_AREAS, ...customAreas]
  const visibleAreas = allAreas.filter((a) => enabledAreas.includes(a.id))
  const fallbackAreaId = visibleAreas[0]?.id || allAreas[0]?.id || 'startup1'
  const currentAreaId = areaId || fallbackAreaId
  const tasks = useTaskStore((s) => s.tasks)
  const areaTasksAll = getTasksByArea(tasks, currentAreaId)
  const areaTasks =
    taskFilter === 'done'
      ? areaTasksAll.filter((t) => t.status === 'done')
      : taskFilter === 'open'
        ? areaTasksAll.filter((t) => t.status !== 'done')
        : areaTasksAll

  return (
    <div className="mx-auto max-w-6xl p-4 md:p-6 lg:p-8">
      <header className="mb-6">
        <h1 className="text-xl font-semibold text-[var(--text-primary)]">
          Projects
        </h1>
        <nav className="mt-3 flex gap-1 overflow-x-auto pb-1">
          {visibleAreas.map((a, index) => (
            <NavLink
              key={a.id}
              to={index === 0 ? '/projects' : `/projects/${a.id}`}
              className={({ isActive }) =>
                cn(
                  'rounded-md px-3 py-1.5 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-[var(--bg-elevated)] text-[var(--text-primary)]'
                    : 'text-[var(--text-secondary)] hover:bg-[var(--bg-hover)]'
                )
              }
            >
              {a.label}
            </NavLink>
          ))}
        </nav>
      </header>

      {areaTasksAll.length > 0 ? (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="text-sm text-[var(--text-secondary)]">
                {areaTasks.length} {taskFilter === 'all' ? 'tasks' : taskFilter === 'open' ? 'open' : 'done'}
              </span>
              <div className="flex rounded-md border border-[var(--border-subtle)] p-0.5" role="tablist" aria-label="Task filter">
                {FILTER_OPTIONS.map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    role="tab"
                    aria-selected={taskFilter === opt.id}
                    onClick={() => setTaskFilter(opt.id)}
                    className={cn(
                      'rounded px-2 py-1 text-xs font-medium transition-colors',
                      taskFilter === opt.id
                        ? 'bg-[var(--bg-elevated)] text-[var(--text-primary)]'
                        : 'text-[var(--text-muted)] hover:text-[var(--text-secondary)]'
                    )}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
            <button
              type="button"
              onClick={() => openTaskDrawer()}
              className="flex items-center gap-1.5 rounded-md border border-[var(--border-default)] px-3 py-1.5 text-sm text-[var(--text-secondary)] hover:bg-[var(--bg-hover)]"
            >
              <Plus className="h-4 w-4" />
              Add task
            </button>
          </div>
          <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {areaTasks.map((t) => (
              <li key={t.id}>
                <TaskCard task={t} onClick={openTaskDrawer} onStatusToggle={onTaskStatusToggle} />
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="space-y-4">
          <button
            type="button"
            onClick={() => openTaskDrawer()}
            className="flex items-center gap-1.5 rounded-md bg-[var(--accent)] px-3 py-2 text-sm font-medium text-white hover:bg-[var(--accent-hover)]"
          >
            <Plus className="h-4 w-4" />
            Add task
          </button>
          <EmptyState
            icon="task"
            message="No tasks in this area yet. Add one above or use Quick Add in the top bar."
          />
        </div>
      )}
    </div>
  )
}
