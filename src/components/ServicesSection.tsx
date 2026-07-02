import { SERVICES } from '../data'
import type { Service } from '../types'

function ServiceCard({ service, index }: { service: Service; index: number }) {
  return (
    <article
      className="group relative rounded-2xl border border-gray-200 bg-white p-7 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-green-300 overflow-hidden"
      aria-label={`Service: ${service.title}`}
    >
      {/* Hover background glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ background: 'linear-gradient(135deg, rgba(0,255,0,0.04) 0%, transparent 60%)' }}
        aria-hidden="true"
      />

      {/* Index number */}
      <span
        className="absolute top-4 right-6 text-5xl font-black text-gray-100 group-hover:text-green-100 transition-colors duration-300 select-none leading-none"
        aria-hidden="true"
      >
        {String(index + 1).padStart(2, '0')}
      </span>

      {/* Icon */}
      <div
        className="relative w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-5 transition-transform duration-200 group-hover:scale-110"
        style={{ backgroundColor: 'rgba(0,255,0,0.12)' }}
        aria-hidden="true"
      >
        {service.icon}
      </div>

      <h3 className="relative text-lg font-black text-black mb-2">{service.title}</h3>
      <p className="relative text-sm text-gray-600 leading-relaxed mb-5">{service.description}</p>

      {/* Highlights */}
      <ul className="relative space-y-2" aria-label={`${service.title} highlights`}>
        {service.highlights.map(h => (
          <li key={h} className="flex items-start gap-2 text-sm text-gray-700">
            <span
              className="mt-0.5 w-4 h-4 rounded-full flex-shrink-0 flex items-center justify-center"
              style={{ backgroundColor: '#00FF00' }}
              aria-hidden="true"
            >
              <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                <path d="M1.5 4L3.5 6L6.5 2" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            {h}
          </li>
        ))}
      </ul>

      {/* Bottom accent line */}
      <div
        className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full transition-all duration-500 rounded-b-2xl"
        style={{ backgroundColor: '#00FF00' }}
        aria-hidden="true"
      />
    </article>
  )
}

export default function ServicesSection() {
  return (
    <section
      id="services"
      className="py-24 bg-white"
      aria-labelledby="services-heading"
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="section-label mb-3">What I Do</p>
          <h2
            id="services-heading"
            className="text-4xl md:text-5xl font-black text-black"
          >
            My <span className="text-gradient">Services</span>
          </h2>
          <p className="mt-4 text-gray-500 max-w-lg mx-auto">
            End-to-end frontend expertise — from initial architecture to final deployment.
          </p>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} />
          ))}
        </div>

        {/* Process timeline */}
        <div
          className="mt-20 rounded-2xl p-8 md:p-12"
          style={{ background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)' }}
          aria-label="My work process"
        >
          <h3 className="text-2xl font-black text-white text-center mb-10">
            How I <span className="text-gradient">Work</span>
          </h3>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6 relative">
            {/* Connector line (desktop) */}
            <div
              className="hidden md:block absolute top-6 left-[12.5%] right-[12.5%] h-0.5"
              style={{ backgroundColor: 'rgba(0,255,0,0.2)' }}
              aria-hidden="true"
            />

            {[
              { step: '01', title: 'Discover',  desc: 'Deep-dive into your goals, users, and constraints.' },
              { step: '02', title: 'Design',    desc: 'Wireframes, system design, and tech architecture.'  },
              { step: '03', title: 'Build',     desc: 'Clean, tested, documented code — sprint by sprint.' },
              { step: '04', title: 'Launch',    desc: 'CI/CD deploy, performance audit, and handoff.'      },
            ].map(p => (
              <div key={p.step} className="text-center relative">
                <div
                  className="w-12 h-12 rounded-full mx-auto flex items-center justify-center font-black text-black text-sm mb-4 relative z-10"
                  style={{ backgroundColor: '#00FF00' }}
                  aria-hidden="true"
                >
                  {p.step}
                </div>
                <h4 className="text-white font-black mb-1">{p.title}</h4>
                <p className="text-gray-400 text-sm">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
