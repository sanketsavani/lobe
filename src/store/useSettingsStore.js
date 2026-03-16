import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { AREA_IDS, BASE_AREAS, setAllAreasForRuntime } from '../data/areas'

const COLOR_VARS = ['--area-startup1', '--area-startup2', '--area-job', '--area-personal']

export const useSettingsStore = create(
  persist(
    (set, get) => ({
      enabledAreas: AREA_IDS,
      customAreas: [],
      theme: 'system', // 'dark' | 'light' | 'system'
      accentColor: '#6366f1',
      areaColors: {
        startup1: '#6366f1',
        startup2: '#f59e0b',
        job: '#10b981',
        personal: '#ec4899',
      },
      fontScale: 'default', // 'compact' | 'default' | 'relaxed'
      reducedMotion: false,
      noiseTexture: true,

      setEnabledAreas: (ids) => set({ enabledAreas: ids }),

      setTheme: (theme) => set({ theme }),
      setAccentColor: (accentColor) => set({ accentColor }),
      setAreaColor: (areaId, color) =>
        set((state) => ({
          areaColors: {
            ...(state.areaColors || {}),
            [areaId]: color,
          },
        })),
      setFontScale: (fontScale) => set({ fontScale }),
      setReducedMotion: (reducedMotion) => set({ reducedMotion }),
      setNoiseTexture: (noiseTexture) => set({ noiseTexture }),

      addArea: (label) => {
        const slug =
          label
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '') || `area-${Date.now()}`
        const existing = [...BASE_AREAS, ...get().customAreas]
        if (existing.some((a) => a.id === slug)) {
          return
        }
        const colorVar = COLOR_VARS[existing.length % COLOR_VARS.length]
        const newArea = { id: slug, label, colorVar }
        const customAreas = [...get().customAreas, newArea]
        const enabledAreas = [...get().enabledAreas, slug]
        set({ customAreas, enabledAreas })
      },
    }),
    {
      name: 'lobes-settings',
      version: 2,
      migrate: (state, version) => {
        if (!state) return state
        if (version < 2) {
          return {
            enabledAreas: state.enabledAreas || AREA_IDS,
            customAreas: state.customAreas || [],
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
        }
        return state
      },
      onRehydrateStorage: () => (state) => {
        if (!state) return
        const allAreas = [...BASE_AREAS, ...(state.customAreas || [])]
        setAllAreasForRuntime(allAreas)
      },
    }
  )
)

