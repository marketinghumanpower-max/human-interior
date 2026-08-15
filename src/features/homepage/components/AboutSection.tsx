import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'
import { homeContent } from '@/content/home'

export const AboutSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { about } = homeContent

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  // Direct scroll counter-parallax transforms
  const textY = useTransform(scrollYProgress, [0, 1], ['30px', '-30px'])
  const imageY = useTransform(scrollYProgress, [0, 1], ['45px', '-45px'])

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative z-10 py-28 md:py-36 bg-[#080808]/90 border-t border-[#C6A15B]/15 overflow-hidden"
      data-scene-image="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1920&auto=format&fit=crop"
      data-scene-opacity="0.60"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
          <motion.div
            style={{ y: textY }}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-5 mb-10 md:mb-0"
          >
            <span className="eyebrow text-[#C6A15B] mb-3 block">
              {about.eyebrow}
            </span>

            <h2 className="display-lg font-normal text-[#F3EFE7] mb-6 leading-[1.08] tracking-[-0.02em]">
              {about.title.normal}{' '}
              <span className="font-display font-normal text-[#F3EFE7]">
                {about.title.highlight}
              </span>
              .
            </h2>

            {about.paragraphs.map((p, i) => (
              <p
                key={i}
                className="body-md text-[#AAA49A] mb-6 font-normal"
              >
                {p}
              </p>
            ))}

            <Link
              to="/about"
              className="inline-flex items-center gap-2 button-text text-[#C6A15B] hover:text-[#F3EFE7] transition-colors group"
            >
              {about.action}{' '}
              <span className="material-symbols-outlined text-sm transition-transform duration-300 group-hover:translate-x-1">
                arrow_forward
              </span>
            </Link>
          </motion.div>

          <motion.div
            style={{ y: imageY }}
            initial={{ opacity: 0, x: 30, scale: 0.96 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            className="md:col-span-6 md:col-start-7"
          >
            <div className="relative aspect-square overflow-hidden group border border-[#C6A15B]/25 rounded-none shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=90&w=1600&auto=format&fit=crop"
                alt={about.imageAlt}
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.src =
                    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=90&w=1600&auto=format&fit=crop'
                }}
                className="object-cover w-full h-full opacity-90 transition-transform duration-1000 group-hover:scale-105"
              />
              <div
                className="absolute -inset-4 border border-[#C6A15B]/30 -z-10 translate-x-4 translate-y-4 pointer-events-none transition-transform duration-500 group-hover:translate-x-2 group-hover:translate-y-2"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
