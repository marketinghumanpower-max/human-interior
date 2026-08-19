import { useState } from 'react'
import { motion } from 'framer-motion'
import { FooterSection } from '../homepage/components/FooterSection'
import { contactContent } from '@/content/contact'
import { ContactDots3DCanvas } from './components/ContactDots3DCanvas'

export const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate async submission
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSuccess(true)
      setFormData({
        name: '',
        phone: '',
        email: '',
        service: '',
        message: '',
      })

      setTimeout(() => {
        setIsSuccess(false)
      }, 5000)
    }, 800)
  }

  return (
    <div className="relative min-h-screen bg-[#0A0A0A] text-[#F5F1E8] overflow-x-hidden selection:bg-[#C6A15B]/30 selection:text-[#F5F1E8]">
      <main className="pt-[90px]">
        {/* ========================================================================= */}
        {/* 1. HERO SECTION WITH 3D DOT MATRIX WAVE CANVAS */}
        {/* ========================================================================= */}
        <section className="relative py-24 md:py-32 px-6 md:px-12 min-h-[55vh] flex items-center justify-center border-b border-[#C6A15B]/20 overflow-hidden bg-gradient-to-b from-[#080808] via-[#0D0D0D] to-[#0A0A0A]">
          {/* Interactive 3D WebGL Dots Background */}
          <ContactDots3DCanvas className="opacity-75" />

          {/* Ambient Gold Radial Soft Glow */}
          <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-full max-w-5xl h-96 bg-[#C6A15B]/15 rounded-full blur-[130px] pointer-events-none" />

          <div className="relative z-10 max-w-5xl mx-auto text-center space-y-6">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="inline-flex items-center gap-2 px-4.5 py-2 rounded-full border border-[#DEC27B]/40 bg-[#0A0A0A]/80 backdrop-blur-md shadow-[0_0_20px_rgba(198,161,91,0.2)]"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-[#EDDAA2] animate-pulse" />
              <span className="eyebrow text-[#EDDAA2] text-xs font-semibold tracking-[0.2em]">
                {contactContent.hero.badge}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="display-xl text-[#F5F1E8] leading-[1.05] tracking-[-0.01em]"
            >
              {contactContent.hero.title.normal}{' '}
              <span className="text-[#EDDAA2]">
                {contactContent.hero.title.highlight}
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="body-lg text-[#D1D5DB] text-base md:text-lg max-w-2xl mx-auto font-normal leading-relaxed"
            >
              {contactContent.hero.subtitle}
            </motion.p>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 2. CONTACT INFO CARDS GRID */}
        {/* ========================================================================= */}
        <section className="py-16 md:py-20 px-6 md:px-12 bg-[#0D0D0D] border-b border-[#C6A15B]/20">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Card 1: Address */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="group p-8 rounded-xl bg-[#141414] border border-[#C6A15B]/30 hover:border-[#DEC27B] text-center transition-all duration-500 hover:shadow-[0_10px_30px_rgba(198,161,91,0.2)] flex flex-col items-center justify-between"
              >
                <div className="flex flex-col items-center">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#C6A15B] to-[#EDDAA2] flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-500 text-[#0A0A0A]">
                    <span className="material-symbols-outlined text-2xl">location_on</span>
                  </div>
                  <h3 className="card-title text-lg text-[#F5F1E8] font-bold mb-3 uppercase">
                    {contactContent.cards.address.title}
                  </h3>
                  <a
                    href={contactContent.cards.address.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="body-md text-sm text-[#D1D5DB] hover:text-[#FFFFFF] transition-colors font-normal leading-relaxed block"
                  >
                    {contactContent.cards.address.text}
                  </a>
                </div>
                <a
                  href={contactContent.cards.address.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-1 button-text text-[#EDDAA2] hover:text-[#FFFFFF] font-semibold group-hover:translate-x-1 transition-all"
                >
                  {contactContent.cards.address.action}{' '}
                  <span className="material-symbols-outlined text-sm">open_in_new</span>
                </a>
              </motion.div>

              {/* Card 2: Phone */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="group p-8 rounded-xl bg-[#141414] border border-[#C6A15B]/30 hover:border-[#DEC27B] text-center transition-all duration-500 hover:shadow-[0_10px_30px_rgba(198,161,91,0.2)] flex flex-col items-center justify-between"
              >
                <div className="flex flex-col items-center">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#C6A15B] to-[#EDDAA2] flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-500 text-[#0A0A0A]">
                    <span className="material-symbols-outlined text-2xl">call</span>
                  </div>
                  <h3 className="card-title text-lg text-[#F5F1E8] font-bold mb-3 uppercase">
                    {contactContent.cards.phone.title}
                  </h3>
                  <div className="space-y-1 body-md text-sm text-[#D1D5DB] font-medium">
                    {contactContent.cards.phone.numbers.map((num, i) => (
                      <a
                        key={i}
                        href={`tel:${num.replace(/\s+/g, '')}`}
                        className="block hover:text-[#FFFFFF] transition-colors"
                      >
                        {num}
                      </a>
                    ))}
                  </div>
                </div>
                <div className="mt-6 flex items-center justify-center gap-3">
                  <a
                    href={`tel:${contactContent.cards.phone.numbers[0].replace(/\s+/g, '')}`}
                    className="inline-flex items-center gap-1 button-text text-[#EDDAA2] hover:text-[#FFFFFF] font-semibold group-hover:translate-x-0.5 transition-all"
                  >
                    {contactContent.cards.phone.action}{' '}
                    <span className="material-symbols-outlined text-sm">phone_forwarded</span>
                  </a>
                  <span className="text-[#444]">|</span>
                  <a
                    href="https://zalo.me/0329688826"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 button-text text-[#0068FF] hover:text-[#00A3FF] font-semibold transition-all"
                  >
                    Chat Zalo
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 48 48">
                      <path d="M24 4C12.95 4 4 12.06 4 22c0 4.15 1.56 7.97 4.23 11.02L4.5 44l11.54-3.77C18.66 41.37 21.26 42 24 42c11.05 0 20-8.06 20-18S35.05 4 24 4z"/>
                    </svg>
                  </a>
                </div>
              </motion.div>

              {/* Card 3: Email */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="group p-8 rounded-xl bg-[#141414] border border-[#C6A15B]/30 hover:border-[#DEC27B] text-center transition-all duration-500 hover:shadow-[0_10px_30px_rgba(198,161,91,0.2)] flex flex-col items-center justify-between"
              >
                <div className="flex flex-col items-center">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#C6A15B] to-[#EDDAA2] flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-500 text-[#0A0A0A]">
                    <span className="material-symbols-outlined text-2xl">mail</span>
                  </div>
                  <h3 className="card-title text-lg text-[#F5F1E8] font-bold mb-3 uppercase">
                    {contactContent.cards.email.title}
                  </h3>
                  <div className="space-y-1 body-md text-sm text-[#D1D5DB] break-all font-normal">
                    {contactContent.cards.email.emails.map((em, i) => (
                      <a
                        key={i}
                        href={`mailto:${em}`}
                        className="block hover:text-[#FFFFFF] transition-colors"
                      >
                        {em}
                      </a>
                    ))}
                  </div>
                </div>
                <a
                  href={`mailto:${contactContent.cards.email.emails[0]}`}
                  className="mt-6 inline-flex items-center gap-1 button-text text-[#EDDAA2] hover:text-[#FFFFFF] font-semibold group-hover:translate-x-1 transition-all"
                >
                  {contactContent.cards.email.action}{' '}
                  <span className="material-symbols-outlined text-sm">send</span>
                </a>
              </motion.div>

              {/* Card 4: Working Hours */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="group p-8 rounded-xl bg-[#141414] border border-[#C6A15B]/30 hover:border-[#DEC27B] text-center transition-all duration-500 hover:shadow-[0_10px_30px_rgba(198,161,91,0.2)] flex flex-col items-center justify-between"
              >
                <div className="flex flex-col items-center">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#C6A15B] to-[#EDDAA2] flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-500 text-[#0A0A0A]">
                    <span className="material-symbols-outlined text-2xl">schedule</span>
                  </div>
                  <h3 className="card-title text-lg text-[#F5F1E8] font-bold mb-3 uppercase">
                    {contactContent.cards.workingHours.title}
                  </h3>
                  <div className="space-y-1 body-md text-sm text-[#D1D5DB] font-normal">
                    {contactContent.cards.workingHours.hours.map((l, i) => (
                      <p key={i}>{l}</p>
                    ))}
                  </div>
                </div>
                <div className="mt-6 inline-flex items-center gap-1.5 eyebrow text-[#D1D5DB] text-xs font-semibold">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />{' '}
                  {contactContent.cards.workingHours.status}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 3. FORM & MAP SECTION */}
        {/* ========================================================================= */}
        <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Column: Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-6 bg-[#141414] border border-[#DEC27B]/40 rounded-2xl p-8 sm:p-10 shadow-2xl space-y-8 relative overflow-hidden"
            >
              <div className="space-y-3">
                <span className="eyebrow text-[#EDDAA2] text-xs font-semibold uppercase tracking-[0.2em]">
                  {contactContent.form.eyebrow}
                </span>
                <h2 className="display-lg text-[#F5F1E8] tracking-[0.01em] uppercase leading-[1.05]">
                  {contactContent.form.title.normal}{' '}
                  <span className="text-[#EDDAA2]">
                    {contactContent.form.title.highlight}
                  </span>
                </h2>
                <p className="body-md text-[#D1D5DB] font-normal leading-relaxed text-base">
                  {contactContent.form.description}
                </p>
              </div>

              {isSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 rounded-lg bg-[#C6A15B]/20 border border-[#EDDAA2] text-[#EDDAA2] font-body text-sm flex items-start gap-3"
                >
                  <span className="material-symbols-outlined text-xl flex-shrink-0 text-[#EDDAA2]">
                    check_circle
                  </span>
                  <div>
                    <p className="body-md font-semibold text-[#EDDAA2]">{contactContent.form.successTitle}</p>
                    <p className="caption text-[#D1D5DB] mt-0.5 font-normal">
                      {contactContent.form.successMessage}
                    </p>
                  </div>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6 font-body">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Name */}
                  <div className="space-y-2">
                    <label className="block eyebrow text-[#F5F1E8] text-xs font-semibold">
                      {contactContent.form.labels.name} <span className="text-[#EDDAA2]">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder={contactContent.form.placeholders.name}
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3.5 rounded-lg bg-[#0A0A0A] border border-[#333] text-sm text-[#F5F1E8] placeholder-[#9CA3AF] focus:outline-none focus:border-[#EDDAA2] transition-all body-md font-normal"
                    />
                  </div>

                  {/* Phone */}
                  <div className="space-y-2">
                    <label className="block eyebrow text-[#F5F1E8] text-xs font-semibold">
                      {contactContent.form.labels.phone} <span className="text-[#EDDAA2]">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      placeholder={contactContent.form.placeholders.phone}
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3.5 rounded-lg bg-[#0A0A0A] border border-[#333] text-sm text-[#F5F1E8] placeholder-[#9CA3AF] focus:outline-none focus:border-[#EDDAA2] transition-all body-md font-normal"
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label className="block eyebrow text-[#F5F1E8] text-xs font-semibold">
                    {contactContent.form.labels.email} <span className="text-[#EDDAA2]">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder={contactContent.form.placeholders.email}
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3.5 rounded-lg bg-[#0A0A0A] border border-[#333] text-sm text-[#F5F1E8] placeholder-[#9CA3AF] focus:outline-none focus:border-[#EDDAA2] transition-all body-md font-normal"
                  />
                </div>

                {/* Service Selector */}
                <div className="space-y-2">
                  <label className="block eyebrow text-[#F5F1E8] text-xs font-semibold">
                    {contactContent.form.labels.service}
                  </label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full px-4 py-3.5 rounded-lg bg-[#0A0A0A] border border-[#333] text-sm text-[#F5F1E8] focus:outline-none focus:border-[#EDDAA2] transition-all body-md font-normal"
                  >
                    <option value="" className="bg-[#0A0A0A] text-[#9CA3AF]">
                      {contactContent.form.placeholders.service}
                    </option>
                    {contactContent.form.serviceOptions.map((opt) => (
                      <option key={opt.value} value={opt.value} className="bg-[#0A0A0A] text-[#F5F1E8]">
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <label className="block eyebrow text-[#F5F1E8] text-xs font-semibold">
                    {contactContent.form.labels.message} <span className="text-[#EDDAA2]">*</span>
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    placeholder={contactContent.form.placeholders.message}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3.5 rounded-lg bg-[#0A0A0A] border border-[#333] text-sm text-[#F5F1E8] placeholder-[#9CA3AF] focus:outline-none focus:border-[#EDDAA2] transition-all resize-none body-md font-normal"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary button-text w-full py-4 font-semibold"
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-4 h-4 border-2 border-[#0A0A0A] border-t-transparent rounded-full animate-spin mr-2" />
                      {contactContent.form.submittingButton}
                    </>
                  ) : (
                    <>
                      <span className="material-symbols-outlined text-lg mr-2">send</span>
                      {contactContent.form.submitButton}
                    </>
                  )}
                </button>
              </form>
            </motion.div>

            {/* Right Column: Google Maps Embed */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-6 space-y-6"
            >
              <div className="space-y-3">
                <span className="eyebrow text-[#EDDAA2] text-xs font-semibold uppercase tracking-[0.2em]">
                  {contactContent.mapSection.eyebrow}
                </span>
                <h2 className="display-lg text-[#F5F1E8] tracking-[0.01em] uppercase leading-[1.05]">
                  {contactContent.mapSection.title.normal}{' '}
                  <span className="text-[#EDDAA2]">
                    {contactContent.mapSection.title.highlight}
                  </span>
                </h2>
                <p className="body-md text-[#D1D5DB] font-normal leading-relaxed text-base">
                  {contactContent.mapSection.description}
                </p>
              </div>

              {/* Map Container Frame */}
              <div className="relative h-[520px] rounded-2xl overflow-hidden border border-[#C6A15B]/30 shadow-2xl bg-[#141414] group">
                <iframe
                  title="Human Interior Location Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3915.2764953335575!2d106.679799!3d11.069610!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3174d10041ef6a7f%3A0xb35a09cf310e53a2!2zQ8OUTkcgVFkgVE5ISCBLSeG6vE4gVFIgQ8OAViBO4buCSVRI4bqsVCBIVU1BTiBJTlRFUklPUg!5e0!3m2!1svi!2svn!4v1700000000000!5e0"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: 'contrast(1.05) opacity(0.95)' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                />

                {/* Overlay Address Floating Card */}
                <div className="absolute bottom-6 left-6 right-6 p-5 rounded-xl bg-[#0A0A0A]/95 border border-[#DEC27B]/40 backdrop-blur-md shadow-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <div className="card-title text-base text-[#F5F1E8] font-bold flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#EDDAA2]" />
                      {contactContent.mapSection.companyName}
                    </div>
                    <div className="caption text-[#D1D5DB] mt-1 text-sm font-normal">
                      {contactContent.cards.address.text}
                    </div>
                  </div>
                  <a
                    href={contactContent.cards.address.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4.5 py-2.5 rounded button-text bg-[#EDDAA2] text-[#0A0A0A] font-bold whitespace-nowrap hover:bg-[#FFFFFF] transition-colors"
                  >
                    {contactContent.mapSection.openMapAction}
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 4. CALL TO ACTION (CTA) SECTION */}
        {/* ========================================================================= */}
        <section className="py-24 bg-[#0E0E0E] border-t border-[#C6A15B]/20 relative overflow-hidden">
          <ContactDots3DCanvas className="opacity-50" />
          <div className="absolute inset-0 pointer-events-none opacity-10 bg-[radial-gradient(#C6A15B_1px,transparent_1px)] [background-size:24px_24px]" />
          
          <div className="max-w-4xl mx-auto px-6 text-center space-y-8 relative z-10">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="display-lg text-[#F5F1E8] tracking-[0.01em] uppercase leading-[1.05]"
            >
              {contactContent.ctaSection.title.normal}{' '}
              <span className="text-[#EDDAA2]">
                {contactContent.ctaSection.title.highlight}
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="body-lg text-[#D1D5DB] font-normal max-w-2xl mx-auto text-base md:text-lg leading-relaxed"
            >
              {contactContent.ctaSection.description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-5 justify-center items-center pt-2"
            >
              <a
                href={`tel:${contactContent.cards.phone.numbers[0].replace(/\s+/g, '')}`}
                className="btn-primary button-text w-full sm:w-auto font-semibold"
              >
                <span className="material-symbols-outlined text-lg mr-2">call</span>
                {contactContent.ctaSection.actions.call}
              </a>

              <a
                href={`mailto:${contactContent.cards.email.emails[0]}`}
                className="btn-secondary button-text w-full sm:w-auto font-semibold"
              >
                <span className="material-symbols-outlined text-lg mr-2">mail</span>
                {contactContent.ctaSection.actions.email}
              </a>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer Section */}
      <FooterSection />
    </div>
  )
}
