// LOBES: Urgency board — Eisenhower matrix placeholder

import { useTaskStore } from '../../store/useTaskStore'
import { EmptyState } from '../shared/EmptyState'

export default function UrgencyBoard() {
  const tasks = useTaskStore((s) => s.tasks)
  const openTasks = tasks.filter((t) => t.status !== 'done')

  return (
    <div className="mx-auto max-w-6xl p-4 md:p-6 lg:p-8">
      <header className="mb-6">
        <h1 className="text-xl font-semibold text-[var(--text-primary)]">
          Urgency
        </h1>
        <p className="text-sm text-[var(--text-secondary)]">
          Eisenhower matrix — drag tasks between quadrants
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-2">
        <section className="rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-4">
          <h2 className="mb-3 text-sm font-medium text-[var(--priority-urgent)]">
            Do now
          </h2>
          <EmptyState icon="task" message="Urgent + important tasks go here." />
        </section>
        <section className="rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-4">
          <h2 className="mb-3 text-sm font-medium text-[var(--text-primary)]">
            Schedule
          </h2>
          <EmptyState icon="calendar" message="Important, not urgent." />
        </section>
        <section className="rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-4">
          <h2 className="mb-3 text-sm font-medium text-[var(--text-secondary)]">
            Delegate
          </h2>
          <EmptyState icon="task" message="Urgent, not important." />
        </section>
        <section className="rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-4">
          <h2 className="mb-3 text-sm font-medium text-[var(--text-muted)]">
            Eliminate
          </h2>
          <EmptyState icon="task" message="Neither urgent nor important." />
        </section>
      </div>
    </div>
  )
}
