import { motion } from 'framer-motion'
import { homeContent } from '@/content/home'

export const TestimonialsSection = () => {
  const { testimonials } = homeContent

  return (
    <section
      className="relative z-10 py-28 md:py-36 bg-[#0E0E0E]/95 border-y border-[#C6A15B]/20 overflow-hidden"
      data-scene-image="https://images.unsplash.com/photo-1617806118233-18e1de247200?q=80&w=1920&auto=format&fit=crop"
      data-scene-opacity="0.45"
    >
      <div className="max-w-5xl mx-auto px-6 md:px-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <span className="eyebrow text-[#EDDAA2] text-xs font-semibold block uppercase tracking-[0.2em]">
            {testimonials.eyebrow}
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="glass-panel p-8 md:p-14 relative mt-6 rounded-lg border border-[#C6A15B]/30 shadow-2xl"
        >
          <span
            className="material-symbols-outlined text-[#EDDAA2]/25 text-7xl md:text-8xl absolute top-4 left-4 -z-10 select-none pointer-events-none"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            format_quote
          </span>

          <p className="body-lg text-lg md:text-2xl text-[#F5F1E8] leading-[1.7] mb-8 font-normal">
            {testimonials.quote}
          </p>

          <div>
            <h4 className="font-sans text-xl md:text-2xl text-[#FFFFFF] font-bold tracking-wide">
              {testimonials.author}
            </h4>
            <span className="eyebrow text-[#EDDAA2] text-xs md:text-sm font-semibold block mt-1.5 uppercase tracking-[0.16em]">
              {testimonials.role}
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
