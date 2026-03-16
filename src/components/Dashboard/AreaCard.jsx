// LOBES: Area card — top border = area accent, open tasks, due today, progress, sparkline

import { AreaBadge } from '../shared/AreaBadge'
import { BASE_AREAS } from '../../data/areas'
import { getTasksByArea, getTasksDueToday, getUrgentTasks } from '../../utils/taskUtils'
import { useTaskStore } from '../../store/useTaskStore'
import { cn } from '../../utils/cn'

export function AreaCard({ areaId, openCount = 0, dueTodayCount = 0, urgentCount = 0 }) {
  const area = BASE_AREAS.find((a) => a.id === areaId) || { id: areaId, label: areaId, colorVar: '--area-startup1' }
  if (!area) return null
  const colorVar = area.colorVar
  return (
    <article
      className={cn(
        'rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-4',
        'border-t-[3px]'
      )}
      style={{ borderTopColor: `var(${colorVar})` }}
    >
      <div className="mb-2 flex items-center justify-between">
        <h3 className="text-base font-semibold text-[var(--text-primary)]">
          {area.label}
        </h3>
        {urgentCount > 0 && (
          <span
            className="font-mono text-[11px] text-[var(--priority-urgent)]"
            aria-label={`${urgentCount} urgent`}
          >
            {urgentCount}
          </span>
        )}
      </div>
      <p className="mb-3 text-xs text-[var(--text-secondary)]">
        {openCount} open · {dueTodayCount} due today
      </p>
      <div
        className="h-1 w-full rounded-full bg-[var(--bg-elevated)]"
        role="progressbar"
        aria-valuenow={openCount}
      >
        <div
          className="h-full rounded-full transition-all duration-300"
          style={{
            width: `${Math.min(100, openCount * 10)}%`,
            backgroundColor: `var(${colorVar})`,
          }}
        />
      </div>
    </article>
  )
}

export default AreaCard
