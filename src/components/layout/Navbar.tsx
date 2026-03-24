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
    <header className="fixed top-0 left-0 right-0 z-40 bg-brand-50 dark:bg-[#1c160f] border-b border-brand-200 dark:border-brand-800">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => scrollTo('hero')}
          className="font-serif italic text-xl tracking-wide text-brand-900 dark:text-brand-100 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
        >
          Lia Viniegra
        </button>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className="font-sans text-xs tracking-widest uppercase text-brand-700 dark:text-brand-300 hover:text-brand-900 dark:hover:text-brand-100 transition-colors"
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Theme toggle + hamburger */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleDark}
            aria-label="Toggle dark mode"
            className="p-2 text-brand-600 dark:text-brand-400 hover:text-brand-900 dark:hover:text-brand-100 transition-colors"
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
            className="md:hidden p-2 text-brand-600 dark:text-brand-400 hover:text-brand-900 dark:hover:text-brand-100 transition-colors"
          >
            {menuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {menuOpen && (
        <nav className="md:hidden border-t border-brand-200 dark:border-brand-800 bg-brand-50 dark:bg-[#1c160f] px-6 py-5 flex flex-col gap-5">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => { scrollTo(link.id); setMenuOpen(false) }}
              className="text-left font-sans text-xs tracking-widest uppercase text-brand-700 dark:text-brand-300 hover:text-brand-900 dark:hover:text-brand-100 transition-colors"
            >
              {link.label}
            </button>
          ))}
        </nav>
      )}
    </header>
  )
}
