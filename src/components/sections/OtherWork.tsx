import { ExternalLink } from 'lucide-react'
import content from '../../data/content.json'
import type { SiteContent, OtherWorkItem } from '../../types/content'

const { otherWork } = content as SiteContent

const PLACEHOLDER_COLORS = [
  'from-stone-200 to-amber-100 dark:from-stone-800 dark:to-stone-900',
  'from-rose-100 to-pink-100 dark:from-rose-900 dark:to-stone-900',
  'from-amber-100 to-yellow-50 dark:from-amber-900 dark:to-stone-900',
  'from-orange-100 to-red-100 dark:from-orange-900 dark:to-stone-900',
]

function WorkCard({ item, index }: { item: OtherWorkItem; index: number }) {
  const gradient = PLACEHOLDER_COLORS[index % PLACEHOLDER_COLORS.length]

  const media = item.videoUrl ? (
    <video src={item.videoUrl} className="w-full h-full object-cover" autoPlay muted loop playsInline />
  ) : item.imageUrl ? (
    <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
  ) : (
    <div className={`w-full h-full bg-gradient-to-br ${gradient} flex items-center justify-center`}>
      <span className="font-serif italic text-3xl font-light text-muted select-none">{item.title[0]}</span>
    </div>
  )

  const inner = (
    <div className="group border border-rim hover:border-accent transition-all duration-300 shadow-sm hover:shadow-md">
      <div className="aspect-video overflow-hidden">{media}</div>
      <div className="p-5 bg-surface">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-serif italic font-light text-lg text-ink">{item.title}</h3>
          {item.link && (
            <ExternalLink className="w-3.5 h-3.5 text-muted shrink-0 mt-1 group-hover:text-accent transition-colors" />
          )}
        </div>
        <p className="mt-2 font-sans text-sm text-muted leading-relaxed">{item.description}</p>
      </div>
    </div>
  )

  if (item.link) {
    return (
      <a href={item.link} target="_blank" rel="noopener noreferrer" className="block focus:outline-none focus:ring-1 focus:ring-accent">
        {inner}
      </a>
    )
  }
  return <div>{inner}</div>
}

export function OtherWork() {
  return (
    <section id="other-work" className="py-28 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-5 mb-20 justify-center">
          <span className="block flex-1 max-w-[80px] h-px bg-rim" />
          <h2 className="font-serif italic font-light text-3xl tracking-wide text-ink">Other Work</h2>
          <span className="block flex-1 max-w-[80px] h-px bg-rim" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {otherWork.map((item, i) => (
            <WorkCard key={item.id} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
