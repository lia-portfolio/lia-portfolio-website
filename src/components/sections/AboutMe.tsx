import content from '../../data/content.json'
import type { SiteContent } from '../../types/content'

const { about } = content as SiteContent

export function AboutMe() {
  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-serif text-4xl font-bold text-center mb-16 text-gray-900 dark:text-gray-100">
          About Me
        </h2>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Photo */}
          <div className="flex justify-center md:justify-end">
            {about.photoUrl ? (
              <img
                src={about.photoUrl}
                alt="Lia"
                className="w-72 h-72 md:w-96 md:h-96 rounded-2xl object-cover shadow-2xl"
              />
            ) : (
              <div className="w-72 h-72 md:w-96 md:h-96 rounded-2xl bg-gradient-to-br from-brand-100 to-brand-200 dark:from-brand-900 dark:to-gray-800 flex items-center justify-center shadow-2xl">
                <span className="font-serif text-6xl font-bold text-brand-400 dark:text-brand-300 select-none">
                  L
                </span>
              </div>
            )}
          </div>

          {/* Text */}
          <div className="flex flex-col gap-6">
            <div className="w-12 h-1 bg-brand-500 rounded-full" />
            <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300 font-light">
              {about.text}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
