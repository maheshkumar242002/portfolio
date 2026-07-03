import { useEffect, useRef, useState } from 'react'
import { TEAM_MEMBERS } from '../data'
import type { TeamMember } from '../types'

// Professional SVG Avatars
function FounderAvatar() {
  return (
    <svg viewBox="0 0 120 120" fill="none" className="w-full h-full">
      <defs>
        <linearGradient id="founder-bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--color-primary)" />
          <stop offset="100%" stopColor="var(--color-primary-dark)" />
        </linearGradient>
      </defs>
      {/* Background */}
      <circle cx="60" cy="60" r="58" fill="url(#founder-bg)" />
      {/* Head */}
      <ellipse cx="60" cy="45" rx="22" ry="24" fill="#FCD5B8" />
      {/* Hair */}
      <path d="M38 38c0-12 10-22 22-22s22 10 22 22c0 2-5 6-22 6s-22-4-22-6z" fill="#2D1B0E" />
      {/* Eyes */}
      <ellipse cx="52" cy="44" rx="3" ry="3.5" fill="#2D1B0E" />
      <ellipse cx="68" cy="44" rx="3" ry="3.5" fill="#2D1B0E" />
      {/* Eyebrows */}
      <path d="M48 38c2-2 6-2 8 0" stroke="#2D1B0E" strokeWidth="2" strokeLinecap="round" />
      <path d="M64 38c2-2 6-2 8 0" stroke="#2D1B0E" strokeWidth="2" strokeLinecap="round" />
      {/* Nose */}
      <path d="M60 47v8" stroke="#D4A574" strokeWidth="2" strokeLinecap="round" />
      {/* Mouth */}
      <path d="M54 58c3 3 9 3 12 0" stroke="#B8826C" strokeWidth="2" strokeLinecap="round" fill="none" />
      {/* Body/Shirt */}
      <path d="M30 95c0-20 15-25 30-25s30 5 30 25v25H30V95z" fill="#1e293b" />
      {/* Collar */}
      <path d="M50 70l10 10 10-10" stroke="#334155" strokeWidth="3" strokeLinecap="round" fill="none" />
    </svg>
  )
}

function DesignerAvatar() {
  return (
    <svg viewBox="0 0 120 120" fill="none" className="w-full h-full">
      <defs>
        <linearGradient id="designer-bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--color-primary-light)" />
          <stop offset="100%" stopColor="var(--color-primary)" />
        </linearGradient>
      </defs>
      {/* Background */}
      <circle cx="60" cy="60" r="58" fill="url(#designer-bg)" />
      {/* Head */}
      <ellipse cx="60" cy="45" rx="20" ry="22" fill="#FCD5B8" />
      {/* Hair */}
      <ellipse cx="60" cy="32" rx="24" ry="14" fill="#3D2314" />
      <ellipse cx="40" cy="45" rx="8" ry="18" fill="#3D2314" />
      <ellipse cx="80" cy="45" rx="8" ry="18" fill="#3D2314" />
      {/* Eyes */}
      <ellipse cx="52" cy="44" rx="3" ry="4" fill="#2D1B0E" />
      <ellipse cx="68" cy="44" rx="3" ry="4" fill="#2D1B0E" />
      {/* Eyelashes */}
      <path d="M49 40l-2-2M52 39v-3M55 40l2-2" stroke="#2D1B0E" strokeWidth="1" strokeLinecap="round" />
      <path d="M65 40l-2-2M68 39v-3M71 40l2-2" stroke="#2D1B0E" strokeWidth="1" strokeLinecap="round" />
      {/* Nose */}
      <path d="M60 47v6" stroke="#D4A574" strokeWidth="1.5" strokeLinecap="round" />
      {/* Lips */}
      <ellipse cx="60" cy="58" rx="6" ry="3" fill="#E88B8B" />
      {/* Body/Blouse */}
      <path d="M32 95c0-18 12-23 28-23s28 5 28 23v25H32V95z" fill="#10B981" />
      {/* Necklace */}
      <circle cx="60" cy="72" r="4" fill="#FFD700" />
    </svg>
  )
}

const AVATARS: Record<string, React.FC> = {
  founder: FounderAvatar,
  designer: DesignerAvatar,
}

// Social Icons
function LinkedInIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

function TwitterIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.741l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

function GitHubIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.757-1.333-1.757-1.089-.745.084-.729.084-.729 1.205.084 1.84 1.236 1.84 1.236 1.07 1.835 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23a11.52 11.52 0 013.003-.404c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.605-.015 2.905-.015 3.3 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  )
}

