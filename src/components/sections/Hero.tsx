import { ChevronDown } from 'lucide-react'
import content from '../../data/content.json'
import type { SiteContent } from '../../types/content'

const { hero } = content as SiteContent

const scrollToAbout = () => {
  document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
}

export function Hero() {
  const hasVideo = Boolean(hero.videoUrl)
  const hasImage = Boolean(hero.backgroundUrl)

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={
        !hasVideo && hasImage
          ? {
              backgroundImage: `url(${hero.backgroundUrl})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }
          : undefined
      }
    >
      {/* Video background */}
      {hasVideo && (
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src={hero.videoUrl}
          autoPlay
          muted
          loop
          playsInline
        />
      )}

      {/* Warm gradient fallback */}
      {!hasVideo && !hasImage && (
        <div className="absolute inset-0 bg-gradient-to-b from-brand-100 via-brand-50 to-white dark:from-brand-900 dark:via-[#231b12] dark:to-[#1c160f]" />
      )}

      {/* Subtle overlay for readability over media */}
      <div className="absolute inset-0 bg-black/10 dark:bg-black/40" />

      {/* Content */}
      <div className="relative z-10 text-center px-6">
        <h1 className="font-serif italic font-light text-6xl sm:text-8xl md:text-9xl text-brand-900 dark:text-brand-100 tracking-wide">
          {hero.name}
        </h1>
        <div className="mt-6 flex items-center justify-center gap-4">
          <span className="block w-12 h-px bg-brand-400 dark:bg-brand-600" />
          <p className="font-sans text-xs tracking-[0.35em] uppercase text-brand-600 dark:text-brand-400">
            {hero.tagline}
          </p>
          <span className="block w-12 h-px bg-brand-400 dark:bg-brand-600" />
        </div>
        <button
          onClick={scrollToAbout}
          className="mt-12 inline-flex items-center gap-2 font-sans text-xs tracking-widest uppercase text-brand-500 hover:text-brand-800 dark:text-brand-500 dark:hover:text-brand-200 transition-colors"
        >
          Explore
          <ChevronDown className="w-3 h-3 animate-bounce" />
        </button>
      </div>

      {/* Bottom scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <button onClick={scrollToAbout} aria-label="Scroll down">
          <ChevronDown className="w-5 h-5 text-brand-400 dark:text-brand-600 animate-bounce" />
        </button>
      </div>
    </section>
  )
}
