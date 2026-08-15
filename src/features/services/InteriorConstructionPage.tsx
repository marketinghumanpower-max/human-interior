import { useState, useRef, useEffect } from 'react'
import { interiorConstructionContent } from '@/content/interiorConstruction'
import { FooterSection } from '@/features/homepage/components/FooterSection'

interface ProjectItem {
  id: number
  category: string
  title: string
  location: string
  area: string
  rooms: string
  style: string
  investor: string
  scope: string
  image: string
  gallery: readonly string[]
}

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
      { threshold: 0.12 }
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
        transform: visible ? 'translateY(0)' : 'translateY(35px)',
        transition: `opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}

/* ─── Hero Section ─── */
const HeroSection = () => {
  const { hero } = interiorConstructionContent

  return (
    <section
      className="relative min-h-[75vh] flex items-center justify-center pt-28 pb-16 overflow-hidden"
      style={{
        background: 'radial-gradient(circle at 50% 30%, #161616 0%, #0A0A0A 80%)',
      }}
    >
      {/* Decorative Grid Lines */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(198,161,91,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(198,161,91,0.4) 1px, transparent 1px)',
          backgroundSize: '70px 70px',
        }}
      />

      {/* Glow Center */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full opacity-20 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(198,161,91,0.2) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <AnimatedSection>
          <span className="inline-block px-4 py-1.5 rounded-full border border-[#C6A15B]/30 bg-[#C6A15B]/10 eyebrow text-[#DEC27B] mb-6">
            {hero.eyebrow}
          </span>
        </AnimatedSection>

        <AnimatedSection delay={100}>
          <h1 className="display-lg text-[#F3EFE7] font-normal leading-[1.08] mb-4 tracking-[-0.025em]">
            {hero.title}
          </h1>
        </AnimatedSection>

        <AnimatedSection delay={200}>
          <p className="body-lg text-[#C6A15B] font-medium mb-6">
            {hero.subtitle}
          </p>
        </AnimatedSection>

        <AnimatedSection delay={300}>
          <p className="body-md text-[#AAA49A] max-w-3xl mx-auto mb-10 font-normal">
            {hero.description}
          </p>
        </AnimatedSection>

        <AnimatedSection delay={400} className="flex flex-wrap justify-center gap-4 mb-16">
          <a
            href="#du-toan-form"
            className="btn-primary button-text"
          >
            Nhận Dự Toán Chi Tiết
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
            </svg>
          </a>
          <a
            href="#cong-trinh-thuc-te"
            className="btn-secondary button-text"
          >
            Xem Công Trình Thực Tế
          </a>
        </AnimatedSection>

        {/* Stats Grid */}
        <AnimatedSection delay={500}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[#262626] border border-[#262626] overflow-hidden rounded-sm shadow-2xl">
            {hero.stats.map((stat, idx) => (
              <div key={idx} className="bg-[#111111] p-6 text-center hover:bg-[#161616] transition-colors duration-300">
                <span className="block display-lg text-[#DEC27B] font-normal mb-1">
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
    </section>
  )
}

/* ─── Risk Control & Customer Guarantee Matrix ─── */
const GuaranteesSection = () => {
  const { guarantees } = interiorConstructionContent

  return (
    <section className="py-24 bg-[#0A0A0A] relative border-t border-[#1F1F1F]">
      <div className="max-w-6xl mx-auto px-6">
        <AnimatedSection className="text-center mb-16">
          <span className="inline-block eyebrow text-[#C6A15B] mb-3">
            {guarantees.eyebrow}
          </span>
          <h2 className="display-lg text-[#F3EFE7] mb-3 font-normal tracking-[-0.02em]">
            {guarantees.title}
          </h2>
          <p className="body-md text-[#8A8478] max-w-xl mx-auto font-normal">
            {guarantees.subtitle}
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 gap-4">
          {guarantees.matrix.map((item, idx) => (
            <AnimatedSection key={idx} delay={idx * 100}>
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 p-6 bg-[#121212] border border-[#222222] hover:border-[#C6A15B]/40 transition-all duration-300 items-center">
                <div className="md:col-span-4 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#C6A15B]/10 border border-[#C6A15B]/30 flex items-center justify-center flex-shrink-0 text-[#C6A15B] font-medium text-xs font-body">
                    {idx + 1}
                  </div>
                  <h3 className="heading-md text-[#F3EFE7] leading-snug font-normal tracking-[-0.01em]">
                    {item.concern}
                  </h3>
                </div>
                <div className="md:col-span-8 border-t md:border-t-0 md:border-l border-[#222222] pt-3 md:pt-0 md:pl-6">
                  <div className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-[#C6A15B] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="body-md text-[#BBB4A8] leading-relaxed font-normal">
                      {item.solution}
                    </p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── Services Overview Cards ─── */
const ServicesOverviewSection = () => {
  const { servicesList } = interiorConstructionContent

  return (
    <section className="py-24 bg-[#0D0D0D] relative border-t border-[#1F1F1F]">
      <div className="max-w-7xl mx-auto px-6">
        <AnimatedSection className="text-center mb-16">
          <span className="inline-block eyebrow text-[#C6A15B] mb-3">
            HẠNG MỤC THI CÔNG NỔI BẬT
          </span>
          <h2 className="display-lg text-[#F3EFE7] mb-3 font-normal tracking-[-0.02em]">
            Dịch Vụ Thi Công Nội Thất Chuyên Nghiệp
          </h2>
          <p className="body-md text-[#8A8478] max-w-xl mx-auto font-normal">
            Đáp ứng toàn bộ quy mô công trình với tiêu chuẩn thi công thẩm mỹ cao nhất
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {servicesList.map((service, idx) => (
            <AnimatedSection key={service.id} delay={idx * 150}>
              <div className="h-full flex flex-col bg-[#121212] border border-[#222] overflow-hidden group hover:border-[#C6A15B]/50 transition-all duration-500">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-transparent opacity-90" />
                  <div className="absolute bottom-4 left-6">
                    <span className="inline-block px-3 py-1 bg-[#0A0A0A]/80 backdrop-blur-sm border border-[#C6A15B]/30 eyebrow text-[#C6A15B]">
                      DỊCH VỤ CHÍNH
                    </span>
                  </div>
                </div>

                <div className="p-7 flex-1 flex flex-col justify-between space-y-6">
                  <div>
                    <h3 className="heading-md text-[#F3EFE7] mb-2 leading-snug font-normal tracking-[-0.015em]">
                      {service.title}
                    </h3>
                    <p className="body-md text-[#C6A15B]/80 font-medium mb-4">
                      {service.subtitle}
                    </p>
                    <p className="body-md text-[#999388] leading-relaxed mb-6 font-normal">
                      {service.description}
                    </p>

                    <div className="space-y-2 pt-4 border-t border-[#222]">
                      {service.features.map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-center gap-2.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#C6A15B]" />
                          <span className="body-md text-[#DDD7CC]">
                            {feat}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <a
                    href="#du-toan-form"
                    className="btn-secondary button-text w-full py-3 text-center"
                  >
                    Tư Vấn Hạng Mục Này
                  </a>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── Real Executed Projects Gallery ─── */
const ProjectsGallerySection = () => {
  const { categories, projects } = interiorConstructionContent
  const [activeCategory, setActiveCategory] = useState('all')
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  const filteredList: ProjectItem[] = (
    activeCategory === 'all'
      ? projects
      : projects.filter((p) => p.category === activeCategory)
  ) as ProjectItem[]

  return (
    <section id="cong-trinh-thuc-te" className="py-24 bg-[#0A0A0A] relative border-t border-[#1F1F1F]">
      <div className="max-w-7xl mx-auto px-6">
        <AnimatedSection className="text-center mb-14">
          <span className="inline-block eyebrow text-[#C6A15B] mb-3">
            HÌNH ẢNH THỰC TẾ
          </span>
          <h2 className="display-lg text-[#F3EFE7] mb-3 font-normal tracking-[-0.02em]">
            Công Trình Thi Công Đã Bàn Giao
          </h2>
          <p className="body-md text-[#8A8478] max-w-xl mx-auto font-normal">
            Xem thực tế các căn hộ, nhà phố và biệt thự được thi công chuẩn 100% bản vẽ 3D
          </p>
        </AnimatedSection>

        {/* Category Filter */}
        <AnimatedSection delay={100} className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className="px-6 py-2.5 button-text transition-all duration-300 border font-medium"
              style={{
                background: activeCategory === cat.id ? '#C6A15B' : 'transparent',
                color: activeCategory === cat.id ? '#0A0A0A' : '#8A8478',
                borderColor: activeCategory === cat.id ? '#C6A15B' : '#262626',
              }}
            >
              {cat.label}
            </button>
          ))}
        </AnimatedSection>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredList.map((proj, idx) => (
            <AnimatedSection key={proj.id} delay={idx * 100}>
              <div
                onClick={() => {
                  setSelectedProject(proj)
                  setSelectedImage(proj.image)
                }}
                className="group cursor-pointer bg-[#121212] border border-[#222] overflow-hidden hover:border-[#C6A15B]/60 transition-all duration-500 flex flex-col h-full"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-[#1A1A1A]">
                  <img
                    src={proj.image}
                    alt={proj.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                  {/* Badge */}
                  <div className="absolute top-4 left-4 px-3 py-1 bg-[#0A0A0A]/80 backdrop-blur-sm border border-[#C6A15B]/30">
                    <span className="eyebrow text-[#C6A15B]">
                      THỰC TẾ {String(proj.id).padStart(2, '0')}
                    </span>
                  </div>

                  {/* Hover Icon */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[#0A0A0A]/40 backdrop-blur-[2px]">
                    <span className="px-4 py-2 bg-[#C6A15B] text-[#0A0A0A] button-text flex items-center gap-2">
                      Xem Chi Tiết & Bộ Ảnh
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                      </svg>
                    </span>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="heading-md text-[#F3EFE7] leading-snug group-hover:text-[#C6A15B] transition-colors duration-300 mb-2 font-normal tracking-[-0.01em]">
                      {proj.title}
                    </h3>
                    <p className="body-md text-xs text-[#8A8478] flex items-center gap-1.5 mb-3">
                      <svg className="w-3.5 h-3.5 text-[#C6A15B]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                      </svg>
                      {proj.location}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#222] flex justify-between items-center caption text-[#C6A15B]/80">
                    <span>{proj.area} · {proj.rooms}</span>
                    <span className="text-[#AAA49A]">{proj.style}</span>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>

      {/* Lightbox / Project Detail Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-[#000000]/90 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-4xl bg-[#121212] border border-[#C6A15B]/30 rounded-none overflow-hidden my-auto max-h-[90vh] flex flex-col">
            {/* Modal Header */}
            <div className="p-6 border-b border-[#222] flex items-center justify-between bg-[#0A0A0A]">
              <div>
                <span className="eyebrow text-[#C6A15B] block mb-1 font-medium">
                  CHI TIẾT CÔNG TRÌNH THỰC TẾ
                </span>
                <h3 className="heading-lg text-[#F3EFE7] font-normal tracking-[-0.015em]">
                  {selectedProject.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedProject(null)}
                className="w-9 h-9 rounded-full bg-[#1A1A1A] text-[#C6A15B] hover:bg-[#C6A15B] hover:text-[#0A0A0A] flex items-center justify-center transition-colors font-body"
                aria-label="Đóng modal"
              >
                ✕
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-6 flex-1 font-body">
              {/* Main Image */}
              <div className="aspect-[16/9] w-full overflow-hidden bg-[#0A0A0A] border border-[#222]">
                <img
                  src={selectedImage || selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Gallery Thumbnails */}
              {selectedProject.gallery && selectedProject.gallery.length > 0 && (
                <div className="grid grid-cols-4 gap-3">
                  {selectedProject.gallery.map((img, gIdx) => (
                    <button
                      key={gIdx}
                      onClick={() => setSelectedImage(img)}
                      className={`aspect-[4/3] border overflow-hidden transition-all ${
                        selectedImage === img ? 'border-[#C6A15B] ring-2 ring-[#C6A15B]/30' : 'border-[#222] opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt={`Gallery ${gIdx + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              {/* Project Specs */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 bg-[#0A0A0A] border border-[#222]">
                <div>
                  <span className="block caption text-[#777]">Chủ đầu tư</span>
                  <span className="body-md text-[#F3EFE7] font-medium">{selectedProject.investor}</span>
                </div>
                <div>
                  <span className="block caption text-[#777]">Diện tích</span>
                  <span className="body-md text-[#C6A15B] font-medium">{selectedProject.area}</span>
                </div>
                <div>
                  <span className="block caption text-[#777]">Quy mô</span>
                  <span className="body-md text-[#F3EFE7] font-medium">{selectedProject.rooms}</span>
                </div>
                <div>
                  <span className="block caption text-[#777]">Phong cách</span>
                  <span className="body-md text-[#F3EFE7] font-medium">{selectedProject.style}</span>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="heading-md text-[#C6A15B] font-normal">Hạng mục thi công thực hiện:</h4>
                <p className="body-md text-[#AAA49A] font-normal">
                  {selectedProject.scope}
                </p>
              </div>
            </div>

            {/* Modal Footer CTA */}
            <div className="p-4 border-t border-[#222] bg-[#0A0A0A] flex flex-wrap items-center justify-between gap-4">
              <span className="caption text-[#888]">
                Đơn vị thiết kế & thi công: <strong className="text-[#C6A15B]">Human Interior</strong>
              </span>
              <a
                href="#du-toan-form"
                onClick={() => setSelectedProject(null)}
                className="btn-primary button-text"
              >
                Nhận Báo Giá Mẫu Này
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

/* ─── 8-Step Construction Process Timeline ─── */
const ProcessTimelineSection = () => {
  const { process } = interiorConstructionContent

  return (
    <section className="py-24 bg-[#0D0D0D] relative border-t border-[#1F1F1F]">
      <div className="max-w-6xl mx-auto px-6">
        <AnimatedSection className="text-center mb-16">
          <span className="inline-block eyebrow text-[#C6A15B] mb-3">
            {process.eyebrow}
          </span>
          <h2 className="display-lg text-[#F3EFE7] mb-3 font-normal tracking-[-0.02em]">
            {process.title}
          </h2>
          <p className="body-md text-[#8A8478] max-w-xl mx-auto font-normal">
            {process.subtitle}
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {process.steps.map((step, idx) => (
            <AnimatedSection key={step.number} delay={idx * 80}>
              <div className="h-full bg-[#121212] border border-[#222] p-7 flex flex-col justify-between hover:border-[#C6A15B]/50 transition-all duration-300 group">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="display-lg text-[#DEC27B] font-normal">
                      {step.number}
                    </span>
                    <span className="w-2 h-2 rounded-full bg-[#C6A15B]/40 group-hover:bg-[#C6A15B] transition-colors" />
                  </div>
                  <h3 className="heading-md text-[#F3EFE7] mb-3 group-hover:text-[#DEC27B] transition-colors font-normal tracking-[-0.01em]">
                    {step.title}
                  </h3>
                  <p className="body-md text-xs text-[#8A8478] font-normal">
                    {step.description}
                  </p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── FAQs Accordion Section ─── */
const FAQsSection = () => {
  const { faqs } = interiorConstructionContent
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className="py-24 bg-[#0A0A0A] relative border-t border-[#1F1F1F]">
      <div className="max-w-4xl mx-auto px-6">
        <AnimatedSection className="text-center mb-16">
          <span className="inline-block eyebrow text-[#C6A15B] mb-3">
            {faqs.eyebrow}
          </span>
          <h2 className="display-lg text-[#F3EFE7] mb-3 font-normal tracking-[-0.02em]">
            {faqs.title}
          </h2>
        </AnimatedSection>

        <div className="space-y-4">
          {faqs.items.map((faq, idx) => (
            <AnimatedSection key={idx} delay={idx * 70}>
              <div className="bg-[#121212] border border-[#222] overflow-hidden transition-colors">
                <button
                  onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 heading-md text-[#F3EFE7] hover:text-[#DEC27B] transition-colors font-normal tracking-[-0.01em]"
                >
                  <span className="flex items-center gap-3">
                    <span className="eyebrow text-[#C6A15B]">Q{idx + 1}.</span>
                    {faq.question}
                  </span>
                  <span className="text-[#C6A15B] text-xl font-normal flex-shrink-0">
                    {openIndex === idx ? '−' : '+'}
                  </span>
                </button>

                {openIndex === idx && (
                  <div className="px-6 pb-6 pt-2 border-t border-[#1A1A1A] body-md text-[#AAA49A] leading-relaxed font-normal">
                    {faq.answer}
                  </div>
                )}
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── Interactive Consultation Form ─── */
const ConsultationFormSection = () => {
  const { form } = interiorConstructionContent
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    projectType: 'Căn hộ chung cư',
    area: '',
    notes: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.phone.trim()) return
    setSubmitted(true)
  }

  return (
    <section id="du-toan-form" className="py-24 bg-[#0D0D0D] relative border-t border-[#1F1F1F]">
      <div className="max-w-4xl mx-auto px-6">
        <AnimatedSection className="text-center mb-12">
          <span className="inline-block eyebrow text-[#C6A15B] mb-3">
            {form.eyebrow}
          </span>
          <h2 className="display-lg text-[#F3EFE7] mb-3 font-normal tracking-[-0.02em]">
            {form.title}
          </h2>
          <p className="body-md text-[#8A8478] max-w-xl mx-auto font-normal">
            {form.description}
          </p>
        </AnimatedSection>

        <AnimatedSection delay={100}>
          <div className="bg-[#121212] border border-[#C6A15B]/30 p-8 md:p-12 shadow-2xl relative">
            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#C6A15B]/20 border border-[#C6A15B] flex items-center justify-center mx-auto text-[#C6A15B]">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </div>
                <h3 className="heading-lg text-[#F3EFE7] font-normal tracking-[-0.015em]">
                  Đăng Ký Thành Công!
                </h3>
                <p className="body-md text-[#AAA49A] max-w-md mx-auto font-normal">
                  {form.successMessage}
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false)
                    setFormData({ name: '', phone: '', email: '', projectType: 'Căn hộ chung cư', area: '', notes: '' })
                  }}
                  className="btn-secondary button-text mt-6"
                >
                  Gửi Yêu Cầu Khác
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block eyebrow text-[#C6A15B] mb-2">
                      Họ và Tên Anh / Chị *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Ví dụ: Nguyễn Văn A"
                      className="w-full bg-[#0A0A0A] border border-[#2A2A2A] px-4 py-3 text-[#F3EFE7] body-md focus:outline-none focus:border-[#C6A15B] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block eyebrow text-[#C6A15B] mb-2">
                      Số Điện Thoại (Zalo) *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="Ví dụ: 0987 654 321"
                      className="w-full bg-[#0A0A0A] border border-[#2A2A2A] px-4 py-3 text-[#F3EFE7] body-md focus:outline-none focus:border-[#C6A15B] transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block eyebrow text-[#C6A15B] mb-2">
                      Email (Nếu có)
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="email@domain.com"
                      className="w-full bg-[#0A0A0A] border border-[#2A2A2A] px-4 py-3 text-[#F3EFE7] body-md focus:outline-none focus:border-[#C6A15B] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block eyebrow text-[#C6A15B] mb-2">
                      Loại Công Trình
                    </label>
                    <select
                      value={formData.projectType}
                      onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                      className="w-full bg-[#0A0A0A] border border-[#2A2A2A] px-4 py-3 text-[#F3EFE7] body-md focus:outline-none focus:border-[#C6A15B] transition-colors"
                    >
                      <option value="Căn hộ chung cư">Căn hộ / Chung cư</option>
                      <option value="Nhà phố">Nhà phố liền kề</option>
                      <option value="Biệt thự">Biệt thự / Villa</option>
                      <option value="Khác">Khác (Văn phòng / Penthouse)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block eyebrow text-[#C6A15B] mb-2">
                      Diện Tích Ước Tính (m²)
                    </label>
                    <input
                      type="text"
                      value={formData.area}
                      onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                      placeholder="Ví dụ: 85m²"
                      className="w-full bg-[#0A0A0A] border border-[#2A2A2A] px-4 py-3 text-[#F3EFE7] body-md focus:outline-none focus:border-[#C6A15B] transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block eyebrow text-[#C6A15B] mb-2">
                    Nhu Cầu Chi Tiết / Ghi Chú Đặc Biệt
                  </label>
                  <textarea
                    rows={4}
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="Mô tả phong cách mong muốn, số phòng ngủ, vị trí căn hộ..."
                    className="w-full bg-[#0A0A0A] border border-[#2A2A2A] px-4 py-3 text-[#F3EFE7] body-md focus:outline-none focus:border-[#C6A15B] transition-colors"
                  />
                </div>

                <div className="text-center pt-2">
                  <button
                    type="submit"
                    className="btn-primary button-text w-full sm:w-auto"
                  >
                    {form.submitText}
                  </button>
                </div>
              </form>
            )}
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}

/* ─── Main Interior Construction Page ─── */
export const InteriorConstructionPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <HeroSection />
      <GuaranteesSection />
      <ServicesOverviewSection />
      <ProjectsGallerySection />
      <ProcessTimelineSection />
      <FAQsSection />
      <ConsultationFormSection />
      <FooterSection />
    </div>
  )
}
