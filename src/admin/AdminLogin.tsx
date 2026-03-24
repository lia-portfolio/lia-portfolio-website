import { useState } from 'react'
import { Key, Lock } from 'lucide-react'

interface AdminLoginProps {
  onLogin: (token: string) => void
}

export function AdminLogin({ onLogin }: AdminLoginProps) {
  const [token, setToken] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = token.trim()
    if (!trimmed) {
      setError('Please enter a GitHub Personal Access Token.')
      return
    }
    setError('')
    sessionStorage.setItem('gh_pat', trimmed)
    onLogin(trimmed)
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center px-6">
      <div className="w-full max-w-md bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 p-8">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-14 h-14 rounded-2xl bg-brand-50 dark:bg-brand-900/30 flex items-center justify-center">
            <Lock className="w-7 h-7 text-brand-600 dark:text-brand-400" />
          </div>
        </div>

        <h1 className="font-serif text-2xl font-bold text-center text-gray-900 dark:text-gray-100 mb-1">
          Admin Panel
        </h1>
        <p className="text-center text-sm text-gray-500 dark:text-gray-400 mb-8">
          Enter your GitHub Personal Access Token to edit site content.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              GitHub PAT
            </label>
            <div className="relative">
              <Key className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="password"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                placeholder="ghp_xxxxxxxxxxxxxxxxxxxx"
                autoComplete="current-password"
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500 transition font-mono text-sm"
              />
            </div>
            {error && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-400">{error}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-medium transition-colors"
          >
            Enter Admin Panel
          </button>
        </form>

        <p className="mt-6 text-xs text-center text-gray-400 dark:text-gray-600">
          Your token is stored only in sessionStorage and cleared when the tab is closed.
        </p>
      </div>
    </div>
  )
}
