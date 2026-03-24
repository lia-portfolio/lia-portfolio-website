export function Footer() {
  return (
    <footer className="border-t border-rim py-10">
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="font-serif italic text-lg tracking-wide text-ink">
          Lia Viniegra
        </span>
        <p className="font-sans text-xs tracking-widest uppercase text-muted">
          © {new Date().getFullYear()} Lia Viniegra. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
