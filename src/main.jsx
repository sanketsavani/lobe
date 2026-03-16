import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { useEffect } from 'react'
import { useSettingsStore } from './store/useSettingsStore'
import './styles/globals.css'

function SettingsRoot() {
  const theme = useSettingsStore((s) => s.theme)
  const accentColor = useSettingsStore((s) => s.accentColor)
  const areaColors = useSettingsStore((s) => s.areaColors)
  const fontScale = useSettingsStore((s) => s.fontScale)
  const reducedMotion = useSettingsStore((s) => s.reducedMotion)
  const noiseTexture = useSettingsStore((s) => s.noiseTexture)

  useEffect(() => {
    if (typeof document === 'undefined') return
    const root = document.documentElement
    const body = document.body

    const resolveSystemTheme = () => {
      if (typeof window === 'undefined' || !window.matchMedia) return 'dark'
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    }

    const effectiveTheme = theme === 'system' ? resolveSystemTheme() : theme
    root.setAttribute('data-theme', effectiveTheme)

    if (accentColor) {
      root.style.setProperty('--accent', accentColor)
      const lighten = (hex, amount = 0.15) => {
        const normalized = hex.replace('#', '')
        if (normalized.length !== 6) return hex
        const num = parseInt(normalized, 16)
        let r = (num >> 16) & 0xff
        let g = (num >> 8) & 0xff
        let b = num & 0xff
        r = Math.min(255, Math.round(r + (255 - r) * amount))
        g = Math.min(255, Math.round(g + (255 - g) * amount))
        b = Math.min(255, Math.round(b + (255 - b) * amount))
        const toHex = (v) => v.toString(16).padStart(2, '0')
        return `#${toHex(r)}${toHex(g)}${toHex(b)}`
      }
      root.style.setProperty('--accent-hover', lighten(accentColor, 0.18))
    }

    if (areaColors) {
      Object.entries(areaColors).forEach(([id, color]) => {
        if (!color) return
        root.style.setProperty(`--area-${id}`, color)
      })
    }

    body.setAttribute('data-font-scale', fontScale || 'default')
    body.setAttribute('data-noise', noiseTexture === false ? 'off' : 'on')
    body.setAttribute('data-reduced-motion', reducedMotion ? 'on' : 'off')
  }, [theme, accentColor, areaColors, fontScale, reducedMotion, noiseTexture])

  return <App />
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <SettingsRoot />
    </BrowserRouter>
  </React.StrictMode>
)
