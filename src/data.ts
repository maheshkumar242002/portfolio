import type { 
  Project, 
  Service, 
  Skill, 
  SocialLink, 
  NavItem, 
  TeamMember, 
  PricingPlan, 
  Testimonial,
  CompanyInfo,
  Stat
} from './types'

// Company Information
export const COMPANY: CompanyInfo = {
  name: 'EliteProdie',
  tagline: 'Crafting Digital Excellence',
  description: 'We are a premium software development company delivering high-quality web, mobile, and custom software solutions at competitive prices. Our team of experts transforms your ideas into powerful digital products.',
  email: 'eliteprodie@gmail.com',
  founded: 2022,
}

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home',     href: '#hero'     },
  { label: 'Services', href: '#services' },
  { label: 'Projects', href: '#projects' },
  { label: 'Pricing',  href: '#pricing'  },
  { label: 'Team',     href: '#team'     },
  { label: 'Contact',  href: '#contact'  },
]

export const SOCIAL_LINKS: SocialLink[] = [
  { label: 'GitHub',    href: 'https://github.com/eliteprodie',       icon: 'github'    },
  { label: 'LinkedIn',  href: 'https://linkedin.com/company/eliteprodie', icon: 'linkedin'  },
  { label: 'Twitter',   href: 'https://twitter.com/eliteprodie',      icon: 'twitter'   },
  { label: 'Instagram', href: 'https://instagram.com/eliteprodie',    icon: 'instagram' },
  { label: 'Facebook',  href: 'https://facebook.com/eliteprodie',     icon: 'facebook'  },
]

export const STATS: Stat[] = [
  { value: '50',   label: 'Projects Delivered', suffix: '+' },
  { value: '30',   label: 'Happy Clients',      suffix: '+' },
  { value: '3',    label: 'Years Experience',   suffix: '+'  },
  { value: '99',   label: 'Client Satisfaction', suffix: '%' },
]

export const SKILLS: Skill[] = [
  { name: 'React',          level: 95, category: 'frontend' },
  { name: 'TypeScript',     level: 92, category: 'frontend' },
  { name: 'Next.js',        level: 90, category: 'frontend' },
  { name: 'Vue.js',         level: 85, category: 'frontend' },
  { name: 'Tailwind CSS',   level: 95, category: 'frontend' },
  { name: 'Node.js',        level: 90, category: 'backend'  },
  { name: 'Express',        level: 88, category: 'backend'  },
  { name: 'Python',         level: 85, category: 'backend'  },
  { name: 'PostgreSQL',     level: 88, category: 'backend'  },
  { name: 'MongoDB',        level: 85, category: 'backend'  },
  { name: 'React Native',   level: 88, category: 'mobile'   },
  { name: 'Flutter',        level: 82, category: 'mobile'   },
  { name: 'Figma',          level: 90, category: 'design'   },
  { name: 'AWS',            level: 85, category: 'devops'   },
  { name: 'Docker',         level: 88, category: 'devops'   },
]

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'founder',
    name: 'Alex Mitchell',
    role: 'Founder & Lead Developer',
    bio: 'Full-stack architect with 8+ years of experience building scalable applications. Passionate about clean code and delivering exceptional user experiences.',
    skills: ['React', 'Node.js', 'TypeScript', 'System Architecture', 'Cloud Infrastructure'],
    avatar: 'founder',
    socials: {
      linkedin: 'https://linkedin.com/in/alexmitchell',
      twitter: 'https://twitter.com/alexmitchell',
      github: 'https://github.com/alexmitchell',
    },
  },
  {
    id: 'designer',
    name: 'Sarah Chen',
    role: 'Creative Director & UI/UX Designer',
    bio: 'Award-winning designer specializing in creating intuitive interfaces and memorable brand experiences. Transforms complex ideas into elegant solutions.',
    skills: ['UI/UX Design', 'Figma', 'Brand Identity', 'Motion Design', 'Design Systems'],
    avatar: 'designer',
    socials: {
      linkedin: 'https://linkedin.com/in/sarahchen',
      twitter: 'https://twitter.com/sarahchen',
    },
  },
]

