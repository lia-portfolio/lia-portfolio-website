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
    <section id="contact" className="py-24 px-6 bg-gray-50 dark:bg-gray-900/50">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="font-serif text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">
          Contact Me
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mb-16">
          Get in touch — I'd love to hear from you.
        </p>

        <div className="flex flex-col gap-5">
          {contactItems.map(({ icon: Icon, label, href, text }) => (
            <a
              key={label}
              href={href!}
              target={href?.startsWith('mailto') || href?.startsWith('tel') ? undefined : '_blank'}
              rel="noopener noreferrer"
              className="group flex items-center gap-5 p-5 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md hover:border-brand-200 dark:hover:border-brand-800 transition-all duration-200"
            >
              <div className="w-12 h-12 rounded-xl bg-brand-50 dark:bg-brand-900/30 flex items-center justify-center shrink-0 group-hover:bg-brand-100 dark:group-hover:bg-brand-900/50 transition-colors">
                <Icon className="w-6 h-6 text-brand-600 dark:text-brand-400" />
              </div>
              <div className="text-left">
                <p className="text-xs text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-0.5">
                  {label}
                </p>
                <p className="text-lg font-medium text-gray-900 dark:text-gray-100 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
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
