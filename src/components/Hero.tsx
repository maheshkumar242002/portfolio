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

// Tech Icons for Cube Faces - Simple SVG symbols
const iconStyle = "w-full h-full p-1"
const TECH_ICONS = {
  // Web Development - Front Face
  web: [
    // React - Atom symbol
    <svg key="react" className={iconStyle} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><circle cx="12" cy="12" r="2" fill="currentColor"/><ellipse cx="12" cy="12" rx="9" ry="3.5"/><ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(120 12 12)"/></svg>,
    // HTML5 - Shield with 5
    <svg key="html" className={iconStyle} viewBox="0 0 24 24" fill="currentColor"><path d="M4.5 3L6 19l6 2 6-2 1.5-16H4.5zm12 4H8l.2 2h8l-.5 6-3.7 1.2-3.7-1.2-.2-2.5h2l.1 1.2 1.8.6 1.8-.6.2-2H8l-.3-3h9l-.2 1.5z"/></svg>,
    // CSS3 - Shield with 3
    <svg key="css" className={iconStyle} viewBox="0 0 24 24" fill="currentColor"><path d="M4.5 3L6 19l6 2 6-2 1.5-16H4.5zm11.5 12l-4 1.5-4-1.5-.2-2h2l.1 1 2.1.5 2.1-.5.2-2H8l-.2-2h8.4l-.2 2H10l-.2 2h4.6l-.2 1.5z"/></svg>,
    // JavaScript - JS Square
    <svg key="js" className={iconStyle} viewBox="0 0 24 24" fill="currentColor"><rect x="3" y="3" width="18" height="18" rx="1"/><text x="6" y="17" fontSize="9" fontWeight="bold" fill="var(--color-bg-primary)">JS</text></svg>,
    // TypeScript - TS Square
    <svg key="ts" className={iconStyle} viewBox="0 0 24 24" fill="currentColor"><rect x="3" y="3" width="18" height="18" rx="1"/><text x="5.5" y="17" fontSize="9" fontWeight="bold" fill="var(--color-bg-primary)">TS</text></svg>,
    // Vue - V shape
    <svg key="vue" className={iconStyle} viewBox="0 0 24 24" fill="currentColor"><path d="M2 4h4l6 11 6-11h4L12 22 2 4zm6 0l4 7.5L16 4h-2l-2 4-2-4H8z"/></svg>,
    // Angular - A shape
    <svg key="angular" className={iconStyle} viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L3 6l1.5 12L12 22l7.5-4L21 6l-9-4zm0 3l6 11h-2.5l-1-2.5h-5L8.5 16H6l6-11zm0 4l-1.5 3h3L12 9z"/></svg>,
    // Node.js - Hexagon
    <svg key="node" className={iconStyle} viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l8 4.5v9L12 20l-8-4.5v-9L12 2zm0 2L6 7v8l6 3.5L18 15V7l-6-3z"/></svg>,
    // Next.js - N shape
    <svg key="next" className={iconStyle} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="9"/><path d="M8 16V8l8 10V8" fill="none"/></svg>,
  ],
  // Mobile Development - Back Face
  mobile: [
    <svg key="android" className={iconStyle} viewBox="0 0 24 24" fill="currentColor"><path d="M6 10v8h12v-8H6zM17 8a5 5 0 00-10 0h10zM8.5 5a1 1 0 100-2 1 1 0 000 2zm7 0a1 1 0 100-2 1 1 0 000 2zM6 19v2a1 1 0 001 1h1v-3H6zm10 0v3h1a1 1 0 001-1v-2h-2zM4 10v6a1 1 0 002 0v-6a1 1 0 00-2 0zm14 0v6a1 1 0 002 0v-6a1 1 0 00-2 0z"/></svg>,
    <svg key="ios" className={iconStyle} viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83z"/><path d="M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>,
    <svg key="flutter" className={iconStyle} viewBox="0 0 24 24" fill="currentColor"><path d="M14 2l-8 8 3 3 11-11h-6zm0 8l-5 5 3 3 2-2 5 5h6l-8-8-3-3z"/></svg>,
    <svg key="rn" className={iconStyle} viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="2.5"/><ellipse cx="12" cy="12" rx="10" ry="4" fill="none" stroke="currentColor" strokeWidth="1.5"/><ellipse cx="12" cy="12" rx="10" ry="4" fill="none" stroke="currentColor" strokeWidth="1.5" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="4" fill="none" stroke="currentColor" strokeWidth="1.5" transform="rotate(120 12 12)"/></svg>,
    <svg key="kotlin" className={iconStyle} viewBox="0 0 24 24" fill="currentColor"><path d="M3 3h18L12 12l9 9H3V3z"/></svg>,
    <svg key="swift" className={iconStyle} viewBox="0 0 24 24" fill="currentColor"><path d="M20 16.5c0 2-1.5 3.5-3 4.5-3 2-7 0-10-3 4 1 7-1 7-1-3-2-7-8-7-8 5 4 8 4 8 4-2-3-3-7-3-7 4 4 7 5 9 5 1 0 2 .5 2 2v3.5z"/></svg>,
    <svg key="dart" className={iconStyle} viewBox="0 0 24 24" fill="currentColor"><path d="M5 5v14l14-7L5 5zm2 3l8 4-8 4V8z"/></svg>,
    // Ionic - circle with i
    <svg key="ionic" className={iconStyle} viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="2"/><circle cx="12" cy="6" r="2"/><path d="M12 10v8" strokeWidth="2" stroke="currentColor" fill="none"/></svg>,
    // Xamarin - X hexagon
    <svg key="xamarin" className={iconStyle} viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l9 5v10l-9 5-9-5V7l9-5z" fill="none" stroke="currentColor" strokeWidth="2"/><path d="M8 8l8 8M16 8l-8 8" stroke="currentColor" strokeWidth="2" fill="none"/></svg>,
  ],
  // Cloud & Database - Right Face
  cloud: [
    <svg key="aws" className={iconStyle} viewBox="0 0 24 24" fill="currentColor"><path d="M6.5 17c-2 0-3.5-1.5-3.5-3.5S4.5 10 6.5 10c.2-2.3 2-4 4.5-4 2 0 3.7 1.3 4.3 3 .2 0 .5-.1.7-.1 2.2 0 4 1.8 4 4s-1.8 4-4 4H6.5z"/></svg>,
    <svg key="azure" className={iconStyle} viewBox="0 0 24 24" fill="currentColor"><path d="M6 6l5 12H6l3 4h9l-12-16z"/></svg>,
    <svg key="gcp" className={iconStyle} viewBox="0 0 24 24" fill="currentColor"><path d="M12 6l-6 4v4l6 4 6-4v-4l-6-4zm0 2l4 2.5v3L12 16l-4-2.5v-3L12 8z"/></svg>,
    <svg key="docker" className={iconStyle} viewBox="0 0 24 24" fill="currentColor"><path d="M20 9h-2V7h-2V5h-2v2h-2V5H10v2H8V5H6v4H4c-1 0-2 1-2 2.5S3 14 4 15c.2 2.8 2.5 5 5.5 5h9c2.5 0 4.5-2 4.5-4.5 0-2-1.3-3.8-3-4.5zm-11-2h2v2H9V7zm4 0h2v2h-2V7zm-4 4h2v2H9v-2zm4 0h2v2h-2v-2zm4 0h2v2h-2v-2z"/></svg>,
    <svg key="k8s" className={iconStyle} viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l-8 4v8l8 4 8-4V6l-8-4zm0 2l6 3v6l-6 3-6-3V7l6-3z"/><circle cx="12" cy="12" r="2"/></svg>,
    <svg key="mongo" className={iconStyle} viewBox="0 0 24 24" fill="currentColor"><path d="M12 2c-.5 2-1 3.5-2 5-1.5 2-3 4-3 7 0 4 2.5 7 5 8v-6c-1-.5-2-1.5-2-3s1-2.5 2-3V2z"/></svg>,
    <svg key="postgres" className={iconStyle} viewBox="0 0 24 24" fill="currentColor"><ellipse cx="12" cy="6" rx="8" ry="3"/><path d="M4 6v4c0 1.7 3.6 3 8 3s8-1.3 8-3V6M4 10v4c0 1.7 3.6 3 8 3s8-1.3 8-3v-4M4 14v4c0 1.7 3.6 3 8 3s8-1.3 8-3v-4"/></svg>,
    <svg key="mysql" className={iconStyle} viewBox="0 0 24 24" fill="currentColor"><path d="M12 4c-4.4 0-8 1.8-8 4v8c0 2.2 3.6 4 8 4s8-1.8 8-4V8c0-2.2-3.6-4-8-4zm0 2c3.3 0 6 1.3 6 3s-2.7 3-6 3-6-1.3-6-3 2.7-3 6-3z"/></svg>,
    <svg key="redis" className={iconStyle} viewBox="0 0 24 24" fill="currentColor"><path d="M12 4L4 8v8l8 4 8-4V8l-8-4zm0 2l6 3-6 3-6-3 6-3z"/></svg>,
  ],
  // Programming Languages - Left Face
  languages: [
    <svg key="python" className={iconStyle} viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8 2 8 4 8 4v3h4v1H5s-3 0-3 4 2 4 3 4h2v-3s0-2 2-2h6s2 0 2-2V4s0-2-4-2h-1zm-1 1.5a1 1 0 110 2 1 1 0 010-2zM12 22c4 0 4-2 4-2v-3h-4v-1h7s3 0 3-4-2-4-3-4h-2v3s0 2-2 2H9s-2 0-2 2v4s0 2 4 2h1zm1-1.5a1 1 0 110-2 1 1 0 010 2z"/></svg>,
    <svg key="java" className={iconStyle} viewBox="0 0 24 24" fill="currentColor"><path d="M8 17s-1 .5 1 .5c2.5 0 2-1 2-1s1 1-2 2c-3 .5-5-1-1-1.5zm-.5-2s-1 1 1 1c2.5 0 2.5-1 2.5-1s1 1-2 2c-3.5.5-5-1-1.5-2zm3.5-8v10s0 2-3 2c-3.5 0-3-2-3-2V7s0-2 3-2c3.5 0 3 2 3 2z"/></svg>,
    <svg key="go" className={iconStyle} viewBox="0 0 24 24" fill="currentColor"><path d="M4 12a4 4 0 014-4h8a4 4 0 010 8H8a4 4 0 01-4-4zm4 2a2 2 0 100-4 2 2 0 000 4zm8 0a2 2 0 100-4 2 2 0 000 4z"/></svg>,
    <svg key="rust" className={iconStyle} viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2"/><path d="M12 6v12M8 10l4-4 4 4M8 14l4 4 4-4"/></svg>,
    <svg key="cpp" className={iconStyle} viewBox="0 0 24 24" fill="currentColor"><path d="M10 4v16l-6-8 6-8zm4 4h6m-3-3v6m4-3h6m-3-3v6"/></svg>,
    <svg key="csharp" className={iconStyle} viewBox="0 0 24 24" fill="currentColor"><path d="M10 4v16l-6-8 6-8zm4 4h4m-2-2v4m3-2h4m-2-2v4"/></svg>,
    <svg key="php" className={iconStyle} viewBox="0 0 24 24" fill="currentColor"><ellipse cx="12" cy="12" rx="10" ry="5"/><path d="M6 12c0-1 .5-2 1.5-2H9c1 0 1.5.5 1.5 1.5s-.5 1.5-1.5 1.5H8v1H6v-2zm8 0c0-1 .5-2 1.5-2H17c1 0 1.5.5 1.5 1.5s-.5 1.5-1.5 1.5h-1v1h-2v-2z"/></svg>,
    <svg key="ruby" className={iconStyle} viewBox="0 0 24 24" fill="currentColor"><path d="M4 17l5-12 3 6 8-4-3 10-13 0z"/></svg>,
    <svg key="code" className={iconStyle} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>,
  ],
  // Tools & DevOps - Top Face
  tools: [
    <svg key="git" className={iconStyle} viewBox="0 0 24 24" fill="currentColor"><path d="M21.6 11.3l-9-9c-.5-.5-1.3-.5-1.8 0l-2 2 2.3 2.3c.5-.2 1.1-.1 1.5.3.4.4.5 1 .3 1.5l2.2 2.2c.5-.2 1.1-.1 1.5.3.6.6.6 1.5 0 2.1-.6.6-1.5.6-2.1 0-.4-.4-.5-1.1-.3-1.6l-2-2v5.3c.1.1.3.2.4.3.6.6.6 1.5 0 2.1-.6.6-1.5.6-2.1 0-.6-.6-.6-1.5 0-2.1.2-.2.4-.3.6-.4V9.9c-.2-.1-.4-.2-.6-.4-.6-.6-.6-1.5 0-2.1.4-.4 1.1-.5 1.6-.3L14 4.9l-6.7 6.7c-.5.5-.5 1.3 0 1.8l9 9c.5.5 1.3.5 1.8 0l3.5-3.5c.5-.5.5-1.3 0-1.8z"/></svg>,
    <svg key="github" className={iconStyle} viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.5 2 2 6.5 2 12c0 4.4 2.9 8.2 6.8 9.5.5.1.7-.2.7-.5v-1.7c-2.8.6-3.4-1.3-3.4-1.3-.5-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.3 1.1 2.9.8.1-.6.3-1.1.6-1.3-2.2-.3-4.6-1.1-4.6-5 0-1.1.4-2 1-2.7-.1-.3-.5-1.3.1-2.7 0 0 .8-.3 2.7 1 .8-.2 1.6-.3 2.5-.3.8 0 1.7.1 2.5.3 1.9-1.3 2.7-1 2.7-1 .5 1.4.2 2.4.1 2.7.6.7 1 1.6 1 2.7 0 3.9-2.4 4.7-4.6 5 .4.3.7.9.7 1.9v2.8c0 .3.2.6.7.5 4-1.3 6.8-5.1 6.8-9.5C22 6.5 17.5 2 12 2z"/></svg>,
    <svg key="vscode" className={iconStyle} viewBox="0 0 24 24" fill="currentColor"><path d="M17 2l5 4v12l-5 4-10-8v4l-5-4V8l5-4v4l10-6zm-2 6v8l-6-4 6-4z"/></svg>,
    <svg key="linux" className={iconStyle} viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8 2 6 5 6 9c0 2 .5 3 1 4l-2 4c0 2 2 3 4 3 0 1 1 2 3 2s3-1 3-2c2 0 4-1 4-3l-2-4c.5-1 1-2 1-4 0-4-2-7-6-7zm-2 4a1 1 0 110 2 1 1 0 010-2zm4 0a1 1 0 110 2 1 1 0 010-2zm-2 3c1.5 0 2 1 2 1h-4s.5-1 2-1z"/></svg>,
    <svg key="terminal" className={iconStyle} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="16" rx="2"/><polyline points="7 10 10 13 7 16"/><line x1="12" y1="16" x2="17" y2="16"/></svg>,
    <svg key="figma" className={iconStyle} viewBox="0 0 24 24" fill="currentColor"><path d="M8 2a4 4 0 00-4 4 4 4 0 004 4H12V2H8zm8 0h-4v8h4a4 4 0 100-8zM8 10a4 4 0 00-4 4 4 4 0 004 4h4v-8H8zm8 0a4 4 0 100 8 4 4 0 000-8zM8 18a4 4 0 100 4 4 4 0 000-4z"/></svg>,
    <svg key="jenkins" className={iconStyle} viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2"/><path d="M8 8h2v8H8zm6 0h2v8h-2zM9 11h6"/></svg>,
    <svg key="server" className={iconStyle} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="3" width="20" height="6" rx="1"/><rect x="2" y="15" width="20" height="6" rx="1"/><line x1="6" y1="6" x2="6" y2="6.01"/><line x1="6" y1="18" x2="6" y2="18.01"/></svg>,
    <svg key="settings" className={iconStyle} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"/></svg>,
  ],
  // AI & Emerging Tech - Bottom Face
  ai: [
    <svg key="brain" className={iconStyle} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5a3 3 0 00-3 3v2a3 3 0 006 0V8a3 3 0 00-3-3z"/><path d="M6 8a6 6 0 0112 0v4a6 6 0 01-12 0V8z"/><path d="M12 12v8m-2-2h4"/></svg>,
    <svg key="robot" className={iconStyle} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="5" y="9" width="14" height="10" rx="2"/><circle cx="9" cy="13" r="1"/><circle cx="15" cy="13" r="1"/><path d="M10 17h4m2-12h-8m4-3v3"/></svg>,
    <svg key="api" className={iconStyle} viewBox="0 0 24 24" fill="currentColor"><path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z"/><circle cx="8" cy="7" r="2"/><circle cx="16" cy="12" r="2"/><circle cx="8" cy="17" r="2"/></svg>,
    <svg key="data" className={iconStyle} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v6c0 1.7 3.6 3 8 3s8-1.3 8-3V5"/><path d="M4 11v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6"/></svg>,
    <svg key="network" className={iconStyle} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="2"/><circle cx="6" cy="6" r="2"/><circle cx="18" cy="6" r="2"/><circle cx="6" cy="18" r="2"/><circle cx="18" cy="18" r="2"/><line x1="12" y1="10" x2="12" y2="8"/><line x1="10" y1="12" x2="8" y2="12"/><line x1="14" y1="12" x2="16" y2="12"/><line x1="12" y1="14" x2="12" y2="16"/></svg>,
    <svg key="security" className={iconStyle} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2l8 4v6c0 5.5-3.5 10.3-8 12-4.5-1.7-8-6.5-8-12V6l8-4z"/><path d="M9 12l2 2 4-4"/></svg>,
    <svg key="analytics" className={iconStyle} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 20h16M4 20V10l4-4 4 6 4-8 4 6v10"/></svg>,
    <svg key="chip" className={iconStyle} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="6" y="6" width="12" height="12" rx="1"/><path d="M9 2v4m6-4v4m-6 12v4m6-4v4M2 9h4m-4 6h4m12-6h4m-4 6h4"/></svg>,
    <svg key="globe" className={iconStyle} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><ellipse cx="12" cy="12" rx="4" ry="10"/><line x1="2" y1="12" x2="22" y2="12"/></svg>,
  ],
}

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
            <div className="relative w-48 sm:w-64 md:w-80 lg:w-96 h-48 sm:h-64 md:h-80 lg:h-[400px] flex items-center justify-center perspective-1000">
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
                  {/* Front face - Web Development */}
                  <div className="cube-face cube-front">
                    <div className="cube-grid">
                      {TECH_ICONS.web.map((icon, i) => (
                        <div key={`f-${i}`} className="cube-cell cube-cell-green" style={{ animationDelay: `${i * 0.1}s` }}>
                          {icon}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Back face - Mobile Development */}
                  <div className="cube-face cube-back">
                    <div className="cube-grid">
                      {TECH_ICONS.mobile.map((icon, i) => (
                        <div key={`b-${i}`} className="cube-cell cube-cell-white" style={{ animationDelay: `${i * 0.1 + 0.5}s` }}>
                          {icon}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Right face - Cloud & Database */}
                  <div className="cube-face cube-right">
                    <div className="cube-grid">
                      {TECH_ICONS.cloud.map((icon, i) => (
                        <div key={`r-${i}`} className="cube-cell cube-cell-emerald" style={{ animationDelay: `${i * 0.1 + 0.2}s` }}>
                          {icon}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Left face - Languages */}
                  <div className="cube-face cube-left">
                    <div className="cube-grid">
                      {TECH_ICONS.languages.map((icon, i) => (
                        <div key={`l-${i}`} className="cube-cell cube-cell-teal" style={{ animationDelay: `${i * 0.1 + 0.3}s` }}>
                          {icon}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Top face - Tools & DevOps */}
                  <div className="cube-face cube-top">
                    <div className="cube-grid">
                      {TECH_ICONS.tools.map((icon, i) => (
                        <div key={`t-${i}`} className="cube-cell cube-cell-mint" style={{ animationDelay: `${i * 0.1 + 0.4}s` }}>
                          {icon}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Bottom face - AI & Emerging */}
                  <div className="cube-face cube-bottom">
                    <div className="cube-grid">
                      {TECH_ICONS.ai.map((icon, i) => (
                        <div key={`bo-${i}`} className="cube-cell cube-cell-sage" style={{ animationDelay: `${i * 0.1 + 0.6}s` }}>
                          {icon}
                        </div>
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
