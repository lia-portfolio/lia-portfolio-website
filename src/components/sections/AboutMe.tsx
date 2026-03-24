import content from '../../data/content.json'
import type { SiteContent } from '../../types/content'

const { about } = content as SiteContent

export function AboutMe() {
  return (
    <section id="about" className="py-28 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-5 mb-20 justify-center">
          <span className="block flex-1 max-w-[80px] h-px bg-rim" />
          <h2 className="font-serif italic font-light text-3xl tracking-wide text-ink">
            About Me
          </h2>
          <span className="block flex-1 max-w-[80px] h-px bg-rim" />
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Photo */}
          <div className="flex justify-center md:justify-end">
            {about.photoUrl ? (
              <img
                src={about.photoUrl}
                alt="Lia Viniegra"
                className="w-72 h-72 md:w-80 md:h-80 object-cover shadow-md border border-rim"
              />
            ) : (
              <div className="w-72 h-72 md:w-80 md:h-80 bg-surface border border-rim flex items-center justify-center shadow-md">
                <span className="font-serif italic text-5xl font-light text-muted select-none">L</span>
              </div>
            )}
          </div>

          {/* Text */}
          <div className="flex flex-col gap-6">
            <span className="block w-8 h-px bg-accent" />
            <p className="font-sans text-lg leading-loose text-ink/80">
              {about.text}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
