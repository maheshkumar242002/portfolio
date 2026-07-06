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
  Stat,
} from "./types";

// Company Information
export const COMPANY: CompanyInfo = {
  name: "Green Tech Cube",
  tagline: "Building Tomorrow's Digital Solutions",
  description:
    "We are a premium software development company delivering high-quality web, mobile, and custom software solutions at competitive prices. Our team of experts transforms your ideas into powerful digital products.",
  email: "greentechcube@gmail.com",
  founded: 2022,
};

export const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "#hero" },
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "Pricing", href: "#pricing" },
  { label: "Team", href: "#team" },
  { label: "Contact", href: "#contact" },
];

export const SOCIAL_LINKS: SocialLink[] = [
  { label: "GitHub", href: "https://github.com/greentechcube", icon: "github" },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/company/greentechcube",
    icon: "linkedin",
  },
  {
    label: "Twitter",
    href: "https://twitter.com/greentechcube",
    icon: "twitter",
  },
  {
    label: "Instagram",
    href: "https://instagram.com/greentechcube",
    icon: "instagram",
  },
  {
    label: "Facebook",
    href: "https://facebook.com/greentechcube",
    icon: "facebook",
  },
];

export const STATS: Stat[] = [
  { value: "5", label: "Projects Delivered", suffix: "+" },
  { value: "5", label: "Happy Clients", suffix: "+" },
  { value: "1", label: "Years Experience", suffix: "" },
  { value: "100", label: "Client Satisfaction", suffix: "%" },
];

export const SKILLS: Skill[] = [
  { name: "React", level: 95, category: "frontend" },
  { name: "TypeScript", level: 92, category: "frontend" },
  { name: "Next.js", level: 90, category: "frontend" },
  { name: "Vue.js", level: 85, category: "frontend" },
  { name: "Tailwind CSS", level: 95, category: "frontend" },
  { name: "Node.js", level: 90, category: "backend" },
  { name: "Express", level: 88, category: "backend" },
  { name: "Python", level: 85, category: "backend" },
  { name: "PostgreSQL", level: 88, category: "backend" },
  { name: "MongoDB", level: 85, category: "backend" },
  { name: "React Native", level: 88, category: "mobile" },
  { name: "Flutter", level: 82, category: "mobile" },
  { name: "Figma", level: 90, category: "design" },
  { name: "AWS", level: 85, category: "devops" },
  { name: "Docker", level: 88, category: "devops" },
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: "founder",
    name: "Karthick S",
    role: "Founder & Lead Developer",
    bio: "Full-stack architect with 2+ years of experience building scalable applications. Passionate about clean code and delivering exceptional user experiences.",
    skills: [
      "React",
      "TypeScript",
      "System Architecture",
      "Java",
      "Python",
      "Machine Learning",
    ],
    avatar: "/team/karthik.png",
    socials: {
      linkedin: "https://linkedin.com/in/alexmitchell",
      twitter: "https://twitter.com/alexmitchell",
      github: "https://github.com/alexmitchell",
    },
  },
  {
    id: "founder",
    name: "Mahesh kumar S",
    role: "Software Engineer",
    bio: "Full-stack architect with 2+ years of experience building scalable applications. Passionate about clean code and delivering exceptional user experiences.",
    skills: [
      "React",
      "TypeScript",
      "AWS",
      "Node.js",
      "Python",
      "PHP",
      "MySQL",
      "MongoDb",
    ],
    avatar: "/team/mahesh.png",
    socials: {
      linkedin: "https://linkedin.com/in/maheshkumar",
      twitter: "https://twitter.com/maheshkumar",
    },
  },
];

