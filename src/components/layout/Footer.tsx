export function Footer() {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 py-8">
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="font-serif text-lg font-bold tracking-tight text-gray-900 dark:text-gray-100">
          Lia
        </span>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          © {new Date().getFullYear()} Lia Viniegra. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
