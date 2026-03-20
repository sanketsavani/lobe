// LOBES: Area definitions — base areas + optional fourth; each with color token

/** All built-in area ids (display order: life → side work → job → extra slot). */
export const AREA_IDS = ['personal', 'startup1', 'job', 'startup2']

/** New users start with three areas; “Startup 2” can be enabled in Settings. */
export const DEFAULT_ENABLED_AREA_IDS = ['personal', 'startup1', 'job']

export const BASE_AREAS = [
  { id: 'personal', label: 'Personal life', colorVar: '--area-personal' },
  { id: 'startup1', label: 'Personal work', colorVar: '--area-startup1' },
  { id: 'job', label: 'Full Time Job', colorVar: '--area-job' },
  { id: 'startup2', label: 'Startup 2', colorVar: '--area-startup2' },
]
export const AREAS = BASE_AREAS
export const getAreaColorVar = (areaId) => {
  const area = (globalThis.__lobesAllAreas || BASE_AREAS).find((a) => a.id === areaId)
  return area ? area.colorVar : '--area-startup1'
}

export const setAllAreasForRuntime = (areas) => {
  globalThis.__lobesAllAreas = areas
}
