import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { FooterSection } from '../homepage/components/FooterSection'
import { AboutHero3D } from './components/AboutHero3D'
import { About3DViewer } from './components/About3DViewer'
import { aboutContent } from '@/content/about'
import { servicesContent } from '@/content/services'

// Counter component for stats animation
const StatCounter = ({ end, suffix = '+' }: { end: number; suffix?: string }) => {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isInView) return
    let start = 0
    const duration = 2000
    const increment = Math.ceil(end / (duration / 16))

    const timer = setInterval(() => {
      start += increment
      if (start >= end) {
        setCount(end)
        clearInterval(timer)
      } else {
        setCount(start)
      }
    }, 16)

    return () => clearInterval(timer)
  }, [isInView, end])

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  )
}

export const AboutPage = () => {
  const { hero, story, stats, visionMission, coreValues } = aboutContent
  const { servicesList } = servicesContent

  return (
    <div className="relative min-h-screen bg-[#0A0A0A] text-[#F5F1E8] overflow-x-hidden selection:bg-[#C6A15B]/30 selection:text-[#F5F1E8]">
      <main className="pt-[90px]">
        {/* ========================================================================= */}
        {/* 1. HERO SECTION WITH INTERACTIVE 3D SCULPTURE */}
        {/* ========================================================================= */}
        <section className="relative min-h-[85vh] flex items-center justify-center py-12 md:py-20 overflow-hidden border-b border-[#C6A15B]/20">
          {/* Subtle Dynamic Ambient Grid Background */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-[#0D0D0D]/90 to-[#0A0A0A]" />
            <div className="absolute inset-0 bg-[radial-gradient(#C6A15B_1px,transparent_1px)] [background-size:32px_32px] opacity-15" />
            <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#C6A15B]/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-[#C6A15B]/10 rounded-full blur-3xl pointer-events-none" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full">
            <div className="grid lg:grid-cols-12 gap-10 items-center">
              {/* Left Column: Typography & Info */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="lg:col-span-6 space-y-6"
              >
                <div className="inline-flex items-center gap-2 px-4.5 py-2 rounded-full border border-[#DEC27B]/40 bg-[#C6A15B]/15 backdrop-blur-md">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#EDDAA2] animate-pulse" />
                  <span className="eyebrow text-[#EDDAA2] text-xs font-semibold uppercase tracking-[0.2em]">
                    {hero.badge}
                  </span>
                </div>

                <h1 className="display-lg text-[#F5F1E8] tracking-[-0.01em] leading-[1.05]">
                  {hero.title.normal} <br />
                  <span className="text-[#EDDAA2]">
                    {hero.title.highlight}
                  </span>
                </h1>

                <p className="body-lg text-[#D1D5DB] max-w-xl text-base md:text-lg leading-relaxed font-normal">
                  {hero.description}
                </p>

                <div className="pt-2 flex flex-wrap items-center gap-4">
                  <a
                    href="#story-3d"
                    className="btn-primary button-text font-semibold"
                  >
                    {hero.actions.primary}
                  </a>
                  <a
                    href="#services"
                    className="btn-secondary button-text font-semibold"
                  >
                    {hero.actions.secondary}
                  </a>
                </div>
              </motion.div>

              {/* Right Column: Interactive 3D WebGL Hero Canvas */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.9, delay: 0.2 }}
                className="lg:col-span-6 relative"
              >
                <div className="rounded-lg overflow-hidden border border-[#C6A15B]/30 bg-[#0A0A0A]/80 backdrop-blur-xl shadow-2xl relative">
                  <AboutHero3D />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 2. OUR STORY & 3D MATERIAL INSPECTOR SHOWCASE */}
        {/* ========================================================================= */}
        <section id="story-3d" className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
          <div className="space-y-16">
            <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="lg:col-span-6 space-y-6"
              >
                <div className="inline-flex items-center gap-2">
                  <span className="w-8 h-[1px] bg-[#EDDAA2]" />
                  <span className="eyebrow text-[#EDDAA2] text-xs font-semibold uppercase tracking-[0.2em]">
                    {story.eyebrow}
                  </span>
                </div>

                <h2 className="display-lg text-[#F5F1E8] leading-[1.05] tracking-[-0.005em]">
                  {story.title.normal} <br />
                  <span className="text-[#EDDAA2]">{story.title.highlight}</span>
                </h2>

                <div className="space-y-5 text-[#D1D5DB] body-lg font-normal text-base md:text-lg leading-relaxed">
                  {story.paragraphs.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="lg:col-span-6 relative"
              >
                <div className="relative h-[420px] sm:h-[480px] rounded-lg overflow-hidden border border-[#C6A15B]/30 shadow-2xl group">
                  <img
                    src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1600&auto=format&fit=crop"
                    alt="Company Building & Interior"
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent opacity-80" />
                  <div className="absolute bottom-6 left-6 right-6 p-4 rounded bg-[#0A0A0A]/90 border border-[#C6A15B]/40 backdrop-blur-md">
                    <p className="heading-md text-[#F5F1E8] font-semibold mb-1">
                      {story.quote}
                    </p>
                    <span className="eyebrow text-[#EDDAA2] text-xs font-semibold">
                      {story.quoteAuthor}
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Interactive 3D Model & Material Viewer */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <About3DViewer />
            </motion.div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 3. ANIMATED STATS SECTION */}
        {/* ========================================================================= */}
        <section className="py-20 bg-[#0E0E0E] border-y border-[#C6A15B]/20 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {stats.map((stat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  whileHover={{ y: -6, transition: { duration: 0.3 } }}
                  className="text-center p-6 sm:p-8 rounded-lg bg-[#141414]/90 border border-[#C6A15B]/20 hover:border-[#DEC27B] transition-all shadow-xl group"
                >
                  <div className="w-14 h-14 mx-auto mb-5 rounded-full bg-[#C6A15B]/15 border border-[#DEC27B]/40 flex items-center justify-center text-[#EDDAA2] group-hover:scale-110 transition-transform">
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="display-lg text-[#EDDAA2] mb-2 font-bold">
                    <StatCounter end={stat.end} suffix={stat.suffix} />
                  </div>
                  <div className="eyebrow text-[#D1D5DB] text-xs md:text-sm font-semibold">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 4. SERVICES SHOWCASE SECTION */}
        {/* ========================================================================= */}
        <section id="services" className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <span className="eyebrow text-[#EDDAA2] text-xs font-semibold uppercase tracking-[0.2em]">
              {servicesList.eyebrow}
            </span>
            <h2 className="display-lg text-[#F5F1E8] tracking-[0.01em] uppercase leading-[1.05]">
              {servicesList.title.normal} <span className="text-[#EDDAA2]">{servicesList.title.highlight}</span>
            </h2>
            <p className="body-lg text-[#D1D5DB] max-w-2xl mx-auto font-normal text-base md:text-lg leading-relaxed">
              {servicesList.description}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {servicesList.items.map((svc, idx) => (
              <motion.div
                key={svc.code}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                whileHover={{ y: -8 }}
                className="group relative bg-[#141414] border border-[#C6A15B]/30 hover:border-[#DEC27B] rounded-xl overflow-hidden transition-all duration-500 shadow-xl flex flex-col justify-between"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={
                      idx === 0
                        ? 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1200&auto=format&fit=crop'
                        : idx === 1
                        ? 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?q=80&w=1200&auto=format&fit=crop'
                        : 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=1200&auto=format&fit=crop'
                    }
                    alt={svc.imageAlt}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/30 to-transparent" />
                  <span className="absolute top-4 left-4 eyebrow text-[#EDDAA2] px-3.5 py-1.5 bg-[#0A0A0A]/90 border border-[#DEC27B]/40 rounded-full backdrop-blur-md text-xs font-semibold">
                    {svc.code}
                  </span>
                </div>
                <div className="p-7 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="card-title text-xl md:text-2xl text-[#F5F1E8] font-bold mb-3 group-hover:text-[#EDDAA2] transition-colors">
                      {svc.title}
                    </h3>
                    <p className="body-md text-[#D1D5DB] font-normal mb-6 leading-relaxed">
                      {svc.description}
                    </p>
                  </div>
                  <div className="pt-4 border-t border-[#C6A15B]/20 flex items-center justify-between button-text text-[#EDDAA2] font-semibold">
                    <span>{svc.action}</span>
                    <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">
                      arrow_forward
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 5. VISION & MISSION SECTION */}
        {/* ========================================================================= */}
        <section className="py-20 bg-[#0E0E0E] border-t border-[#C6A15B]/20">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
              {/* Vision Card */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                whileHover={{ scale: 1.01 }}
                className="p-8 sm:p-10 rounded-xl bg-[#141414] border border-[#C6A15B]/30 relative overflow-hidden group hover:border-[#DEC27B] transition-all shadow-2xl"
              >
                <div className="absolute top-0 right-0 p-6 text-[#C6A15B]/20 font-display text-7xl select-none group-hover:text-[#C6A15B]/30 transition-colors">
                  {visionMission.vision.code}
                </div>
                <div className="eyebrow text-[#EDDAA2] text-xs font-semibold mb-3">
                  {visionMission.vision.eyebrow}
                </div>
                <h3 className="heading-lg text-[#F5F1E8] mb-5 uppercase tracking-[0.01em] font-bold">
                  {visionMission.vision.title}
                </h3>
                <p className="body-lg text-[#D1D5DB] font-normal leading-relaxed text-base md:text-lg">
                  {visionMission.vision.description}
                </p>
              </motion.div>

              {/* Mission Card */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                whileHover={{ scale: 1.01 }}
                className="p-8 sm:p-10 rounded-xl bg-[#141414] border border-[#C6A15B]/30 relative overflow-hidden group hover:border-[#DEC27B] transition-all shadow-2xl"
              >
                <div className="absolute top-0 right-0 p-6 text-[#C6A15B]/20 font-display text-7xl select-none group-hover:text-[#C6A15B]/30 transition-colors">
                  {visionMission.mission.code}
                </div>
                <div className="eyebrow text-[#EDDAA2] text-xs font-semibold mb-3">
                  {visionMission.mission.eyebrow}
                </div>
                <h3 className="heading-lg text-[#F5F1E8] mb-5 uppercase tracking-[0.01em] font-bold">
                  {visionMission.mission.title}
                </h3>
                <p className="body-lg text-[#D1D5DB] font-normal leading-relaxed text-base md:text-lg">
                  {visionMission.mission.description}
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 6. CORE VALUES & FEATURES */}
        {/* ========================================================================= */}
        <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <span className="eyebrow text-[#EDDAA2] text-xs font-semibold uppercase tracking-[0.2em]">
              {coreValues.eyebrow}
            </span>
            <h2 className="display-lg text-[#F5F1E8] tracking-[0.01em] uppercase leading-[1.05]">
              {coreValues.title.normal} <span className="text-[#EDDAA2]">{coreValues.title.highlight}</span>
            </h2>
            <p className="body-lg text-[#D1D5DB] max-w-2xl mx-auto font-normal text-base md:text-lg leading-relaxed">
              {coreValues.description}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreValues.items.map((val, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -5 }}
                className="p-6 bg-[#141414] border border-[#C6A15B]/30 rounded-lg space-y-3 hover:border-[#DEC27B] transition-colors shadow-lg"
              >
                <div className="card-title text-[#F5F1E8] font-bold text-lg flex items-center justify-between">
                  <span>{val.title}</span>
                  <span className="w-2.5 h-2.5 rounded-full bg-[#EDDAA2]" />
                </div>
                <p className="body-md text-[#D1D5DB] font-normal leading-relaxed">
                  {val.description}
                </p>
              </motion.div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <FooterSection />
    </div>
  )
}
