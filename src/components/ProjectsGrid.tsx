import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { PROJECTS } from '../data'

const ProjectCard = lazy(() => import('./ProjectCard'))

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLElement>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setInView(true); obs.disconnect() }
    }, { threshold })
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, inView }
}

function CardSkeleton() {
  return (
    <div className="rounded-2xl border border-gray-100 bg-gray-50 overflow-hidden animate-pulse">
      <div className="h-36 bg-gray-200" />
      <div className="p-6 space-y-3">
        <div className="h-5 bg-gray-200 rounded w-2/3" />
        <div className="h-4 bg-gray-200 rounded" />
        <div className="h-4 bg-gray-200 rounded w-5/6" />
        <div className="flex gap-2 mt-4">
          {[1, 2, 3].map(i => <div key={i} className="h-5 w-16 bg-gray-200 rounded-md" />)}
        </div>
      </div>
    </div>
  )
}

export default function ProjectsGrid() {
  const { ref, inView } = useInView()

  return (
    <section
      id="projects"
      ref={ref as React.RefObject<HTMLElement>}
      className="py-24 bg-gray-50"
      aria-labelledby="projects-heading"
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="section-label mb-3">Portfolio</p>
          <h2
            id="projects-heading"
            className="text-4xl md:text-5xl font-black text-black"
          >
            Selected <span className="text-gradient">Projects</span>
          </h2>
          <p className="mt-4 text-gray-500 max-w-lg mx-auto">
            A curated selection of work I'm proud of — from SaaS dashboards to open-source tools.
          </p>
        </div>

        {/* Grid */}
        <div
          className={`grid sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6 transition-all duration-700 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <Suspense fallback={<>{PROJECTS.map((_, i) => <CardSkeleton key={i} />)}</>}>
            {PROJECTS.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </Suspense>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <a
            href="https://github.com/alexmorgan"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline inline-flex"
            aria-label="View all projects on GitHub"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.757-1.333-1.757-1.089-.745.084-.729.084-.729 1.205.084 1.84 1.236 1.84 1.236 1.07 1.835 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23a11.52 11.52 0 013.003-.404c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.605-.015 2.905-.015 3.3 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
            </svg>
            View All on GitHub
          </a>
        </div>
      </div>
    </section>
  )
}
