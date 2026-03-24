import content from '../../data/content.json'
import type { SiteContent } from '../../types/content'

const { about } = content as SiteContent

export function AboutMe() {
  return (
    <section id="about" className="py-28 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Section title */}
        <div className="flex items-center gap-5 mb-20 justify-center">
          <span className="block flex-1 max-w-[80px] h-px bg-brand-300 dark:bg-brand-700" />
          <h2 className="font-serif italic font-light text-3xl tracking-wide text-brand-900 dark:text-brand-100">
            About Me
          </h2>
          <span className="block flex-1 max-w-[80px] h-px bg-brand-300 dark:bg-brand-700" />
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Photo */}
          <div className="flex justify-center md:justify-end">
            {about.photoUrl ? (
              <img
                src={about.photoUrl}
                alt="Lia Viniegra"
                className="w-72 h-72 md:w-80 md:h-80 object-cover shadow-lg border border-brand-200 dark:border-brand-800"
              />
            ) : (
              <div className="w-72 h-72 md:w-80 md:h-80 bg-gradient-to-br from-brand-100 to-brand-200 dark:from-brand-900 dark:to-[#2e2418] border border-brand-200 dark:border-brand-800 flex items-center justify-center shadow-lg">
                <span className="font-serif italic text-5xl font-light text-brand-400 dark:text-brand-600 select-none">
                  L
                </span>
              </div>
            )}
          </div>

          {/* Text */}
          <div className="flex flex-col gap-6">
            <span className="block w-8 h-px bg-brand-500" />
            <p className="font-sans text-lg leading-loose text-brand-800 dark:text-brand-200">
              {about.text}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
