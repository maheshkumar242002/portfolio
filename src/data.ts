import type { Project, Service, Skill, SocialLink, NavItem } from './types'

export const NAV_ITEMS: NavItem[] = [
  { label: 'About',    href: '#about'    },
  { label: 'Projects', href: '#projects' },
  { label: 'Services', href: '#services' },
  { label: 'Contact',  href: '#contact'  },
]

export const SOCIAL_LINKS: SocialLink[] = [
  { label: 'GitHub',   href: 'https://github.com',   icon: 'github'   },
  { label: 'LinkedIn', href: 'https://linkedin.com', icon: 'linkedin' },
  { label: 'Twitter',  href: 'https://twitter.com',  icon: 'twitter'  },
]

export const SKILLS: Skill[] = [
  { name: 'React',          level: 90, category: 'frontend' },
  { name: 'TypeScript',     level: 85, category: 'frontend' },
  { name: 'Tailwind CSS',   level: 90, category: 'frontend' },
  { name: 'React Router',   level: 88, category: 'frontend' },
  { name: 'Node.js',        level: 82, category: 'tooling'  },
  { name: 'Express',        level: 85, category: 'tooling'  },
  { name: 'MS SQL Server',  level: 80, category: 'tooling'  },
  { name: 'MySQL',          level: 75, category: 'tooling'  },
  { name: 'MongoDB',        level: 78, category: 'tooling'  },
  { name: 'REST APIs',      level: 90, category: 'tooling'  },
  { name: 'Git & GitHub',   level: 88, category: 'tooling'  },
  { name: 'Bootstrap',      level: 80, category: 'tooling'  },
  { name: 'HTML & CSS',     level: 90, category: 'tooling'  },
  { name: 'JavaScript',     level: 90, category: 'tooling'  },
]

export const PROJECTS: Project[] = [
  {
    id: 'laa-courses',
    title: 'LAA - Online Course Management System',
    description:
      'A comprehensive learning platform featuring an interactive course player, progress tracking, syllabus manager, and a fully-featured admin panel for managing courses, lessons, students, and viewing completion analytics.',
    tech: ['React', 'TypeScript', 'Tailwind CSS', 'Zustand', 'Recharts', 'React Router'],
    liveUrl: 'https://laa-learning.vercel.app',
    githubUrl: 'https://github.com/user/laa-course-management',
    featured: true,
  },
  {
    id: 'laa-ecommerce',
    title: 'LAA - E-Commerce Platform',
    description:
      'A modern shopping experience with variant selector, cart drawer, multi-step mock checkout, and a robust admin dashboard to manage products, process orders, track customers, and view sales charts.',
    tech: ['React', 'TypeScript', 'Tailwind CSS', 'Zustand', 'Recharts', 'React Router'],
    liveUrl: 'https://laa-shop.vercel.app',
    githubUrl: 'https://github.com/user/laa-ecommerce',
    featured: true,
  },
]

export const SERVICES: Service[] = [
  {
    id: 'frontend',
    icon: '⚡',
    title: 'Frontend Development',
    description:
      'Building modern, clean, and highly responsive user interfaces with React and Tailwind CSS.',
    highlights: [
      'React & TypeScript applications',
      'Tailwind CSS styled layouts',
      'Responsive design and state management',
      'Interactive dashboards & charts',
    ],
  },
  {
    id: 'backend',
    icon: '🧱',
    title: 'Backend Development',
    description:
      'Designing robust server-side architecture, RESTful APIs, and database structures.',
    highlights: [
      'Node.js & Express servers',
      'Database design and queries',
      'Authentication & authorization',
      'API integration and testing',
    ],
  },
  {
    id: 'fullstack',
    icon: '🚀',
    title: 'Full-Stack Integration',
    description:
      'Bringing frontend and backend together into cohesive, production-ready web applications.',
    highlights: [
      'End-to-end application flow',
      'E-commerce transaction handling',
      'Admin panels & dashboard systems',
      'Deployment & version control',
    ],
  },
]
