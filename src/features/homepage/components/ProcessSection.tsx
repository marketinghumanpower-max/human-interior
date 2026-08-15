import { motion } from 'framer-motion'
import { servicesContent } from '@/content/services'

export const ProcessSection = () => {
  const { process } = servicesContent
  const steps = process.steps

  return (
    <section
      id="process"
      className="py-28 md:py-36 relative z-10 overflow-hidden"
      style={{ background: '#0A0A0A' }}
      data-scene-image="https://images.unsplash.com/photo-1616594039964-ae9021a400a0?q=80&w=1920&auto=format&fit=crop"
      data-scene-opacity="0.15"
    >
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="display-lg font-normal text-[#F3EFE7] tracking-[-0.02em] leading-[1.08]">
            {process.title}
          </h2>
        </motion.div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Central Vertical Line (Desktop only) */}
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
            className="hidden md:block absolute left-1/2 top-0 w-[1px] h-full -translate-x-1/2 origin-top bg-[#C6A15B]/30"
          />

          {/* Steps */}
          <div className="space-y-8 md:space-y-0">
            {steps.map((step, index) => {
              const isOdd = index % 2 === 0 // Steps 1,3,5 on left; 2,4,6 on right

              return (
                <motion.div
                  key={step.number}
                  initial={{
                    opacity: 0,
                    x: isOdd ? -60 : 60,
                  }}
                  whileInView={{
                    opacity: 1,
                    x: 0,
                  }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{
                    duration: 0.7,
                    delay: index * 0.1,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                  className="relative md:flex md:items-center"
                  style={{ minHeight: '160px' }}
                >
                  {/* Mobile Layout: Simple left-aligned */}
                  <div className="md:hidden flex items-start gap-5">
                    {/* Number Circle */}
                    <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-display text-sm font-medium bg-[#C6A15B] text-[#080808]">
                      {step.number}
                    </div>
                    <div>
                      <h3 className="heading-md text-lg font-normal text-[#F3EFE7] mb-2 leading-snug">
                        {step.title}
                      </h3>
                      <p className="body-md text-sm leading-[1.65] text-[#AAA49A]">
                        {step.description}
                      </p>
                    </div>
                  </div>

                  {/* Desktop Layout: Zigzag */}
                  <div className="hidden md:grid md:grid-cols-[1fr_auto_1fr] md:items-center md:w-full md:gap-0">
                    {/* Left Side */}
                    <div className={`flex ${isOdd ? 'justify-end pr-12' : ''}`}>
                      {isOdd ? (
                        <div className="max-w-sm text-right">
                          <h3 className="heading-md font-normal text-[#F3EFE7] mb-2 leading-snug">
                            {step.title}
                          </h3>
                          <p className="body-md text-sm leading-[1.65] text-[#AAA49A]">
                            {step.description}
                          </p>
                        </div>
                      ) : (
                        <div />
                      )}
                    </div>

                    {/* Center: Dot + Horizontal Line */}
                    <div className="relative flex items-center justify-center" style={{ width: '60px' }}>
                      {/* Horizontal connector line */}
                      <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                        className="absolute h-[1px] bg-[#C6A15B]/40 z-0"
                        style={{
                          width: '200%',
                          ...(isOdd
                            ? { right: '50%', transformOrigin: 'right' }
                            : { left: '50%', transformOrigin: 'left' }),
                        }}
                      />

                      {/* Number Circle */}
                      <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{
                          type: 'spring',
                          stiffness: 300,
                          damping: 20,
                          delay: index * 0.1 + 0.2,
                        }}
                        className="relative z-10 w-11 h-11 rounded-full flex items-center justify-center font-display text-sm font-medium bg-[#C6A15B] text-[#080808] shadow-[0_0_15px_rgba(198,161,91,0.25)]"
                      >
                        {step.number}
                      </motion.div>
                    </div>

                    {/* Right Side */}
                    <div className={`flex ${!isOdd ? 'justify-start pl-12' : ''}`}>
                      {!isOdd ? (
                        <div className="max-w-sm text-left">
                          <h3 className="heading-md font-normal text-[#F3EFE7] mb-2 leading-snug">
                            {step.title}
                          </h3>
                          <p className="body-md text-sm leading-[1.65] text-[#AAA49A]">
                            {step.description}
                          </p>
                        </div>
                      ) : (
                        <div />
                      )}
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
