import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FooterSection } from '../homepage/components/FooterSection'
import { newsArticlesData } from './data/newsData'
import { newsContent } from '@/content/news'
import { NewsHero3D } from './components/NewsHero3D'
import { Article3DMaterialViewer } from './components/Article3DMaterialViewer'
import type { NewsArticle } from './types'

export const NewsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Tất cả')
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [activeArticle, setActiveArticle] = useState<NewsArticle | null>(null)
  const [newsletterEmail, setNewsletterEmail] = useState('')
  const [newsletterSuccess, setNewsletterSuccess] = useState(false)

  const categories = ['Tất cả', 'Xu hướng thiết kế', 'Vật liệu cao cấp', 'Dự án mới', 'Phong cách sống']

  const filteredArticles = useMemo(() => {
    return newsArticlesData.filter((article) => {
      const matchesCategory =
        selectedCategory === 'Tất cả' || article.category === selectedCategory
      const matchesSearch =
        searchQuery.trim() === '' ||
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.category.toLowerCase().includes(searchQuery.toLowerCase())

      return matchesCategory && matchesSearch
    })
  }, [selectedCategory, searchQuery])

  const featuredHeroArticle = newsArticlesData.find((a) => a.isFeatured) || newsArticlesData[0]

  const handleSelectArticleById = (id: string) => {
    const found = newsArticlesData.find((a) => a.id === id)
    if (found) {
      setActiveArticle(found)
    }
  }

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (newsletterEmail) {
      setNewsletterSuccess(true)
      setTimeout(() => {
        setNewsletterSuccess(false)
        setNewsletterEmail('')
      }, 4000)
    }
  }

  return (
    <div className="relative min-h-screen bg-[#0A0A0A] text-[#e4e2dd] overflow-x-hidden selection:bg-[#C6A15B]/30 selection:text-[#F3EFE7]">
      <main className="pt-[90px]">
        {/* ========================================================================= */}
        {/* 1. HERO BANNER SECTION WITH INTERACTIVE 3D CANVAS */}
        {/* ========================================================================= */}
        <section className="relative py-12 md:py-20 border-b border-[#C6A15B]/20 overflow-hidden bg-gradient-to-b from-[#080808] via-[#0D0D0D] to-[#0A0A0A]">
          {/* Subtle Ambient Radial Grid */}
          <div className="absolute inset-0 pointer-events-none opacity-15 bg-[radial-gradient(#C6A15B_1px,transparent_1px)] [background-size:32px_32px]" />

          <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
            {/* Left Column: Text & Editorial Header */}
            <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#C6A15B]/30 bg-[#C6A15B]/10 backdrop-blur-md"
              >
                <span className="w-2 h-2 rounded-full bg-[#C6A15B] animate-pulse" />
                <span className="eyebrow text-[#C6A15B]">
                  {newsContent.hero.badge}
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="display-lg font-normal text-[#F3EFE7] leading-[1.08] tracking-[-0.025em]"
              >
                {newsContent.hero.title.normal}{' '}
                <span className="font-display font-normal text-[#F3EFE7] block sm:inline">
                  {newsContent.hero.title.highlight}
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="body-lg text-[#AAA49A] max-w-xl font-normal"
              >
                {newsContent.hero.description}
              </motion.p>

              {/* Stats Bar */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="pt-4 grid grid-cols-3 gap-4 border-t border-[#C6A15B]/15 max-w-md mx-auto lg:mx-0"
              >
                <div>
                  <div className="display-lg text-[#DEC27B] font-normal">50+</div>
                  <div className="eyebrow text-[#AAA49A]">Bài Viết Chuyên Sâu</div>
                </div>
                <div>
                  <div className="display-lg text-[#DEC27B] font-normal">360°</div>
                  <div className="eyebrow text-[#AAA49A]">Mô Phỏng 3D</div>
                </div>
                <div>
                  <div className="display-lg text-[#DEC27B] font-normal">100%</div>
                  <div className="eyebrow text-[#AAA49A]">Nội Thất Độc Bản</div>
                </div>
              </motion.div>
            </div>

            {/* Right Column: 3D WebGL Interactive Magazine Scene */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="lg:col-span-6 relative"
            >
              <div className="relative rounded-2xl bg-[#0E0E10]/80 border border-[#C6A15B]/30 p-2 shadow-[0_0_50px_rgba(198,161,91,0.15)] overflow-hidden">
                <NewsHero3D onSelectArticle={handleSelectArticleById} />
              </div>
            </motion.div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 2. FEATURED HERO ARTICLE SHOWCASE */}
        {/* ========================================================================= */}
        <section className="py-12 md:py-16 px-6 md:px-12 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="group relative bg-[#121212] border border-[#C6A15B]/30 rounded-xl overflow-hidden grid lg:grid-cols-12 gap-0 shadow-2xl hover:border-[#C6A15B]/60 hover:shadow-[0_15px_40px_rgba(198,161,91,0.18)] transition-all duration-500 cursor-pointer"
            onClick={() => setActiveArticle(featuredHeroArticle)}
          >
            <div className="lg:col-span-7 relative min-h-[340px] lg:min-h-[460px] overflow-hidden">
              <img
                src={featuredHeroArticle.featuredImage}
                alt={featuredHeroArticle.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-[#121212] via-[#121212]/30 to-transparent opacity-90" />
              <span className="absolute top-6 left-6 eyebrow text-[#DEC27B] px-4 py-1.5 bg-[#0A0A0A]/90 border border-[#C6A15B]/40 rounded-full backdrop-blur-md">
                {newsContent.featuredBadge}
              </span>
            </div>

            <div className="lg:col-span-5 p-8 lg:p-12 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3 eyebrow text-[#C6A15B]">
                  <span>{featuredHeroArticle.category}</span>
                  <span>•</span>
                  <span>{featuredHeroArticle.publishedAt}</span>
                  <span>•</span>
                  <span>{featuredHeroArticle.readTime}</span>
                </div>

                <h2 className="heading-lg font-normal text-[#F3EFE7] leading-tight group-hover:text-[#DEC27B] transition-colors tracking-[-0.015em]">
                  {featuredHeroArticle.title}
                </h2>

                <p className="body-lg text-[#AAA49A] font-normal">
                  {featuredHeroArticle.excerpt}
                </p>
              </div>

              <div className="pt-6 border-t border-[#C6A15B]/15 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={featuredHeroArticle.author.avatar}
                    alt={featuredHeroArticle.author.name}
                    className="w-10 h-10 rounded-full object-cover border border-[#C6A15B]/30"
                  />
                  <div>
                    <div className="heading-md text-sm font-normal text-[#F3EFE7]">
                      {featuredHeroArticle.author.name}
                    </div>
                    <div className="caption text-[#AAA49A] font-normal">
                      {featuredHeroArticle.author.role}
                    </div>
                  </div>
                </div>

                <span className="inline-flex items-center gap-1 button-text text-[#C6A15B] group-hover:translate-x-1.5 transition-transform">
                  {newsContent.readArticle} <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </span>
              </div>
            </div>
          </motion.div>
        </section>

        {/* ========================================================================= */}
        {/* 3. CATEGORY FILTERS & SEARCH */}
        {/* ========================================================================= */}
        <section className="py-8 px-6 md:px-12 max-w-7xl mx-auto border-y border-[#C6A15B]/15 my-4 font-body">
          <div className="flex flex-col lg:flex-row justify-between items-stretch lg:items-center gap-6">
            {/* Category Tabs */}
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {categories.map((cat) => {
                const isActive = selectedCategory === cat
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`relative px-5 py-2.5 rounded-full button-text transition-all duration-300 ${
                      isActive
                        ? 'text-[#0A0A0A]'
                        : 'bg-[#141414] border border-[#C6A15B]/20 text-[#AAA49A] hover:text-[#F3EFE7] hover:border-[#C6A15B]/40'
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="activeCategoryTab"
                        className="absolute inset-0 bg-[#C6A15B] rounded-full shadow-[0_0_15px_rgba(198,161,91,0.5)]"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{cat}</span>
                  </button>
                )
              })}
            </div>

            {/* Search Input */}
            <div className="relative w-full lg:w-80">
              <input
                type="text"
                placeholder={newsContent.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2.5 pl-10 rounded-full bg-[#121212] border border-[#C6A15B]/30 text-sm text-[#F3EFE7] placeholder-[#AAA49A]/50 focus:outline-none focus:border-[#C6A15B] transition-colors body-md font-normal"
              />
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#C6A15B] text-lg pointer-events-none">
                search
              </span>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#AAA49A] hover:text-[#F3EFE7]"
                >
                  <span className="material-symbols-outlined text-sm">close</span>
                </button>
              )}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 4. ARTICLES GRID WITH 3D CARD TILT & HOVER ANIMATION */}
        {/* ========================================================================= */}
        <section className="py-12 md:py-16 px-6 md:px-12 max-w-7xl mx-auto">
          {filteredArticles.length === 0 ? (
            <div className="text-center py-20 space-y-4 font-body">
              <span className="material-symbols-outlined text-4xl text-[#C6A15B]">
                article
              </span>
              <p className="heading-lg text-[#AAA49A]">
                {newsContent.emptyState}
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('Tất cả')
                  setSearchQuery('')
                }}
                className="btn-secondary button-text px-6 py-2.5 !text-xs"
              >
                Đặt lại bộ lọc
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredArticles.map((article, idx) => (
                <motion.article
                  key={article.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                  whileHover={{ y: -10, rotateX: 2, rotateY: -2 }}
                  style={{ transformStyle: 'preserve-3d' }}
                  className="group bg-[#121212] border border-[#C6A15B]/20 rounded-xl overflow-hidden flex flex-col justify-between transition-all duration-500 shadow-xl hover:border-[#C6A15B]/60 hover:shadow-[0_15px_35px_rgba(198,161,91,0.18)] cursor-pointer relative"
                  onClick={() => setActiveArticle(article)}
                >
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={article.featuredImage}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-90"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-[#121212]/20 to-transparent opacity-80" />
                    <span className="absolute top-4 left-4 eyebrow text-[#DEC27B] px-3 py-1 bg-[#0A0A0A]/85 border border-[#C6A15B]/40 rounded-full backdrop-blur-md">
                      {article.category}
                    </span>
                    <span className="absolute bottom-3 right-4 caption text-[#AAA49A] bg-[#0A0A0A]/80 px-2.5 py-0.5 rounded backdrop-blur-sm font-medium">
                      {article.readTime}
                    </span>
                  </div>

                  <div className="p-7 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <div className="eyebrow text-[#C6A15B] mb-2 font-medium">
                        {article.publishedAt}
                      </div>
                      <h3 className="heading-md font-normal text-[#F3EFE7] leading-snug group-hover:text-[#DEC27B] transition-colors line-clamp-2 tracking-[-0.015em]">
                        {article.title}
                      </h3>
                      <p className="body-md text-[#AAA49A] font-normal leading-[1.65] mt-3 line-clamp-3">
                        {article.excerpt}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-[#C6A15B]/15 flex items-center justify-between button-text text-[#C6A15B] group-hover:text-[#DEC27B]">
                      <span>{newsContent.readDetail}</span>
                      <span className="material-symbols-outlined text-sm group-hover:translate-x-1.5 transition-transform">
                        arrow_forward
                      </span>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </section>

        {/* ========================================================================= */}
        {/* 5. NEWSLETTER SUBSCRIPTION WITH GLASSMORPHISM & PARTICLES */}
        {/* ========================================================================= */}
        <section className="py-20 bg-[#0E0E0E] border-t border-[#C6A15B]/20 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(#C6A15B_1px,transparent_1px)] [background-size:24px_24px]" />

          <div className="max-w-4xl mx-auto px-6 text-center space-y-6 relative z-10 font-body">
            <span className="eyebrow text-[#C6A15B]">
              {newsContent.newsletter.eyebrow}
            </span>
            <h2 className="display-lg font-normal text-[#F3EFE7] tracking-[-0.02em]">
              {newsContent.newsletter.title.normal}{' '}
              <span className="text-[#F3EFE7] font-display font-normal">
                {newsContent.newsletter.title.highlight}
              </span>
            </h2>
            <p className="body-lg text-[#AAA49A] font-normal max-w-xl mx-auto">
              {newsContent.newsletter.description}
            </p>

            <form onSubmit={handleSubscribe} className="pt-4 max-w-md mx-auto flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                required
                placeholder={newsContent.newsletter.inputPlaceholder}
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="flex-1 px-5 py-3.5 rounded-sm bg-[#141414] border border-[#C6A15B]/30 text-sm text-[#F3EFE7] placeholder-[#AAA49A]/50 focus:outline-none focus:border-[#C6A15B] body-md font-normal"
              />
              <button
                type="submit"
                className="btn-primary button-text"
              >
                {newsContent.newsletter.buttonText}
              </button>
            </form>

            {newsletterSuccess && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="caption text-[#DEC27B] font-medium pt-2"
              >
                {newsContent.newsletter.successMessage}
              </motion.p>
            )}
          </div>
        </section>
      </main>

      {/* ARTICLE READER MODAL WITH 3D MATERIAL INSPECTOR */}
      <AnimatePresence>
        {activeArticle && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveArticle(null)}
              className="absolute inset-0 bg-[#000000]/85 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full max-w-4xl max-h-[85vh] overflow-y-auto bg-[#101010] border border-[#C6A15B]/40 rounded-xl shadow-2xl p-6 sm:p-10 text-[#F3EFE7] z-10 custom-scrollbar"
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveArticle(null)}
                className="absolute top-5 right-5 w-10 h-10 rounded-full bg-[#1A1A1A] border border-[#C6A15B]/30 flex items-center justify-center text-[#DEC27B] hover:bg-[#C6A15B] hover:text-[#0A0A0A] transition-colors"
                aria-label="Close"
              >
                <span className="material-symbols-outlined">close</span>
              </button>

              {/* Category & Date */}
              <div className="flex flex-wrap items-center gap-3 mb-4 eyebrow text-[#C6A15B]">
                <span className="px-3 py-1 rounded-full bg-[#C6A15B]/20 text-[#DEC27B] border border-[#C6A15B]/40 font-medium uppercase tracking-wider">
                  {activeArticle.category}
                </span>
                <span className="text-[#AAA49A] font-medium">{activeArticle.publishedAt}</span>
                <span className="text-[#AAA49A]">•</span>
                <span className="text-[#AAA49A] font-medium">{activeArticle.readTime}</span>
              </div>

              {/* Title */}
              <h2 className="display-lg font-normal text-[#F3EFE7] leading-tight mb-4 tracking-[-0.02em]">
                {activeArticle.title}
              </h2>

              {activeArticle.subtitle && (
                <p className="body-lg text-[#C6A15B] font-normal mb-6 border-l-2 border-[#C6A15B] pl-4">
                  {activeArticle.subtitle}
                </p>
              )}

              {/* Featured Image */}
              <div className="relative h-72 sm:h-96 rounded-lg overflow-hidden border border-[#C6A15B]/20 mb-8">
                <img
                  src={activeArticle.featuredImage}
                  alt={activeArticle.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Author Info */}
              <div className="flex items-center gap-4 mb-8 pb-6 border-b border-[#C6A15B]/15">
                <img
                  src={activeArticle.author.avatar}
                  alt={activeArticle.author.name}
                  className="w-12 h-12 rounded-full object-cover border border-[#C6A15B]/40"
                />
                <div>
                  <div className="heading-md text-base text-[#F3EFE7] font-normal">
                    {activeArticle.author.name}
                  </div>
                  <div className="caption text-[#AAA49A] font-normal">
                    {activeArticle.author.role}
                  </div>
                </div>
              </div>

              {/* Article Content Paragraphs */}
              <div className="space-y-6 text-[#AAA49A] body-lg leading-relaxed font-normal">
                {activeArticle.content.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>

              {/* Interactive 3D Material / Architectural Inspector */}
              <Article3DMaterialViewer category={activeArticle.category} title={activeArticle.title} />

              {/* Gallery if present */}
              {activeArticle.gallery && activeArticle.gallery.length > 0 && (
                <div className="mt-8 grid grid-cols-2 gap-4">
                  {activeArticle.gallery.map((imgUrl, gIdx) => (
                    <div key={gIdx} className="rounded border border-[#C6A15B]/20 overflow-hidden h-48 sm:h-64">
                      <img src={imgUrl} alt={`Gallery ${gIdx}`} className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              )}

              {/* Footer in modal */}
              <div className="mt-10 pt-6 border-t border-[#C6A15B]/20 flex justify-end font-body">
                <button
                  onClick={() => setActiveArticle(null)}
                  className="btn-primary button-text px-6 py-2.5 !text-xs"
                >
                  {newsContent.closeArticle}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <FooterSection />
    </div>
  )
}

