// LOBES: Sync UI settings to/from API when user is logged in

import { useEffect, useRef } from 'react'
import { api } from '../api/client'
import { useAuthStore } from '../store/useAuthStore'
import { useSettingsStore } from '../store/useSettingsStore'
import { BASE_AREAS, DEFAULT_ENABLED_AREA_IDS, setAllAreasForRuntime } from '../data/areas'

const DEFAULTS = {
  enabledAreas: DEFAULT_ENABLED_AREA_IDS,
  customAreas: [],
  theme: 'system',
  accentColor: '#6366f1',
  areaColors: {
    startup1: '#6366f1',
    startup2: '#f59e0b',
    job: '#10b981',
    personal: '#ec4899',
  },
  fontScale: 'default',
  reducedMotion: false,
  noiseTexture: true,
}

const SETTINGS_KEYS = [
  'enabledAreas',
  'customAreas',
  'theme',
  'accentColor',
  'areaColors',
  'fontScale',
  'reducedMotion',
  'noiseTexture',
]

function getSerializable(state) {
  const out = {}
  for (const key of SETTINGS_KEYS) {
    if (state[key] !== undefined) out[key] = state[key]
  }
  return out
}

function mergeFromServer(server) {
  if (!server || typeof server !== 'object') return DEFAULTS
  const out = { ...DEFAULTS }
  for (const key of SETTINGS_KEYS) {
    if (server[key] !== undefined) out[key] = server[key]
  }
  return out
}

const DEBOUNCE_MS = 600

export function useSettingsSync() {
  const user = useAuthStore((s) => s.user)
  const token = useAuthStore((s) => s.token)
  const hasFetched = useRef(false)
  const patchTimeout = useRef(null)

  // Set API token when user is present; fetch settings once and apply to store
  useEffect(() => {
    if (!user || !token || !api.isConfigured()) return

    api.setAuthToken(token)

    if (hasFetched.current) return
    hasFetched.current = true

    api
      .getSettings()
      .then((data) => {
        const merged = mergeFromServer(data)
        useSettingsStore.setState(merged)
        setAllAreasForRuntime([...BASE_AREAS, ...(merged.customAreas || [])])
      })
      .catch(() => {
        hasFetched.current = false
      })
  }, [user, token])

  // On logout or no API, reset fetch flag so next login fetches again
  useEffect(() => {
    if (!user || !api.isConfigured()) hasFetched.current = false
  }, [user])

  // Debounced PATCH when store changes (only when logged in + API configured)
  useEffect(() => {
    if (!user || !api.isConfigured()) return

    const unsub = useSettingsStore.subscribe((state) => {
      if (patchTimeout.current) clearTimeout(patchTimeout.current)
      patchTimeout.current = setTimeout(() => {
        patchTimeout.current = null
        const payload = getSerializable(state)
        api.patchSettings(payload).catch(() => {})
      }, DEBOUNCE_MS)
    })

    return () => {
      unsub()
      if (patchTimeout.current) clearTimeout(patchTimeout.current)
    }
  }, [user])
}
