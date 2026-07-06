import { useEffect, useRef, useState } from 'react'
import { COMPANY, STATS } from '../data'

// Animated Counter Hook
function useCounter(end: number, duration: number = 2000, startOnView: boolean = true) {
  const [count, setCount] = useState(0)
  const [started, setStarted] = useState(!startOnView)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!startOnView) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true)
          observer.disconnect()
        }
      },
      { threshold: 0.5 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [startOnView])

  useEffect(() => {
    if (!started) return

    let startTime: number
    let animationFrame: number

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      setCount(Math.floor(easeOutQuart * end))

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrame)
  }, [end, duration, started])

  return { count, ref }
}

// Typewriter effect hook
function useTypewriter(words: string[], speed = 80, pause = 2500) {
  const [text, setText] = useState('')
  const [wordIndex, setWordIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const current = words[wordIndex % words.length]
    let timeout: ReturnType<typeof setTimeout>

    if (!isDeleting && text === current) {
      timeout = setTimeout(() => setIsDeleting(true), pause)
    } else if (isDeleting && text === '') {
      setIsDeleting(false)
      setWordIndex(i => (i + 1) % words.length)
    } else {
      const delta = isDeleting ? speed / 2 : speed
      timeout = setTimeout(() => {
        setText(isDeleting ? current.slice(0, text.length - 1) : current.slice(0, text.length + 1))
      }, delta)
    }
    return () => clearTimeout(timeout)
  }, [text, isDeleting, wordIndex, words, speed, pause])

  return text
}

// Animated gradient mesh background
function GradientMesh() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')!
    let animationId: number

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio
      canvas.height = canvas.offsetHeight * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
    }
    resize()
    window.addEventListener('resize', resize)

    // Floating orbs configuration
    const orbs = [
      { x: 0.2, y: 0.3, radius: 300, speedX: 0.0003, speedY: 0.0002, phase: 0 },
      { x: 0.8, y: 0.6, radius: 250, speedX: -0.0002, speedY: 0.0003, phase: 2 },
      { x: 0.5, y: 0.8, radius: 200, speedX: 0.0004, speedY: -0.0002, phase: 4 },
    ]

    const draw = (time: number) => {
      const width = canvas.offsetWidth
      const height = canvas.offsetHeight

      ctx.clearRect(0, 0, width, height)

      orbs.forEach((orb, i) => {
        // Calculate position with subtle movement
        const x = width * (orb.x + Math.sin(time * orb.speedX + orb.phase) * 0.1)
        const y = height * (orb.y + Math.cos(time * orb.speedY + orb.phase) * 0.1)

        // Create gradient
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, orb.radius)
        
        // Green color with varying opacity
        const alpha = 0.08 + Math.sin(time * 0.001 + i) * 0.03
        gradient.addColorStop(0, `rgba(16, 185, 129, ${alpha})`)
        gradient.addColorStop(0.5, `rgba(52, 211, 153, ${alpha * 0.5})`)
        gradient.addColorStop(1, 'rgba(16, 185, 129, 0)')

        ctx.fillStyle = gradient
        ctx.fillRect(0, 0, width, height)
      })

      animationId = requestAnimationFrame(draw)
    }

    draw(0)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
    />
  )
}

// Floating geometric shapes
function FloatingShapes() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Hexagon */}
      <div className="absolute top-[15%] right-[10%] animate-float-slow opacity-20">
        <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
          <path 
            d="M30 5L52.5 17.5V42.5L30 55L7.5 42.5V17.5L30 5Z" 
            stroke="var(--color-primary)" 
            strokeWidth="2"
          />
        </svg>
      </div>
      
      {/* Circle */}
      <div className="absolute top-[60%] left-[5%] animate-float opacity-15" style={{ animationDelay: '1s' }}>
        <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
          <circle cx="40" cy="40" r="35" stroke="var(--color-primary)" strokeWidth="2" strokeDasharray="8 4" />
        </svg>
      </div>
      
      {/* Triangle */}
      <div className="absolute top-[30%] left-[15%] animate-float-slow opacity-20" style={{ animationDelay: '2s' }}>
        <svg width="50" height="50" viewBox="0 0 50 50" fill="none">
          <path d="M25 5L45 40H5L25 5Z" stroke="var(--color-primary)" strokeWidth="2" />
        </svg>
      </div>
      
      {/* Square */}
      <div className="absolute bottom-[20%] right-[15%] animate-spin-slow opacity-15">
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
          <rect x="5" y="5" width="30" height="30" stroke="var(--color-primary)" strokeWidth="2" transform="rotate(45 20 20)" />
        </svg>
      </div>

      {/* Dots pattern */}
      <div className="absolute top-[45%] right-[25%] opacity-20">
        <svg width="100" height="100" viewBox="0 0 100 100" fill="var(--color-primary)">
          {[0, 1, 2, 3, 4].map(row => (
            [0, 1, 2, 3, 4].map(col => (
              <circle key={`${row}-${col}`} cx={10 + col * 20} cy={10 + row * 20} r="2" />
            ))
          ))}
        </svg>
      </div>
    </div>
  )
}

// Stat card component
function StatCard({ value, label, suffix }: { value: string; label: string; suffix?: string }) {
  const numericValue = parseInt(value)
  const { count, ref } = useCounter(numericValue, 2000)

  return (
    <div 
      ref={ref}
      className="text-center p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-card)] hover:border-[var(--color-primary)] hover:shadow-[var(--shadow-glow)] transition-all duration-300 group"
    >
      <p className="text-2xl sm:text-3xl md:text-4xl font-black text-gradient group-hover:scale-110 transition-transform duration-300">
        {count}{suffix}
      </p>
      <p className="text-xs sm:text-sm text-[var(--color-text-muted)] mt-1 font-medium">{label}</p>
    </div>
  )
}

