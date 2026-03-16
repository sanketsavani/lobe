// LOBES: Load tasks and inbox from Cloudflare API when VITE_API_URL is set

import { useEffect, useState } from 'react'
import { api } from '../api/client'
import { useTaskStore } from '../store/useTaskStore'

export function useApiSync() {
  const [loaded, setLoaded] = useState(false)
  const setTasks = useTaskStore((s) => s.setTasks)
  const setInbox = useTaskStore((s) => s.setInbox)

  useEffect(() => {
    if (!api.isConfigured()) {
      setLoaded(true)
      return
    }
    let cancelled = false
    Promise.all([api.getTasks(), api.getInbox()])
      .then(([tasks, inbox]) => {
        if (!cancelled) {
          setTasks(Array.isArray(tasks) ? tasks : [])
          setInbox(Array.isArray(inbox) ? inbox : [])
        }
      })
      .catch(console.error)
      .finally(() => !cancelled && setLoaded(true))
    return () => { cancelled = true }
  }, [setTasks, setInbox])

  return { isConfigured: api.isConfigured(), loaded }
}
