import { useEffect, useRef, useState } from 'react'
import { SKILLS } from '../data'
import type { Skill } from '../types'

// Simple scroll-triggered reveal hook
function useInView(threshold = 0.2) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true)
        obs.disconnect()
      }
    }, { threshold })
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])

  return { ref, inView }
}

function SkillBar({ skill, inView, delay }: { skill: Skill; inView: boolean; delay: number }) {
  const categoryColor: Record<Skill['category'], string> = {
    frontend: '#00FF00',
    tooling: '#00cc00',
    design: '#009900',
  }
  const color = categoryColor[skill.category]

  return (
    <div className="group">
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-sm font-semibold text-gray-800">{skill.name}</span>
        <span className="text-xs font-mono text-gray-500">{skill.level}%</span>
      </div>
      <div
        className="h-2 rounded-full bg-gray-100 overflow-hidden"
        role="progressbar"
        aria-valuenow={skill.level}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`${skill.name} proficiency: ${skill.level}%`}
      >
        <div
          className="h-full rounded-full transition-all duration-1000 ease-out"
          style={{
            width: inView ? `${skill.level}%` : '0%',
            backgroundColor: color,
            transitionDelay: `${delay}ms`,
            boxShadow: `0 0 8px ${color}66`,
          }}
        />
      </div>
    </div>
  )
}

const CATEGORY_LABELS: Record<Skill['category'], string> = {
  frontend: '🖥 Frontend',
  tooling:  '🛠 Tooling',
  design:   '🎨 Design',
}

export default function AboutSection() {
  const { ref, inView } = useInView()

  const grouped = SKILLS.reduce<Record<Skill['category'], Skill[]>>(
    (acc, s) => { acc[s.category].push(s); return acc },
    { frontend: [], tooling: [], design: [] }
  )

  return (
    <section
      id="about"
      className="py-24 bg-white"
      aria-labelledby="about-heading"
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-16">
          <p className="section-label mb-3">Who I Am</p>
          <h2
            id="about-heading"
            className="text-4xl md:text-5xl font-black text-black"
          >
            About <span className="text-gradient">Me</span>
          </h2>
          <p className="mt-4 text-gray-500 max-w-lg mx-auto">
            A developer who obsesses over the details that make interfaces feel alive.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Bio */}
          <div>
            <div
              className="relative rounded-2xl p-8 border border-gray-100"
              style={{ background: 'linear-gradient(135deg, #f9fafb 0%, #f0fdf4 100%)' }}
            >
              {/* Accent line */}
              <div
                className="absolute top-0 left-8 right-8 h-0.5 rounded-full"
                style={{ backgroundColor: '#00FF00' }}
                aria-hidden="true"
              />

              <div className="flex items-center gap-4 mb-6">
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl"
                  style={{ backgroundColor: 'rgba(0,255,0,0.12)' }}
                  aria-hidden="true"
                >
                  👨‍💻
                </div>
                <div>
                  <h3 className="font-black text-xl text-black">Mahesh Kumar</h3>
                  <p className="text-sm text-gray-500 font-mono">Full-Stack Developer</p>
                </div>
              </div>

              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  I'm a <strong className="text-black">Full-Stack Developer</strong> with 2+ years
                  of experience building clean, responsive, and database-driven web applications,
                  focusing on robust end-to-end user experiences.
                </p>
                <p>
                  My stack centers around <strong className="text-black">React, TypeScript, Tailwind CSS, Node.js, and Databases</strong>.
                  I've successfully built and integrated fully-featured platforms, including an interactive online course management system and a robust e-commerce dashboard.
                </p>
                <p>
                  I love turning complex backend requirements and interactive frontend flows into seamless, performant digital solutions.
                </p>
              </div>

              {/* Fun facts */}
              <div className="mt-6 grid grid-cols-2 gap-3">
                {[
                  { icon: '📍', text: 'India' },
                  { icon: '🌐', text: 'Remote-first' },
                  { icon: '⏱',  text: 'Available now' },
                  { icon: '☕', text: 'Coffee-driven dev' },
                ].map(f => (
                  <div
                    key={f.text}
                    className="flex items-center gap-2 text-sm text-gray-600 bg-white rounded-xl p-3 border border-gray-100"
                  >
                    <span aria-hidden="true">{f.icon}</span>
                    {f.text}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Skills */}
          <div ref={ref}>
            <h3 className="text-xl font-black text-black mb-6">Skills & Expertise</h3>
            <div className="space-y-8">
              {(Object.entries(grouped) as [Skill['category'], Skill[]][]).map(([cat, skills]) => {
                if (skills.length === 0) return null
                return (
                  <div key={cat}>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
                      {CATEGORY_LABELS[cat]}
                    </p>
                    <div className="space-y-4">
                      {skills.map((skill, i) => (
                        <SkillBar
                          key={skill.name}
                          skill={skill}
                          inView={inView}
                          delay={i * 80}
                        />
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Badges */}
            <div className="mt-8 flex flex-wrap gap-2" aria-label="Certification and interest badges">
              {['Web Apps', 'REST APIs', 'Zustand', 'React Router', 'Git & GitHub', 'Databases'].map(badge => (
                <span
                  key={badge}
                  className="px-3 py-1 rounded-full text-xs font-bold border"
                  style={{ borderColor: '#00FF00', color: '#007700', backgroundColor: 'rgba(0,255,0,0.06)' }}
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
