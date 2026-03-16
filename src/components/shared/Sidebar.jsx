// LOBES: Sidebar — 220px, bg-base, border-right subtle

import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  FolderKanban,
  Flame,
  Brain,
  Settings,
  LogOut,
} from 'lucide-react'
import { cn } from '../../utils/cn'
import { useAuthStore } from '../../store/useAuthStore'

const navItems = [
  { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/projects', icon: FolderKanban, label: 'Projects' },
  { to: '/urgency', icon: Flame, label: 'Urgency' },
  { to: '/brain-dump', icon: Brain, label: 'Brain Dump' },
  { to: '/settings', icon: Settings, label: 'Settings' },
]

export function Sidebar({ collapsed }) {
  const logout = useAuthStore((s) => s.logout)

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
      {!collapsed && (
        <div className="border-t border-[var(--border-subtle)] p-2">
          <button
            type="button"
            onClick={logout}
            className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm text-[var(--text-secondary)] transition-colors duration-150 hover:bg-[var(--bg-hover)] hover:text-[var(--text-primary)]"
          >
            <LogOut className="h-5 w-5 shrink-0" strokeWidth={1.5} />
            <span>Log out</span>
          </button>
        </div>
      )}
    </aside>
  )
}

export default Sidebar
