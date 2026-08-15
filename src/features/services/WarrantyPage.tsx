import { useState, useRef, useEffect } from 'react'
import { warrantyContent } from '@/content/warranty'
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
  const { hero } = warrantyContent

  return (
    <section
      className="relative min-h-[70vh] flex items-center justify-center pt-28 pb-16 overflow-hidden"
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
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] rounded-full opacity-20 pointer-events-none"
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

        <AnimatedSection delay={400} className="flex flex-wrap justify-center gap-4 mb-14">
          <a
            href="#form-bao-hanh"
            className="btn-primary button-text"
          >
            Yêu Cầu Bảo Hành / Bảo Trì
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
            </svg>
          </a>
          <a
            href="#bang-pham-vi-bao-hanh"
            className="btn-secondary button-text"
          >
            Xem Phạm Vi Bảo Hành
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

/* ─── Features Grid ─── */
const FeaturesSection = () => {
  const { features } = warrantyContent

  return (
    <section className="py-24 bg-[#0A0A0A] relative border-t border-[#1F1F1F]">
      <div className="max-w-7xl mx-auto px-6">
        <AnimatedSection className="text-center mb-16">
          <span className="inline-block eyebrow text-[#C6A15B] mb-3">
            CAM KẾT DỊCH VỤ
          </span>
          <h2 className="display-lg text-[#F3EFE7] mb-3 font-normal tracking-[-0.02em]">
            Quyền Lợi Khách Hàng Tại Human Interior
          </h2>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feat, idx) => (
            <AnimatedSection key={idx} delay={idx * 100}>
              <div className="h-full bg-[#121212] border border-[#222] p-8 flex flex-col justify-between hover:border-[#C6A15B]/50 transition-all duration-300">
                <div>
                  <div className="w-12 h-12 rounded-full bg-[#C6A15B]/10 border border-[#C6A15B]/30 flex items-center justify-center text-[#C6A15B] mb-6">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                    </svg>
                  </div>
                  <h3 className="heading-md text-[#F3EFE7] mb-3 leading-snug font-normal tracking-[-0.015em]">
                    {feat.title}
                  </h3>
                  <p className="body-md text-xs text-[#8A8478] leading-relaxed font-normal">
                    {feat.description}
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

/* ─── Detailed Scope Table Section ─── */
const ScopeTableSection = () => {
  const { scopeTable } = warrantyContent

  return (
    <section id="bang-pham-vi-bao-hanh" className="py-24 bg-[#0D0D0D] relative border-t border-[#1F1F1F]">
      <div className="max-w-6xl mx-auto px-6">
        <AnimatedSection className="text-center mb-14">
          <span className="inline-block eyebrow text-[#C6A15B] mb-3">
            BẢNG PHẠM VI BẢO HÀNH
          </span>
          <h2 className="display-lg text-[#F3EFE7] mb-3 font-normal tracking-[-0.02em]">
            Chi Tiết Thời Hạn & Hạng Mục Bảo Hành
          </h2>
        </AnimatedSection>

        <AnimatedSection delay={100}>
          <div className="bg-[#121212] border border-[#222] overflow-x-auto shadow-2xl">
            <table className="w-full text-left font-body text-[14px]">
              <thead>
                <tr className="bg-[#0A0A0A] border-b border-[#222] eyebrow text-[#C6A15B]">
                  <th className="p-4 md:p-6">Hạng Mục Nội Thất</th>
                  <th className="p-4 md:p-6">Thời Hạn</th>
                  <th className="p-4 md:p-6">Phạm Vi Bảo Hành</th>
                  <th className="p-4 md:p-6 text-right">Hình Thức Hỗ Trợ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1F1F1F] text-[#DDD7CC]">
                {scopeTable.map((row, idx) => (
                  <tr key={idx} className="hover:bg-[#161616] transition-colors">
                    <td className="p-4 md:p-6 body-md font-medium text-[#F3EFE7]">{row.category}</td>
                    <td className="p-4 md:p-6 text-[#DEC27B] heading-md font-medium">{row.period}</td>
                    <td className="p-4 md:p-6 body-md text-[#AAA49A] font-normal">{row.coverage}</td>
                    <td className="p-4 md:p-6 text-right body-md font-medium text-[#DEC27B]">{row.supportType}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}

/* ─── 24H Process Timeline ─── */
const ProcessSection = () => {
  const { process } = warrantyContent

  return (
    <section className="py-24 bg-[#0A0A0A] relative border-t border-[#1F1F1F]">
      <div className="max-w-6xl mx-auto px-6">
        <AnimatedSection className="text-center mb-16">
          <span className="inline-block eyebrow text-[#C6A15B] mb-3">
            {process.eyebrow}
          </span>
          <h2 className="display-lg text-[#F3EFE7] mb-3 font-normal tracking-[-0.02em]">
            {process.title}
          </h2>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {process.steps.map((st, idx) => (
            <AnimatedSection key={st.step} delay={idx * 80}>
              <div className="h-full bg-[#121212] border border-[#222] p-6 flex flex-col justify-between hover:border-[#C6A15B]/50 transition-all">
                <div>
                  <span className="display-lg text-[#DEC27B] font-normal block mb-4">
                    {st.step}
                  </span>
                  <h3 className="heading-md text-base text-[#F3EFE7] mb-2 leading-snug font-normal tracking-[-0.01em]">
                    {st.title}
                  </h3>
                  <p className="body-md text-xs text-[#8A8478] font-normal">
                    {st.desc}
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

/* ─── Warranty Request Form ─── */
const FormSection = () => {
  const { form } = warrantyContent
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    contractId: '',
    issue: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.phone.trim()) return
    setSubmitted(true)
  }

  return (
    <section id="form-bao-hanh" className="py-24 bg-[#0D0D0D] relative border-t border-[#1F1F1F]">
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
          <div className="bg-[#121212] border border-[#C6A15B]/30 p-8 md:p-12 shadow-2xl">
            {submitted ? (
              <div className="text-center py-12 space-y-4 font-body">
                <div className="w-16 h-16 rounded-full bg-[#C6A15B]/20 border border-[#C6A15B] flex items-center justify-center mx-auto text-[#C6A15B]">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </div>
                <h3 className="heading-lg text-[#F3EFE7] font-normal tracking-[-0.015em]">
                  Đã Tiếp Nhận Yêu Cầu!
                </h3>
                <p className="body-md text-[#AAA49A] max-w-md mx-auto font-normal">
                  {form.successMessage}
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="btn-secondary button-text mt-6"
                >
                  Gửi Yêu Cầu Khác
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 font-body">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block eyebrow text-[#C6A15B] mb-2">
                      Họ và Tên Khách Hàng *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Nguyễn Văn A"
                      className="w-full bg-[#0A0A0A] border border-[#2A2A2A] px-4 py-3 text-[#F3EFE7] body-md focus:outline-none focus:border-[#C6A15B] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block eyebrow text-[#C6A15B] mb-2">
                      Số Điện Thoại Mua Hàng *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="0937 438 652"
                      className="w-full bg-[#0A0A0A] border border-[#2A2A2A] px-4 py-3 text-[#F3EFE7] body-md focus:outline-none focus:border-[#C6A15B] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block eyebrow text-[#C6A15B] mb-2">
                      Mã Hợp Đồng / Tên Căn Hộ
                    </label>
                    <input
                      type="text"
                      value={formData.contractId}
                      onChange={(e) => setFormData({ ...formData, contractId: e.target.value })}
                      placeholder="VD: HI-2025-088"
                      className="w-full bg-[#0A0A0A] border border-[#2A2A2A] px-4 py-3 text-[#F3EFE7] body-md focus:outline-none focus:border-[#C6A15B] transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block eyebrow text-[#C6A15B] mb-2">
                    Mô Tả Hiện Trạng Hoặc Sự Cố Cần Hỗ Trợ
                  </label>
                  <textarea
                    rows={4}
                    value={formData.issue}
                    onChange={(e) => setFormData({ ...formData, issue: e.target.value })}
                    placeholder="VD: Căn chỉnh cánh tủ bếp bị xệ, kiêm tra tay nắm hoặc đèn LED..."
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

/* ─── Main Warranty Page ─── */
export const WarrantyPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <HeroSection />
      <FeaturesSection />
      <ScopeTableSection />
      <ProcessSection />
      <FormSection />
      <FooterSection />
    </div>
  )
}
