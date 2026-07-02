// Shared TypeScript types for the portfolio

export interface Project {
  id: string
  title: string
  description: string
  tech: string[]
  liveUrl: string
  githubUrl: string
  featured?: boolean
}

export interface Service {
  id: string
  icon: string
  title: string
  description: string
  highlights: string[]
}

export interface Skill {
  name: string
  level: number // 0–100
  category: 'frontend' | 'tooling' | 'design'
}

export interface SocialLink {
  label: string
  href: string
  icon: string
}

export interface NavItem {
  label: string
  href: string
}
