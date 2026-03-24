import { Navbar } from './Navbar'
import { Footer } from './Footer'

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-200">
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  )
}