export const SERVICES: Service[] = [
  {
    id: "web-dev",
    icon: "web",
    title: "Web App Development",
    description:
      "Modern, responsive web applications built with cutting-edge technologies. From single-page apps to complex enterprise solutions.",
    highlights: [
      "React, Vue, Angular & Next.js",
      "Progressive Web Apps (PWA)",
      "E-commerce platforms",
      "Custom dashboards & admin panels",
      "API development & integration",
    ],
    startingPrice: 4999,
  },
  {
    id: "mobile-dev",
    icon: "mobile",
    title: "Mobile App Development",
    description:
      "Native and cross-platform mobile applications that deliver seamless experiences on iOS and Android devices.",
    highlights: [
      "React Native & Flutter",
      "iOS & Android native apps",
      "App Store optimization",
      "Push notifications & analytics",
      "Offline-first architecture",
    ],
    startingPrice: 4999,
  },
  {
    id: "desktop-dev",
    icon: "desktop",
    title: "Desktop App Development",
    description:
      "Powerful desktop applications for Windows, macOS, and Linux with modern UI and robust functionality.",
    highlights: [
      "Electron & Tauri apps",
      "Cross-platform compatibility",
      "System integration",
      "Auto-updates & licensing",
      "Performance optimization",
    ],
    startingPrice: 6999,
  },
];

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: "starter",
    name: "Starter",
    description: "Perfect for small projects and MVPs",
    price: 4999,
    priceUSD: 60,
    features: [
      "Single page application",
      "Responsive design",
      "Up to 5 pages/screens",
      "Basic SEO optimization",
      "Contact form integration",
      "30 days support",
      "Source code delivery",
    ],
    ctaText: "Get Started",
  },
  {
    id: "professional",
    name: "Professional",
    description: "Ideal for growing businesses",
    price: 14999,
    priceUSD: 180,
    features: [
      "Multi-page web/mobile app",
      "Custom UI/UX design",
      "Up to 15 pages/screens",
      "Database integration",
      "User authentication",
      "Payment integration",
      "Admin dashboard",
      "90 days support",
      "Deployment assistance",
    ],
    popular: true,
    ctaText: "Most Popular",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    description: "For large-scale applications",
    price: "custom",
    features: [
      "Full-stack development",
      "Unlimited pages/features",
      "Advanced security",
      "Scalable architecture",
      "API development",
      "Third-party integrations",
      "Dedicated project manager",
      "12 months support",
      "Priority support",
      "SLA guarantee",
    ],
    ctaText: "Contact Us",
  },
];

