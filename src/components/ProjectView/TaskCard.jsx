// LOBES: Task card — 3px left border = priority, area badge, due date, flat card, done checkbox

import { format, parseISO } from 'date-fns'
import { Check } from 'lucide-react'
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

export function TaskCard({ task, onClick, onStatusToggle }) {
  const area = AREAS.find((a) => a.id === task.area)
  const borderColor = PRIORITY_BORDER[task.priority] || PRIORITY_BORDER.medium
  const isDone = task.status === 'done'

  const handleCheckboxClick = (e) => {
    e.stopPropagation()
    onStatusToggle?.(task)
  }

  return (
    <article
      role="button"
      tabIndex={0}
      onClick={() => onClick?.(task)}
      onKeyDown={(e) => e.key === 'Enter' && onClick?.(task)}
      className={cn(
        'rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-3',
        'border-l-[3px] transition-colors hover:bg-[var(--bg-hover)]',
        isDone && 'opacity-75'
      )}
      style={{ borderLeftColor: borderColor }}
    >
      <div className="mb-1 flex items-center justify-between gap-2">
        <div className="flex min-w-0 flex-1 items-center gap-2">
          <button
            type="button"
            onClick={handleCheckboxClick}
            onKeyDown={(e) => { e.key === 'Enter' && e.stopPropagation(); e.key === ' ' && (e.preventDefault(), handleCheckboxClick(e)) }}
            className={cn(
              'flex h-5 w-5 shrink-0 items-center justify-center rounded border transition-colors',
              isDone
                ? 'border-[var(--accent)] bg-[var(--accent)] text-white'
                : 'border-[var(--border-default)] bg-[var(--bg-base)] text-transparent hover:border-[var(--accent)]'
            )}
            aria-label={isDone ? 'Mark not done' : 'Mark done'}
            aria-pressed={isDone}
          >
            {isDone && <Check className="h-3 w-3" strokeWidth={2.5} />}
          </button>
          <AreaBadge areaId={task.area} label={area?.label || task.area} />
        </div>
        {task.dueDate && (
          <span className="font-mono text-[11px] text-[var(--text-muted)]">
            {format(parseISO(task.dueDate), 'MMM d')}
          </span>
        )}
      </div>
      <h3 className={cn(
        'mb-1.5 font-medium text-[var(--text-primary)]',
        isDone && 'line-through text-[var(--text-muted)]'
      )}>
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
