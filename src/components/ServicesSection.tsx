import { useEffect, useRef, useState } from 'react'
import { SERVICES, PROCESS_STEPS } from '../data'
import type { Service } from '../types'

// Service Icons (SVG)
const SERVICE_ICONS: Record<string, React.FC<{ className?: string }>> = {
  web: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  ),
  mobile: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
      <line x1="12" y1="18" x2="12.01" y2="18" />
    </svg>
  ),
  desktop: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
      <path d="M6 7h.01M9 7h.01" />
    </svg>
  ),
  custom: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </svg>
  ),
  design: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 19l7-7 3 3-7 7-3-3z" />
      <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
      <path d="M2 2l7.586 7.586" />
      <circle cx="11" cy="11" r="2" />
    </svg>
  ),
  support: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
  ),
}

// Check Icon
function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path 
        d="M2.5 7.5L5.5 10.5L11.5 3.5" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </svg>
  )
}

// Service Card Component
function ServiceCard({ service, index }: { service: Service; index: number }) {
  const [isVisible, setIsVisible] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 }
    )

    if (cardRef.current) {
      observer.observe(cardRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const Icon = SERVICE_ICONS[service.icon] || SERVICE_ICONS.web

  return (
    <article
      ref={cardRef}
      className={`group relative rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-card)] p-6 transition-all duration-500 hover:border-[var(--color-primary)] hover:shadow-[var(--shadow-lg)] overflow-hidden ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {/* Hover background glow */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary)] to-transparent opacity-0 group-hover:opacity-5 transition-opacity duration-300"
        aria-hidden="true"
      />

      {/* Index number */}
      <span 
        className="absolute top-4 right-4 text-5xl font-black text-[var(--color-border)] group-hover:text-[var(--color-primary-muted)] transition-colors duration-300 select-none"
        aria-hidden="true"
      >
        {String(index + 1).padStart(2, '0')}
      </span>

      {/* Icon */}
      <div className="relative mb-4">
        <div className="w-14 h-14 rounded-xl bg-[var(--color-primary-muted)] flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
          <Icon className="w-7 h-7 text-[var(--color-primary)]" />
        </div>
      </div>

      {/* Title & Description */}
      <h3 className="relative text-lg font-black text-[var(--color-text-primary)] mb-2 group-hover:text-[var(--color-primary)] transition-colors">
        {service.title}
      </h3>
      <p className="relative text-sm text-[var(--color-text-secondary)] leading-relaxed mb-4">
        {service.description}
      </p>

      {/* Starting Price */}
      <div className="relative mb-4 pb-4 border-b border-[var(--color-border)]">
        <span className="text-xs text-[var(--color-text-muted)] uppercase tracking-wide">Starting from</span>
        <p className="text-2xl font-black text-gradient">₹{service.startingPrice.toLocaleString('en-IN')}</p>
      </div>

      {/* Highlights */}
      <ul className="relative space-y-2">
        {service.highlights.slice(0, 4).map((highlight) => (
          <li key={highlight} className="flex items-start gap-2 text-sm text-[var(--color-text-secondary)]">
            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[var(--color-primary)] flex items-center justify-center mt-0.5 text-white">
              <CheckIcon />
            </span>
            <span className="text-[var(--color-text-secondary)]">{highlight}</span>
          </li>
        ))}
      </ul>

      {/* Bottom accent line */}
      <div 
        className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-light)] group-hover:w-full transition-all duration-500"
        aria-hidden="true"
      />
    </article>
  )
}

// Process Step Component
function ProcessStep({ step, index, total }: { step: { step: string; title: string; desc: string }; index: number; total: number }) {
  return (
    <div className="relative text-center">
      {/* Step number */}
      <div 
        className="w-14 h-14 rounded-full mx-auto flex items-center justify-center font-black text-[var(--color-text-inverted)] text-sm mb-4 relative z-10 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-dark)]"
      >
        {step.step}
      </div>
      
      {/* Connector line */}
      {index < total - 1 && (
        <div 
          className="hidden md:block absolute top-7 left-[calc(50%+28px)] w-[calc(100%-56px)] h-0.5 bg-[var(--color-border)]"
          aria-hidden="true"
        />
      )}
      
      <h4 className="text-lg font-bold text-[var(--color-text-primary)] mb-2">{step.title}</h4>
      <p className="text-sm text-[var(--color-text-secondary)]">{step.desc}</p>
    </div>
  )
}

export default function ServicesSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="services"
      className="py-24 bg-[var(--color-bg-secondary)]"
      aria-labelledby="services-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <p className="section-label mb-3">Our Services</p>
          <h2 id="services-heading" className="section-title">
            What We <span className="text-gradient">Offer</span>
          </h2>
          <p className="section-description mx-auto mt-4">
            Full-spectrum software development services tailored to your business needs.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} />
          ))}
        </div>

        {/* Process Timeline */}
        <div className={`mt-24 transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="rounded-3xl p-8 md:p-12 bg-[var(--color-bg-card)] border border-[var(--color-border)]">
            <h3 className="text-2xl md:text-3xl font-black text-[var(--color-text-primary)] text-center mb-12">
              How We <span className="text-gradient">Work</span>
            </h3>
            
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
              {PROCESS_STEPS.map((step, i) => (
                <ProcessStep key={step.step} step={step} index={i} total={PROCESS_STEPS.length} />
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className={`mt-16 text-center transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <p className="text-[var(--color-text-secondary)] mb-6">
            Ready to start your project? Let's discuss how we can help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-primary"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="1" x2="12" y2="23" />
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
              View Pricing
            </button>
            <button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-secondary"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
              Get in Touch
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
