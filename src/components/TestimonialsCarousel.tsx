import { useRef, useState } from 'react'

// Testimonial data
const TESTIMONIALS = [
  {
    id: '1',
    title: 'E-Commerce Platform',
    content: 'Green Tech Cube transformed our vision into reality. Their attention to detail and commitment to quality exceeded our expectations. The web app they built increased our conversion rate by 40%.',
    author: 'Michael Roberts',
    role: 'CEO, TechStart Inc.',
    year: '2024',
    avatar: '/team/avatar1.png',
  },
  {
    id: '2',
    title: 'Healthcare Mobile App',
    content: 'Working with Green Tech Cube was a game-changer. They delivered our mobile app on time and within budget. Their team\'s expertise in React Native is truly impressive.',
    author: 'Emily Watson',
    role: 'Product Manager, HealthCore',
    year: '2024',
    avatar: '/team/avatar2.png',
  },
  {
    id: '3',
    title: 'Analytics Dashboard',
    content: 'The enterprise dashboard Green Tech Cube built for us handles thousands of data points seamlessly. Professional team, excellent communication, outstanding results.',
    author: 'David Kim',
    role: 'Founder, RetailFlow',
    year: '2023',
    avatar: '/team/avatar3.png',
  },
  {
    id: '4',
    title: 'CRM Integration',
    content: 'Their CRM solution streamlined our entire sales process. The team understood our needs perfectly and delivered a product that exceeded all expectations.',
    author: 'Sarah Johnson',
    role: 'Sales Director, Nexus Corp',
    year: '2023',
    avatar: '/team/avatar4.png',
  },
  {
    id: '5',
    title: 'Inventory System',
    content: 'Green Tech Cube delivered a robust inventory management system that reduced our operational costs by 30%. Highly recommend their services!',
    author: 'James Chen',
    role: 'Operations Head, LogiTech',
    year: '2024',
    avatar: '/team/avatar5.png',
  },
  {
    id: '6',
    title: 'Booking Platform',
    content: 'The booking platform they created handles over 10,000 reservations monthly without any issues. Exceptional quality and performance.',
    author: 'Anna Martinez',
    role: 'CEO, TravelEase',
    year: '2024',
    avatar: '/team/avatar6.png',
  },
]

// Card rotations for the tilted effect
const CARD_ROTATIONS = [-12, -6, 0, 6, 12, -12]

