// LOBES: Project view — per-area Kanban/Table, area switcher

import { useParams, NavLink, useOutletContext } from 'react-router-dom'
import { Plus } from 'lucide-react'
import { AREAS } from '../../data/areas'
import { useTaskStore } from '../../store/useTaskStore'
import { getTasksByArea } from '../../utils/taskUtils'
import { EmptyState } from '../shared/EmptyState'
import { TaskCard } from './TaskCard'
import { cn } from '../../utils/cn'

export default function ProjectView() {
  const { openTaskDrawer } = useOutletContext()
  const { areaId } = useParams()
  const currentAreaId = areaId || AREAS[0].id
  const tasks = useTaskStore((s) => s.tasks)
  const areaTasks = getTasksByArea(tasks, currentAreaId)

  return (
    <div className="mx-auto max-w-6xl p-4 md:p-6 lg:p-8">
      <header className="mb-6">
        <h1 className="text-xl font-semibold text-[var(--text-primary)]">
          Projects
        </h1>
        <nav className="mt-3 flex gap-1 overflow-x-auto pb-1">
          {AREAS.map((a) => (
            <NavLink
              key={a.id}
              to={a.id === AREAS[0].id ? '/projects' : `/projects/${a.id}`}
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

      {areaTasks.length > 0 ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-[var(--text-secondary)]">
              {areaTasks.length} tasks
            </p>
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
                <TaskCard task={t} onClick={openTaskDrawer} />
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
