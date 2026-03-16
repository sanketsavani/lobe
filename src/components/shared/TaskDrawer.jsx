// LOBES: TaskDrawer — slide-in panel for add/edit task; bottom sheet on mobile

import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { useBreakpoint } from '../../hooks/useBreakpoint'
import { TaskForm } from './TaskForm'
import { spring } from '../../utils/motion'
import { cn } from '../../utils/cn'
import { useSettingsStore } from '../../store/useSettingsStore'

export function TaskDrawer({ open, task, onClose, onSave }) {
  const { isMobile } = useBreakpoint()
  const reducedMotion = useSettingsStore((s) => s.reducedMotion)

  useEffect(() => {
    const handleEsc = (e) => e.key === 'Escape' && onClose()
    if (open) {
      document.addEventListener('keydown', handleEsc)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleEsc)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  const handleSave = (payload) => {
    onSave(task ? { ...task, ...payload } : payload)
    onClose()
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          {reducedMotion ? (
            <>
              <div
                className="fixed inset-0 z-40 bg-black/50"
                onClick={onClose}
              />
              <aside
                className={cn(
                  'fixed top-0 right-0 z-50 flex h-full w-full flex-col bg-[var(--bg-elevated)] shadow-lg',
                  'border-l border-[var(--border-subtle)]',
                  isMobile ? 'max-w-full rounded-t-2xl' : 'max-w-md'
                )}
              >
                <div className="flex items-center justify-between border-b border-[var(--border-subtle)] px-4 py-3">
                  <h2 className="text-base font-semibold text-[var(--text-primary)]">
                    {task ? 'Edit task' : 'Add task'}
                  </h2>
                  <button
                    type="button"
                    onClick={onClose}
                    className="rounded-md p-1.5 text-[var(--text-muted)] hover:bg-[var(--bg-hover)] hover:text-[var(--text-primary)]"
                    aria-label="Close"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
                <div className="flex-1 overflow-y-auto p-4">
                  <TaskForm
                    task={task}
                    onSubmit={handleSave}
                    onCancel={onClose}
                    compact={false}
                  />
                </div>
              </aside>
            </>
          ) : (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-40 bg-black/50"
                onClick={onClose}
              />
              <motion.aside
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={spring}
                className={cn(
                  'fixed top-0 right-0 z-50 flex h-full w-full flex-col bg-[var(--bg-elevated)] shadow-lg',
                  'border-l border-[var(--border-subtle)]',
                  isMobile ? 'max-w-full rounded-t-2xl' : 'max-w-md'
                )}
              >
                <div className="flex items-center justify-between border-b border-[var(--border-subtle)] px-4 py-3">
                  <h2 className="text-base font-semibold text-[var(--text-primary)]">
                    {task ? 'Edit task' : 'Add task'}
                  </h2>
                  <button
                    type="button"
                    onClick={onClose}
                    className="rounded-md p-1.5 text-[var(--text-muted)] hover:bg-[var(--bg-hover)] hover:text-[var(--text-primary)]"
                    aria-label="Close"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
                <div className="flex-1 overflow-y-auto p-4">
                  <TaskForm
                    task={task}
                    onSubmit={handleSave}
                    onCancel={onClose}
                    compact={false}
                  />
                </div>
              </motion.aside>
            </>
          )}
        </>
      )}
    </AnimatePresence>
  )
}

export default TaskDrawer
