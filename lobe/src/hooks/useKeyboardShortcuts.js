// LOBES: Global keyboard shortcuts — Cmd+K search, Cmd+Space Brain Dump, etc.

import { useEffect } from 'react'

export function useKeyboardShortcuts({ onSearch, onBrainDump, onQuickAdd, onFocusMode }) {
  useEffect(() => {
    const handle = (e) => {
      const isMac = navigator.platform.toUpperCase().includes('MAC')
      const mod = isMac ? e.metaKey : e.ctrlKey
      if (!mod) return
      switch (e.key?.toLowerCase()) {
        case 'k':
          e.preventDefault()
          onSearch?.()
          break
        case ' ':
          e.preventDefault()
          onBrainDump?.()
          break
        case 'n':
          e.preventDefault()
          onQuickAdd?.()
          break
        case 'f':
          e.preventDefault()
          onFocusMode?.()
          break
        default:
          break
      }
    }
    window.addEventListener('keydown', handle)
    return () => window.removeEventListener('keydown', handle)
  }, [onSearch, onBrainDump, onQuickAdd, onFocusMode])
}
