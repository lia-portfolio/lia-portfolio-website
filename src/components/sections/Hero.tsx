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

      {/* Gradient fallback when no media — responds to theme */}
      {!hasVideo && !hasImage && (
        <div className="absolute inset-0 bg-gradient-to-br from-brand-100 via-gray-50 to-white dark:from-brand-900 dark:via-gray-900 dark:to-gray-950" />
      )}

      {/* Overlay — lighter in light mode, darker in dark mode */}
      <div className="absolute inset-0 bg-black/10 dark:bg-black/50" />

      {/* Content */}
      <div className="relative z-10 text-center px-6">
        <h1 className="font-serif text-7xl sm:text-8xl md:text-9xl font-bold text-gray-900 dark:text-white drop-shadow-lg tracking-tight">
          {hero.name}
        </h1>
        <p className="mt-4 text-lg sm:text-2xl text-gray-600 dark:text-white/80 font-light tracking-widest uppercase">
          {hero.tagline}
        </p>
        <button
          onClick={scrollToAbout}
          className="mt-10 inline-flex items-center gap-2 text-gray-500 hover:text-gray-900 dark:text-white/60 dark:hover:text-white transition-colors text-sm tracking-wider uppercase"
        >
          Explore
          <ChevronDown className="w-4 h-4 animate-bounce" />
        </button>
      </div>

      {/* Bottom scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <button onClick={scrollToAbout} aria-label="Scroll down">
          <ChevronDown className="w-6 h-6 text-gray-400 dark:text-white/40 animate-bounce" />
        </button>
      </div>
    </section>
  )
}
