/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-ui)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      colors: {
        base: 'var(--bg-base)',
        surface: 'var(--bg-surface)',
        elevated: 'var(--bg-elevated)',
        hover: 'var(--bg-hover)',
        border: {
          subtle: 'var(--border-subtle)',
          DEFAULT: 'var(--border-default)',
          strong: 'var(--border-strong)',
        },
        text: {
          primary: 'var(--text-primary)',
          secondary: 'var(--text-secondary)',
          muted: 'var(--text-muted)',
        },
        area: {
          startup1: 'var(--area-startup1)',
          startup2: 'var(--area-startup2)',
          job: 'var(--area-job)',
          personal: 'var(--area-personal)',
        },
      },
      spacing: {
        xs: '4px',
        sm: '8px',
        md: '12px',
        lg: '16px',
        xl: '24px',
        '2xl': '32px',
        '3xl': '48px',
      },
      fontSize: {
        xs: ['11px', { lineHeight: '1.25' }],
        sm: ['13px', { lineHeight: '1.35' }],
        base: ['14px', { lineHeight: '1.45' }],
        md: ['15px', { lineHeight: '1.4' }],
        lg: ['18px', { lineHeight: '1.35' }],
        xl: ['22px', { lineHeight: '1.3' }],
        '2xl': ['28px', { lineHeight: '1.25' }],
      },
    },
  },
  plugins: [],
}
