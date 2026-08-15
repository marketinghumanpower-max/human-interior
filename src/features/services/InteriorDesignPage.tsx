import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { interiorDesignContent } from '@/content/interiorDesign'
import { FooterSection } from '@/features/homepage/components/FooterSection'

/* ─── Animated Section Wrapper ─── */
const AnimatedSection = ({
  children,
  className = '',
  delay = 0,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), delay)
          observer.disconnect()
        }
      },
      { threshold: 0.15 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [delay])

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(40px)',
        transition: `opacity 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}

/* ─── Hero Section ─── */
const HeroSection = () => {
  const { hero } = interiorDesignContent
  return (
    <section
      className="relative min-h-[70vh] flex items-center justify-center overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #0A0A0A 0%, #111 50%, #0D0D0D 100%)',
      }}
    >
      {/* Decorative grid lines */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(198,161,91,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(198,161,91,0.3) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />
      {/* Ambient glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(198,161,91,0.15) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <AnimatedSection>
          <span className="inline-block eyebrow text-[#C6A15B] mb-5">
            {hero.eyebrow}
          </span>
        </AnimatedSection>
        <AnimatedSection delay={100}>
          <h1 className="display-lg font-normal text-[#F3EFE7] leading-[1.08] mb-4 tracking-[-0.025em]">
            {hero.title}
          </h1>
        </AnimatedSection>
        <AnimatedSection delay={200}>
          <p className="body-lg text-[#C6A15B]/80 font-medium mb-6">
            {hero.subtitle}
          </p>
        </AnimatedSection>
        <AnimatedSection delay={300}>
          <p className="body-md text-[#AAA49A] max-w-2xl mx-auto mb-10 font-normal">
            {hero.description}
          </p>
        </AnimatedSection>
        <AnimatedSection delay={400}>
          <Link
            to="/contact"
            className="btn-primary button-text"
          >
            Tư Vấn Miễn Phí
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
            </svg>
          </Link>
        </AnimatedSection>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#0A0A0A] to-transparent" />
    </section>
  )
}

/* ─── Intro / Stats Section ─── */
const IntroSection = () => {
  const { intro } = interiorDesignContent
  return (
    <section className="relative py-24 bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Copy */}
          <AnimatedSection>
            <span className="inline-block eyebrow text-[#C6A15B] mb-4">
              {intro.eyebrow}
            </span>
            <h2 className="display-lg text-[#F3EFE7] leading-[1.1] mb-8 font-normal tracking-[-0.02em]">
              {intro.title}
            </h2>
            {intro.paragraphs.map((p, i) => (
              <p
                key={i}
                className="body-md text-[#AAA49A] mb-5 font-normal"
              >
                {p}
              </p>
            ))}
          </AnimatedSection>

          {/* Stats Grid */}
          <AnimatedSection delay={200}>
            <div className="grid grid-cols-2 gap-px bg-[#1E1E1E] border border-[#1E1E1E] overflow-hidden">
              {intro.highlights.map((stat, i) => (
                <div
                  key={i}
                  className="bg-[#111] p-8 text-center hover:bg-[#151515] transition-colors duration-500"
                >
                  <span className="block display-lg text-[#DEC27B] mb-2 font-normal">
                    {stat.number}
                  </span>
                  <span className="eyebrow text-[#8A8478]">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}

/* ─── Project Gallery Section ─── */
const ProjectGallery = () => {
  const { categories, projects } = interiorDesignContent
  const [activeCategory, setActiveCategory] = useState('all')
  const [hoveredId, setHoveredId] = useState<number | null>(null)
  const [expandedId, setExpandedId] = useState<number | null>(null)

  const filtered =
    activeCategory === 'all'
      ? projects
      : projects.filter((p) => p.category === activeCategory)

  return (
    <section className="relative py-24 bg-[#0D0D0D]">
      {/* Subtle texture */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, rgba(198,161,91,0.4) 1px, transparent 0)',
          backgroundSize: '32px 32px',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <AnimatedSection className="text-center mb-14">
          <span className="inline-block eyebrow text-[#C6A15B] mb-4">
            DỰ ÁN NỔI BẬT
          </span>
          <h2 className="display-lg text-[#F3EFE7] leading-[1.1] mb-3 font-normal tracking-[-0.02em]">
            Mẫu Thiết Kế Nội Thất
          </h2>
          <p className="body-md text-[#8A8478] max-w-xl mx-auto font-normal">
            Khám phá bộ sưu tập thiết kế nội thất cao cấp cho nhà phố, biệt thự và căn hộ
          </p>
        </AnimatedSection>

        {/* Category Filter */}
        <AnimatedSection delay={100} className="flex flex-wrap justify-center gap-3 mb-14">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className="px-6 py-2.5 button-text transition-all duration-300 border font-medium"
              style={{
                background: activeCategory === cat.id ? '#C6A15B' : 'transparent',
                color: activeCategory === cat.id ? '#0A0A0A' : '#8A8478',
                borderColor: activeCategory === cat.id ? '#C6A15B' : '#2A2A2A',
              }}
            >
              {cat.label}
            </button>
          ))}
        </AnimatedSection>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project, idx) => (
            <AnimatedSection key={project.id} delay={idx * 80}>
              <article
                className="group relative overflow-hidden cursor-pointer"
                style={{ background: '#111' }}
                onMouseEnter={() => setHoveredId(project.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() =>
                  setExpandedId(expandedId === project.id ? null : project.id)
                }
              >
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700"
                    style={{
                      transform:
                        hoveredId === project.id ? 'scale(1.08)' : 'scale(1)',
                    }}
                  />
                  {/* Gradient overlay */}
                  <div
                    className="absolute inset-0 transition-opacity duration-500"
                    style={{
                      background:
                        'linear-gradient(to top, rgba(10,10,10,0.9) 0%, rgba(10,10,10,0.3) 50%, transparent 100%)',
                      opacity: hoveredId === project.id ? 1 : 0.7,
                    }}
                  />
                  {/* Project number badge */}
                  <div className="absolute top-4 left-4 px-3 py-1 bg-[#0A0A0A]/60 backdrop-blur-sm border border-[#C6A15B]/20">
                    <span className="eyebrow text-[#C6A15B]">
                      Mẫu {String(project.id).padStart(2, '0')}
                    </span>
                  </div>
                  {/* Title overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <h3 className="heading-md font-normal text-[#F3EFE7] leading-tight mb-1 tracking-[-0.01em]">
                      {project.title}
                    </h3>
                    <p className="caption text-[#C6A15B]/70">
                      {project.style} · {project.area}
                    </p>
                  </div>
                </div>

                {/* Expandable Info Panel */}
                <div
                  className="overflow-hidden transition-all duration-500"
                  style={{
                    maxHeight: expandedId === project.id ? '200px' : '0',
                    opacity: expandedId === project.id ? 1 : 0,
                  }}
                >
                  <div className="p-5 border-t border-[#1E1E1E] space-y-3">
                    <div className="flex items-center gap-2">
                      <svg className="w-3.5 h-3.5 text-[#C6A15B]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                      </svg>
                      <span className="body-md text-xs text-[#AAA49A]">
                        {project.location}
                      </span>
                    </div>
                    <div className="flex gap-6">
                      <div>
                        <span className="block eyebrow text-[#5A5550] mb-1">
                          Diện tích
                        </span>
                        <span className="body-md text-[#F3EFE7]">
                          {project.area}
                        </span>
                      </div>
                      <div>
                        <span className="block eyebrow text-[#5A5550] mb-1">
                          Phong cách
                        </span>
                        <span className="body-md text-[#F3EFE7]">
                          {project.style}
                        </span>
                      </div>
                    </div>
                    <p className="caption text-[#5A5550]">
                      Thiết kế & thi công: Human Interior
                    </p>
                  </div>
                </div>
              </article>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── CTA Section ─── */
const CTASection = () => {
  const { cta } = interiorDesignContent
  return (
    <section className="relative py-24 bg-[#0A0A0A] overflow-hidden">
      {/* Decorative lines */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(135deg, rgba(198,161,91,0.5) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-20 bg-gradient-to-b from-transparent to-[#C6A15B]/20" />

      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
        <AnimatedSection>
          <h2 className="display-lg text-[#F3EFE7] leading-[1.1] mb-5 font-normal tracking-[-0.02em]">
            {cta.title}
          </h2>
          <p className="body-md text-[#AAA49A] mb-10 font-normal">
            {cta.description}
          </p>
          <Link
            to={cta.buttonHref}
            className="btn-primary button-text"
          >
            {cta.buttonText}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
            </svg>
          </Link>
        </AnimatedSection>
      </div>
    </section>
  )
}

/* ─── Page ─── */
export const InteriorDesignPage = () => {
  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <HeroSection />
      <IntroSection />
      <ProjectGallery />
      <CTASection />
      <FooterSection />
    </div>
  )
}
