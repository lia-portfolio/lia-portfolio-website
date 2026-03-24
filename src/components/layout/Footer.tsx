export function Footer() {
  return (
    <footer className="border-t border-brand-200 dark:border-brand-800 py-10">
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="font-serif italic text-lg tracking-wide text-brand-800 dark:text-brand-200">
          Lia Viniegra
        </span>
        <p className="font-sans text-xs tracking-widest uppercase text-brand-500 dark:text-brand-500">
          © {new Date().getFullYear()} Lia Viniegra. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
