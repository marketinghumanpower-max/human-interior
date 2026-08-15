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
    <div className="relative min-h-screen bg-[#0A0A0A] text-[#e4e2dd] overflow-x-hidden selection:bg-[#C6A15B]/30 selection:text-[#F3EFE7]">
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
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#C6A15B]/30 bg-[#C6A15B]/10 backdrop-blur-md">
                  <span className="w-2 h-2 rounded-full bg-[#C6A15B] animate-pulse" />
                  <span className="eyebrow text-[#C6A15B]">
                    {hero.badge}
                  </span>
                </div>

                <h1 className="display-lg font-normal text-[#F3EFE7] tracking-[-0.025em] leading-[1.02]">
                  {hero.title.normal} <br />
                  <span className="font-display font-normal text-[#F3EFE7]">
                    {hero.title.highlight}
                  </span>
                </h1>

                <p className="body-lg text-[#AAA49A] max-w-xl">
                  {hero.description}
                </p>

                <div className="pt-2 flex flex-wrap items-center gap-4">
                  <a
                    href="#story-3d"
                    className="btn-primary button-text"
                  >
                    {hero.actions.primary}
                  </a>
                  <a
                    href="#services"
                    className="btn-secondary button-text"
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
                  <span className="w-8 h-[1px] bg-[#C6A15B]" />
                  <span className="eyebrow text-[#C6A15B]">
                    {story.eyebrow}
                  </span>
                </div>

                <h2 className="display-lg font-normal text-[#F3EFE7] leading-[1.08] tracking-[-0.02em]">
                  {story.title.normal} <br />
                  <span className="text-[#F3EFE7] font-display font-normal">{story.title.highlight}</span>
                </h2>

                <div className="space-y-5 text-[#AAA49A] body-lg font-normal">
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
                <div className="relative h-[420px] sm:h-[480px] rounded-sm overflow-hidden border border-[#C6A15B]/30 shadow-2xl group">
                  <img
                    src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1600&auto=format&fit=crop"
                    alt="Company Building & Interior"
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent opacity-80" />
                  <div className="absolute bottom-6 left-6 right-6 p-4 rounded bg-[#0A0A0A]/80 border border-[#C6A15B]/30 backdrop-blur-md">
                    <p className="heading-md text-[#F3EFE7] font-normal tracking-[-0.015em] mb-1">
                      {story.quote}
                    </p>
                    <span className="eyebrow text-[#C6A15B]">
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
        <section className="py-20 bg-[#0E0E0E] border-y border-[#C6A15B]/15 relative overflow-hidden">
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
                  className="text-center p-6 sm:p-8 rounded-lg bg-[#141414]/70 border border-[#C6A15B]/15 hover:border-[#C6A15B]/40 transition-all shadow-xl group"
                >
                  <div className="w-14 h-14 mx-auto mb-5 rounded-full bg-[#C6A15B]/10 border border-[#C6A15B]/25 flex items-center justify-center text-[#C6A15B] group-hover:scale-110 transition-transform">
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="display-lg font-normal text-[#DEC27B] mb-2">
                    <StatCounter end={stat.end} suffix={stat.suffix} />
                  </div>
                  <div className="eyebrow text-[#AAA49A]">
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
            <span className="eyebrow text-[#C6A15B]">
              {servicesList.eyebrow}
            </span>
            <h2 className="display-lg font-normal text-[#F3EFE7] tracking-[-0.02em] leading-[1.08]">
              {servicesList.title.normal} <span className="text-[#F3EFE7] font-display font-normal">{servicesList.title.highlight}</span>
            </h2>
            <p className="body-lg text-[#AAA49A] max-w-2xl mx-auto font-normal">
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
                className="group relative bg-[#121212] border border-[#C6A15B]/15 hover:border-[#C6A15B]/40 rounded-sm overflow-hidden transition-all duration-500 shadow-xl flex flex-col justify-between"
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
                  <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-[#121212]/30 to-transparent" />
                  <span className="absolute top-4 left-4 eyebrow text-[#DEC27B] px-3 py-1 bg-[#0A0A0A]/80 border border-[#C6A15B]/30 rounded-full backdrop-blur-md">
                    {svc.code}
                  </span>
                </div>
                <div className="p-7 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="heading-md font-normal text-[#F3EFE7] mb-3 group-hover:text-[#DEC27B] transition-colors tracking-[-0.015em]">
                      {svc.title}
                    </h3>
                    <p className="body-md text-[#AAA49A] font-normal mb-6">
                      {svc.description}
                    </p>
                  </div>
                  <div className="pt-4 border-t border-[#C6A15B]/15 flex items-center justify-between button-text text-[#C6A15B]">
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
        <section className="py-20 bg-[#0E0E0E] border-t border-[#C6A15B]/15">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
              {/* Vision Card */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                whileHover={{ scale: 1.01 }}
                className="p-8 sm:p-10 rounded-sm bg-[#141414] border border-[#C6A15B]/20 relative overflow-hidden group hover:border-[#C6A15B]/40 transition-all shadow-2xl"
              >
                <div className="absolute top-0 right-0 p-6 text-[#C6A15B]/15 font-display text-7xl select-none font-normal group-hover:text-[#C6A15B]/25 transition-colors">
                  {visionMission.vision.code}
                </div>
                <div className="eyebrow text-[#C6A15B] mb-3">
                  {visionMission.vision.eyebrow}
                </div>
                <h3 className="heading-lg font-normal text-[#F3EFE7] mb-5 tracking-[-0.02em]">
                  {visionMission.vision.title}
                </h3>
                <p className="body-lg text-[#AAA49A] font-normal">
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
                className="p-8 sm:p-10 rounded-sm bg-[#141414] border border-[#C6A15B]/20 relative overflow-hidden group hover:border-[#C6A15B]/40 transition-all shadow-2xl"
              >
                <div className="absolute top-0 right-0 p-6 text-[#C6A15B]/15 font-display text-7xl select-none font-normal group-hover:text-[#C6A15B]/25 transition-colors">
                  {visionMission.mission.code}
                </div>
                <div className="eyebrow text-[#C6A15B] mb-3">
                  {visionMission.mission.eyebrow}
                </div>
                <h3 className="heading-lg font-normal text-[#F3EFE7] mb-5 tracking-[-0.02em]">
                  {visionMission.mission.title}
                </h3>
                <p className="body-lg text-[#AAA49A] font-normal">
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
            <span className="eyebrow text-[#C6A15B]">
              {coreValues.eyebrow}
            </span>
            <h2 className="display-lg font-normal text-[#F3EFE7] tracking-[-0.02em] leading-[1.08]">
              {coreValues.title.normal} <span className="text-[#F3EFE7] font-display font-normal">{coreValues.title.highlight}</span>
            </h2>
            <p className="body-lg text-[#AAA49A] max-w-2xl mx-auto font-normal">
              {coreValues.description}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreValues.items.map((val, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -5 }}
                className="p-6 bg-[#121212] border border-[#C6A15B]/15 rounded-sm space-y-3 hover:border-[#C6A15B]/40 transition-colors shadow-lg"
              >
                <div className="heading-md text-[#F3EFE7] font-normal flex items-center justify-between tracking-[-0.015em]">
                  <span>{val.title}</span>
                  <span className="w-2 h-2 rounded-full bg-[#C6A15B]" />
                </div>
                <p className="body-md text-[#AAA49A] font-normal">
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
