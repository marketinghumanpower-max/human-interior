import { useState, useRef, useEffect, useMemo } from 'react'
import { pricingContent } from '@/content/pricing'
import { FooterSection } from '@/features/homepage/components/FooterSection'
import { PricingHero3DCanvas } from './components/PricingHero3DCanvas'
import { PricingEstimator3DViewer } from './components/PricingEstimator3DViewer'
import { PricingPackage3DCard } from './components/PricingPackage3DCard'

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
  const { hero } = pricingContent

  return (
    <section
      className="relative min-h-[75vh] flex items-center justify-center pt-28 pb-16 overflow-hidden"
      style={{
        background: 'radial-gradient(circle at 50% 30%, #161616 0%, #0A0A0A 80%)',
      }}
    >
      {/* 3D WebGL Interactive Hero Canvas */}
      <PricingHero3DCanvas className="opacity-75" />
      {/* Decorative Grid */}
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
          <span className="inline-block px-4 py-1.5 rounded-full border border-[#DEC27B]/40 bg-[#C6A15B]/15 eyebrow text-[#EDDAA2] text-xs font-semibold mb-6 uppercase tracking-[0.2em]">
            {hero.eyebrow}
          </span>
        </AnimatedSection>

        <AnimatedSection delay={100}>
          <h1 className="display-lg text-[#F5F1E8] leading-[1.05] mb-4 tracking-[-0.01em]">
            {hero.title}
          </h1>
        </AnimatedSection>

        <AnimatedSection delay={200}>
          <p className="body-lg text-[#EDDAA2] font-semibold text-lg md:text-xl mb-6">
            {hero.subtitle}
          </p>
        </AnimatedSection>

        <AnimatedSection delay={300}>
          <p className="body-md text-[#D1D5DB] max-w-3xl mx-auto mb-10 font-normal text-base md:text-lg leading-relaxed">
            {hero.description}
          </p>
        </AnimatedSection>

        <AnimatedSection delay={400} className="flex flex-wrap justify-center gap-4 mb-14">
          <a
            href={hero.zaloLink}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary button-text font-semibold flex items-center gap-2"
          >
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.985-1.39A9.954 9.954 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm.05 16.5c-1.46 0-2.85-.38-4.06-1.05l-.29-.16-3 0.84.84-2.92-.19-.31A7.95 7.95 0 014.05 12c0-4.38 3.57-7.95 7.95-7.95 4.38 0 7.95 3.57 7.95 7.95 0 4.38-3.57 7.95-7.9 7.95z" />
            </svg>
            Nhận Báo Giá Qua Zalo
          </a>
          <a
            href="#du-toan-tinh-nhanh"
            className="btn-secondary button-text font-semibold"
          >
            Tính Giá Dự Toán Nhanh
          </a>
        </AnimatedSection>

        {/* Stats Grid */}
        <AnimatedSection delay={500}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[#333] border border-[#333] overflow-hidden rounded-lg shadow-2xl">
            {hero.stats.map((stat, idx) => (
              <div key={idx} className="bg-[#141414] p-6 text-center hover:bg-[#1A1A1A] transition-colors duration-300">
                <span className="block display-lg text-[#EDDAA2] font-bold text-3xl mb-1">
                  {stat.number}
                </span>
                <span className="eyebrow text-[#D1D5DB] text-xs font-semibold">
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

/* ─── Interactive Quick Estimator Calculator with 3D Viewer ─── */
const QuickEstimatorSection = () => {
  const [propertyType, setPropertyType] = useState('apartment')
  const [area, setArea] = useState(70)
  const [materialTier, setMaterialTier] = useState('melamine')

  const calculation = useMemo(() => {
    let designCostPerM2 = 160000
    if (propertyType === 'townhouse') designCostPerM2 = 200000
    if (propertyType === 'villa') designCostPerM2 = 250000

    const rawDesignCost = area * designCostPerM2

    let constructionMultiplier = 2100000
    if (materialTier === 'laminate') constructionMultiplier = 2800000
    if (materialTier === 'acrylic') constructionMultiplier = 3600000
    if (materialTier === 'walnut') constructionMultiplier = 5200000

    const estimatedConstructionMin = Math.round((area * constructionMultiplier * 0.9) / 1000000) * 1000000
    const estimatedConstructionMax = Math.round((area * constructionMultiplier * 1.15) / 1000000) * 1000000

    return {
      rawDesignCost,
      estimatedConstructionMin,
      estimatedConstructionMax,
    }
  }, [propertyType, area, materialTier])

  const formatVND = (num: number) => {
    return new Intl.NumberFormat('vi-VN').format(num) + ' VNĐ'
  }

  return (
    <section id="du-toan-tinh-nhanh" className="py-24 bg-[#0A0A0A] relative border-t border-[#222]">
      <div className="max-w-7xl mx-auto px-6">
        <AnimatedSection className="text-center mb-14">
          <span className="inline-block eyebrow text-[#EDDAA2] text-xs font-semibold uppercase tracking-[0.2em] mb-3">
            BỘ TÍNH GIÁ &amp; MÔ HÌNH 3D THÔNG MINH
          </span>
          <h2 className="display-lg text-[#F5F1E8] mb-3 tracking-[0.01em] uppercase leading-[1.05]">
            Dự Toán Ngân Sách &amp; Trải Nghiệm Vật Liệu 3D
          </h2>
          <p className="body-md text-[#D1D5DB] max-w-xl mx-auto font-normal text-base leading-relaxed">
            Lựa chọn loại công trình, diện tích và vật liệu để xem chi phí ước tính tức thì cùng mô hình 3D tương tác
          </p>
        </AnimatedSection>

        <AnimatedSection delay={100}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Estimator Controls & Result Summary */}
            <div className="lg:col-span-7 space-y-6">
              <div className="bg-[#141414] border border-[#C6A15B]/30 p-6 md:p-8 rounded-xl shadow-2xl space-y-6">
                {/* 1. Property Type */}
                <div>
                  <label className="block eyebrow text-[#EDDAA2] text-xs font-semibold mb-3">
                    1. Chọn Loại Hình Công Trình
                  </label>
                  <div className="grid grid-cols-3 gap-2.5">
                    {[
                      { id: 'apartment', label: 'Căn Hộ Chung Cư' },
                      { id: 'townhouse', label: 'Nhà Phố / Liền Kề' },
                      { id: 'villa', label: 'Biệt Thự / Villa' },
                    ].map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setPropertyType(item.id)}
                        className={`p-3 text-center button-text rounded-md transition-all font-semibold ${
                          propertyType === item.id
                            ? 'bg-[#EDDAA2] text-[#0A0A0A] border-[#EDDAA2] shadow-md font-bold'
                            : 'bg-[#0A0A0A] text-[#D1D5DB] border-[#333] hover:border-[#EDDAA2]'
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Area Input */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="eyebrow text-[#EDDAA2] text-xs font-semibold">
                      2. Diện Tích Sàn Sử Dụng
                    </label>
                    <span className="heading-md text-[#F5F1E8] font-bold text-xl">
                      {area} m²
                    </span>
                  </div>
                  <input
                    type="range"
                    min="30"
                    max="350"
                    step="5"
                    value={area}
                    onChange={(e) => setArea(Number(e.target.value))}
                    className="w-full h-2.5 bg-[#222] rounded-lg appearance-none cursor-pointer accent-[#EDDAA2]"
                  />
                  <div className="flex justify-between caption text-[#9CA3AF] mt-1 font-body text-xs">
                    <span>30 m²</span>
                    <span>150 m²</span>
                    <span>350 m²</span>
                  </div>
                </div>

                {/* 3. Material Tier */}
                <div>
                  <label className="block eyebrow text-[#EDDAA2] text-xs font-semibold mb-3">
                    3. Chọn Gói Vật Liệu Chủ Đạo
                  </label>
                  <div className="grid grid-cols-2 gap-2.5">
                    {[
                      { id: 'melamine', label: 'Gỗ MDF Melamine An Cường' },
                      { id: 'laminate', label: 'Gỗ MDF Phủ Laminate Cao Cấp' },
                      { id: 'acrylic', label: 'Gỗ MDF Phủ Acrylic Bóng Gương' },
                      { id: 'walnut', label: 'Gỗ Tự Nhiên Óc Chó Luxury' },
                    ].map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setMaterialTier(item.id)}
                        className={`p-3 text-left body-md text-xs sm:text-sm rounded-md border transition-all ${
                          materialTier === item.id
                            ? 'bg-[#C6A15B]/25 text-[#F5F1E8] border-[#EDDAA2] font-semibold shadow-md'
                            : 'bg-[#0A0A0A] text-[#D1D5DB] border-[#333] hover:border-[#DEC27B]'
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Calculation Result Output Card */}
              <div className="bg-[#141414] border border-[#DEC27B]/50 p-6 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl">
                <div className="flex-1">
                  <span className="eyebrow text-[#EDDAA2] text-xs font-semibold block mb-1">
                    DỰ TOÁN THI CÔNG NỘI THẤT TRỌN GÓI
                  </span>
                  <div className="display-lg text-[#EDDAA2] font-bold text-3xl md:text-4xl">
                    {Math.round(calculation.estimatedConstructionMin / 1000000)} - {Math.round(calculation.estimatedConstructionMax / 1000000)} Triệu VNĐ
                  </div>
                  <p className="caption text-[#D1D5DB] text-xs sm:text-sm mt-1">
                    Phí thiết kế 3D: <span className="line-through text-[#9CA3AF]">{formatVND(calculation.rawDesignCost)}</span> <span className="text-[#EDDAA2] font-semibold uppercase ml-1">(Miễn phí 100% khi thi công)</span>
                  </p>
                </div>

                <a
                  href="#bao-gia-form"
                  className="btn-primary button-text w-full sm:w-auto text-center block whitespace-nowrap font-semibold"
                >
                  Nhận Báo Giá Mẫu Này
                </a>
              </div>
            </div>

            {/* Right Column: Interactive 3D WebGL Material & Architectural Model Viewer */}
            <div className="lg:col-span-5">
              <PricingEstimator3DViewer
                propertyType={propertyType}
                materialTier={materialTier}
                area={area}
              />
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}

/* ─── Main Pricing Tables Section (Tabs) ─── */
const PricingTablesSection = () => {
  const { designPricing, constructionPricing, unitPrices } = pricingContent
  const [activeTab, setActiveTab] = useState<'design' | 'construction' | 'units'>('construction')

  return (
    <section className="py-24 bg-[#0D0D0D] relative border-t border-[#222]">
      <div className="max-w-7xl mx-auto px-6">
        <AnimatedSection className="text-center mb-12">
          <span className="inline-block eyebrow text-[#EDDAA2] text-xs font-semibold uppercase tracking-[0.2em] mb-3">
            BẢNG GIÁ NIÊM YẾT CHI TIẾT
          </span>
          <h2 className="display-lg text-[#F5F1E8] mb-3 tracking-[0.01em] uppercase leading-[1.05]">
            Tra Cứu Báo Giá Thiết Kế &amp; Thi Công
          </h2>
          <p className="body-md text-[#D1D5DB] max-w-xl mx-auto font-normal text-base leading-relaxed">
            Chọn danh mục bên dưới để xem báo giá trọn gói hoặc đơn giá từng hạng mục gỗ An Cường
          </p>
        </AnimatedSection>

        {/* Tabs Switcher */}
        <AnimatedSection delay={100} className="flex justify-center mb-14">
          <div className="inline-flex bg-[#141414] border border-[#333] p-1.5 space-x-1 rounded-lg font-body">
            <button
              onClick={() => setActiveTab('construction')}
              className={`px-6 py-3 button-text rounded-md transition-all font-semibold ${
                activeTab === 'construction'
                  ? 'bg-[#EDDAA2] text-[#0A0A0A] font-bold'
                  : 'text-[#D1D5DB] hover:text-[#FFFFFF]'
              }`}
            >
              1. Thi Công Trọn Gói (Căn Hộ / Nhà Phố)
            </button>
            <button
              onClick={() => setActiveTab('design')}
              className={`px-6 py-3 button-text rounded-md transition-all font-semibold ${
                activeTab === 'design'
                  ? 'bg-[#EDDAA2] text-[#0A0A0A] font-bold'
                  : 'text-[#D1D5DB] hover:text-[#FFFFFF]'
              }`}
            >
              2. Bảng Giá Thiết Kế 3D
            </button>
            <button
              onClick={() => setActiveTab('units')}
              className={`px-6 py-3 button-text rounded-md transition-all font-semibold ${
                activeTab === 'units'
                  ? 'bg-[#EDDAA2] text-[#0A0A0A] font-bold'
                  : 'text-[#D1D5DB] hover:text-[#FFFFFF]'
              }`}
            >
              3. Đơn Giá Hạng Mục (m² / md)
            </button>
          </div>
        </AnimatedSection>

        {/* Tab 1: Construction Packages */}
        {activeTab === 'construction' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {constructionPricing.packages.map((pkg, idx) => (
              <AnimatedSection key={pkg.id} delay={idx * 100}>
                <PricingPackage3DCard popular={idx === 1} className="h-full">
                  <div className="h-full bg-[#141414] border border-[#333] p-8 rounded-xl flex flex-col justify-between hover:border-[#DEC27B] transition-all duration-300">
                    <div>
                      <span className="eyebrow text-[#EDDAA2] text-xs font-semibold block mb-2">
                        {pkg.area}
                      </span>
                      <h3 className="card-title text-xl text-[#F5F1E8] font-bold mb-2">
                        {pkg.title}
                      </h3>
                      <div className="heading-md text-[#EDDAA2] font-bold text-2xl pb-4 border-b border-[#222] mb-6">
                        {pkg.estimatedPrice}
                      </div>

                      <p className="eyebrow text-[#D1D5DB] text-xs font-medium mb-3">
                        Hạng mục cốt lõi gồm:
                      </p>
                      <ul className="space-y-3 mb-8">
                        {pkg.items.map((item, iIdx) => (
                          <li key={iIdx} className="flex items-start gap-2.5 body-md text-sm text-[#D1D5DB]">
                            <svg className="w-4 h-4 text-[#EDDAA2] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                            </svg>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <a
                      href="#bao-gia-form"
                      className="btn-secondary button-text w-full text-center block font-semibold"
                    >
                      Tư Vấn Gói Này
                    </a>
                  </div>
                </PricingPackage3DCard>
              </AnimatedSection>
            ))}
          </div>
        )}

        {/* Tab 2: Design Packages */}
        {activeTab === 'design' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {designPricing.packages.map((pkg, idx) => (
              <AnimatedSection key={pkg.id} delay={idx * 120}>
                <PricingPackage3DCard popular={idx === 1} className="h-full">
                  <div className="h-full bg-[#141414] border border-[#333] p-8 rounded-xl flex flex-col justify-between hover:border-[#DEC27B] transition-all duration-300">
                    <div>
                      <span className="inline-block px-3.5 py-1 bg-[#C6A15B]/20 text-[#EDDAA2] border border-[#DEC27B]/40 rounded-full eyebrow text-xs font-semibold mb-4">
                        {pkg.promo}
                      </span>
                      <h3 className="card-title text-2xl text-[#F5F1E8] font-bold mb-2">
                        {pkg.name}
                      </h3>
                      <div className="display-lg text-[#EDDAA2] font-bold text-3xl pb-4 border-b border-[#222] mb-6">
                        {pkg.price} <span className="body-md text-sm text-[#D1D5DB] font-normal">/ {pkg.unit}</span>
                      </div>

                      <ul className="space-y-3 mb-8">
                        {pkg.features.map((feat, fIdx) => (
                          <li key={fIdx} className="flex items-start gap-2.5 body-md text-sm text-[#D1D5DB]">
                            <svg className="w-4 h-4 text-[#EDDAA2] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                            </svg>
                            {feat}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <a
                      href="#bao-gia-form"
                      className="btn-primary button-text w-full text-center block font-semibold"
                    >
                      Đăng Ký Thiết Kế
                    </a>
                  </div>
                </PricingPackage3DCard>
              </AnimatedSection>
            ))}
          </div>
        )}

        {/* Tab 3: Unit Price Table */}
        {activeTab === 'units' && (
          <AnimatedSection>
            <div className="bg-[#141414] border border-[#333] rounded-xl overflow-x-auto shadow-2xl">
              <table className="w-full text-left font-body text-sm md:text-base">
                <thead>
                  <tr className="bg-[#0A0A0A] border-b border-[#333] eyebrow text-[#EDDAA2] font-bold">
                    <th className="p-4 md:p-6">STT</th>
                    <th className="p-4 md:p-6">Hạng Mục Sản Xuất Nội Thất</th>
                    <th className="p-4 md:p-6">Đơn Vị Tính</th>
                    <th className="p-4 md:p-6 text-right">Đơn Giá Niêm Yết (VNĐ)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#222] text-[#D1D5DB]">
                  {unitPrices.items.map((item, idx) => (
                    <tr key={idx} className="hover:bg-[#1A1A1A] transition-colors">
                      <td className="p-4 md:p-6 caption text-[#9CA3AF] font-medium">{idx + 1}</td>
                      <td className="p-4 md:p-6 body-md font-semibold text-[#F5F1E8]">{item.name}</td>
                      <td className="p-4 md:p-6 caption text-[#D1D5DB]">{item.unit}</td>
                      <td className="p-4 md:p-6 text-right heading-md text-[#EDDAA2] font-bold">{item.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </AnimatedSection>
        )}
      </div>
    </section>
  )
}

/* ─── Advantages & Commitment Cards ─── */
const AdvantagesSection = () => {
  const { advantages, commitments } = pricingContent

  return (
    <section className="py-24 bg-[#0A0A0A] relative border-t border-[#222]">
      <div className="max-w-7xl mx-auto px-6">
        <AnimatedSection className="text-center mb-16">
          <span className="inline-block eyebrow text-[#EDDAA2] text-xs font-semibold uppercase tracking-[0.2em] mb-3">
            {advantages.eyebrow}
          </span>
          <h2 className="display-lg text-[#F5F1E8] mb-3 tracking-[0.01em] uppercase leading-[1.05]">
            {advantages.title}
          </h2>
        </AnimatedSection>

        {/* 4 Advantage Cards with 3D Tilt */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {advantages.items.map((adv, idx) => (
            <AnimatedSection key={idx} delay={idx * 100}>
              <PricingPackage3DCard className="h-full">
                <div className="h-full bg-[#141414] border border-[#333] p-7 rounded-xl flex flex-col justify-between hover:border-[#DEC27B] transition-all duration-300">
                  <div>
                    <div className="w-10 h-10 rounded-full bg-[#C6A15B]/20 border border-[#DEC27B]/40 flex items-center justify-center text-[#EDDAA2] font-sans font-bold text-lg mb-6">
                      {idx + 1}
                    </div>
                    <h3 className="card-title text-xl text-[#F5F1E8] font-bold mb-3">
                      {adv.title}
                    </h3>
                    <p className="body-md text-sm text-[#D1D5DB] leading-relaxed font-normal">
                      {adv.description}
                    </p>
                  </div>
                </div>
              </PricingPackage3DCard>
            </AnimatedSection>
          ))}
        </div>

        {/* Commitments Banner */}
        <AnimatedSection delay={200}>
          <div className="bg-[#141414] border-l-4 border-[#EDDAA2] p-8 md:p-10 rounded-r-xl bg-gradient-to-r from-[#141414] via-[#181818] to-[#141414] shadow-2xl">
            <div className="mb-8">
              <span className="eyebrow text-[#EDDAA2] text-xs font-semibold block mb-1">
                {commitments.eyebrow}
              </span>
              <h3 className="heading-lg text-[#F5F1E8] font-bold tracking-[-0.015em]">
                {commitments.title}
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {commitments.items.map((comm, idx) => (
                <div key={idx} className="p-4 bg-[#0A0A0A] border border-[#333] rounded-lg">
                  <h4 className="heading-md text-[#EDDAA2] mb-2 font-semibold text-base">
                    {comm.title}
                  </h4>
                  <p className="body-md text-xs sm:text-sm text-[#D1D5DB] leading-relaxed font-normal">
                    {comm.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}

/* ─── FAQs Accordion Section ─── */
const FAQsSection = () => {
  const { faqs } = pricingContent
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className="py-24 bg-[#0D0D0D] relative border-t border-[#222]">
      <div className="max-w-4xl mx-auto px-6">
        <AnimatedSection className="text-center mb-16">
          <span className="inline-block eyebrow text-[#EDDAA2] text-xs font-semibold uppercase tracking-[0.2em] mb-3">
            {faqs.eyebrow}
          </span>
          <h2 className="display-lg text-[#F5F1E8] mb-3 tracking-[0.01em] uppercase leading-[1.05]">
            {faqs.title}
          </h2>
        </AnimatedSection>

        <div className="space-y-4">
          {faqs.items.map((faq, idx) => (
            <AnimatedSection key={idx} delay={idx * 70}>
              <div className="bg-[#141414] border border-[#333] rounded-lg overflow-hidden transition-colors">
                <button
                  onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 heading-md text-[#F5F1E8] hover:text-[#EDDAA2] transition-colors font-semibold text-base md:text-lg tracking-[-0.01em]"
                >
                  <span className="flex items-center gap-3">
                    <span className="eyebrow text-[#EDDAA2] font-bold">Q{idx + 1}.</span>
                    {faq.question}
                  </span>
                  <span className="text-[#EDDAA2] text-xl font-bold flex-shrink-0">
                    {openIndex === idx ? '−' : '+'}
                  </span>
                </button>

                {openIndex === idx && (
                  <div className="px-6 pb-6 pt-2 border-t border-[#222] body-md text-[#D1D5DB] text-base leading-relaxed font-normal">
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

/* ─── Interactive Consultation & Quote Form ─── */
const ConsultationFormSection = () => {
  const { form } = pricingContent
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
    <section id="bao-gia-form" className="py-24 bg-[#0A0A0A] relative border-t border-[#222]">
      <div className="max-w-4xl mx-auto px-6">
        <AnimatedSection className="text-center mb-12">
          <span className="inline-block eyebrow text-[#EDDAA2] text-xs font-semibold uppercase tracking-[0.2em] mb-3">
            {form.eyebrow}
          </span>
          <h2 className="display-lg text-[#F5F1E8] mb-3 tracking-[0.01em] uppercase leading-[1.05]">
            {form.title}
          </h2>
          <p className="body-md text-[#D1D5DB] max-w-xl mx-auto font-normal text-base leading-relaxed">
            {form.description}
          </p>
        </AnimatedSection>

        <AnimatedSection delay={100}>
          <div className="bg-[#141414] border border-[#DEC27B]/40 p-8 md:p-12 rounded-xl shadow-2xl relative">
            {submitted ? (
              <div className="text-center py-12 space-y-4 font-body">
                <div className="w-16 h-16 rounded-full bg-[#C6A15B]/20 border border-[#EDDAA2] flex items-center justify-center mx-auto text-[#EDDAA2]">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </div>
                <h3 className="card-title text-2xl text-[#F5F1E8] font-bold">
                  Đã Nhận Yêu Cầu Báo Giá!
                </h3>
                <p className="body-md text-[#D1D5DB] max-w-md mx-auto font-normal text-base">
                  {form.successMessage}
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false)
                    setFormData({ name: '', phone: '', email: '', projectType: 'Căn hộ chung cư', area: '', notes: '' })
                  }}
                  className="btn-secondary button-text mt-6 font-semibold"
                >
                  Gửi Yêu Cầu Khác
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 font-body">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block eyebrow text-[#EDDAA2] text-xs font-semibold mb-2">
                      Họ và Tên Anh / Chị *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Ví dụ: Nguyễn Văn A"
                      className="w-full bg-[#0A0A0A] border border-[#333] rounded-md px-4 py-3 text-[#F5F1E8] placeholder-[#9CA3AF] body-md focus:outline-none focus:border-[#EDDAA2] transition-colors text-base"
                    />
                  </div>

                  <div>
                    <label className="block eyebrow text-[#EDDAA2] text-xs font-semibold mb-2">
                      Số Điện Thoại (Zalo) *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="Ví dụ: 0937 438 652"
                      className="w-full bg-[#0A0A0A] border border-[#333] rounded-md px-4 py-3 text-[#F5F1E8] placeholder-[#9CA3AF] body-md focus:outline-none focus:border-[#EDDAA2] transition-colors text-base"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block eyebrow text-[#EDDAA2] text-xs font-semibold mb-2">
                      Email (Nếu có)
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="email@domain.com"
                      className="w-full bg-[#0A0A0A] border border-[#333] rounded-md px-4 py-3 text-[#F5F1E8] placeholder-[#9CA3AF] body-md focus:outline-none focus:border-[#EDDAA2] transition-colors text-base"
                    />
                  </div>

                  <div>
                    <label className="block eyebrow text-[#EDDAA2] text-xs font-semibold mb-2">
                      Loại Công Trình
                    </label>
                    <select
                      value={formData.projectType}
                      onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                      className="w-full bg-[#0A0A0A] border border-[#333] rounded-md px-4 py-3 text-[#F5F1E8] body-md focus:outline-none focus:border-[#EDDAA2] transition-colors text-base"
                    >
                      <option value="Căn hộ chung cư">Căn hộ / Chung cư</option>
                      <option value="Nhà phố">Nhà phố liền kề</option>
                      <option value="Biệt thự">Biệt thự / Villa</option>
                      <option value="Khác">Khác (Văn phòng / Penthouse)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block eyebrow text-[#EDDAA2] text-xs font-semibold mb-2">
                      Diện Tích Ước Tính (m²)
                    </label>
                    <input
                      type="text"
                      value={formData.area}
                      onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                      placeholder="Ví dụ: 75m²"
                      className="w-full bg-[#0A0A0A] border border-[#333] rounded-md px-4 py-3 text-[#F5F1E8] placeholder-[#9CA3AF] body-md focus:outline-none focus:border-[#EDDAA2] transition-colors text-base"
                    />
                  </div>
                </div>

                <div>
                  <label className="block eyebrow text-[#EDDAA2] text-xs font-semibold mb-2">
                    Ghi Chú Nhu Cầu &amp; Ngân Sách Dự Kiến
                  </label>
                  <textarea
                    rows={4}
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="Mô tả số phòng ngủ, vị trí công trình, ngân sách mong muốn..."
                    className="w-full bg-[#0A0A0A] border border-[#333] rounded-md px-4 py-3 text-[#F5F1E8] placeholder-[#9CA3AF] body-md focus:outline-none focus:border-[#EDDAA2] transition-colors text-base"
                  />
                </div>

                <div className="text-center pt-2">
                  <button
                    type="submit"
                    className="btn-primary button-text w-full sm:w-auto font-semibold"
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

/* ─── Main Pricing Page ─── */
export const PricingPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <HeroSection />
      <QuickEstimatorSection />
      <PricingTablesSection />
      <AdvantagesSection />
      <FAQsSection />
      <ConsultationFormSection />
      <FooterSection />
    </div>
  )
}
