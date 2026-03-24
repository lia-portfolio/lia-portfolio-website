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
        brand: {
          50:  '#faf7f2',
          100: '#f5ede0',
          200: '#e8d5b7',
          300: '#d4b48a',
          400: '#c49465',
          500: '#a67c52',
          600: '#8b6340',
          700: '#6e4d31',
          800: '#4f3621',
          900: '#321f10',
        },
      },
      letterSpacing: {
        widest: '0.25em',
      },
    },
  },
  plugins: [],
} satisfies Config
