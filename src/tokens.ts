// Design Tokens — single source of truth for brand & typography
export const tokens = {
  colors: {
    brand: '#00FF00',
    brandDark: '#00cc00',
    brandLight: '#ccffcc',
    brandMuted: 'rgba(0,255,0,0.08)',
    black: '#0a0a0a',
    white: '#ffffff',
    gray50: '#f9fafb',
    gray100: '#f3f4f6',
    gray200: '#e5e7eb',
    gray400: '#9ca3af',
    gray600: '#4b5563',
    gray800: '#1f2937',
  },
  fonts: {
    sans: '"Inter", system-ui, -apple-system, sans-serif',
    mono: '"JetBrains Mono", "Fira Code", monospace',
  },
  radii: {
    sm: '0.375rem',
    md: '0.75rem',
    lg: '1.25rem',
    xl: '2rem',
    full: '9999px',
  },
  shadows: {
    brand: '0 8px 32px rgba(0,255,0,0.25)',
    brandStrong: '0 12px 48px rgba(0,255,0,0.4)',
    card: '0 4px 24px rgba(0,0,0,0.06)',
    cardHover: '0 12px 40px rgba(0,0,0,0.12)',
  },
} as const

export type Tokens = typeof tokens
