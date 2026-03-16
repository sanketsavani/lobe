// LOBES: Area definitions — 4 parallel lives, each with color token

export const AREA_IDS = ['startup1', 'startup2', 'job', 'personal']

export const BASE_AREAS = [
  { id: 'startup1', label: 'Startup 1', colorVar: '--area-startup1' },
  { id: 'startup2', label: 'Startup 2', colorVar: '--area-startup2' },
  { id: 'job', label: 'Full-time Job', colorVar: '--area-job' },
  { id: 'personal', label: 'Personal Life', colorVar: '--area-personal' },
]
export const AREAS = BASE_AREAS
export const getAreaColorVar = (areaId) => {
  const area = (globalThis.__lobesAllAreas || BASE_AREAS).find((a) => a.id === areaId)
  return area ? area.colorVar : '--area-startup1'
}

export const setAllAreasForRuntime = (areas) => {
  globalThis.__lobesAllAreas = areas
}