// Team Member Card
function TeamMemberCard({ member, index }: { member: TeamMember; index: number }) {
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

  const Avatar = AVATARS[member.avatar]

  return (
    <article
      ref={cardRef}
      className={`group relative rounded-3xl border border-[var(--color-border)] bg-[var(--color-bg-card)] overflow-hidden transition-all duration-500 hover:border-[var(--color-primary)] hover:shadow-[var(--shadow-glow)] ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      {/* Background decoration */}
      <div 
        className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-dark)] opacity-10 group-hover:opacity-20 transition-opacity"
        aria-hidden="true"
      />

      <div className="relative p-8">
        {/* Avatar */}
        <div className="relative w-32 h-32 mx-auto mb-6">
          <div className="absolute inset-0 rounded-full bg-[var(--color-primary)] opacity-20 blur-xl group-hover:opacity-30 transition-opacity" />
          <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-[var(--color-bg-primary)] shadow-lg group-hover:scale-105 transition-transform duration-300">
            {Avatar && <Avatar />}
          </div>
        </div>

        {/* Info */}
        <div className="text-center">
          <h3 className="text-xl font-black text-[var(--color-text-primary)] group-hover:text-[var(--color-primary)] transition-colors">
            {member.name}
          </h3>
          <p className="text-sm font-semibold text-[var(--color-primary)] mt-1">
            {member.role}
          </p>
          <p className="text-sm text-[var(--color-text-secondary)] mt-4 leading-relaxed">
            {member.bio}
          </p>
        </div>

        {/* Skills */}
        <div className="mt-6 flex flex-wrap gap-2 justify-center">
          {member.skills.map((skill) => (
            <span
              key={skill}
              className="px-3 py-1 rounded-full text-xs font-medium bg-[var(--color-bg-secondary)] text-[var(--color-text-secondary)] border border-[var(--color-border)]"
            >
              {skill}
            </span>
          ))}
        </div>

        {/* Social Links */}
        <div className="mt-6 flex justify-center gap-3">
          {member.socials.linkedin && (
            <a
              href={member.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-xl flex items-center justify-center border border-[var(--color-border)] text-[var(--color-text-muted)] hover:text-[var(--color-primary)] hover:border-[var(--color-primary)] hover:bg-[var(--color-bg-hover)] transition-all duration-200"
              aria-label={`${member.name}'s LinkedIn profile`}
            >
              <LinkedInIcon />
            </a>
          )}
          {member.socials.twitter && (
            <a
              href={member.socials.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-xl flex items-center justify-center border border-[var(--color-border)] text-[var(--color-text-muted)] hover:text-[var(--color-primary)] hover:border-[var(--color-primary)] hover:bg-[var(--color-bg-hover)] transition-all duration-200"
              aria-label={`${member.name}'s Twitter profile`}
            >
              <TwitterIcon />
            </a>
          )}
          {member.socials.github && (
            <a
              href={member.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-xl flex items-center justify-center border border-[var(--color-border)] text-[var(--color-text-muted)] hover:text-[var(--color-primary)] hover:border-[var(--color-primary)] hover:bg-[var(--color-bg-hover)] transition-all duration-200"
              aria-label={`${member.name}'s GitHub profile`}
            >
              <GitHubIcon />
            </a>
          )}
        </div>
      </div>

      {/* Bottom accent */}
      <div 
        className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-light)] group-hover:w-full transition-all duration-500"
        aria-hidden="true"
      />
    </article>
  )
}

export default function TeamSection() {
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
      id="team"
      className="py-24 bg-[var(--color-bg-secondary)]"
      aria-labelledby="team-heading"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <p className="section-label mb-3">Our Team</p>
          <h2 id="team-heading" className="section-title">
            Meet the <span className="text-gradient">Experts</span>
          </h2>
          <p className="section-description mx-auto mt-4">
            A dedicated team of professionals committed to turning your vision into reality.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {TEAM_MEMBERS.map((member, index) => (
            <TeamMemberCard key={member.id} member={member} index={index} />
          ))}
        </div>

        {/* Join us CTA */}
        <div className={`mt-16 text-center transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-6 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-card)]">
            <div className="text-left">
              <p className="font-bold text-[var(--color-text-primary)]">Want to join our team?</p>
              <p className="text-sm text-[var(--color-text-secondary)]">We're always looking for talented individuals.</p>
            </div>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault()
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="btn-secondary text-sm whitespace-nowrap"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
