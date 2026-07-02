import { useState, useEffect } from 'react'
import { NAV_ITEMS } from '../data'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Active section highlight via IntersectionObserver
  useEffect(() => {
    const ids = NAV_ITEMS.map(i => i.href.slice(1))
    const observers: IntersectionObserver[] = []

    ids.forEach(id => {
      const el = document.getElementById(id)
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id)
        },
        { threshold: 0.35 }
      )
      obs.observe(el)
      observers.push(obs)
    })
    return () => observers.forEach(o => o.disconnect())
  }, [])

  const handleNavClick = (href: string) => {
    setMenuOpen(false)
    const el = document.querySelector(href)
    el?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header
      role="banner"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100' : 'bg-transparent'
      }`}
    >
      <nav
        className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <a
          href="#"
          onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
          className="flex items-center gap-2 font-black text-xl tracking-tight focus-visible:outline-none"
          aria-label="Mahesh Kumar – Back to top"
        >
          <span
            className="w-8 h-8 rounded-lg flex items-center justify-center text-black font-black text-sm"
            style={{ backgroundColor: '#00FF00' }}
            aria-hidden="true"
          >
            MK
          </span>
          <span className="text-black">Mahesh<span className="text-gradient">Kumar</span></span>
        </a>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-1" role="list">
          {NAV_ITEMS.map(item => {
            const id = item.href.slice(1)
            const isActive = activeSection === id
            return (
              <li key={item.href}>
                <button
                  onClick={() => handleNavClick(item.href)}
                  className={`relative px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'text-black'
                      : 'text-gray-600 hover:text-black'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {isActive && (
                    <span
                      className="absolute inset-0 rounded-full"
                      style={{ backgroundColor: '#00FF00' }}
                      aria-hidden="true"
                    />
                  )}
                  <span className="relative">{item.label}</span>
                </button>
              </li>
            )
          })}
        </ul>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <button
            className="btn-brand text-sm py-2 px-5 animate-pulse-brand"
            onClick={() => handleNavClick('#contact')}
          >
            Hire Me
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 rounded-md text-gray-700 hover:text-black"
          onClick={() => setMenuOpen(v => !v)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        >
          <span className="sr-only">{menuOpen ? 'Close' : 'Open'} navigation menu</span>
          <div className="w-5 h-4 flex flex-col justify-between" aria-hidden="true">
            <span className={`block h-0.5 bg-current transition-all duration-200 ${menuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
            <span className={`block h-0.5 bg-current transition-all duration-200 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block h-0.5 bg-current transition-all duration-200 ${menuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
          </div>
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={`md:hidden bg-white border-t border-gray-100 overflow-hidden transition-all duration-300 ${
          menuOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
        }`}
        aria-hidden={!menuOpen}
      >
        <ul className="px-6 py-4 flex flex-col gap-1" role="list">
          {NAV_ITEMS.map(item => (
            <li key={item.href}>
              <button
                onClick={() => handleNavClick(item.href)}
                className="w-full text-left px-4 py-3 rounded-xl text-sm font-semibold text-gray-700 hover:text-black hover:bg-gray-50 transition-colors"
              >
                {item.label}
              </button>
            </li>
          ))}
          <li className="pt-2">
            <button className="btn-brand w-full justify-center" onClick={() => handleNavClick('#contact')}>
              Hire Me
            </button>
          </li>
        </ul>
      </div>
    </header>
  )
}
