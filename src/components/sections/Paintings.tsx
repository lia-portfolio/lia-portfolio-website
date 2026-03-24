import { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import content from '../../data/content.json'
import type { SiteContent, Painting } from '../../types/content'

const { paintings } = content as SiteContent

const PLACEHOLDER_COLORS = [
  'from-brand-200 to-brand-300 dark:from-brand-900 dark:to-gray-800',
  'from-rose-200 to-pink-300 dark:from-rose-900 dark:to-gray-800',
  'from-violet-200 to-purple-300 dark:from-violet-900 dark:to-gray-800',
  'from-amber-200 to-orange-300 dark:from-amber-900 dark:to-gray-800',
  'from-teal-200 to-cyan-300 dark:from-teal-900 dark:to-gray-800',
  'from-lime-200 to-green-300 dark:from-lime-900 dark:to-gray-800',
]

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
      className="group relative overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-brand-500"
      aria-label={`View ${painting.title}`}
    >
      <div className="aspect-[4/5]">
        {painting.imageUrl ? (
          <img
            src={painting.imageUrl}
            alt={painting.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className={`w-full h-full bg-gradient-to-br ${gradient} flex items-center justify-center`}>
            <span className="font-serif text-4xl font-bold text-white/40 select-none">
              {painting.title[0]}
            </span>
          </div>
        )}
      </div>
      {/* Hover overlay */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex flex-col items-center justify-end p-6">
        <div className="translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300 text-center">
          <p className="font-serif text-lg font-bold text-white">{painting.title}</p>
          <p className="text-sm text-white/80 mt-1">{painting.description}</p>
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
    <section id="paintings" className="py-24 px-6 bg-gray-50 dark:bg-gray-900/50">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-serif text-4xl font-bold text-center mb-4 text-gray-900 dark:text-gray-100">
          My Paintings
        </h2>
        <p className="text-center text-gray-500 dark:text-gray-400 mb-16">
          Click a painting to view it in detail
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-6"
          onClick={() => setSelected(null)}
        >
          <button
            className="absolute top-6 right-6 text-white/60 hover:text-white transition-colors"
            onClick={() => setSelected(null)}
            aria-label="Close"
          >
            <X className="w-8 h-8" />
          </button>

          <div
            className="max-w-3xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            {selected.imageUrl ? (
              <img
                src={selected.imageUrl}
                alt={selected.title}
                className="w-full max-h-[80vh] object-contain rounded-lg"
              />
            ) : (
              <div className="w-full aspect-[4/5] max-h-[70vh] bg-gradient-to-br from-brand-900 to-gray-800 rounded-lg flex items-center justify-center">
                <span className="font-serif text-8xl font-bold text-white/20 select-none">
                  {selected.title[0]}
                </span>
              </div>
            )}
            <div className="mt-4 text-center">
              <h3 className="font-serif text-2xl font-bold text-white">{selected.title}</h3>
              <p className="text-white/60 mt-1">{selected.description}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
