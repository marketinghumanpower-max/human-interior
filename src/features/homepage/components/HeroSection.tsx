import { useRef } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
} from 'framer-motion'
import { homeContent } from '@/content/home'

import bg3dVideo from '../../../assets/bg_3d.mp4'

export const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement | null>(null)
  const shouldReduceMotion = useReducedMotion()
  const { hero } = homeContent

  // 1. Hero-specific Scroll Progress
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })

  // 2. Smooth Spring Progress for fluid cinematic motion
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 25,
    mass: 0.35,
  })

  // Dark Overlay dynamic opacity (calibrated to match screenshot contrast)
  const overlayOpacity = useTransform(
    smoothProgress,
    [0, 0.65, 1],
    [0.15, 0.25, 0.50]
  )

  // Parallax transforms for decorative layers & content
  const decorationY = useTransform(smoothProgress, [0, 1], ['0px', '-20px'])
  const ringRotation = useTransform(smoothProgress, [0, 1], [0, 30])
  const contentY = useTransform(smoothProgress, [0, 1], ['0px', '-55px'])
  const contentOpacity = useTransform(
    smoothProgress,
    [0, 0.65, 1],
    [1, 0.92, 0.35]
  )
  const hotspotY = useTransform(smoothProgress, [0, 1], ['0px', '-35px'])

  return (
    <section
      ref={heroRef}
      id="home"
      className="hero relative min-h-[115vh] flex flex-col justify-between pt-[90px] pb-16 overflow-hidden"
      data-scene-image={bg3dVideo}
      data-scene-opacity="1"
    >
      {/* 1. Subtle Editorial Dark Overlay */}
      <motion.div
        className="hero-overlay absolute inset-0 pointer-events-none z-[1]"
        style={{
          opacity: shouldReduceMotion ? 0.25 : overlayOpacity,
          background:
            'linear-gradient(180deg, rgba(5, 5, 5, 0.15) 0%, rgba(5, 5, 5, 0.25) 45%, rgba(5, 5, 5, 0.80) 100%)',
        }}
      />
      <div
        className="hero-vignette absolute inset-0 pointer-events-none z-[1]"
        style={{
          background:
            'radial-gradient(circle at center, rgba(0, 0, 0, 0.0) 0%, rgba(0, 0, 0, 0.30) 100%)',
        }}
      />

      {/* 2. Interactive Luxury Interior Hotspot Pins */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-[2]"
        style={{ y: shouldReduceMotion ? '0px' : hotspotY }}
      >
        {/* Hotspot 1: Sofa */}
        <div className="absolute left-[47%] top-[66%] -translate-x-1/2 -translate-y-1/2 pointer-events-auto cursor-pointer group">
          <div className="relative flex items-center justify-center">
            <span className="absolute w-7 h-7 rounded-full bg-[#C6A15B]/35 animate-ping" />
            <span className="w-4 h-4 rounded-full bg-[#C6A15B] border-2 border-[#F3EFE7] shadow-lg flex items-center justify-center transition-transform group-hover:scale-125" />
            <div className="absolute left-6 top-1/2 -translate-y-1/2 px-4 py-2.5 rounded-lg bg-[#0C0C0A]/90 backdrop-blur-md border border-[#C6A15B]/40 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-2xl scale-95 group-hover:scale-100">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="w-2 h-2 rounded-full bg-[#C6A15B]" />
                <span className="text-[11px] font-semibold text-[#F3EFE7] tracking-[0.12em] uppercase block">
                  {hero.hotspots.sofa.title}
                </span>
              </div>
              <span className="text-[10px] text-[#C6A15B] font-light block">
                {hero.hotspots.sofa.subtitle}
              </span>
            </div>
          </div>
        </div>

        {/* Hotspot 2: Coffee Table */}
        <div className="absolute left-[51%] top-[78%] -translate-x-1/2 -translate-y-1/2 pointer-events-auto cursor-pointer group">
          <div className="relative flex items-center justify-center">
            <span className="absolute w-7 h-7 rounded-full bg-[#C6A15B]/35 animate-ping" />
            <span className="w-4 h-4 rounded-full bg-[#C6A15B] border-2 border-[#F3EFE7] shadow-lg flex items-center justify-center transition-transform group-hover:scale-125" />
            <div className="absolute left-6 top-1/2 -translate-y-1/2 px-4 py-2.5 rounded-lg bg-[#0C0C0A]/90 backdrop-blur-md border border-[#C6A15B]/40 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-2xl scale-95 group-hover:scale-100">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="w-2 h-2 rounded-full bg-[#C6A15B]" />
                <span className="text-[11px] font-semibold text-[#F3EFE7] tracking-[0.12em] uppercase block">
                  {hero.hotspots.table.title}
                </span>
              </div>
              <span className="text-[10px] text-[#C6A15B] font-light block">
                {hero.hotspots.table.subtitle}
              </span>
            </div>
          </div>
        </div>

        {/* Hotspot 3: Arc Lamp */}
        <div className="absolute left-[72%] top-[45%] -translate-x-1/2 -translate-y-1/2 pointer-events-auto cursor-pointer group">
          <div className="relative flex items-center justify-center">
            <span className="absolute w-7 h-7 rounded-full bg-[#C6A15B]/35 animate-ping" />
            <span className="w-4 h-4 rounded-full bg-[#C6A15B] border-2 border-[#F3EFE7] shadow-lg flex items-center justify-center transition-transform group-hover:scale-125" />
            <div className="absolute right-6 top-1/2 -translate-y-1/2 px-4 py-2.5 rounded-lg bg-[#0C0C0A]/90 backdrop-blur-md border border-[#C6A15B]/40 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-2xl scale-95 group-hover:scale-100">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="w-2 h-2 rounded-full bg-[#C6A15B]" />
                <span className="text-[11px] font-semibold text-[#F3EFE7] tracking-[0.12em] uppercase block">
                  {hero.hotspots.lamp.title}
                </span>
              </div>
              <span className="text-[10px] text-[#C6A15B] font-light block">
                {hero.hotspots.lamp.subtitle}
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* 3. Decorative Grid Lines & Ring */}
      <motion.div
        className="hero-decoration absolute inset-0 pointer-events-none z-[2]"
        style={{ y: shouldReduceMotion ? '0px' : decorationY }}
      >
        <div className="absolute inset-0 flex justify-between max-w-7xl mx-auto px-6 md:px-12 opacity-10">
          <div className="w-[1px] h-full bg-[#C6A15B]" />
          <div className="w-[1px] h-full bg-[#C6A15B] hidden md:block" />
          <div className="w-[1px] h-full bg-[#C6A15B] hidden md:block" />
          <div className="w-[1px] h-full bg-[#C6A15B]" />
        </div>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <motion.div
            className="w-[520px] h-[520px] md:w-[720px] md:h-[720px] rounded-full border border-[#C6A15B]/30 opacity-25"
            style={{ rotate: shouldReduceMotion ? 0 : ringRotation }}
          />
        </div>
      </motion.div>

      {/* 4. Main Hero Content Composition */}
      <motion.div
        className="hero-content relative z-[3] max-w-5xl mx-auto px-6 md:px-12 w-full text-center my-auto pt-10 pointer-events-auto"
        style={{
          y: shouldReduceMotion ? '0px' : contentY,
          opacity: shouldReduceMotion ? 1 : contentOpacity,
        }}
      >
        {/* Editorial Pill Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#0C0C0A]/75 backdrop-blur-md border border-[rgba(198,161,91,0.4)] text-[#DEC27B] eyebrow mb-7 shadow-xl"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#C6A15B] animate-pulse" />
          <span>{hero.badge}</span>
        </motion.div>

        {/* Main Display Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="display-xl hero-title font-normal text-[#F5F1E8] mb-7 mx-auto leading-[0.98] tracking-[-0.025em] drop-shadow-lg"
        >
          <span>{hero.title.normal}</span>
          <span className="font-display font-normal text-[#F5F1E8]">
            {hero.title.highlight}
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="body-lg text-[rgba(255,255,255,0.78)] max-w-[680px] mx-auto mb-9 leading-[1.65] tracking-[-0.005em] drop-shadow-md font-normal"
        >
          {hero.description}
        </motion.p>

        {/* Call to Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <a href="#projects" className="btn-primary button-text w-full sm:w-auto text-center px-8 py-3.5 shadow-2xl">
            {hero.actions.primary}
          </a>
          <a href="#contact" className="btn-secondary button-text w-full sm:w-auto text-center px-8 py-3.5 backdrop-blur-md">
            {hero.actions.secondary}
          </a>
        </motion.div>
      </motion.div>

      {/* 5. Architectural Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.85 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="relative z-[3] flex flex-col items-center gap-3 pt-6 cursor-pointer"
      >
        <a href="#projects" className="group flex flex-col items-center gap-2">
          <span className="eyebrow text-[#C6A15B] transition-opacity group-hover:opacity-100 opacity-80">
            {hero.scrollIndicator}
          </span>
          <div className="w-[1px] h-8 bg-gradient-to-b from-[#C6A15B] to-transparent animate-pulse" />
        </a>
      </motion.div>

      {/* 6. Bottom Transition Gradient Overlay */}
      <div
        className="absolute left-0 right-0 bottom-0 h-[28%] pointer-events-none z-[2]"
        style={{
          background: 'linear-gradient(to bottom, transparent 0%, #080808 100%)',
        }}
      />
    </section>
  )
}
