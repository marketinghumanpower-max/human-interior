import { useState } from 'react'
import { motion } from 'framer-motion'
import { homeContent } from '@/content/home'

export const ContactSection = () => {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const { contact } = homeContent

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !phone) return
    setSubmitted(true)
  }

  return (
    <section
      id="contact"
      className="py-28 md:py-36 relative z-10 bg-[#0A0A0A]/90 overflow-hidden"
      data-scene-image="https://images.unsplash.com/photo-1558882224-dda166733046?q=80&w=1920&auto=format&fit=crop"
      data-scene-opacity="0.35"
    >
      <div className="max-w-4xl mx-auto px-6 md:px-12 text-center relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8 }}
          className="display-lg font-normal text-[#F3EFE7] mb-6 leading-[1.08] tracking-[-0.02em]"
        >
          {contact.title}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="body-lg text-[#AAA49A] mb-12 max-w-2xl mx-auto leading-[1.65] font-normal"
        >
          {contact.description}
        </motion.p>

        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-panel p-8 max-w-md mx-auto rounded-sm text-[#DEC27B] font-body"
          >
            <span className="material-symbols-outlined text-4xl mb-2">
              check_circle
            </span>
            <h4 className="heading-md font-normal text-[#F3EFE7] mb-2 tracking-[-0.015em]">
              {contact.successTitle}
            </h4>
            <p className="body-md text-[#AAA49A] font-normal leading-[1.65]">
              {contact.successDescription}
            </p>
          </motion.div>
        ) : (
          <motion.form
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8, delay: 0.3 }}
            onSubmit={handleSubmit}
            className="max-w-md mx-auto flex flex-col gap-6 text-left"
          >
            <div className="relative">
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder={contact.form.namePlaceholder}
                className="w-full bg-transparent border-0 border-b border-[#C6A15B]/30 focus:border-[#C6A15B] focus:ring-0 text-[#F3EFE7] py-3 px-0 transition-colors placeholder-transparent peer body-md font-normal"
              />
              <label
                htmlFor="name"
                className="absolute left-0 -top-4 eyebrow text-[#C6A15B] transition-all peer-placeholder-shown:text-[#AAA49A] peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:-top-4 peer-focus:text-[11px] peer-focus:text-[#C6A15B] pointer-events-none"
              >
                {contact.form.nameLabel}
              </label>
            </div>

            <div className="relative">
              <input
                type="tel"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                placeholder={contact.form.phonePlaceholder}
                className="w-full bg-transparent border-0 border-b border-[#C6A15B]/30 focus:border-[#C6A15B] focus:ring-0 text-[#F3EFE7] py-3 px-0 transition-colors placeholder-transparent peer body-md font-normal"
              />
              <label
                htmlFor="phone"
                className="absolute left-0 -top-4 eyebrow text-[#C6A15B] transition-all peer-placeholder-shown:text-[#AAA49A] peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:-top-4 peer-focus:text-[11px] peer-focus:text-[#C6A15B] pointer-events-none"
              >
                {contact.form.phoneLabel}
              </label>
            </div>

            <button type="submit" className="btn-primary button-text w-full mt-4 text-center">
              {contact.form.submitButton}
            </button>
          </motion.form>
        )}
      </div>
    </section>
  )
}

