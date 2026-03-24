import { ChevronDown } from 'lucide-react'
import content from '../../data/content.json'
import type { SiteContent } from '../../types/content'

const { hero } = content as SiteContent

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

      {/* Gradient fallback when no media */}
      {!hasVideo && !hasImage && (
        <div className="absolute inset-0 bg-gradient-to-br from-brand-900 via-gray-900 to-gray-950" />
      )}

      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content */}
      <div className="relative z-10 text-center px-6">
        <h1 className="font-serif text-7xl sm:text-8xl md:text-9xl font-bold text-white drop-shadow-lg tracking-tight">
          {hero.name}
        </h1>
        <p className="mt-4 text-lg sm:text-2xl text-white/80 font-light tracking-widest uppercase">
          {hero.tagline}
        </p>
        <a
          href="#about"
          className="mt-10 inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm tracking-wider uppercase"
        >
          Explore
          <ChevronDown className="w-4 h-4 animate-bounce" />
        </a>
      </div>

      {/* Bottom scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <ChevronDown className="w-6 h-6 text-white/40 animate-bounce" />
      </div>
    </section>
  )
}
