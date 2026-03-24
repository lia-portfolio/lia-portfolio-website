import { ExternalLink } from 'lucide-react'
import content from '../../data/content.json'
import type { SiteContent, OtherWorkItem } from '../../types/content'

const { otherWork } = content as SiteContent

const PLACEHOLDER_COLORS = [
  'from-cyan-200 to-blue-300 dark:from-cyan-900 dark:to-gray-800',
  'from-emerald-200 to-teal-300 dark:from-emerald-900 dark:to-gray-800',
  'from-orange-200 to-red-300 dark:from-orange-900 dark:to-gray-800',
  'from-indigo-200 to-violet-300 dark:from-indigo-900 dark:to-gray-800',
]

function WorkCard({ item, index }: { item: OtherWorkItem; index: number }) {
  const gradient = PLACEHOLDER_COLORS[index % PLACEHOLDER_COLORS.length]

  const inner = (
    <div className="group relative overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
      <div className="aspect-video">
        {item.imageUrl ? (
          <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
        ) : (
          <div
            className={`w-full h-full bg-gradient-to-br ${gradient} flex items-center justify-center`}
          >
            <span className="font-serif text-4xl font-bold text-white/40 select-none">
              {item.title[0]}
            </span>
          </div>
        )}
      </div>
      <div className="p-5 bg-white dark:bg-gray-900">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-serif text-lg font-bold text-gray-900 dark:text-gray-100">
            {item.title}
          </h3>
          {item.link && (
            <ExternalLink className="w-4 h-4 text-gray-400 dark:text-gray-500 shrink-0 mt-1 group-hover:text-brand-500 transition-colors" />
          )}
        </div>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{item.description}</p>
      </div>
    </div>
  )

  if (item.link) {
    return (
      <a href={item.link} target="_blank" rel="noopener noreferrer" className="focus:outline-none focus:ring-2 focus:ring-brand-500 rounded-2xl block">
        {inner}
      </a>
    )
  }

  return <div>{inner}</div>
}

export function OtherWork() {
  return (
    <section id="other-work" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-serif text-4xl font-bold text-center mb-16 text-gray-900 dark:text-gray-100">
          Other Work
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {otherWork.map((item, i) => (
            <WorkCard key={item.id} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