export const PROJECTS: Project[] = [
  {
    id: "obsidian-motion",
    title: "Obsidian Motion",
    description:
      "A high-performance interactive animation system and design playground exploring advanced physics-based motion and fluid UI transitions.",
    tech: ["React", "Framer Motion", "Tailwind CSS", "TypeScript"],
    liveUrl: "https://obsidian-motion.vercel.app",
    githubUrl: "https://github.com/eliteprodie/obsidian-motion",
    featured: true,
    category: "web",
    image: "/projects/obsidian-motion.png",
  },
  {
    id: "the-curator",
    title: "The Curator",
    description:
      "A premium digital archiving and exhibition platform featuring custom layouts, headless content querying, and a minimalist design.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "GraphQL"],
    liveUrl: "https://the-curator-ten.vercel.app",
    githubUrl: "https://github.com/eliteprodie/the-curator",
    featured: true,
    category: "web",
    image: "/projects/the-curator.png",
  },
  {
    id: "the-alchemist",
    title: "The Alchemist",
    description:
      "An experimental web experience showcasing immersive 3D graphics, customized shaders, and interactive audio-reactive particle simulations.",
    tech: ["React", "Three.js", "React Three Fiber", "Tailwind CSS"],
    liveUrl: "https://the-alchemist-beta.vercel.app",
    githubUrl: "https://github.com/eliteprodie/the-alchemist",
    featured: true,
    category: "web",
    image: "/projects/the-alchemist.png",
  },
  {
    id: "the-vault",
    title: "The Vault",
    description:
      "A secure, client-facing file delivery portal and asset storage workspace with advanced access controls and real-time activity tracking.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Firebase"],
    liveUrl: "https://the-vault-peach-zeta.vercel.app",
    githubUrl: "https://github.com/eliteprodie/the-vault",
    featured: false,
    category: "web",
    image: "/projects/the-vault.png",
  },
  {
    id: "the-meridian",
    title: "The Meridian",
    description:
      "An enterprise analytics dashboard utilizing geographical maps and telemetry streams to monitor system health and database clusters.",
    tech: ["React", "TypeScript", "Chart.js", "Tailwind CSS", "Vite"],
    liveUrl: "https://the-meridian.vercel.app",
    githubUrl: "https://github.com/eliteprodie/the-meridian",
    featured: false,
    category: "web",
    image: "/projects/the-meridian.png",
  },
  {
    id: "the-prism",
    title: "The Prism",
    description:
      "A vibrant, glassmorphic portfolio theme emphasizing dynamic neon gradients, hover micro-interactions, and layout responsive states.",
    tech: ["React", "Tailwind CSS", "Framer Motion", "Lucide Icons"],
    liveUrl: "https://the-prism-ecru.vercel.app",
    githubUrl: "https://github.com/eliteprodie/the-prism",
    featured: false,
    category: "web",
    image: "/projects/the-prism.png",
  },
  {
    id: "the-authority",
    title: "The Authority",
    description:
      "A content governance engine and editor workspace featuring automated editorial approval pipelines and custom role hierarchies.",
    tech: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS"],
    liveUrl: "https://the-authority.vercel.app",
    githubUrl: "https://github.com/eliteprodie/the-authority",
    featured: false,
    category: "web",
    image: "/projects/the-authority.png",
  },
  {
    id: "the-horizon",
    title: "The Horizon",
    description:
      "A minimal landing page featuring bold typography, clean grids, and scroll-bound animations built for creative studios.",
    tech: ["Next.js", "Framer Motion", "Tailwind CSS", "TypeScript"],
    liveUrl: "https://the-horizon-liart.vercel.app",
    githubUrl: "https://github.com/eliteprodie/the-horizon",
    featured: false,
    category: "web",
    image: "/projects/the-horizon.png",
  },
  {
    id: "the-catalyst",
    title: "The Catalyst",
    description:
      "An agile project scaffolding interface enabling developer teams to configure build targets and trigger deployment setups instantly.",
    tech: ["React", "Vite", "Tailwind CSS", "Node.js", "TypeScript"],
    liveUrl: "https://the-catalyst-mu.vercel.app",
    githubUrl: "https://github.com/eliteprodie/the-catalyst",
    featured: false,
    category: "web",
    image: "/projects/the-catalyst.png",
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "1",
    name: "Michael Roberts",
    role: "CEO",
    company: "TechStart Inc.",
    content:
      "Green Tech Cube transformed our vision into reality. Their attention to detail and commitment to quality exceeded our expectations. The web app they built increased our conversion rate by 40%.",
    rating: 5,
  },
  {
    id: "2",
    name: "Emily Watson",
    role: "Product Manager",
    company: "HealthCore Solutions",
    content:
      "Working with Green Tech Cube was a game-changer. They delivered our mobile app on time and within budget. Their team's expertise in React Native is truly impressive.",
    rating: 5,
  },
  {
    id: "3",
    name: "David Kim",
    role: "Founder",
    company: "RetailFlow",
    content:
      "The e-commerce platform Green Tech Cube built for us handles thousands of transactions daily without a hitch. Professional team, excellent communication, outstanding results.",
    rating: 5,
  },
];

export const PROCESS_STEPS = [
  {
    step: "01",
    title: "Discovery",
    desc: "We dive deep into your requirements, goals, and target audience.",
  },
  {
    step: "02",
    title: "Design",
    desc: "Creating wireframes, prototypes, and visual designs for approval.",
  },
  {
    step: "03",
    title: "Develop",
    desc: "Building your solution with clean, tested, and documented code.",
  },
  {
    step: "04",
    title: "Deploy",
    desc: "Launching your product with CI/CD, monitoring, and support.",
  },
];
