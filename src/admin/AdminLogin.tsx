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
    <div className="min-h-screen bg-bg flex items-center justify-center px-6">
      <div className="w-full max-w-md bg-surface border border-rim p-8">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-14 h-14 bg-bg border border-rim flex items-center justify-center">
            <Lock className="w-7 h-7 text-accent" />
          </div>
        </div>

        <h1 className="font-serif italic text-2xl font-light text-center text-ink mb-1">
          Admin Panel
        </h1>
        <p className="text-center text-sm text-muted mb-8">
          Enter your GitHub Personal Access Token to edit site content.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div>
            <label className="block text-sm font-medium text-ink mb-1.5">
              GitHub PAT
            </label>
            <div className="relative">
              <Key className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
              <input
                type="password"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                placeholder="ghp_xxxxxxxxxxxxxxxxxxxx"
                autoComplete="current-password"
                className="w-full pl-10 pr-4 py-3 border border-rim bg-bg text-ink placeholder-muted focus:outline-none focus:ring-1 focus:ring-accent transition font-mono text-sm"
              />
            </div>
            {error && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-400">{error}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-accent hover:bg-accent/80 text-bg font-medium transition-colors text-sm tracking-wide"
          >
            Enter Admin Panel
          </button>
        </form>

        <p className="mt-6 text-xs text-center text-muted">
          Your token is stored only in sessionStorage and cleared when the tab is closed.
        </p>
      </div>
    </div>
  )
}
