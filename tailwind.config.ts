import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['EB Garamond', 'Georgia', 'serif'],
        serif: ['Cormorant Garamond', 'Georgia', 'serif'],
      },
      colors: {
        // Semantic palette — values switch via CSS variables in index.css
        bg:       'rgb(var(--color-bg) / <alpha-value>)',
        surface:  'rgb(var(--color-surface) / <alpha-value>)',
        ink:      'rgb(var(--color-ink) / <alpha-value>)',
        muted:    'rgb(var(--color-muted) / <alpha-value>)',
        rim:      'rgb(var(--color-rim) / <alpha-value>)',
        accent:   'rgb(var(--color-accent) / <alpha-value>)',
        accent2:  'rgb(var(--color-accent2) / <alpha-value>)',
      },
      letterSpacing: {
        widest: '0.25em',
      },
    },
  },
  plugins: [],
} satisfies Config
