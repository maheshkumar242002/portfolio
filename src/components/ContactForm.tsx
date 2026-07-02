import { useState, useRef } from 'react'
import { SOCIAL_LINKS } from '../data'
import emailjs from '@emailjs/browser'

interface FormState {
  name: string
  email: string
  subject: string
  message: string
}

type Status = 'idle' | 'loading' | 'success' | 'error'

function GitHubIcon() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.757-1.333-1.757-1.089-.745.084-.729.084-.729 1.205.084 1.84 1.236 1.84 1.236 1.07 1.835 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23a11.52 11.52 0 013.003-.404c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.605-.015 2.905-.015 3.3 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
}
function LinkedInIcon() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
}
function TwitterIcon() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.741l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
}

const ICONS: Record<string, React.FC> = {
  github: GitHubIcon,
  linkedin: LinkedInIcon,
  twitter: TwitterIcon,
}

const CONTACT_INFO = [
  { icon: '📧', label: 'Email',    value: 'mahesh@gmail.com',    href: 'mailto:mahesh@kdt.org.in' },
  { icon: '🌍', label: 'Timezone', value: 'IST (UTC+5:30)',       href: null                       },
]

export default function ContactForm() {
  const [form, setForm] = useState<FormState>({ name: '', email: '', subject: '', message: '' })
  const [errors, setErrors] = useState<Partial<FormState>>({})
  const [status, setStatus] = useState<Status>('idle')
  const firstErrorRef = useRef<HTMLInputElement | null>(null)

  const validate = (): boolean => {
    const e: Partial<FormState> = {}
    if (!form.name.trim())    e.name = 'Please enter your name'
    if (!form.email.trim())   e.email = 'Please enter your email'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Please enter a valid email'
    if (!form.message.trim()) e.message = 'Please enter a message'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setStatus('loading')

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

    // Fallback if environment variables are not configured
    if (!serviceId || serviceId === 'your_service_id' || !templateId || templateId === 'your_template_id' || !publicKey || publicKey === 'your_public_key') {
      console.warn('EmailJS environment variables are not configured. Simulating form submission.')
      await new Promise(r => setTimeout(r, 1200))
      setStatus('success')
      setForm({ name: '', email: '', subject: '', message: '' })
      setErrors({})
      return
    }

    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: form.name,
          from_email: form.email,
          subject: form.subject || 'Portfolio Inquiry',
          message: form.message,
          to_name: 'Mahesh Kumar',
        },
        publicKey
      )
      setStatus('success')
      setForm({ name: '', email: '', subject: '', message: '' })
      setErrors({})
    } catch (err) {
      console.error('EmailJS error:', err)
      setStatus('error')
    }
  }

  const field = (id: keyof FormState) => ({
    id,
    name: id,
    value: form[id],
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm(f => ({ ...f, [id]: e.target.value })),
    'aria-describedby': errors[id] ? `${id}-error` : undefined,
    'aria-invalid': !!errors[id],
  })

  return (
    <section
      id="contact"
      className="py-24 bg-gray-50"
      aria-labelledby="contact-heading"
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="section-label mb-3">Let's Talk</p>
          <h2
            id="contact-heading"
            className="text-4xl md:text-5xl font-black text-black"
          >
            Get In <span className="text-gradient">Touch</span>
          </h2>
          <p className="mt-4 text-gray-500 max-w-lg mx-auto">
            Have a project in mind? I'd love to hear about it. Let's build something great together.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Contact info */}
          <aside className="lg:col-span-2 space-y-6" aria-label="Contact information">
            {/* Info cards */}
            {CONTACT_INFO.map(c => (
              <div
                key={c.label}
                className="flex items-start gap-4 p-5 rounded-2xl border border-gray-200 bg-white hover:border-green-300 transition-colors"
              >
                <span className="text-2xl flex-shrink-0" aria-hidden="true">{c.icon}</span>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-0.5">{c.label}</p>
                  {c.href ? (
                    <a
                      href={c.href}
                      className="text-sm font-semibold text-black hover:text-green-600 transition-colors"
                      {...(c.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    >
                      {c.value}
                    </a>
                  ) : (
                    <p className="text-sm font-semibold text-black">{c.value}</p>
                  )}
                </div>
              </div>
            ))}

            {/* Social links */}
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Follow Along</p>
              <div className="flex gap-3">
                {SOCIAL_LINKS.map(s => {
                  const Icon = ICONS[s.icon]
                  return (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-11 h-11 rounded-xl flex items-center justify-center border border-gray-200 bg-white text-gray-600 hover:text-black hover:border-green-400 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5"
                      aria-label={`${s.label} profile`}
                    >
                      {Icon && <Icon />}
                    </a>
                  )
                })}
              </div>
            </div>

            {/* Availability card */}
            <div
              className="rounded-2xl p-6 text-center"
              style={{ background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)' }}
              role="status"
              aria-label="Current availability"
            >
              <div
                className="w-3 h-3 rounded-full mx-auto mb-3 animate-pulse"
                style={{ backgroundColor: '#00FF00' }}
                aria-hidden="true"
              />
              <p className="text-white font-black text-sm">Currently Available</p>
              <p className="text-gray-400 text-xs mt-1">Typically responds within 24 hours</p>
            </div>
          </aside>

          {/* Form */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl border border-gray-200 p-8">
              {status === 'success' ? (
                <div
                  className="text-center py-12"
                  role="alert"
                  aria-live="polite"
                >
                  <div
                    className="w-20 h-20 rounded-full mx-auto flex items-center justify-center text-4xl mb-6"
                    style={{ backgroundColor: 'rgba(0,255,0,0.12)' }}
                    aria-hidden="true"
                  >
                    ✅
                  </div>
                  <h3 className="text-2xl font-black text-black mb-2">Message Sent!</h3>
                  <p className="text-gray-600">Thanks for reaching out. I'll get back to you within 24 hours.</p>
                  <button
                    className="btn-brand mt-8"
                    onClick={() => setStatus('idle')}
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  noValidate
                  aria-label="Contact form"
                >
                  <fieldset disabled={status === 'loading'} className="border-0 p-0 m-0 space-y-5">
                    <legend className="sr-only">Send Mahesh a message</legend>

                    <div className="grid sm:grid-cols-2 gap-5">
                      {/* Name */}
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-sm font-semibold text-gray-700 mb-1.5"
                        >
                          Name <span aria-hidden="true" className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          autoComplete="name"
                          placeholder="Jane Smith"
                          ref={el => { if (errors.name && !firstErrorRef.current) firstErrorRef.current = el }}
                          className={`w-full px-4 py-3 rounded-xl border text-sm text-black placeholder-gray-400 bg-gray-50 transition-all duration-200 focus:outline-none focus:bg-white focus:border-green-400 focus:shadow-sm ${
                            errors.name ? 'border-red-400' : 'border-gray-200'
                          }`}
                          {...field('name')}
                        />
                        {errors.name && (
                          <p id="name-error" className="mt-1.5 text-xs text-red-500" role="alert">{errors.name}</p>
                        )}
                      </div>

                      {/* Email */}
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-semibold text-gray-700 mb-1.5"
                        >
                          Email <span aria-hidden="true" className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          autoComplete="email"
                          placeholder="jane@company.com"
                          className={`w-full px-4 py-3 rounded-xl border text-sm text-black placeholder-gray-400 bg-gray-50 transition-all duration-200 focus:outline-none focus:bg-white focus:border-green-400 focus:shadow-sm ${
                            errors.email ? 'border-red-400' : 'border-gray-200'
                          }`}
                          {...field('email')}
                        />
                        {errors.email && (
                          <p id="email-error" className="mt-1.5 text-xs text-red-500" role="alert">{errors.email}</p>
                        )}
                      </div>
                    </div>

                    {/* Subject */}
                    <div>
                      <label
                        htmlFor="subject"
                        className="block text-sm font-semibold text-gray-700 mb-1.5"
                      >
                        Subject <span className="text-gray-400 font-normal text-xs">(optional)</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Project inquiry / Collaboration / Question"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-black placeholder-gray-400 bg-gray-50 transition-all duration-200 focus:outline-none focus:bg-white focus:border-green-400 focus:shadow-sm"
                        {...field('subject')}
                      />
                    </div>

                    {/* Message */}
                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-semibold text-gray-700 mb-1.5"
                      >
                        Message <span aria-hidden="true" className="text-red-500">*</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={6}
                        placeholder="Tell me about your project, timeline, and budget..."
                        value={form.message}
                        onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                        aria-describedby={errors.message ? 'message-error' : undefined}
                        aria-invalid={!!errors.message}
                        className={`w-full px-4 py-3 rounded-xl border text-sm text-black placeholder-gray-400 bg-gray-50 transition-all duration-200 focus:outline-none focus:bg-white focus:border-green-400 focus:shadow-sm resize-none ${
                          errors.message ? 'border-red-400' : 'border-gray-200'
                        }`}
                      />
                      {errors.message && (
                        <p id="message-error" className="mt-1.5 text-xs text-red-500" role="alert">{errors.message}</p>
                      )}
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      id="contact-submit-btn"
                      className="btn-brand w-full justify-center text-base py-3.5"
                      aria-busy={status === 'loading'}
                    >
                      {status === 'loading' ? (
                        <>
                          <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                          </svg>
                          Sending…
                        </>
                      ) : (
                        <>
                          <span aria-hidden="true">✉</span>
                          Send Message
                        </>
                      )}
                    </button>
                  </fieldset>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
