const STORAGE_PREFIX = 'lobes-tab-onboarding:'

export function newLoginSessionId() {
  return crypto.randomUUID()
}

function storageKey(loginSessionId) {
  return `${STORAGE_PREFIX}${loginSessionId}`
}

function safeParse(json) {
  try {
    return JSON.parse(json)
  } catch {
    return null
  }
}

export function hasSeenTabOnboarding(loginSessionId, tabId) {
  if (!loginSessionId) return true
  const raw = localStorage.getItem(storageKey(loginSessionId))
  const data = safeParse(raw) || {}
  return Boolean(data?.[tabId])
}

export function markSeenTabOnboarding(loginSessionId, tabId) {
  if (!loginSessionId) return
  const key = storageKey(loginSessionId)
  const raw = localStorage.getItem(key)
  const data = safeParse(raw) || {}
  data[tabId] = true
  localStorage.setItem(key, JSON.stringify(data))
}

export function clearTabOnboarding(loginSessionId) {
  if (!loginSessionId) return
  localStorage.removeItem(storageKey(loginSessionId))
}

