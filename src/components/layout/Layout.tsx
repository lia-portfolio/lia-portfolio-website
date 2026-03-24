import { Navbar } from './Navbar'
import { Footer } from './Footer'

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-bg text-ink transition-colors duration-300">
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  )
}
