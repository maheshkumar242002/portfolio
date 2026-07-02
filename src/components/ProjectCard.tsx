import type { Project } from '../types'

interface ProjectCardProps {
  project: Project
  index: number
}

function GitHubIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.757-1.333-1.757-1.089-.745.084-.729.084-.729 1.205.084 1.84 1.236 1.84 1.236 1.07 1.835 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23a11.52 11.52 0 013.003-.404c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.605-.015 2.905-.015 3.3 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  )
}

function ExternalLinkIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  )
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <article
      className="group relative rounded-2xl border border-gray-200 bg-white overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-green-300 flex flex-col"
      style={{ animationDelay: `${index * 100}ms` }}
      aria-label={`Project: ${project.title}`}
    >
      {/* Featured ribbon */}
      {project.featured && (
        <div
          className="absolute top-4 right-4 px-2.5 py-0.5 rounded-full text-xs font-black"
          style={{ backgroundColor: '#00FF00', color: '#000' }}
          aria-label="Featured project"
        >
          ★ Featured
        </div>
      )}

      {/* Card header – decorative gradient */}
      <div
        className="h-36 flex items-center justify-center relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0a0a0a 0%, #111811 100%)' }}
        aria-hidden="true"
      >
        {/* Animated grid */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0,255,0,0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,255,0,0.3) 1px, transparent 1px)
            `,
            backgroundSize: '24px 24px',
          }}
        />
        <div className="relative font-mono text-5xl select-none opacity-80">
          {['📊', '🛒', '📋', '⚡'][index % 4]}
        </div>

        {/* Glow */}
        <div
          className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-24 h-8 rounded-full blur-xl"
          style={{ backgroundColor: '#00FF00', opacity: 0.25 }}
        />
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-lg font-black text-black group-hover:text-gradient transition-all">
          {project.title}
        </h3>
        <p className="mt-2 text-sm text-gray-600 leading-relaxed flex-1">
          {project.description}
        </p>

        {/* Tech stack */}
        <div className="mt-4 flex flex-wrap gap-1.5" aria-label="Technologies used">
          {project.tech.map(t => (
            <span
              key={t}
              className="px-2.5 py-0.5 rounded-md text-xs font-semibold bg-gray-100 text-gray-600 border border-gray-200"
            >
              {t}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="mt-6 flex items-center gap-3 pt-4 border-t border-gray-100">
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm font-bold text-black hover:text-green-600 transition-colors"
            aria-label={`View live demo for ${project.title}`}
          >
            <ExternalLinkIcon />
            Live Demo
          </a>
          <span className="text-gray-300 select-none" aria-hidden="true">|</span>
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm font-bold text-black hover:text-green-600 transition-colors"
            aria-label={`View GitHub repository for ${project.title}`}
          >
            <GitHubIcon />
            Source Code
          </a>
        </div>
      </div>
    </article>
  )
}
