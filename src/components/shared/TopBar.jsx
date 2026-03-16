// LOBES: Top bar — search icon + Quick Add; title on mobile

import { Search, Plus } from 'lucide-react'
import { cn } from '../../utils/cn'

export function TopBar({ title, onSearchClick, onQuickAddClick, className }) {
  return (
    <header
      className={cn(
        'flex h-12 items-center justify-between gap-2 border-b border-[var(--border-subtle)] bg-[var(--bg-base)] px-4',
        className
      )}
    >
      {title && (
        <h1 className="truncate text-base font-semibold text-[var(--text-primary)]">
          {title}
        </h1>
      )}
      <div className="ml-auto flex items-center gap-1">
        <button
          type="button"
          onClick={onSearchClick}
          className="rounded-md p-2 text-[var(--text-muted)] hover:bg-[var(--bg-hover)] hover:text-[var(--text-primary)]"
          aria-label="Search"
        >
          <Search className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={onQuickAddClick}
          className="flex h-8 w-8 items-center justify-center rounded-md bg-[var(--accent)] text-white hover:bg-[var(--accent-hover)]"
          aria-label="Quick add task"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>
    </header>
  )
}

export default TopBar
