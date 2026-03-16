// LOBES: Empty state — Lucide icon + one-liner, never blank

import * as Lucide from 'lucide-react'
import { cn } from '../../utils/cn'

const iconMap = {
  inbox: Lucide.Inbox,
  task: Lucide.CheckSquare,
  search: Lucide.Search,
  calendar: Lucide.Calendar,
  folder: Lucide.FolderOpen,
  default: Lucide.FileQuestion,
}

export function EmptyState({ icon = 'default', message, className }) {
  const Icon = iconMap[icon] || iconMap.default
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center gap-2 py-8 text-center',
        className
      )}
    >
      <Icon className="h-8 w-8 text-[var(--text-muted)]" strokeWidth={1.25} />
      <p className="text-sm text-[var(--text-secondary)]">{message}</p>
    </div>
  )
}

export default EmptyState
