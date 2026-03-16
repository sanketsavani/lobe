// LOBES: Settings — area names, themes, export/import, focus mode

export default function Settings() {
  return (
    <div className="mx-auto max-w-2xl p-4 md:p-6 lg:p-8">
      <header className="mb-6">
        <h1 className="text-xl font-semibold text-[var(--text-primary)]">
          Settings
        </h1>
        <p className="text-sm text-[var(--text-secondary)]">
          Personalize areas, export data, focus mode
        </p>
      </header>

      <div className="space-y-6">
        <section className="rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-4">
          <h2 className="mb-3 text-sm font-medium text-[var(--text-primary)]">
            Areas
          </h2>
          <p className="text-sm text-[var(--text-secondary)]">
            Rename areas and set colors. (Coming soon.)
          </p>
        </section>
        <section className="rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-4">
          <h2 className="mb-3 text-sm font-medium text-[var(--text-primary)]">
            Data
          </h2>
          <p className="text-sm text-[var(--text-secondary)]">
            Export to JSON / Import from backup. (Coming soon.)
          </p>
        </section>
      </div>
    </div>
  )
}
