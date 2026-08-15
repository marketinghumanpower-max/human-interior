import { useState, useRef, useEffect, useMemo } from 'react'
import { fengShuiContent } from '@/content/fengShui'
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

/* ─── Feng Shui Calculator Helper Logic ─── */
const calculateFengShui = (year: number, gender: 'male' | 'female') => {
  const mod = year % 9
  let fateName = 'Mệnh Kim'
  let cung = 'Càn'
  let goodDirections = 'Tây, Tây Bắc, Đông Bắc, Tây Nam'
  let badDirections = 'Bắc, Nam, Đông, Đông Nam'
  let colors = 'Trắng, Ánh Kim, Vàng Đất, Nâu'
  let materials = 'Gỗ MDF An Cường tone màu xám trắng, nẹp mạ PVD kim loại, đá thạch anh'

  // Simple Feng Shui Fate calculation mapping
  const lastDigit = year % 10
  if (lastDigit === 0 || lastDigit === 1) {
    fateName = 'Mệnh Kim'
    colors = 'Trắng, Ghi Xám, Vàng Cát, Nâu Đất'
    materials = 'Kim loại mạ PVD vàng/đồng, Đá Marble trắng, Gỗ MDF veneer màu sáng'
  } else if (lastDigit === 2 || lastDigit === 3) {
    fateName = 'Mệnh Thủy'
    colors = 'Đen Tuyền, Xanh Dương, Trắng Ánh Kim'
    materials = 'Kính cường lực đen, Đá Đen Cambria, Thác nước mini, Gỗ MDF màu sẫm'
  } else if (lastDigit === 4 || lastDigit === 5) {
    fateName = 'Mệnh Hỏa'
    colors = 'Đỏ Cầm, Cam Nâu, Tím Thạch, Xanh Lục'
    materials = 'Gỗ Óc Chó tự nhiên, Đèn chùm pha lê ánh sáng ấm, Vách ốp nỉ cam đất'
  } else if (lastDigit === 6 || lastDigit === 7) {
    fateName = 'Mệnh Thổ'
    colors = 'Vàng Đất, Nâu Đậm, Cam Đất, Đỏ'
    materials = 'Đá Marble thạch anh, Gốm sứ nghệ thuật, Gỗ MDF vân óc chó ấp áp'
  } else {
    fateName = 'Mệnh Mộc'
    colors = 'Xanh Lá, Nâu Gỗ, Xanh Biển'
    materials = 'Gỗ tự nhiên An Cường, Cây xanh lọc khí interior, Vải nỉ đay tự nhiên'
  }

  if (gender === 'male') {
    if (mod === 1) { cung = 'Khảm'; goodDirections = 'Đông, Nam, Bắc, Đông Nam' }
    else if (mod === 2) { cung = 'Ly'; goodDirections = 'Đông, Nam, Bắc, Đông Nam' }
    else if (mod === 3) { cung = 'Cấn'; goodDirections = 'Tây, Tây Bắc, Đông Bắc, Tây Nam' }
    else if (mod === 4) { cung = 'Đoài'; goodDirections = 'Tây, Tây Bắc, Đông Bắc, Tây Nam' }
    else if (mod === 5) { cung = 'Càn'; goodDirections = 'Tây, Tây Bắc, Đông Bắc, Tây Nam' }
    else if (mod === 6) { cung = 'Khôn'; goodDirections = 'Tây, Tây Bắc, Đông Bắc, Tây Nam' }
    else if (mod === 7) { cung = 'Tốn'; goodDirections = 'Đông, Nam, Bắc, Đông Nam' }
    else if (mod === 8) { cung = 'Chấn'; goodDirections = 'Đông, Nam, Bắc, Đông Nam' }
    else { cung = 'Khôn'; goodDirections = 'Tây, Tây Bắc, Đông Bắc, Tây Nam' }
  } else {
    if (mod === 1) { cung = 'Cấn'; goodDirections = 'Tây, Tây Bắc, Đông Bắc, Tây Nam' }
    else if (mod === 2) { cung = 'Càn'; goodDirections = 'Tây, Tây Bắc, Đông Bắc, Tây Nam' }
    else if (mod === 3) { cung = 'Đoài'; goodDirections = 'Tây, Tây Bắc, Đông Bắc, Tây Nam' }
    else if (mod === 4) { cung = 'Cấn'; goodDirections = 'Tây, Tây Bắc, Đông Bắc, Tây Nam' }
    else if (mod === 5) { cung = 'Ly'; goodDirections = 'Đông, Nam, Bắc, Đông Nam' }
    else if (mod === 6) { cung = 'Khảm'; goodDirections = 'Đông, Nam, Bắc, Đông Nam' }
    else if (mod === 7) { cung = 'Khôn'; goodDirections = 'Tây, Tây Bắc, Đông Bắc, Tây Nam' }
    else if (mod === 8) { cung = 'Chấn'; goodDirections = 'Đông, Nam, Bắc, Đông Nam' }
    else { cung = 'Tốn'; goodDirections = 'Đông, Nam, Bắc, Đông Nam' }
  }

  return { fateName, cung, goodDirections, badDirections, colors, materials }
}

