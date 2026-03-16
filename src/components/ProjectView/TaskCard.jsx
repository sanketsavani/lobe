// LOBES: Task card — 3px left border = priority, area badge, due date, flat card

import { format, parseISO } from 'date-fns'
import { AreaBadge } from '../shared/AreaBadge'
import { PriorityBadge } from '../shared/PriorityBadge'
import { AREAS } from '../../data/areas'
import { cn } from '../../utils/cn'

const PRIORITY_BORDER = {
  urgent: 'var(--priority-urgent)',
  high: 'var(--priority-high)',
  medium: 'var(--priority-medium)',
  low: 'var(--priority-low)',
}

export function TaskCard({ task, onClick }) {
  const area = AREAS.find((a) => a.id === task.area)
  const borderColor = PRIORITY_BORDER[task.priority] || PRIORITY_BORDER.medium

  return (
    <article
      role="button"
      tabIndex={0}
      onClick={() => onClick?.(task)}
      onKeyDown={(e) => e.key === 'Enter' && onClick?.(task)}
      className={cn(
        'rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-3',
        'border-l-[3px] transition-colors hover:bg-[var(--bg-hover)]'
      )}
      style={{ borderLeftColor: borderColor }}
    >
      <div className="mb-1 flex items-center justify-between gap-2">
        <AreaBadge areaId={task.area} label={area?.label || task.area} />
        {task.dueDate && (
          <span className="font-mono text-[11px] text-[var(--text-muted)]">
            {format(parseISO(task.dueDate), 'MMM d')}
          </span>
        )}
      </div>
      <h3 className="mb-1.5 font-medium text-[var(--text-primary)]">
        {task.title}
      </h3>
      <div className="flex items-center gap-2">
        <PriorityBadge priority={task.priority} className="text-[11px]" />
        {task.subtasks?.length > 0 && (
          <span className="font-mono text-[11px] text-[var(--text-muted)]">
            {task.subtasks.filter((s) => s.done).length}/{task.subtasks.length}
          </span>
        )}
      </div>
    </article>
  )
}

export default TaskCard
