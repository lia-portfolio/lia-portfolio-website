import { useState } from 'react'
import { Sun, Moon, Menu, X } from 'lucide-react'
import { useDark } from '../../context/ThemeContext'

const navLinks = [
  { label: 'About', id: 'about' },
  { label: 'Paintings', id: 'paintings' },
  { label: 'Other Work', id: 'other-work' },
  { label: 'Contact', id: 'contact' },
]

const scrollTo = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

export function Navbar() {
  const { isDark, toggleDark } = useDark()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md border-b border-gray-200/60 dark:border-gray-800/60">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => scrollTo('hero')}
          className="font-serif text-xl font-bold tracking-tight text-gray-900 dark:text-gray-100 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
        >
          Lia
        </button>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Right side: theme toggle + hamburger */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleDark}
            aria-label="Toggle dark mode"
            className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>

          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
            className="md:hidden p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {menuOpen && (
        <nav className="md:hidden border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 px-6 py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => { scrollTo(link.id); setMenuOpen(false) }}
              className="text-left text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
            >
              {link.label}
            </button>
          ))}
        </nav>
      )}
    </header>
  )
}
