import { Mail, Phone, Instagram, Twitter, Linkedin, Send } from 'lucide-react'
import content from '../../data/content.json'
import type { SiteContent } from '../../types/content'

const { contact } = content as SiteContent

export function Contact() {
  const socialLinks = [
    {
      icon: Mail,
      label: 'Email',
      href: contact.email ? `mailto:${contact.email}` : null,
      text: contact.email || 'Not set',
    },
    {
      icon: Phone,
      label: 'Phone',
      href: contact.phone ? `tel:${contact.phone}` : null,
      text: contact.phone || 'Not set',
    },
    {
      icon: Instagram,
      label: 'Instagram',
      href: contact.instagram || null,
      text: contact.instagram ? '@' + contact.instagram.split('/').filter(Boolean).pop() : 'Not set',
    },
    {
      icon: Twitter,
      label: 'Twitter / X',
      href: contact.twitter || null,
      text: contact.twitter ? '@' + contact.twitter.split('/').filter(Boolean).pop() : 'Not set',
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      href: contact.linkedin || null,
      text: 'LinkedIn',
    },
  ]

  return (
    <section id="contact" className="py-24 px-6 bg-gray-50 dark:bg-gray-900/50">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-serif text-4xl font-bold text-center mb-4 text-gray-900 dark:text-gray-100">
          Contact Me
        </h2>
        <p className="text-center text-gray-500 dark:text-gray-400 mb-16">
          Get in touch — I'd love to hear from you.
        </p>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact form */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-sm border border-gray-100 dark:border-gray-800">
            <h3 className="font-serif text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">
              Send a Message
            </h3>
            <form
              action={contact.email ? `mailto:${contact.email}` : '#'}
              method="post"
              encType="text/plain"
              className="flex flex-col gap-5"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Jane Doe"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500 transition"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  Your Email
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="jane@example.com"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500 transition"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  Message
                </label>
                <textarea
                  name="message"
                  required
                  rows={5}
                  placeholder="Tell me about your project or inquiry..."
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500 transition resize-none"
                />
              </div>
              <button
                type="submit"
                className="flex items-center justify-center gap-2 w-full py-3 px-6 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-medium transition-colors"
              >
                <Send className="w-4 h-4" />
                Send Message
              </button>
            </form>
          </div>

          {/* Social links */}
          <div className="flex flex-col gap-6 justify-center">
            <div className="w-12 h-1 bg-brand-500 rounded-full" />
            <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
              Whether you're interested in commissioning a piece, collaborating, or just want to say
              hello — feel free to reach out through any of these channels.
            </p>
            <div className="flex flex-col gap-4 mt-4">
              {socialLinks.map(({ icon: Icon, label, href, text }) => (
                <div key={label} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-brand-50 dark:bg-brand-900/30 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-brand-600 dark:text-brand-400" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                      {label}
                    </p>
                    {href ? (
                      <a
                        href={href}
                        target={href.startsWith('mailto') ? undefined : '_blank'}
                        rel="noopener noreferrer"
                        className="text-gray-800 dark:text-gray-200 hover:text-brand-600 dark:hover:text-brand-400 transition-colors font-medium"
                      >
                        {text}
                      </a>
                    ) : (
                      <span className="text-gray-400 dark:text-gray-600 text-sm italic">{text}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