export default function TestimonialsCarousel() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const totalCards = TESTIMONIALS.length
  const visibleCards = 4 // approximate visible cards

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return
    
    const container = scrollContainerRef.current
    const cardWidth = 320 // approximate card width + gap
    const scrollAmount = cardWidth * 1
    
    if (direction === 'left') {
      container.scrollBy({ left: -scrollAmount, behavior: 'smooth' })
      setActiveIndex(prev => Math.max(0, prev - 1))
    } else {
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' })
      setActiveIndex(prev => Math.min(totalCards - visibleCards, prev + 1))
    }
  }

  const handleScroll = () => {
    if (!scrollContainerRef.current) return
    const container = scrollContainerRef.current
    const cardWidth = 320
    const newIndex = Math.round(container.scrollLeft / cardWidth)
    setActiveIndex(Math.min(newIndex, totalCards - visibleCards))
  }

  return (
    <section 
      id="testimonials"
      className="py-20 md:py-28 bg-[var(--color-bg-secondary)] overflow-hidden"
      aria-labelledby="testimonials-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <span className="section-label">Testimonials</span>
          <h2 id="testimonials-heading" className="section-title mt-3">
            What our <span className="text-gradient">clients say</span>
          </h2>
          <p className="section-description mx-auto mt-4">
            Hear from businesses we've helped transform with our digital solutions
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Scrollable Cards */}
          <div 
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="flex gap-6 overflow-x-auto scrollbar-hide pb-8 pt-16 px-8 md:px-16"
            style={{ 
              scrollSnapType: 'x mandatory',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            {TESTIMONIALS.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className="flex-shrink-0 w-[280px] sm:w-[300px] md:w-[320px] scroll-snap-align-start"
                style={{ scrollSnapAlign: 'start' }}
              >
                {/* Tilted Card */}
                <div 
                  className="relative bg-[var(--color-bg-card)] rounded-2xl p-6 shadow-lg border border-[var(--color-border)] hover:border-[var(--color-primary)] hover:shadow-[var(--shadow-glow)] transition-all duration-500 hover:scale-105 group"
                  style={{
                    transform: `rotate(${CARD_ROTATIONS[index % CARD_ROTATIONS.length]}deg)`,
                    transformOrigin: 'center bottom',
                  }}
                >
                  {/* Card Content */}
                  <div className="relative z-10">
                    {/* Title */}
                    <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-3 group-hover:text-[var(--color-primary)] transition-colors">
                      {testimonial.title}
                    </h3>
                    
                    {/* Testimonial Text */}
                    <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed mb-6 line-clamp-5">
                      {testimonial.content}
                    </p>
                    
                    {/* Author Info */}
                    <div className="flex items-center gap-3 pt-4 border-t border-[var(--color-border)]">
                      {/* Avatar */}
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-dark)] flex items-center justify-center text-white font-bold text-sm overflow-hidden">
                        {testimonial.avatar ? (
                          <img 
                            src={testimonial.avatar} 
                            alt={testimonial.author}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none'
                              e.currentTarget.nextElementSibling?.classList.remove('hidden')
                            }}
                          />
                        ) : null}
                        <span className={testimonial.avatar ? 'hidden' : ''}>
                          {testimonial.author.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      
                      {/* Name & Year */}
                      <div>
                        <p className="text-sm font-semibold text-[var(--color-text-primary)]">
                          {testimonial.author}
                        </p>
                        <p className="text-xs text-[var(--color-text-muted)]">
                          {testimonial.year}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Decorative Quote Icon */}
                  <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="var(--color-primary)">
                      <path d="M11 7H7a2 2 0 00-2 2v4a2 2 0 002 2h2v2a2 2 0 01-2 2v2a4 4 0 004-4V9a2 2 0 00-2-2zm8 0h-4a2 2 0 00-2 2v4a2 2 0 002 2h2v2a2 2 0 01-2 2v2a4 4 0 004-4V9a2 2 0 00-2-2z" />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-center gap-4 mt-8">
            {/* Left Arrow */}
            <button
              onClick={() => scroll('left')}
              disabled={activeIndex === 0}
              className="w-12 h-12 rounded-full border-2 border-[var(--color-border)] bg-[var(--color-bg-card)] flex items-center justify-center text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] hover:border-[var(--color-primary)] transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:border-[var(--color-border)] disabled:hover:text-[var(--color-text-secondary)]"
              aria-label="Previous testimonials"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>

            {/* Progress Indicator */}
            <div className="flex items-center gap-2">
              {Array.from({ length: Math.ceil(totalCards / 2) }).map((_, i) => (
                <div
                  key={i}
                  className={`h-1 rounded-full transition-all duration-300 ${
                    Math.floor(activeIndex / 2) === i 
                      ? 'w-6 bg-[var(--color-primary)]' 
                      : 'w-4 bg-[var(--color-border)]'
                  }`}
                />
              ))}
            </div>

            {/* Right Arrow */}
            <button
              onClick={() => scroll('right')}
              disabled={activeIndex >= totalCards - visibleCards}
              className="w-12 h-12 rounded-full border-2 border-[var(--color-primary)] bg-[var(--color-bg-card)] flex items-center justify-center text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed disabled:border-[var(--color-border)] disabled:text-[var(--color-text-secondary)] disabled:hover:bg-transparent"
              aria-label="Next testimonials"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Custom scrollbar hide style */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .line-clamp-5 {
          display: -webkit-box;
          -webkit-line-clamp: 5;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  )
}
