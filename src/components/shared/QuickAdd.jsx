// LOBES: QuickAdd — FAB or top-bar trigger; popover (desktop) / sheet (mobile)

import { useState, useRef, useEffect } from 'react'
import { Plus } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { useBreakpoint } from '../../hooks/useBreakpoint'
import { TaskForm } from './TaskForm'
import { spring } from '../../utils/motion'
import { cn } from '../../utils/cn'
import { useSettingsStore } from '../../store/useSettingsStore'

export function QuickAdd({ open, onOpenChange, onSave, anchorRef = null }) {
  const { isMobile } = useBreakpoint()
  const [submitting, setSubmitting] = useState(false)
  const panelRef = useRef(null)
  const reducedMotion = useSettingsStore((s) => s.reducedMotion)

  useEffect(() => {
    const handleEsc = (e) => e.key === 'Escape' && onOpenChange(false)
    if (open) document.addEventListener('keydown', handleEsc)
    return () => document.removeEventListener('keydown', handleEsc)
  }, [open, onOpenChange])

  const handleSave = (payload) => {
    setSubmitting(true)
    onSave(payload)
    setSubmitting(false)
    onOpenChange(false)
  }

  if (isMobile) {
    return (
      <AnimatePresence>
        {open && (
          <>
            {reducedMotion ? (
              <>
                <div
                  className="fixed inset-0 z-40 bg-black/50"
                  onClick={() => onOpenChange(false)}
                />
                <div
                  ref={panelRef}
                  className="fixed bottom-0 left-0 right-0 z-50 rounded-t-2xl border-t border-[var(--border-subtle)] bg-[var(--bg-elevated)] p-4 pb-safe"
                >
                  <h2 className="mb-4 text-base font-semibold text-[var(--text-primary)]">
                    Quick add task
                  </h2>
                  <TaskForm
                    onSubmit={handleSave}
                    onCancel={() => onOpenChange(false)}
                    compact
                  />
                </div>
              </>
            ) : (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-40 bg-black/50"
                  onClick={() => onOpenChange(false)}
                />
                <motion.div
                  ref={panelRef}
                  initial={{ y: '100%' }}
                  animate={{ y: 0 }}
                  exit={{ y: '100%' }}
                  transition={spring}
                  className="fixed bottom-0 left-0 right-0 z-50 rounded-t-2xl border-t border-[var(--border-subtle)] bg-[var(--bg-elevated)] p-4 pb-safe"
                >
                  <h2 className="mb-4 text-base font-semibold text-[var(--text-primary)]">
                    Quick add task
                  </h2>
                  <TaskForm
                    onSubmit={handleSave}
                    onCancel={() => onOpenChange(false)}
                    compact
                  />
                </motion.div>
              </>
            )}
          </>
        )}
      </AnimatePresence>
    )
  }

  // Desktop: popover near anchor or center
  return (
    <AnimatePresence>
      {open && (
        <>
          <div
            className="fixed inset-0 z-40"
            aria-hidden
            onClick={() => onOpenChange(false)}
          />
          {reducedMotion ? (
            <div
              ref={panelRef}
              className="fixed left-1/2 top-[20%] z-50 w-full max-w-sm -translate-x-1/2 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-elevated)] p-4 shadow-xl"
            >
              <h2 className="mb-3 text-sm font-semibold text-[var(--text-primary)]">
                Quick add task
              </h2>
              <TaskForm
                onSubmit={handleSave}
                onCancel={() => onOpenChange(false)}
                compact
              />
            </div>
          ) : (
            <motion.div
              ref={panelRef}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={spring}
              className="fixed left-1/2 top-[20%] z-50 w-full max-w-sm -translate-x-1/2 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-elevated)] p-4 shadow-xl"
            >
              <h2 className="mb-3 text-sm font-semibold text-[var(--text-primary)]">
                Quick add task
              </h2>
              <TaskForm
                onSubmit={handleSave}
                onCancel={() => onOpenChange(false)}
                compact
              />
            </motion.div>
          )}
        </>
      )}
    </AnimatePresence>
  )
}

export function QuickAddButton({ onClick, className }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'flex h-9 w-9 items-center justify-center rounded-full bg-[var(--accent)] text-white transition-colors hover:bg-[var(--accent-hover)]',
        className
      )}
      aria-label="Quick add task"
    >
      <Plus className="h-5 w-5" />
    </button>
  )
}

export default QuickAdd
