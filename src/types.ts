// Shared TypeScript types for EliteProdie portfolio

export interface Project {
  id: string
  title: string
  description: string
  tech: string[]
  liveUrl: string
  githubUrl: string
  featured?: boolean
  category: 'web' | 'mobile' | 'desktop' | 'custom'
  image?: string
}

export interface Service {
  id: string
  icon: string
  title: string
  description: string
  highlights: string[]
  startingPrice: number
}

export interface PricingPlan {
  id: string
  name: string
  description: string
  price: number | 'custom'
  period?: string
  features: string[]
  popular?: boolean
  ctaText: string
}

export interface TeamMember {
  id: string
  name: string
  role: string
  bio: string
  skills: string[]
  avatar: string // SVG path or identifier
  socials: {
    linkedin?: string
    twitter?: string
    github?: string
  }
}

export interface Testimonial {
  id: string
  name: string
  role: string
  company: string
  content: string
  rating: number
  avatar?: string
}

export interface Skill {
  name: string
  level: number // 0–100
  category: 'frontend' | 'backend' | 'mobile' | 'design' | 'devops'
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

export interface CompanyInfo {
  name: string
  tagline: string
  description: string
  email: string
  phone?: string
  address?: string
  founded: number
}

export interface Stat {
  value: string
  label: string
  suffix?: string
}