// Service keywords for typewriter
const SERVICES = [
  'Web Applications',
  'Mobile Apps',
  'Desktop Apps',
]

export default function Hero() {
  const service = useTypewriter(SERVICES)

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="hero"
      className="relative min-h-[calc(100vh-80px)] lg:min-h-0 flex flex-col justify-center overflow-hidden bg-[var(--color-bg-primary)]"
      aria-label="Hero section"
    >
      {/* Background effects */}
      <GradientMesh />
      <FloatingShapes />
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 grid-pattern" aria-hidden="true" />

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 lg:pt-28 pb-12 lg:pb-16">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left - Text Content */}
          <div className="text-center lg:text-left">
            {/* Main heading */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.1] animate-fade-in-up">
              We Build
              <span className="block text-gradient-animated mt-2">
                {service || 'Digital Solutions'}
              </span>
            </h1>

            {/* Company tagline */}
            <div 
              className="mt-6 h-10 flex items-center justify-center lg:justify-start animate-fade-in delay-200"
              aria-live="polite"
            >
              <span className="text-xl md:text-2xl font-semibold text-[var(--color-text-secondary)]">
                <span className="text-[var(--color-primary)]">GTC</span> — {COMPANY.tagline}
              </span>
            </div>

            {/* Description */}
            <p className="mt-6 text-lg text-[var(--color-text-secondary)] leading-relaxed max-w-xl mx-auto lg:mx-0 animate-fade-in-up delay-300">
              {COMPANY.description}
            </p>

            {/* CTA Buttons */}
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in-up delay-400">
              <button
                onClick={() => scrollToSection('pricing')}
                className="btn-primary text-base px-8 py-4"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 0 1-8 0" />
                </svg>
                Order Now
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="btn-secondary text-base px-8 py-4"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
                Contact Us
              </button>
            </div>

          </div>

          {/* Right - Visual Element: 3D Rubik's Cube */}
          <div className="flex justify-center lg:justify-end animate-fade-in delay-300">
            <div className="relative w-80 md:w-96 h-80 md:h-[400px] flex items-center justify-center perspective-1000">
              {/* Glow effect */}
              <div 
                className="absolute inset-0 bg-[var(--color-primary)] blur-[100px] opacity-15 animate-glow-pulse"
                aria-hidden="true"
              />
              
              {/* 3D Cube Container */}
              <div 
                className="cube-container"
                style={{ transformStyle: 'preserve-3d' }}
                aria-hidden="true"
              >
                <div className="cube">
                  {/* Front face */}
                  <div className="cube-face cube-front">
                    <div className="cube-grid">
                      {[...Array(9)].map((_, i) => (
                        <div key={`f-${i}`} className="cube-cell cube-cell-green" style={{ animationDelay: `${i * 0.1}s` }} />
                      ))}
                    </div>
                  </div>
                  
                  {/* Back face */}
                  <div className="cube-face cube-back">
                    <div className="cube-grid">
                      {[...Array(9)].map((_, i) => (
                        <div key={`b-${i}`} className="cube-cell cube-cell-white" style={{ animationDelay: `${i * 0.1 + 0.5}s` }} />
                      ))}
                    </div>
                  </div>
                  
                  {/* Right face */}
                  <div className="cube-face cube-right">
                    <div className="cube-grid">
                      {[...Array(9)].map((_, i) => (
                        <div key={`r-${i}`} className="cube-cell cube-cell-emerald" style={{ animationDelay: `${i * 0.1 + 0.2}s` }} />
                      ))}
                    </div>
                  </div>
                  
                  {/* Left face */}
                  <div className="cube-face cube-left">
                    <div className="cube-grid">
                      {[...Array(9)].map((_, i) => (
                        <div key={`l-${i}`} className="cube-cell cube-cell-teal" style={{ animationDelay: `${i * 0.1 + 0.3}s` }} />
                      ))}
                    </div>
                  </div>
                  
                  {/* Top face */}
                  <div className="cube-face cube-top">
                    <div className="cube-grid">
                      {[...Array(9)].map((_, i) => (
                        <div key={`t-${i}`} className="cube-cell cube-cell-mint" style={{ animationDelay: `${i * 0.1 + 0.4}s` }} />
                      ))}
                    </div>
                  </div>
                  
                  {/* Bottom face */}
                  <div className="cube-face cube-bottom">
                    <div className="cube-grid">
                      {[...Array(9)].map((_, i) => (
                        <div key={`bo-${i}`} className="cube-cell cube-cell-sage" style={{ animationDelay: `${i * 0.1 + 0.6}s` }} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating particles */}
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-2 h-2 rounded-full bg-[var(--color-primary)] opacity-40 animate-float-particle"
                    style={{
                      left: `${20 + i * 12}%`,
                      top: `${15 + (i % 3) * 25}%`,
                      animationDelay: `${i * 0.5}s`,
                      animationDuration: `${3 + i * 0.5}s`,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-12 lg:mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 animate-fade-in-up delay-600">
          {STATS.map((stat) => (
            <StatCard key={stat.label} {...stat} />
          ))}
        </div>

        {/* Scroll indicator */}
        <div className="mt-10 lg:mt-12 flex justify-center animate-fade-in delay-800">
          <button
            onClick={() => scrollToSection('services')}
            className="flex flex-col items-center gap-2 text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors group"
            aria-label="Scroll to services"
          >
            <span className="text-xs font-mono">Explore our services</span>
            <div className="w-6 h-10 border-2 border-current rounded-full flex justify-center pt-2 group-hover:border-[var(--color-primary)]">
              <div className="w-1 h-2 rounded-full bg-current animate-bounce-subtle" />
            </div>
          </button>
        </div>
      </div>
    </section>
  )
}
