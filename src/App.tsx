import { Suspense, lazy, useEffect, useState } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import Footer from './components/Footer'

// Lazy-loaded sections for code-splitting
const ServicesSection = lazy(() => import('./components/ServicesSection'))
const TechnologiesSection = lazy(() => import('./components/TechnologiesSection'))
const ProjectsGrid = lazy(() => import('./components/ProjectsGrid'))
const PricingSection = lazy(() => import('./components/PricingSection'))
const TeamSection = lazy(() => import('./components/TeamSection'))
const ContactForm = lazy(() => import('./components/ContactForm'))

// Loading spinner component
function SectionLoader() {
  return (
    <div className="py-24 flex items-center justify-center" aria-label="Loading section" role="status">
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-12 h-12">
          <div className="absolute inset-0 rounded-full border-4 border-[var(--color-border)]" />
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-[var(--color-primary)] animate-spin" />
        </div>
        <span className="text-sm text-[var(--color-text-muted)] font-medium">Loading...</span>
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
      className={`fixed bottom-6 right-6 z-50 w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 shadow-lg border border-[var(--color-border)] bg-[var(--color-bg-card)] text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] hover:border-[var(--color-primary)] hover:shadow-[var(--shadow-glow)] ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
      aria-label="Scroll to top"
      tabIndex={visible ? 0 : -1}
    >
      <svg 
        width="20" 
        height="20" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      >
        <polyline points="18 15 12 9 6 15" />
      </svg>
    </button>
  )
}

export default function App() {
  return (
    <div 
      className="min-h-screen bg-[var(--color-bg-primary)] text-[var(--color-text-primary)] font-sans transition-colors duration-300 overflow-x-hidden" 
      id="app-root"
    >
      {/* Skip to main content – keyboard accessibility */}
      <a
        href="#hero"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-lg focus:font-bold focus:bg-[var(--color-primary)] focus:text-white"
      >
        Skip to main content
      </a>

      <Header />

      <main id="main-content">
        <Hero />

        <Suspense fallback={<SectionLoader />}>
          <ServicesSection />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <TechnologiesSection />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <ProjectsGrid />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <PricingSection />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <TeamSection />
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
