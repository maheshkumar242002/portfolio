import { useState, useEffect, useRef } from 'react'

const CATEGORIES = [
  { id: 'mobile', label: 'Mobile' },
  { id: 'frontend', label: 'Front End' },
  { id: 'backend', label: 'Backend' },
  { id: 'frameworks', label: 'Frameworks' },
  { id: 'database', label: 'Database' },
  { id: 'devops', label: 'DevOps' },
  { id: 'cms', label: 'CMS' },
]

const ICON_URLS: Record<string, string> = {
  android: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/android/android-original.svg',
  ios: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apple/apple-original.svg',
  flutter: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg',
  reactnative: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
  kotlin: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg',
  swift: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/swift/swift-original.svg',
  react: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
  vue: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg',
  angular: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg',
  typescript: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
  javascript: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
  html5: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
  css3: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',
  tailwind: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg',
  nodejs: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
  python: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
  java: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg',
  php: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg',
  go: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg',
  dotnet: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dot-net/dot-net-original.svg',
  nextjs: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg',
  express: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg',
  django: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg',
  laravel: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg',
  spring: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg',
  mongodb: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
  postgresql: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
  mysql: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg',
  firebase: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg',
  redis: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg',
  docker: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
  aws: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg',
  azure: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg',
  kubernetes: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg',
  gcp: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg',
  wordpress: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/wordpress/wordpress-plain.svg',
  shopify: 'https://upload.wikimedia.org/wikipedia/commons/0/0e/Shopify_logo_2018.svg',
  strapi: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/strapi/strapi-original.svg',
}

const TECHNOLOGIES: Record<string, Array<{ name: string; icon: string }>> = {
  mobile: [
    { name: 'Android', icon: 'android' },
    { name: 'iOS', icon: 'ios' },
    { name: 'Flutter', icon: 'flutter' },
    { name: 'React Native', icon: 'reactnative' },
    { name: 'Kotlin', icon: 'kotlin' },
    { name: 'Swift', icon: 'swift' },
  ],
  frontend: [
    { name: 'React', icon: 'react' },
    { name: 'Vue.js', icon: 'vue' },
    { name: 'Angular', icon: 'angular' },
    { name: 'TypeScript', icon: 'typescript' },
    { name: 'JavaScript', icon: 'javascript' },
    { name: 'HTML5', icon: 'html5' },
    { name: 'CSS3', icon: 'css3' },
    { name: 'Tailwind', icon: 'tailwind' },
  ],
  backend: [
    { name: 'Node.js', icon: 'nodejs' },
    { name: 'Python', icon: 'python' },
    { name: 'Java', icon: 'java' },
    { name: 'PHP', icon: 'php' },
    { name: 'Go', icon: 'go' },
    { name: '.NET', icon: 'dotnet' },
  ],
  frameworks: [
    { name: 'Next.js', icon: 'nextjs' },
    { name: 'Express', icon: 'express' },
    { name: 'Django', icon: 'django' },
    { name: 'Laravel', icon: 'laravel' },
    { name: 'Spring', icon: 'spring' },
  ],
  database: [
    { name: 'MongoDB', icon: 'mongodb' },
    { name: 'PostgreSQL', icon: 'postgresql' },
    { name: 'MySQL', icon: 'mysql' },
    { name: 'Firebase', icon: 'firebase' },
    { name: 'Redis', icon: 'redis' },
  ],
  devops: [
    { name: 'Docker', icon: 'docker' },
    { name: 'AWS', icon: 'aws' },
    { name: 'Azure', icon: 'azure' },
    { name: 'Kubernetes', icon: 'kubernetes' },
    { name: 'GCP', icon: 'gcp' },
  ],
  cms: [
    { name: 'WordPress', icon: 'wordpress' },
    { name: 'Shopify', icon: 'shopify' },
    { name: 'Strapi', icon: 'strapi' },
  ],
}

function TechCard({ tech, index }: { tech: { name: string; icon: string }; index: number }) {
  const iconUrl = ICON_URLS[tech.icon]
  
  return (
    <div
      className="flex flex-col items-center gap-3 p-4 sm:p-6 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-card)] hover:border-[var(--color-primary)] hover:shadow-[var(--shadow-glow)] transition-all duration-300 group animate-fade-in-up"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
        {iconUrl ? (
          <img src={iconUrl} alt={tech.name} className="w-full h-full object-contain" loading="lazy" />
        ) : (
          <div className="w-full h-full bg-gray-200 rounded" />
        )}
      </div>
      <span className="text-sm font-semibold text-[var(--color-text-primary)] text-center">
        {tech.name}
      </span>
    </div>
  )
}

export default function TechnologiesSection() {
  const [activeCategory, setActiveCategory] = useState('mobile')
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

  const activeTechs = TECHNOLOGIES[activeCategory] || []

  return (
    <section
      ref={sectionRef}
      id="technologies"
      className="py-24 bg-[var(--color-bg-primary)]"
      aria-labelledby="technologies-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-12 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <p className="section-label mb-3">Our Stack</p>
          <h2 id="technologies-heading" className="section-title">
            Technologies We <span className="text-gradient">Work With</span>
          </h2>
          <p className="section-description mx-auto mt-4">
            We use cutting-edge technologies to build scalable, high-performance applications.
          </p>
        </div>

        <div className={`flex flex-wrap justify-center gap-2 sm:gap-3 mb-12 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl text-sm sm:text-base font-semibold transition-all duration-300 ${
                activeCategory === cat.id
                  ? 'bg-[var(--color-text-primary)] text-[var(--color-bg-primary)] shadow-lg'
                  : 'bg-[var(--color-bg-secondary)] text-[var(--color-text-secondary)] border border-[var(--color-border)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 transition-all duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          {activeTechs.map((tech, index) => (
            <TechCard key={tech.icon} tech={tech} index={index} />
          ))}
        </div>

        <div className={`mt-16 text-center transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <p className="text-[var(--color-text-secondary)] mb-6">
            Do not see your preferred technology? We adapt to your requirements.
          </p>
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-primary"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            Discuss Your Stack
          </button>
        </div>
      </div>
    </section>
  )
}
