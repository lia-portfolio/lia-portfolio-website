import { Mail, Phone, Instagram, Twitter, Linkedin } from 'lucide-react'
import content from '../../data/content.json'
import type { SiteContent } from '../../types/content'

const { contact } = content as SiteContent

const contactItems = [
  {
    icon: Mail,
    label: 'Email',
    href: contact.email ? `mailto:${contact.email}` : null,
    text: contact.email || null,
  },
  {
    icon: Phone,
    label: 'Phone',
    href: contact.phone ? `tel:${contact.phone}` : null,
    text: contact.phone || null,
  },
  {
    icon: Instagram,
    label: 'Instagram',
    href: contact.instagram || null,
    text: contact.instagram ? '@' + contact.instagram.split('/').filter(Boolean).pop() : null,
  },
  {
    icon: Twitter,
    label: 'Twitter / X',
    href: contact.twitter || null,
    text: contact.twitter ? '@' + contact.twitter.split('/').filter(Boolean).pop() : null,
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    href: contact.linkedin || null,
    text: contact.linkedin ? 'LinkedIn' : null,
  },
].filter((item) => item.text !== null)

export function Contact() {
  return (
    <section id="contact" className="py-28 px-6 bg-brand-100/50 dark:bg-[#231b12]/60">
      <div className="max-w-lg mx-auto">
        <div className="flex items-center gap-5 mb-20 justify-center">
          <span className="block flex-1 max-w-[80px] h-px bg-brand-300 dark:bg-brand-700" />
          <h2 className="font-serif italic font-light text-3xl tracking-wide text-brand-900 dark:text-brand-100">
            Contact Me
          </h2>
          <span className="block flex-1 max-w-[80px] h-px bg-brand-300 dark:bg-brand-700" />
        </div>

        <div className="flex flex-col divide-y divide-brand-200 dark:divide-brand-800 border border-brand-200 dark:border-brand-800">
          {contactItems.map(({ icon: Icon, label, href, text }) => (
            <a
              key={label}
              href={href!}
              target={href?.startsWith('mailto') || href?.startsWith('tel') ? undefined : '_blank'}
              rel="noopener noreferrer"
              className="group flex items-center gap-5 px-6 py-5 bg-brand-50 dark:bg-[#1c160f] hover:bg-brand-100 dark:hover:bg-[#231b12] transition-colors"
            >
              <Icon className="w-4 h-4 text-brand-500 dark:text-brand-500 shrink-0" />
              <div>
                <p className="font-sans text-[10px] tracking-widest uppercase text-brand-400 dark:text-brand-600 mb-0.5">
                  {label}
                </p>
                <p className="font-sans text-base text-brand-800 dark:text-brand-200 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                  {text}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
