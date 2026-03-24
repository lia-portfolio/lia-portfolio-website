import { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import content from '../../data/content.json'
import type { SiteContent, Painting } from '../../types/content'

const { paintings } = content as SiteContent

const PLACEHOLDER_COLORS = [
  'from-stone-200 to-amber-100 dark:from-stone-800 dark:to-stone-900',
  'from-rose-100 to-pink-100 dark:from-rose-900 dark:to-stone-900',
  'from-amber-100 to-yellow-50 dark:from-amber-900 dark:to-stone-900',
  'from-orange-100 to-red-100 dark:from-orange-900 dark:to-stone-900',
  'from-emerald-50 to-teal-50 dark:from-emerald-900 dark:to-stone-900',
  'from-sky-50 to-indigo-100 dark:from-sky-900 dark:to-stone-900',
]

function MediaPreview({ painting, gradient }: { painting: Painting; gradient: string }) {
  if (painting.videoUrl) {
    return (
      <video
        src={painting.videoUrl}
        className="w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
      />
    )
  }
  if (painting.imageUrl) {
    return <img src={painting.imageUrl} alt={painting.title} className="w-full h-full object-cover" />
  }
  return (
    <div className={`w-full h-full bg-gradient-to-br ${gradient} flex items-center justify-center`}>
      <span className="font-serif italic text-3xl font-light text-brand-400 dark:text-brand-600 select-none">
        {painting.title[0]}
      </span>
    </div>
  )
}

function LightboxMedia({ painting }: { painting: Painting }) {
  if (painting.videoUrl) {
    return <video src={painting.videoUrl} className="w-full max-h-[80vh]" controls autoPlay />
  }
  if (painting.imageUrl) {
    return (
      <img
        src={painting.imageUrl}
        alt={painting.title}
        className="w-full max-h-[80vh] object-contain"
      />
    )
  }
  return (
    <div className="w-full aspect-[4/5] max-h-[70vh] bg-gradient-to-br from-brand-900 to-[#2e2418] flex items-center justify-center">
      <span className="font-serif italic text-7xl font-light text-brand-700 select-none">
        {painting.title[0]}
      </span>
    </div>
  )
}

function PaintingCard({
  painting,
  index,
  onClick,
}: {
  painting: Painting
  index: number
  onClick: (p: Painting) => void
}) {
  const gradient = PLACEHOLDER_COLORS[index % PLACEHOLDER_COLORS.length]

  return (
    <button
      onClick={() => onClick(painting)}
      className="group relative overflow-hidden border border-brand-200 dark:border-brand-800 shadow-sm hover:shadow-md hover:border-brand-400 dark:hover:border-brand-600 transition-all duration-300 focus:outline-none focus:ring-1 focus:ring-brand-500"
      aria-label={`View ${painting.title}`}
    >
      <div className="aspect-[4/5]">
        <MediaPreview painting={painting} gradient={gradient} />
      </div>
      {/* Hover overlay */}
      <div className="absolute inset-0 bg-brand-900/0 group-hover:bg-brand-900/50 transition-all duration-400 flex flex-col items-center justify-end p-5">
        <div className="translate-y-3 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300 text-center">
          <p className="font-serif italic text-base font-light text-white">{painting.title}</p>
          <p className="font-sans text-xs text-white/70 mt-1 tracking-wide">{painting.description}</p>
        </div>
      </div>
    </button>
  )
}

export function Paintings() {
  const [selected, setSelected] = useState<Painting | null>(null)

  useEffect(() => {
    if (!selected) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelected(null)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [selected])

  return (
    <section id="paintings" className="py-28 px-6 bg-brand-100/50 dark:bg-[#231b12]/60">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-5 mb-20 justify-center">
          <span className="block flex-1 max-w-[80px] h-px bg-brand-300 dark:bg-brand-700" />
          <h2 className="font-serif italic font-light text-3xl tracking-wide text-brand-900 dark:text-brand-100">
            My Paintings
          </h2>
          <span className="block flex-1 max-w-[80px] h-px bg-brand-300 dark:bg-brand-700" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {paintings.map((painting, i) => (
            <PaintingCard
              key={painting.id}
              painting={painting}
              index={i}
              onClick={setSelected}
            />
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selected && (
        <div
          className="fixed inset-0 z-50 bg-brand-900/95 flex items-center justify-center p-6"
          onClick={() => setSelected(null)}
        >
          <button
            className="absolute top-6 right-6 text-brand-300 hover:text-white transition-colors"
            onClick={() => setSelected(null)}
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="max-w-3xl w-full" onClick={(e) => e.stopPropagation()}>
            <LightboxMedia painting={selected} />
            <div className="mt-5 text-center border-t border-brand-700 pt-5">
              <h3 className="font-serif italic font-light text-xl text-brand-100">{selected.title}</h3>
              <p className="font-sans text-xs tracking-widest uppercase text-brand-400 mt-1">{selected.description}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