export const SERVICES: Service[] = [
  {
    id: 'web-dev',
    icon: 'web',
    title: 'Web App Development',
    description: 'Modern, responsive web applications built with cutting-edge technologies. From single-page apps to complex enterprise solutions.',
    highlights: [
      'React, Vue, Angular & Next.js',
      'Progressive Web Apps (PWA)',
      'E-commerce platforms',
      'Custom dashboards & admin panels',
      'API development & integration',
    ],
    startingPrice: 999,
  },
  {
    id: 'mobile-dev',
    icon: 'mobile',
    title: 'Mobile App Development',
    description: 'Native and cross-platform mobile applications that deliver seamless experiences on iOS and Android devices.',
    highlights: [
      'React Native & Flutter',
      'iOS & Android native apps',
      'App Store optimization',
      'Push notifications & analytics',
      'Offline-first architecture',
    ],
    startingPrice: 1499,
  },
  {
    id: 'desktop-dev',
    icon: 'desktop',
    title: 'Desktop App Development',
    description: 'Powerful desktop applications for Windows, macOS, and Linux with modern UI and robust functionality.',
    highlights: [
      'Electron & Tauri apps',
      'Cross-platform compatibility',
      'System integration',
      'Auto-updates & licensing',
      'Performance optimization',
    ],
    startingPrice: 1299,
  },
  {
    id: 'custom-software',
    icon: 'custom',
    title: 'Custom Software Solutions',
    description: 'Tailored software solutions designed specifically for your business needs. From concept to deployment.',
    highlights: [
      'Enterprise applications',
      'SaaS product development',
      'Legacy system modernization',
      'Third-party integrations',
      'Scalable architecture',
    ],
    startingPrice: 2499,
  },
  {
    id: 'ui-ux',
    icon: 'design',
    title: 'UI/UX Design',
    description: 'User-centered design that combines aesthetics with functionality to create memorable digital experiences.',
    highlights: [
      'User research & wireframing',
      'High-fidelity prototypes',
      'Design systems & style guides',
      'Usability testing',
      'Brand identity design',
    ],
    startingPrice: 499,
  },
  {
    id: 'maintenance',
    icon: 'support',
    title: 'Maintenance & Support',
    description: 'Keep your applications running smoothly with our comprehensive maintenance and support services.',
    highlights: [
      '24/7 monitoring & support',
      'Bug fixes & updates',
      'Performance optimization',
      'Security patches',
      'Feature enhancements',
    ],
    startingPrice: 299,
  },
]

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'starter',
    name: 'Starter',
    description: 'Perfect for small projects and MVPs',
    price: 999,
    features: [
      'Single page application',
      'Responsive design',
      'Up to 5 pages/screens',
      'Basic SEO optimization',
      'Contact form integration',
      '30 days support',
      'Source code delivery',
    ],
    ctaText: 'Get Started',
  },
  {
    id: 'professional',
    name: 'Professional',
    description: 'Ideal for growing businesses',
    price: 2499,
    features: [
      'Multi-page web/mobile app',
      'Custom UI/UX design',
      'Up to 15 pages/screens',
      'Database integration',
      'User authentication',
      'Payment integration',
      'Admin dashboard',
      '90 days support',
      'Deployment assistance',
    ],
    popular: true,
    ctaText: 'Most Popular',
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    description: 'For large-scale applications',
    price: 'custom',
    features: [
      'Full-stack development',
      'Unlimited pages/features',
      'Advanced security',
      'Scalable architecture',
      'API development',
      'Third-party integrations',
      'Dedicated project manager',
      '12 months support',
      'Priority support',
      'SLA guarantee',
    ],
    ctaText: 'Contact Us',
  },
]

