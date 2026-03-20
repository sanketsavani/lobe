// LOBES: App shell — router, layout, Quick Add, Task Drawer

import { Routes, Route, useLocation, Outlet } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { useBreakpoint } from './hooks/useBreakpoint'
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts'
import { useApiSync } from './hooks/useApiSync'
import { useSettingsSync } from './hooks/useSettingsSync'
import { useUIStore } from './store/useUIStore'
import { useTaskStore } from './store/useTaskStore'
import { useSettingsStore } from './store/useSettingsStore'
import { useAuthStore } from './store/useAuthStore'
import { api } from './api/client'
import { Sidebar } from './components/shared/Sidebar'
import { BottomNav } from './components/shared/BottomNav'
import { TopBar } from './components/shared/TopBar'
import { QuickAdd } from './components/shared/QuickAdd'
import { TaskDrawer } from './components/shared/TaskDrawer'
import Dashboard from './components/Dashboard/Dashboard'
import ProjectView from './components/ProjectView/ProjectView'
import UrgencyBoard from './components/UrgencyBoard/UrgencyBoard'
import BrainDump from './components/BrainDump/BrainDump'
import Settings from './components/Settings/Settings'
import { AuthForm } from './components/Auth/AuthForm'

const pageVariants = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.2, ease: 'easeOut' } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.15 } },
}

function Layout() {
  const { isMobile, isTablet } = useBreakpoint()
  const location = useLocation()
  const quickAddOpen = useUIStore((s) => s.quickAddOpen)
  const setQuickAddOpen = useUIStore((s) => s.toggleQuickAdd)
  const taskDrawerOpen = useUIStore((s) => s.taskDrawerOpen)
  const taskDrawerTask = useUIStore((s) => s.taskDrawerTask)
  const closeTaskDrawer = useUIStore((s) => s.closeTaskDrawer)
  const openTaskDrawer = useUIStore((s) => s.openTaskDrawer)
  const openSearch = useUIStore((s) => s.openSearch)
  const addTask = useTaskStore((s) => s.addTask)
  const updateTask = useTaskStore((s) => s.updateTask)
  const reducedMotion = useSettingsStore((s) => s.reducedMotion)
  const user = useAuthStore((s) => s.user)
  const logout = useAuthStore((s) => s.logout)

  useApiSync()
  useSettingsSync()
  useKeyboardShortcuts({
    onQuickAdd: () => setQuickAddOpen(),
    onSearch: openSearch,
  })

  const handleQuickAddSave = async (payload) => {
    if (api.isConfigured()) {
      try {
        const created = await api.createTask(payload)
        addTask(created)
      } catch (e) {
        console.error(e)
        addTask(payload)
      }
    } else {
      addTask(payload)
    }
  }

  const handleTaskStatusToggle = async (task) => {
    const nextStatus = task.status === 'done' ? 'todo' : 'done'
    const updates = { ...task, status: nextStatus }
    if (api.isConfigured()) {
      try {
        const updated = await api.updateTask(task.id, updates)
        updateTask(task.id, updated)
      } catch (e) {
        console.error(e)
        updateTask(task.id, updates)
      }
    } else {
      updateTask(task.id, { status: nextStatus })
    }
  }

  const handleTaskDrawerSave = async (payload) => {
    if (taskDrawerTask?.id) {
      const merged = { ...taskDrawerTask, ...payload }
      if (api.isConfigured()) {
        try {
          const updated = await api.updateTask(taskDrawerTask.id, merged)
          updateTask(taskDrawerTask.id, updated)
        } catch (e) {
          console.error(e)
          updateTask(taskDrawerTask.id, merged)
        }
      } else {
        updateTask(taskDrawerTask.id, merged)
      }
    } else {
      if (api.isConfigured()) {
        try {
          const created = await api.createTask(payload)
          addTask(created)
        } catch (e) {
          console.error(e)
          addTask(payload)
        }
      } else {
        addTask(payload)
      }
    }
  }

  const pageTitle =
    location.pathname === '/'
      ? 'Dashboard'
      : location.pathname.startsWith('/projects')
        ? 'Projects'
        : location.pathname === '/urgency'
          ? 'Urgency'
          : location.pathname === '/brain-dump'
            ? 'Brain Dump'
            : location.pathname === '/settings'
              ? 'Settings'
              : 'Lobes'

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[var(--bg-base)]">
        <AuthForm mode="login" />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen bg-[var(--bg-base)]">
      {!isMobile && <Sidebar collapsed={isTablet} />}
      <div className="flex flex-1 flex-col pb-16 md:pb-0">
        <TopBar
          title={isMobile ? pageTitle : null}
          onSearchClick={openSearch}
          onQuickAddClick={() => setQuickAddOpen()}
          onLogoutClick={isMobile ? logout : undefined}
        />
        <main className="flex-1">
          {reducedMotion ? (
            <div className="min-h-full">
              <Outlet context={{ openTaskDrawer, onTaskStatusToggle: handleTaskStatusToggle }} />
            </div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="min-h-full"
              >
                <Outlet context={{ openTaskDrawer, onTaskStatusToggle: handleTaskStatusToggle }} />
              </motion.div>
            </AnimatePresence>
          )}
        </main>
      </div>
      {isMobile && <BottomNav />}

      <QuickAdd
        open={quickAddOpen}
        onOpenChange={(open) => useUIStore.setState({ quickAddOpen: open })}
        onSave={handleQuickAddSave}
      />
      <TaskDrawer
        open={taskDrawerOpen}
        task={taskDrawerTask}
        onClose={closeTaskDrawer}
        onSave={handleTaskDrawerSave}
      />
    </div>
  )
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<AuthForm mode="login" />} />
      <Route path="/signup" element={<AuthForm mode="signup" />} />
      <Route element={<Layout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/projects" element={<ProjectView />} />
        <Route path="/projects/:areaId" element={<ProjectView />} />
        <Route path="/urgency" element={<UrgencyBoard />} />
        <Route path="/brain-dump" element={<BrainDump />} />
        <Route path="/settings" element={<Settings />} />
      </Route>
    </Routes>
  )
}