// LOBES: Mobile bottom tab bar — 5 items, icon + label, active = area accent

import { NavLink, useLocation } from 'react-router-dom'
import {
  LayoutDashboard,
  FolderKanban,
  Flame,
  Brain,
  Settings,
} from 'lucide-react'
import { cn } from '../../utils/cn'

const tabs = [
  { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/projects', icon: FolderKanban, label: 'Projects' },
  { to: '/urgency', icon: Flame, label: 'Urgency' },
  { to: '/brain-dump', icon: Brain, label: 'Brain Dump' },
  { to: '/settings', icon: Settings, label: 'Settings' },
]

export function BottomNav() {
  const location = useLocation()
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around border-t border-[var(--border-subtle)] bg-[var(--bg-surface)] py-2 safe-area-pb">
      {tabs.map(({ to, icon: Icon, label }) => {
        const isActive = to === '/' ? location.pathname === '/' : location.pathname.startsWith(to)
        return (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={cn(
              'flex flex-col items-center gap-0.5 px-2 py-1 text-[11px] transition-colors duration-150',
              isActive ? 'text-[var(--accent)]' : 'text-[var(--text-muted)]'
            )}
          >
            <Icon className="h-5 w-5" strokeWidth={isActive ? 2.25 : 1.5} />
            <span>{label}</span>
          </NavLink>
        )
      })}
    </nav>
  )
}

export default BottomNav