/* ─── Hero Section ─── */
const HeroSection = () => {
  const { hero } = fengShuiContent

  return (
    <section
      className="relative min-h-[70vh] flex items-center justify-center pt-28 pb-16 overflow-hidden"
      style={{
        background: 'radial-gradient(circle at 50% 30%, #1A1612 0%, #0A0A0A 80%)',
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
          background: 'radial-gradient(circle, rgba(198,161,91,0.25) 0%, transparent 70%)',
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
            href="#tra-cuu-phong-thuy"
            className="btn-primary button-text"
          >
            Tra Cứu Mệnh Theo Năm Sinh
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
            </svg>
          </a>
          <a
            href="#dat-lich-phong-thuy"
            className="btn-secondary button-text"
          >
            Đặt Lịch Khảo Sát Phong Thủy
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

/* ─── Interactive Feng Shui Calculator ─── */
const FengShuiCalculatorSection = () => {
  const [birthYear, setBirthYear] = useState(1990)
  const [gender, setGender] = useState<'male' | 'female'>('male')

  const result = useMemo(() => {
    return calculateFengShui(birthYear, gender)
  }, [birthYear, gender])

  return (
    <section id="tra-cuu-phong-thuy" className="py-24 bg-[#0A0A0A] relative border-t border-[#1F1F1F]">
      <div className="max-w-4xl mx-auto px-6">
        <AnimatedSection className="text-center mb-12">
          <span className="inline-block eyebrow text-[#C6A15B] mb-3">
            BỘ TRA CỨU PHONG THỦY THÔNG MINH
          </span>
          <h2 className="display-lg text-[#F3EFE7] mb-3 font-normal tracking-[-0.02em]">
            Tra Cứu Mệnh & Hướng Nhà Theo Năm Sinh
          </h2>
          <p className="body-md text-[#8A8478] max-w-xl mx-auto font-normal">
            Nhập năm sinh và giới tính để xem gợi ý vị trí, hướng tốt & màu sắc hợp mệnh
          </p>
        </AnimatedSection>

        <AnimatedSection delay={100}>
          <div className="bg-[#121212] border border-[#C6A15B]/30 p-8 md:p-12 shadow-2xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              {/* Inputs */}
              <div className="space-y-6">
                <div>
                  <label className="block eyebrow text-[#C6A15B] mb-2">
                    Năm Sinh Âm Lịch (VD: 1988, 1992, 1995)
                  </label>
                  <input
                    type="number"
                    min="1940"
                    max="2026"
                    value={birthYear}
                    onChange={(e) => setBirthYear(Number(e.target.value))}
                    className="w-full bg-[#0A0A0A] border border-[#2A2A2A] px-4 py-3 text-[#F3EFE7] font-display text-xl focus:outline-none focus:border-[#C6A15B] transition-colors"
                  />
                </div>

                <div>
                  <label className="block eyebrow text-[#C6A15B] mb-2">
                    Giới Tính Gia Chủ
                  </label>
                  <div className="grid grid-cols-2 gap-3 font-body">
                    <button
                      type="button"
                      onClick={() => setGender('male')}
                      className={`py-3 text-center button-text transition-all ${
                        gender === 'male'
                          ? 'bg-[#C6A15B] text-[#0A0A0A] border-[#C6A15B]'
                          : 'bg-[#0A0A0A] text-[#8A8478] border-[#262626] hover:border-[#C6A15B]/40'
                      }`}
                    >
                      Nam Gia Chủ
                    </button>
                    <button
                      type="button"
                      onClick={() => setGender('female')}
                      className={`py-3 text-center button-text transition-all ${
                        gender === 'female'
                          ? 'bg-[#C6A15B] text-[#0A0A0A] border-[#C6A15B]'
                          : 'bg-[#0A0A0A] text-[#8A8478] border-[#262626] hover:border-[#C6A15B]/40'
                      }`}
                    >
                      Nữ Gia Chủ
                    </button>
                  </div>
                </div>
              </div>

              {/* Result Box */}
              <div className="bg-[#0A0A0A] border border-[#C6A15B]/40 p-6 space-y-4">
                <div className="pb-3 border-b border-[#222]">
                  <span className="eyebrow text-[#C6A15B] block mb-1">
                    KẾT QUẢ PHONG THỦY BÁT TRẠCH
                  </span>
                  <div className="flex items-center gap-3">
                    <h3 className="display-lg text-[#F3EFE7] font-normal tracking-[-0.015em]">
                      {result.fateName}
                    </h3>
                    <span className="px-2.5 py-0.5 bg-[#C6A15B]/20 text-[#C6A15B] border border-[#C6A15B]/30 eyebrow">
                      Cung {result.cung}
                    </span>
                  </div>
                </div>

                <div className="space-y-3 font-body">
                  <div>
                    <span className="block caption text-[#777]">Hướng Tốt (Sinh Khí / Thiên Y):</span>
                    <span className="body-md font-medium text-[#DEC27B]">{result.goodDirections}</span>
                  </div>
                  <div>
                    <span className="block caption text-[#777]">Màu Sắc Tương Sinh & Tương Hợp:</span>
                    <span className="body-md text-[#F3EFE7]">{result.colors}</span>
                  </div>
                  <div>
                    <span className="block caption text-[#777]">Vật Liệu Khuyên Dùng Trong Nội Thất:</span>
                    <span className="body-md text-[#AAA49A] block mt-0.5 font-normal">{result.materials}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}

/* ─── 5 Elements Matrix ─── */
const ElementsMatrixSection = () => {
  const { elements } = fengShuiContent

  return (
    <section className="py-24 bg-[#0D0D0D] relative border-t border-[#1F1F1F]">
      <div className="max-w-7xl mx-auto px-6">
        <AnimatedSection className="text-center mb-16">
          <span className="inline-block eyebrow text-[#C6A15B] mb-3">
            {elements.eyebrow}
          </span>
          <h2 className="display-lg text-[#F3EFE7] mb-3 font-normal tracking-[-0.02em]">
            {elements.title}
          </h2>
          <p className="body-md text-[#8A8478] max-w-xl mx-auto font-normal">
            {elements.subtitle}
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {elements.items.map((item, idx) => (
            <AnimatedSection key={idx} delay={idx * 80}>
              <div className="h-full bg-[#121212] border border-[#222] p-6 flex flex-col justify-between hover:border-[#C6A15B]/50 transition-all duration-300 group">
                <div>
                  <span className="inline-block px-2.5 py-1 bg-[#C6A15B]/10 border border-[#C6A15B]/30 eyebrow text-[#C6A15B] mb-4">
                    {item.element}
                  </span>
                  <p className="body-md text-[#AAA49A] mb-4 font-normal">
                    {item.description}
                  </p>

                  <div className="space-y-2 pt-3 border-t border-[#222] font-body">
                    <div>
                      <span className="block caption text-[#666]">Màu sắc:</span>
                      <span className="body-md text-[#F3EFE7]">{item.color}</span>
                    </div>
                    <div>
                      <span className="block caption text-[#666]">Vật liệu:</span>
                      <span className="body-md text-[#DEC27B]">{item.materials}</span>
                    </div>
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

/* ─── Core Consultation Services Cards ─── */
const ServicesSection = () => {
  const { services } = fengShuiContent

  return (
    <section className="py-24 bg-[#0A0A0A] relative border-t border-[#1F1F1F]">
      <div className="max-w-6xl mx-auto px-6">
        <AnimatedSection className="text-center mb-16">
          <span className="inline-block eyebrow text-[#C6A15B] mb-3">
            HẠNG MỤC TƯ VẤN CHUYÊN SÂU
          </span>
          <h2 className="display-lg text-[#F3EFE7] mb-3 font-normal tracking-[-0.02em]">
            Giải Pháp Phong Thủy Tích Hợp Bản Vẽ 3D
          </h2>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((srv, idx) => (
            <AnimatedSection key={srv.id} delay={idx * 120}>
              <div className="h-full bg-[#121212] border border-[#222] p-8 flex flex-col justify-between hover:border-[#C6A15B]/50 transition-all duration-300">
                <div>
                  <span className="display-lg text-[#DEC27B] font-normal block mb-3">
                    0{idx + 1}.
                  </span>
                  <h3 className="heading-md text-[#F3EFE7] mb-3 leading-snug font-normal tracking-[-0.015em]">
                    {srv.title}
                  </h3>
                  <p className="body-md text-[#8A8478] mb-6 font-normal">
                    {srv.description}
                  </p>

                  <ul className="space-y-2.5 pt-4 border-t border-[#222]">
                    {srv.items.map((item, iIdx) => (
                      <li key={iIdx} className="flex items-start gap-2 body-md text-xs text-[#BBB4A8]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#C6A15B] mt-1.5 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── 5-Step Process Timeline ─── */
const ProcessSection = () => {
  const { process } = fengShuiContent

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

/* ─── Consultation Form ─── */
const ConsultationFormSection = () => {
  const { form } = fengShuiContent
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    birthYear: '',
    notes: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.phone.trim()) return
    setSubmitted(true)
  }

  return (
    <section id="dat-lich-phong-thuy" className="py-24 bg-[#0A0A0A] relative border-t border-[#1F1F1F]">
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
                  Đã Đặt Lịch Thành Công!
                </h3>
                <p className="body-md text-[#AAA49A] max-w-md mx-auto font-normal">
                  {form.successMessage}
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="btn-secondary button-text mt-6"
                >
                  Gửi Đăng Ký Khác
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block eyebrow text-[#C6A15B] mb-2">
                      Họ và Tên Gia Chủ *
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
                      Số Điện Thoại (Zalo) *
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
                      Năm Sinh Âm Lịch
                    </label>
                    <input
                      type="text"
                      value={formData.birthYear}
                      onChange={(e) => setFormData({ ...formData, birthYear: e.target.value })}
                      placeholder="VD: 1988 Mậu Thìn"
                      className="w-full bg-[#0A0A0A] border border-[#2A2A2A] px-4 py-3 text-[#F3EFE7] body-md focus:outline-none focus:border-[#C6A15B] transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block eyebrow text-[#C6A15B] mb-2">
                    Nhu Cầu Khảo Sát Phong Thủy (Nhà phố, Căn hộ, Bếp, Bàn thờ...)
                  </label>
                  <textarea
                    rows={4}
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="Mô tả hướng nhà hiện tại, nhu cầu bố trí lại phòng khách, bếp hoặc phòng ngủ..."
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

/* ─── Main Feng Shui Page ─── */
export const FengShuiPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <HeroSection />
      <FengShuiCalculatorSection />
      <ElementsMatrixSection />
      <ServicesSection />
      <ProcessSection />
      <ConsultationFormSection />
      <FooterSection />
    </div>
  )
}
