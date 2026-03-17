// LOBES: Dashboard — area cards, focus strip, on-fire, 8pt grid, dense layout

import { useOutletContext } from 'react-router-dom'
import { useTaskStore } from '../../store/useTaskStore'
import { BASE_AREAS } from '../../data/areas'
import { useSettingsStore } from '../../store/useSettingsStore'
import { getTasksByArea, getTasksDueToday, getUrgentTasks, getDoneCountByArea } from '../../utils/taskUtils'
import { AreaCard } from './AreaCard'
import { EmptyState } from '../shared/EmptyState'

export default function Dashboard() {
  const { openTaskDrawer } = useOutletContext()
  const tasks = useTaskStore((s) => s.tasks)
  const enabledAreas = useSettingsStore((s) => s.enabledAreas)
  const openTasks = tasks.filter((t) => t.status !== 'done')
  const doneTasks = tasks.filter((t) => t.status === 'done')
  const dueToday = getTasksDueToday(openTasks)
  const urgent = getUrgentTasks(openTasks)

  return (
    <div className="mx-auto max-w-6xl space-y-6 p-4 md:p-6 lg:p-8">
      <header className="mb-6">
        <h1 className="text-xl font-semibold text-[var(--text-primary)]">
          Dashboard
        </h1>
        <p className="text-sm text-[var(--text-secondary)]">
          {openTasks.length} open · {doneTasks.length} done — overview across all areas
        </p>
      </header>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[...BASE_AREAS, ...useSettingsStore.getState().customAreas]
          .filter((a) => enabledAreas.includes(a.id))
          .map((area) => {
          const areaTasks = getTasksByArea(openTasks, area.id)
          const dueTodayCount = getTasksDueToday(areaTasks).length
          const urgentCount = getUrgentTasks(areaTasks).length
          const doneCount = getDoneCountByArea(tasks, area.id)
          return (
            <AreaCard
              key={area.id}
              areaId={area.id}
              openCount={areaTasks.length}
              dueTodayCount={dueTodayCount}
              urgentCount={urgentCount}
              doneCount={doneCount}
            />
          )
        })}
      </section>

      <section className="rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-4">
        <h2 className="mb-3 text-sm font-medium text-[var(--text-primary)]">
          Today&apos;s focus
        </h2>
        {dueToday.length > 0 ? (
          <ul className="space-y-2">
            {dueToday.slice(0, 5).map((t) => (
              <li
                key={t.id}
                role="button"
                tabIndex={0}
                onClick={() => openTaskDrawer(t)}
                onKeyDown={(e) => e.key === 'Enter' && openTaskDrawer(t)}
                className="flex cursor-pointer items-center justify-between rounded-md px-3 py-2 text-sm hover:bg-[var(--bg-hover)]"
              >
                <span className="text-[var(--text-primary)]">{t.title}</span>
                <span className="font-mono text-[11px] text-[var(--text-muted)]">
                  {t.area}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <EmptyState
            icon="calendar"
            message="No tasks due today. Add one from Projects or Brain Dump."
          />
        )}
      </section>

      {urgent.length > 0 && (
        <section className="rounded-lg border border-[var(--border-subtle)] border-l-[3px] border-l-[var(--priority-urgent)] bg-[var(--bg-surface)] p-4">
          <h2 className="mb-3 text-sm font-medium text-[var(--text-primary)]">
            On fire right now
          </h2>
          <ul className="space-y-2">
            {urgent.map((t) => (
              <li
                key={t.id}
                role="button"
                tabIndex={0}
                onClick={() => openTaskDrawer(t)}
                onKeyDown={(e) => e.key === 'Enter' && openTaskDrawer(t)}
                className="flex cursor-pointer items-center justify-between rounded-md px-3 py-2 text-sm hover:bg-[var(--bg-hover)]"
              >
                <span className="text-[var(--text-primary)]">{t.title}</span>
                <span className="font-mono text-[11px] text-[var(--text-muted)]">
                  {t.area}
                </span>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  )
}
