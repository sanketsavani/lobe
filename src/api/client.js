// LOBES: API client for Cloudflare Worker backend (optional)

const BASE = typeof import.meta !== 'undefined' && import.meta.env?.VITE_API_URL
  ? import.meta.env.VITE_API_URL.replace(/\/$/, '')
  : ''

function get(url) {
  return fetch(`${BASE}${url}`).then((r) => {
    if (!r.ok) throw new Error(r.statusText)
    return r.json()
  })
}

function post(url, body) {
  return fetch(`${BASE}${url}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  }).then((r) => {
    if (!r.ok) throw new Error(r.statusText)
    return r.json()
  })
}

function patch(url, body) {
  return fetch(`${BASE}${url}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  }).then((r) => {
    if (!r.ok) throw new Error(r.statusText)
    return r.json()
  })
}

function del(url) {
  return fetch(`${BASE}${url}`, { method: 'DELETE' }).then((r) => {
    if (!r.ok) throw new Error(r.statusText)
    return r.json().catch(() => ({}))
  })
}

export const api = {
  isConfigured: () => !!BASE,

  signup: ({ username, email, password }) =>
    post('/api/signup', { username, email, password }),

  login: ({ usernameOrEmail, password }) =>
    post('/api/login', { usernameOrEmail, password }),

  getTasks: () => get('/api/tasks').then((d) => d.tasks || []),
  getTask: (id) => get(`/api/tasks/${id}`),
  createTask: (task) => post('/api/tasks', task).then((t) => (t && t.id ? t : (Array.isArray(t) ? t[0] : t))),
  updateTask: (id, updates) => patch(`/api/tasks/${id}`, updates),
  deleteTask: (id) => del(`/api/tasks/${id}`),

  getInbox: () => get('/api/inbox').then((d) => d.inbox || []),
  addInboxItem: (item) => post('/api/inbox', { id: item.id, text: item.text, createdAt: item.createdAt }),
  deleteInboxItem: (id) => del(`/api/inbox/${id}`),
}
