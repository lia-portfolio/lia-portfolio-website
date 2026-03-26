import { useState } from 'react'
import { AdminLogin } from './AdminLogin'
import { AdminPanel } from './AdminPanel'
import { ErrorBoundary } from '../App'

export function AdminRoute() {
  const [token, setToken] = useState<string | null>(
    () => sessionStorage.getItem('gh_pat')
  )

  if (!token) {
    return <AdminLogin onLogin={setToken} />
  }

  return (
    <ErrorBoundary>
      <AdminPanel
        token={token}
        onLogout={() => {
          sessionStorage.removeItem('gh_pat')
          setToken(null)
        }}
      />
    </ErrorBoundary>
  )
}
