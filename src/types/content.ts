export interface HeroContent {
  name: string
  tagline: string
  backgroundUrl: string
  videoUrl: string
}

export interface AboutContent {
  text: string
  photoUrl: string
}

export interface Painting {
  id: string
  title: string
  imageUrl: string
  videoUrl: string
  description: string
}

export interface OtherWorkItem {
  id: string
  title: string
  imageUrl: string
  videoUrl: string
  description: string
  link: string
}

export interface ContactContent {
  email: string
  phone: string
  instagram: string
  twitter: string
  linkedin: string
}

export interface SiteContent {
  hero: HeroContent
  about: AboutContent
  paintings: Painting[]
  otherWork: OtherWorkItem[]
  contact: ContactContent
}
