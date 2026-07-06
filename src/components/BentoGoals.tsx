// Bento Grid Goals Section - Company Mission & Vision
export default function BentoGoals() {
  return (
    <section 
      id="about"
      className="py-20 md:py-28 bg-[var(--color-bg-primary)]"
      aria-labelledby="about-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 animate-fade-in-up">
          <span className="section-label">About Us</span>
          <h2 id="about-heading" className="section-title mt-3">
            Our <span className="text-gradient">Mission & Vision</span>
          </h2>
        </div>

        {/* Bento Grid - Clean 12-column layout */}
        <div className="grid grid-cols-12 gap-4 md:gap-5">
          
          {/* Row 1 */}
          {/* Card 1 - Logo Card */}
          <div className="col-span-12 md:col-span-6 lg:col-span-3 bg-[var(--color-bg-card)] rounded-3xl p-6 md:p-8 border border-[var(--color-border)] flex items-center justify-center h-[180px] md:h-[200px] group hover:border-[var(--color-primary)] transition-all duration-300 hover:shadow-[var(--shadow-glow)]">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 md:w-14 md:h-14 flex-shrink-0">
                <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
                  <path d="M32 4L8 18v28l24 14 24-14V18L32 4z" fill="var(--color-primary)" fillOpacity="0.2"/>
                  <path d="M32 4L8 18l24 14 24-14-24-14z" fill="var(--color-primary)"/>
                  <path d="M8 18v28l24 14V32L8 18z" fill="var(--color-primary-dark)" fillOpacity="0.7"/>
                  <path d="M56 18v28l-24 14V32l24-14z" fill="var(--color-primary)" fillOpacity="0.5"/>
                </svg>
              </div>
              <div>
                <h3 className="text-xl md:text-2xl font-black text-[var(--color-text-primary)] group-hover:text-[var(--color-primary)] transition-colors leading-tight">
                  Green Tech
                </h3>
                <span className="text-lg md:text-xl font-black text-[var(--color-primary)]">
                  Cube
                </span>
              </div>
            </div>
          </div>

          {/* Card 2 - Mission Card (Green) */}
          <div className="col-span-12 md:col-span-6 lg:col-span-6 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-dark)] rounded-3xl p-6 md:p-8 relative overflow-hidden h-[180px] md:h-[200px]">
            <div className="absolute top-4 right-4 flex gap-2">
              <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center">
                <svg viewBox="0 0 32 32" fill="white" className="w-5 h-5">
                  <path d="M16 2L4 9v14l12 7 12-7V9L16 2z" fillOpacity="0.5"/>
                  <path d="M16 2L4 9l12 7 12-7-12-7z"/>
                </svg>
              </div>
              <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                <svg viewBox="0 0 32 32" fill="white" className="w-6 h-6">
                  <path d="M16 2L4 9v14l12 7 12-7V9L16 2z" fillOpacity="0.3"/>
                </svg>
              </div>
            </div>
            <div className="relative z-10 h-full flex flex-col justify-center">
              <p className="text-white/80 text-xs font-medium mb-1">Smart IT Solutions for a</p>
              <h3 className="text-2xl md:text-3xl font-black text-white mb-3">Digital Future</h3>
              <p className="text-white/70 text-xs md:text-sm leading-relaxed line-clamp-3">
                We deliver smart, scalable digital services. Software development, cloud solutions, and technology consulting for business growth.
              </p>
            </div>
            <div className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full border border-white/10" />
          </div>

          {/* Card 3 - Typography/Colors */}
          <div className="col-span-12 md:col-span-6 lg:col-span-3 bg-[var(--color-bg-card)] rounded-3xl p-6 border border-[var(--color-border)] h-[180px] md:h-[200px] hover:border-[var(--color-primary)] transition-all duration-300 flex flex-col justify-between">
            <div>
              <span className="text-5xl md:text-6xl font-black text-[var(--color-text-primary)]">Aa</span>
              <p className="text-xs font-bold text-[var(--color-text-secondary)] mt-1">Inter Font Family</p>
              <p className="text-[10px] text-[var(--color-text-muted)]">Sans Serif</p>
            </div>
            <div className="flex gap-2">
              <div className="w-10 h-6 rounded-md bg-[#10B981]" />
              <div className="w-10 h-6 rounded-md bg-[#34D399]" />
              <div className="w-10 h-6 rounded-md bg-[#059669]" />
              <div className="w-10 h-6 rounded-md bg-[#0f172a] dark:bg-white" />
            </div>
          </div>

          {/* Row 2 */}
          {/* Card 4 - Brand Bag */}
          <div className="col-span-12 md:col-span-6 lg:col-span-3 bg-[var(--color-primary)] rounded-3xl p-6 relative overflow-hidden h-[220px] md:h-[240px] flex flex-col justify-between">
            <div className="absolute inset-0 opacity-10">
              <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
                <defs><pattern id="dots" width="8" height="8" patternUnits="userSpaceOnUse"><circle cx="4" cy="4" r="1" fill="white"/></pattern></defs>
                <rect width="100%" height="100%" fill="url(#dots)"/>
              </svg>
            </div>
            <div className="relative z-10 flex-1 flex items-center justify-center">
              <div className="w-24 h-32 bg-[#f5f0e8] rounded-lg shadow-xl flex items-center justify-center relative">
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 flex gap-6">
                  <div className="w-0.5 h-6 bg-[#d4c4a8] rounded-full -rotate-12" />
                  <div className="w-0.5 h-6 bg-[#d4c4a8] rounded-full rotate-12" />
                </div>
                <div className="flex items-center gap-1">
                  <svg viewBox="0 0 32 32" fill="var(--color-primary)" className="w-6 h-6">
                    <path d="M16 2L4 9v14l12 7 12-7V9L16 2z" fillOpacity="0.2"/>
                    <path d="M16 2L4 9l12 7 12-7-12-7z"/>
                  </svg>
                  <span className="text-[var(--color-primary)] font-bold text-xs">GTC</span>
                </div>
              </div>
            </div>
            <p className="relative z-10 text-white/80 text-xs text-center">Brand Identity</p>
          </div>

          {/* Card 5 - IT Solutions Firm */}
          <div className="col-span-12 md:col-span-6 lg:col-span-5 bg-gradient-to-br from-[var(--color-primary-dark)] to-[var(--color-primary)] rounded-3xl p-6 md:p-8 relative overflow-hidden h-[220px] md:h-[240px]">
            <div className="absolute right-0 bottom-0 w-28 h-36 overflow-hidden">
              <div className="w-full h-full bg-gradient-to-t from-[var(--color-primary)] to-transparent flex items-end justify-center">
                <div className="w-16 h-20 bg-white/20 rounded-t-full" />
              </div>
            </div>
            <div className="relative z-10 h-full flex flex-col justify-center">
              <h3 className="text-xl md:text-2xl font-bold text-white mb-2">IT Solutions Firm</h3>
              <p className="text-white/80 text-sm mb-6">Innovate. Integrate. Elevate.</p>
              <a href="#contact" className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white text-sm font-semibold px-4 py-2 rounded-full transition-all duration-300 border border-white/30 w-fit">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
                </svg>
                Connect Us
              </a>
            </div>
          </div>

          {/* Card 6 - Vision Card */}
          <div className="col-span-12 md:col-span-12 lg:col-span-4 bg-gradient-to-r from-[var(--color-bg-tertiary)] to-[var(--color-bg-secondary)] rounded-3xl p-6 border border-[var(--color-border)] relative overflow-hidden h-[220px] md:h-[240px] hover:border-[var(--color-primary)] transition-all duration-300">
            <div className="absolute right-4 bottom-4 hidden md:flex items-end gap-3">
              <div className="w-14 h-28 bg-[var(--color-bg-card)] rounded-xl shadow-lg border border-[var(--color-border)] p-1.5">
                <div className="w-full h-full bg-[var(--color-primary)] rounded-lg flex items-center justify-center">
                  <svg viewBox="0 0 32 32" fill="white" className="w-5 h-5">
                    <path d="M16 2L4 9l12 7 12-7-12-7z"/>
                  </svg>
                </div>
              </div>
              <div className="w-11 h-14 bg-[var(--color-bg-card)] rounded-lg shadow-lg border border-[var(--color-border)] p-1">
                <div className="w-full h-full bg-[var(--color-primary-muted)] rounded flex flex-col items-center justify-center">
                  <span className="text-[6px] text-[var(--color-primary)] font-bold">11:52</span>
                  <svg viewBox="0 0 32 32" fill="var(--color-primary)" className="w-4 h-4">
                    <path d="M16 2L4 9l12 7 12-7-12-7z"/>
                  </svg>
                </div>
              </div>
            </div>
            <div className="relative z-10 max-w-[70%]">
              <span className="text-[var(--color-primary)] text-xs font-bold tracking-wider uppercase">Our Vision</span>
              <h3 className="text-lg md:text-xl font-bold text-[var(--color-text-primary)] mt-2 mb-3">
                Empowering Digital Transformation
              </h3>
              <p className="text-xs md:text-sm text-[var(--color-text-secondary)] leading-relaxed">
                We envision a world where every business has access to cutting-edge technology solutions that drive growth and innovation.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
