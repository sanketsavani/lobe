import { useEffect, useMemo, useState } from 'react'
import { AlertTriangle } from 'lucide-react'
import { useAuthStore } from '../../store/useAuthStore'
import { hasSeenTabOnboarding, markSeenTabOnboarding } from '../../utils/tabOnboarding'

export function TabInfoBanner({ tabId, title, children }) {
  const loginSessionId = useAuthStore((s) => s.loginSessionId)
  const [open, setOpen] = useState(false)

  const alreadySeen = useMemo(() => {
    if (!loginSessionId) return true
    return hasSeenTabOnboarding(loginSessionId, tabId)
  }, [loginSessionId, tabId])

  useEffect(() => {
    if (!loginSessionId) return
    setOpen(!alreadySeen)
  }, [alreadySeen, loginSessionId])

  if (!open) return null

  return (
    <div className="mb-4 rounded-lg border border-[#f59e0b] bg-[#fff7d6] px-4 py-3 text-xs text-[#6b3f00] shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 gap-2">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-[#b45309]" />
          <p className="min-w-0">
            <span className="font-semibold text-[#4a2a00]">{title}</span>{' '}
            {children}
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            markSeenTabOnboarding(loginSessionId, tabId)
            setOpen(false)
          }}
          className="shrink-0 rounded-md bg-[#f59e0b] px-2 py-1 text-[10px] font-semibold text-white hover:bg-[#d97706]"
        >
          Got it
        </button>
      </div>
    </div>
  )
}

export default TabInfoBanner

