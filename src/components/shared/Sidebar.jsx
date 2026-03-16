// LOBES: Sidebar — 220px, bg-base, border-right subtle

import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  FolderKanban,
  Flame,
  Brain,
  Settings,
} from 'lucide-react'
import { cn } from '../../utils/cn'

const navItems = [
  { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/projects', icon: FolderKanban, label: 'Projects' },
  { to: '/urgency', icon: Flame, label: 'Urgency' },
  { to: '/brain-dump', icon: Brain, label: 'Brain Dump' },
  { to: '/settings', icon: Settings, label: 'Settings' },
]

export function Sidebar({ collapsed }) {
  return (
    <aside
      className={cn(
        'flex flex-col border-r border-[var(--border-subtle)] bg-[var(--bg-base)]',
        collapsed ? 'w-14' : 'w-[220px]'
      )}
    >
      <nav className="flex flex-1 flex-col gap-0.5 p-2">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors duration-150',
                isActive
                  ? 'bg-[var(--bg-elevated)] text-[var(--accent)]'
                  : 'text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] hover:text-[var(--text-primary)]'
              )
            }
          >
            <Icon className="h-5 w-5 shrink-0" strokeWidth={1.5} />
            {!collapsed && <span>{label}</span>}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}

export default Sidebar
