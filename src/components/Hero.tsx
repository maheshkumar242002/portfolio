import { useEffect, useRef, useState } from 'react'

// Typewriter effect hook
function useTypewriter(words: string[], speed = 80, pause = 2000) {
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

// Simple particle background
function Particles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    let animId: number

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const dots: { x: number; y: number; vx: number; vy: number; r: number; a: number }[] = Array.from({ length: 55 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 2 + 0.5,
      a: Math.random(),
    }))

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      dots.forEach(d => {
        d.x += d.vx; d.y += d.vy
        if (d.x < 0 || d.x > canvas.width) d.vx *= -1
        if (d.y < 0 || d.y > canvas.height) d.vy *= -1

        ctx.beginPath()
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(0,255,0,${d.a * 0.5})`
        ctx.fill()
      })

      // Draw connecting lines
      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const dx = dots[i].x - dots[j].x
          const dy = dots[i].y - dots[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 100) {
            ctx.beginPath()
            ctx.moveTo(dots[i].x, dots[i].y)
            ctx.lineTo(dots[j].x, dots[j].y)
            ctx.strokeStyle = `rgba(0,255,0,${(1 - dist / 100) * 0.12})`
            ctx.lineWidth = 0.8
            ctx.stroke()
          }
        }
      }

      animId = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden="true" />
}

const ROLES = [
  'Full-Stack Developer',
  'React Developer',
  'Node.js Developer',
  'TypeScript Developer',
]

const STATS = [
  { value: '2+',   label: 'Years Experience' },
  { value: '10+',  label: 'Projects Completed' },
  { value: '100%', label: 'Commitment' },
]

export default function Hero() {
  const role = useTypewriter(ROLES)

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
  }
  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-white"
      aria-label="Hero – Introduction"
    >
      <Particles />

      {/* Decorative circle */}
      <div
        className="absolute -top-32 -right-32 w-96 h-96 rounded-full opacity-8 animate-spin-slow"
        style={{ border: '2px solid #00FF00' }}
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full opacity-5"
        style={{ backgroundColor: '#00FF00' }}
        aria-hidden="true"
      />

      <div className="relative max-w-6xl mx-auto px-6 pt-24 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left – text */}
          <div>
            {/* Availability badge */}
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold mb-8 animate-fade-in"
              style={{ backgroundColor: 'rgba(0,255,0,0.12)', color: '#007700' }}
              role="status"
              aria-label="Currently available for work"
            >
              <span
                className="w-2 h-2 rounded-full animate-pulse"
                style={{ backgroundColor: '#00FF00' }}
                aria-hidden="true"
              />
              Available for freelance work
            </div>

            <h1 className="text-5xl md:text-6xl xl:text-7xl font-black tracking-tight leading-[1.05] animate-fade-in-up">
              Hi, I'm{' '}
              <span className="text-gradient block">Mahesh Kumar</span>
            </h1>

            {/* Typewriter */}
            <div
              className="mt-4 text-xl md:text-2xl font-mono font-semibold text-gray-700 h-8 animate-fade-in delay-200"
              aria-live="polite"
              aria-label={`Role: ${role}`}
            >
              <span aria-hidden="true">&gt; {role}</span>
              <span className="animate-blink ml-0.5" aria-hidden="true">|</span>
            </div>

            <p className="mt-6 text-lg text-gray-600 leading-relaxed max-w-xl animate-fade-in-up delay-300">
              I craft <strong className="text-black font-semibold">blazing-fast</strong>,{' '}
              <strong className="text-black font-semibold">accessible</strong>, and{' '}
              <strong className="text-black font-semibold">visually stunning</strong> web experiences
              using React, TypeScript, and modern tooling — from design systems to deployment.
            </p>

            <div className="mt-10 flex flex-wrap gap-4 animate-fade-in-up delay-400">
              <button
                id="hero-cta-contact"
                className="btn-brand text-base"
                onClick={scrollToContact}
                aria-label="Contact Mahesh Kumar"
              >
                <span aria-hidden="true">✉</span>
                Contact Me
              </button>
              <button
                id="hero-cta-projects"
                className="btn-outline text-base"
                onClick={scrollToProjects}
                aria-label="View portfolio projects"
              >
                View Projects
                <span aria-hidden="true">↓</span>
              </button>
            </div>

            {/* Tech badges */}
            <div className="mt-10 flex flex-wrap gap-2 animate-fade-in delay-500" aria-label="Core technologies">
              {['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Node.js', 'GraphQL'].map(tech => (
                <span
                  key={tech}
                  className="px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700 border border-gray-200 hover:border-green-400 hover:bg-green-50 transition-colors cursor-default"
                  style={{ '--tw-border-opacity': 1 } as React.CSSProperties}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Right – avatar card */}
          <div className="flex justify-center lg:justify-end animate-fade-in delay-200">
            <div className="relative">
              {/* Glow ring */}
              <div
                className="absolute inset-0 rounded-2xl blur-2xl opacity-30"
                style={{ backgroundColor: '#00FF00', transform: 'scale(0.95)' }}
                aria-hidden="true"
              />
              <div
                className="relative rounded-2xl overflow-hidden border-2"
                style={{ borderColor: '#00FF00' }}
              >
                {/* Avatar placeholder – gradient art */}
                <div
                  className="w-72 h-80 md:w-80 md:h-96 flex flex-col items-center justify-center"
                  style={{
                    background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0d1a0d 100%)',
                  }}
                  role="img"
                  aria-label="Mahesh Kumar avatar illustration"
                >
                  <div className="text-8xl select-none" aria-hidden="true">👨‍💻</div>
                  <p className="mt-4 font-mono text-sm" style={{ color: '#00FF00' }}>
                    console.log(<span style={{ color: '#ffdd57' }}>"Hello World"</span>)
                  </p>
                  <p className="font-mono text-xs mt-1" style={{ color: '#888' }}>
                    // Building the future
                  </p>
                </div>

                {/* Floating badge */}
                <div
                  className="absolute bottom-4 left-4 right-4 rounded-xl p-3 flex items-center gap-3"
                  style={{ backgroundColor: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)' }}
                  aria-hidden="true"
                >
                  <div
                    className="w-2 h-2 rounded-full animate-pulse flex-shrink-0"
                    style={{ backgroundColor: '#00FF00' }}
                  />
                  <span className="text-white text-xs font-mono">Open to new opportunities</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 animate-fade-in-up delay-600"
          role="list"
          aria-label="Career statistics"
        >
          {STATS.map(s => (
            <div
              key={s.label}
              className="text-center p-5 rounded-2xl border border-gray-100 bg-gray-50 hover:border-green-300 hover:bg-green-50 transition-all duration-200 group"
              role="listitem"
            >
              <p
                className="text-3xl font-black text-gradient group-hover:scale-110 transition-transform duration-200"
              >
                {s.value}
              </p>
              <p className="text-xs text-gray-500 mt-1 font-medium">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Scroll indicator */}
        <div
          className="mt-16 flex justify-center animate-fade-in delay-800"
          aria-hidden="true"
        >
          <button
            onClick={scrollToProjects}
            className="flex flex-col items-center gap-2 text-gray-400 hover:text-black transition-colors group"
            tabIndex={-1}
          >
            <span className="text-xs font-mono">scroll down</span>
            <div className="w-5 h-8 border-2 border-current rounded-full flex justify-center pt-1.5">
              <div className="w-1 h-2 rounded-full bg-current animate-bounce" />
            </div>
          </button>
        </div>
      </div>
    </section>
  )
}
