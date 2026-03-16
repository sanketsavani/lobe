// LOBES: Settings — area names, themes, export/import, focus mode

import { useState } from 'react'
import { useSettingsStore } from '../../store/useSettingsStore'
import { BASE_AREAS } from '../../data/areas'

export default function Settings() {
  const enabledAreas = useSettingsStore((s) => s.enabledAreas)
  const customAreas = useSettingsStore((s) => s.customAreas)
  const setEnabledAreas = useSettingsStore((s) => s.setEnabledAreas)
  const addArea = useSettingsStore((s) => s.addArea)
  const theme = useSettingsStore((s) => s.theme)
  const setTheme = useSettingsStore((s) => s.setTheme)
  const accentColor = useSettingsStore((s) => s.accentColor)
  const setAccentColor = useSettingsStore((s) => s.setAccentColor)
  const areaColors = useSettingsStore((s) => s.areaColors)
  const setAreaColor = useSettingsStore((s) => s.setAreaColor)
  const fontScale = useSettingsStore((s) => s.fontScale)
  const setFontScale = useSettingsStore((s) => s.setFontScale)
  const reducedMotion = useSettingsStore((s) => s.reducedMotion)
  const setReducedMotion = useSettingsStore((s) => s.setReducedMotion)
  const noiseTexture = useSettingsStore((s) => s.noiseTexture)
  const setNoiseTexture = useSettingsStore((s) => s.setNoiseTexture)
  const [newAreaName, setNewAreaName] = useState('')

  const toggleArea = (id) => {
    if (enabledAreas.includes(id) && enabledAreas.length === 1) {
      return
    }
    if (enabledAreas.includes(id)) {
      setEnabledAreas(enabledAreas.filter((a) => a !== id))
    } else {
      setEnabledAreas([...enabledAreas, id])
    }
  }

  return (
    <div className="mx-auto max-w-2xl p-4 md:p-6 lg:p-8">
      <header className="mb-6">
        <h1 className="text-xl font-semibold text-[var(--text-primary)]">
          Settings
        </h1>
        <p className="text-sm text-[var(--text-secondary)]">
          Personalize theme, behavior, and areas
        </p>
      </header>

      <div className="space-y-6">
        <section className="rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-4">
          <h2 className="mb-3 text-sm font-medium text-[var(--text-primary)]">
            Theme & appearance
          </h2>
          <div className="space-y-4">
            <div>
              <p className="mb-2 text-xs font-medium uppercase tracking-wide text-[var(--text-secondary)]">
                Color mode
              </p>
              <div className="inline-flex rounded-md border border-[var(--border-subtle)] bg-[var(--bg-base)] p-0.5 text-xs">
                {[
                  { id: 'dark', label: 'Dark' },
                  { id: 'light', label: 'Light' },
                  { id: 'system', label: 'System' },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setTheme(opt.id)}
                    className={`rounded px-2 py-1 ${
                      theme === opt.id
                        ? 'bg-[var(--accent)] text-white'
                        : 'text-[var(--text-secondary)] hover:bg-[var(--bg-hover)]'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <p className="mb-2 text-xs font-medium uppercase tracking-wide text-[var(--text-secondary)]">
                  Accent color
                </p>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={accentColor}
                    onChange={(e) => setAccentColor(e.target.value)}
                    className="h-9 w-9 cursor-pointer rounded-md border border-[var(--border-subtle)] bg-[var(--bg-base)] p-1"
                  />
                  <span className="text-xs text-[var(--text-secondary)]">
                    Used for primary actions and highlights.
                  </span>
                </div>
              </div>
              <div>
                <p className="mb-2 text-xs font-medium uppercase tracking-wide text-[var(--text-secondary)]">
                  Noise texture
                </p>
                <label className="inline-flex cursor-pointer items-center gap-2 text-xs text-[var(--text-secondary)]">
                  <input
                    type="checkbox"
                    className="h-3 w-3"
                    checked={noiseTexture !== false}
                    onChange={(e) => setNoiseTexture(e.target.checked)}
                  />
                  <span>Subtle background noise on surfaces</span>
                </label>
              </div>
            </div>

            <div>
              <p className="mb-2 text-xs font-medium uppercase tracking-wide text-[var(--text-secondary)]">
                Font size
              </p>
              <div className="inline-flex rounded-md border border-[var(--border-subtle)] bg-[var(--bg-base)] p-0.5 text-xs">
                {[
                  { id: 'compact', label: 'Compact' },
                  { id: 'default', label: 'Default' },
                  { id: 'relaxed', label: 'Relaxed' },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setFontScale(opt.id)}
                    className={`rounded px-2 py-1 ${
                      fontScale === opt.id
                        ? 'bg-[var(--accent)] text-white'
                        : 'text-[var(--text-secondary)] hover:bg-[var(--bg-hover)]'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="mb-2 text-xs font-medium uppercase tracking-wide text-[var(--text-secondary)]">
                Motion
              </p>
              <label className="inline-flex cursor-pointer items-center gap-2 text-xs text-[var(--text-secondary)]">
                <input
                  type="checkbox"
                  className="h-3 w-3"
                  checked={reducedMotion}
                  onChange={(e) => setReducedMotion(e.target.checked)}
                />
                <span>Reduce animations and transitions</span>
              </label>
            </div>
          </div>
        </section>

        <section className="rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-4">
          <h2 className="mb-3 text-sm font-medium text-[var(--text-primary)]">Projects / areas</h2>
          <p className="mb-4 text-xs text-[var(--text-secondary)]">
            Turn areas on or off to match how many projects you&apos;re actively running. At least
            one area must stay enabled.
          </p>
          <div className="grid gap-2 sm:grid-cols-2">
            {[...BASE_AREAS, ...customAreas].map((area) => {
              const enabled = enabledAreas.includes(area.id)
              return (
                <button
                  key={area.id}
                  type="button"
                  onClick={() => toggleArea(area.id)}
                  className={`flex items-center justify-between rounded-md border px-3 py-2 text-left text-sm transition-colors ${
                    enabled
                      ? 'border-[var(--accent)] bg-[var(--bg-elevated)] text-[var(--text-primary)]'
                      : 'border-[var(--border-subtle)] bg-[var(--bg-base)] text-[var(--text-secondary)] hover:bg-[var(--bg-hover)]'
                  }`}
                >
                  <span>{area.label}</span>
                  <input
                    type="color"
                    aria-label={`${area.label} color`}
                    value={areaColors?.[area.id] || '#6366f1'}
                    onClick={(e) => e.stopPropagation()}
                    onChange={(e) => {
                      e.stopPropagation()
                      setAreaColor(area.id, e.target.value)
                    }}
                    className="h-6 w-6 cursor-pointer rounded-full border border-[var(--border-subtle)] bg-[var(--bg-base)] p-0.5"
                  />
                </button>
              )
            })}
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              const trimmed = newAreaName.trim()
              if (!trimmed) return
              addArea(trimmed)
              setNewAreaName('')
            }}
            className="mt-4 flex gap-2"
          >
            <input
              type="text"
              value={newAreaName}
              onChange={(e) => setNewAreaName(e.target.value)}
              placeholder="Add new project / area"
              className="flex-1 rounded-md border border-[var(--border-subtle)] bg-[var(--bg-base)] px-3 py-2 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[var(--accent)] focus:outline-none"
            />
            <button
              type="submit"
              className="rounded-md bg-[var(--accent)] px-3 py-2 text-sm font-medium text-white hover:bg-[var(--accent-hover)]"
            >
              Add
            </button>
          </form>
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