export const PROJECTS: Project[] = [
  {
    id: 'ecommerce-platform',
    title: 'ShopFlow E-Commerce Platform',
    description: 'A full-featured e-commerce solution with real-time inventory, multi-vendor support, and advanced analytics dashboard.',
    tech: ['Next.js', 'Node.js', 'PostgreSQL', 'Stripe', 'Redis'],
    liveUrl: 'https://shopflow-demo.vercel.app',
    githubUrl: 'https://github.com/eliteprodie/shopflow',
    featured: true,
    category: 'web',
  },
  {
    id: 'health-tracker',
    title: 'VitalSync Health App',
    description: 'Cross-platform health tracking app with wearable integration, personalized insights, and telehealth features.',
    tech: ['React Native', 'Firebase', 'HealthKit', 'TensorFlow'],
    liveUrl: 'https://vitalsync.app',
    githubUrl: 'https://github.com/eliteprodie/vitalsync',
    featured: true,
    category: 'mobile',
  },
  {
    id: 'project-management',
    title: 'TaskMaster Pro',
    description: 'Enterprise project management tool with Gantt charts, resource allocation, and team collaboration features.',
    tech: ['React', 'TypeScript', 'Node.js', 'MongoDB', 'Socket.io'],
    liveUrl: 'https://taskmaster-pro.vercel.app',
    githubUrl: 'https://github.com/eliteprodie/taskmaster',
    featured: true,
    category: 'web',
  },
  {
    id: 'finance-dashboard',
    title: 'FinanceHub Desktop',
    description: 'Desktop application for financial portfolio management with real-time market data and AI-powered insights.',
    tech: ['Electron', 'React', 'Python', 'TensorFlow', 'WebSocket'],
    liveUrl: 'https://financehub.eliteprodie.com',
    githubUrl: 'https://github.com/eliteprodie/financehub',
    featured: false,
    category: 'desktop',
  },
  {
    id: 'learning-platform',
    title: 'EduLearn LMS',
    description: 'Learning management system with video streaming, interactive quizzes, and progress tracking.',
    tech: ['Vue.js', 'Laravel', 'MySQL', 'AWS', 'FFmpeg'],
    liveUrl: 'https://edulearn-demo.vercel.app',
    githubUrl: 'https://github.com/eliteprodie/edulearn',
    featured: false,
    category: 'web',
  },
  {
    id: 'delivery-app',
    title: 'QuickDeliver Mobile',
    description: 'On-demand delivery app with real-time tracking, route optimization, and driver management.',
    tech: ['Flutter', 'Firebase', 'Google Maps', 'Node.js'],
    liveUrl: 'https://quickdeliver.app',
    githubUrl: 'https://github.com/eliteprodie/quickdeliver',
    featured: false,
    category: 'mobile',
  },
]

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Michael Roberts',
    role: 'CEO',
    company: 'TechStart Inc.',
    content: 'EliteProdie transformed our vision into reality. Their attention to detail and commitment to quality exceeded our expectations. The web app they built increased our conversion rate by 40%.',
    rating: 5,
  },
  {
    id: '2',
    name: 'Emily Watson',
    role: 'Product Manager',
    company: 'HealthCore Solutions',
    content: 'Working with EliteProdie was a game-changer. They delivered our mobile app on time and within budget. Their team\'s expertise in React Native is truly impressive.',
    rating: 5,
  },
  {
    id: '3',
    name: 'David Kim',
    role: 'Founder',
    company: 'RetailFlow',
    content: 'The e-commerce platform EliteProdie built for us handles thousands of transactions daily without a hitch. Professional team, excellent communication, outstanding results.',
    rating: 5,
  },
]

export const PROCESS_STEPS = [
  { step: '01', title: 'Discovery',  desc: 'We dive deep into your requirements, goals, and target audience.' },
  { step: '02', title: 'Design',     desc: 'Creating wireframes, prototypes, and visual designs for approval.' },
  { step: '03', title: 'Develop',    desc: 'Building your solution with clean, tested, and documented code.' },
  { step: '04', title: 'Deploy',     desc: 'Launching your product with CI/CD, monitoring, and support.' },
]
