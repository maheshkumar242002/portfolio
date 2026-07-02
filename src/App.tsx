import { Suspense, lazy, useEffect, useState } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import Footer from './components/Footer'

// Lazy-loaded sections for code-splitting
const AboutSection   = lazy(() => import('./components/AboutSection'))
const ProjectsGrid   = lazy(() => import('./components/ProjectsGrid'))
const ServicesSection = lazy(() => import('./components/ServicesSection'))
const ContactForm    = lazy(() => import('./components/ContactForm'))

function SectionLoader() {
  return (
    <div className="py-24 flex items-center justify-center" aria-label="Loading section" role="status">
      <div className="flex gap-1.5">
        {[0, 1, 2].map(i => (
          <span
            key={i}
            className="w-2.5 h-2.5 rounded-full animate-bounce"
            style={{ backgroundColor: '#00FF00', animationDelay: `${i * 150}ms` }}
            aria-hidden="true"
          />
        ))}
        <span className="sr-only">Loading…</span>
      </div>
    </div>
  )
}

// Scroll-to-top button
function ScrollTopButton() {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className={`fixed bottom-6 right-6 z-50 w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
      style={{ backgroundColor: '#00FF00' }}
      aria-label="Scroll to top"
      tabIndex={visible ? 0 : -1}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="18 15 12 9 6 15" />
      </svg>
    </button>
  )
}

export default function App() {
  return (
    <div className="min-h-screen bg-white text-black font-sans" id="app-root">
      {/* Skip to main content – keyboard accessibility */}
      <a
        href="#hero"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-lg focus:font-bold focus:text-black"
        style={{ backgroundColor: '#00FF00' }}
      >
        Skip to main content
      </a>

      <Header />

      <main id="main-content">
        <Hero />

        <Suspense fallback={<SectionLoader />}>
          <AboutSection />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <ProjectsGrid />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <ServicesSection />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <ContactForm />
        </Suspense>
      </main>

      <Footer />
      <ScrollTopButton />
    </div>
  )
}
