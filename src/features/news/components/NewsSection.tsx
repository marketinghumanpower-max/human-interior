import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { newsArticlesData } from '../data/newsData'
import { Article3DMaterialViewer } from './Article3DMaterialViewer'
import type { NewsArticle } from '../types'

export const NewsSection = () => {
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null)
  const featuredArticles = newsArticlesData.slice(0, 3)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 35 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut' as const,
      },
    },
  }

  return (
    <section
      id="news"
      className="py-28 md:py-36 relative z-10 bg-[#0A0A0A]/90 overflow-hidden border-t border-[#C6A15B]/15"
      data-scene-image="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1920&auto=format&fit=crop"
      data-scene-opacity="0.30"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 space-y-3"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#C6A15B]/30 bg-[#C6A15B]/10 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-[#C6A15B] animate-pulse" />
            <h2 className="font-body text-[11px] text-[#C6A15B] uppercase tracking-[0.22em] font-medium">
              TIN TỨC &amp; TẠP CHÍ NỘI THẤT
            </h2>
          </div>
          <h3 className="font-display text-3xl md:text-5xl font-normal text-[#F3EFE7] tracking-[-0.02em]">
            Cập Nhật Xu Hướng <span className="text-[#C6A15B] font-display font-normal">&amp; Di Sản</span>
          </h3>
          <p className="font-body text-sm md:text-base text-[#AAA49A] max-w-xl mx-auto font-normal leading-[1.65]">
            Khám phá những góc nhìn kiến trúc chuyên sâu, câu chuyện dự án mới nhất và cảm hứng thiết kế độc bản.
          </p>
        </motion.div>

        {/* News Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10"
        >
          {featuredArticles.map((article) => (
            <motion.article
              key={article.id}
              variants={cardVariants}
              whileHover={{ y: -10, rotateX: 2, rotateY: -2 }}
              style={{ transformStyle: 'preserve-3d' }}
              className="group bg-[#121212] border border-[#C6A15B]/20 rounded-xl overflow-hidden flex flex-col justify-between transition-all duration-500 shadow-xl hover:border-[#C6A15B]/60 hover:shadow-[0_15px_35px_rgba(198,161,91,0.18)] cursor-pointer"
              onClick={() => setSelectedArticle(article)}
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={article.featuredImage}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-[#121212]/20 to-transparent opacity-80" />
                <span className="absolute top-4 left-4 font-body text-[11px] uppercase font-medium tracking-[0.2em] text-[#DEC27B] px-3 py-1 bg-[#0A0A0A]/85 border border-[#C6A15B]/40 rounded-full backdrop-blur-md">
                  {article.category}
                </span>
                <span className="absolute bottom-3 right-4 font-body text-[11px] text-[#AAA49A] bg-[#0A0A0A]/80 px-2.5 py-0.5 rounded backdrop-blur-sm font-medium">
                  {article.readTime}
                </span>
              </div>

              <div className="p-7 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="text-xs text-[#C6A15B] font-body mb-2 font-medium">
                    {article.publishedAt}
                  </div>
                  <h4 className="font-display text-xl font-normal text-[#F3EFE7] leading-snug group-hover:text-[#DEC27B] transition-colors line-clamp-2 tracking-[-0.015em]">
                    {article.title}
                  </h4>
                  <p className="font-body text-sm text-[#AAA49A] font-normal leading-[1.65] mt-3 line-clamp-3">
                    {article.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#C6A15B]/15 flex items-center justify-between font-body text-xs font-medium text-[#C6A15B] uppercase tracking-[0.12em] group-hover:text-[#DEC27B]">
                  <span>Đọc Chi Tiết</span>
                  <span className="material-symbols-outlined text-sm group-hover:translate-x-1.5 transition-transform">
                    arrow_forward
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>

        {/* View All News Button */}
        <div className="mt-14 text-center">
          <Link
            to="/news"
            className="btn-primary"
          >
            <span>XEM TẤT CẢ TIN TỨC &amp; BÀI VIẾT</span>
            <span className="material-symbols-outlined text-base">east</span>
          </Link>
        </div>
      </div>

      {/* ARTICLE READER MODAL */}
      <AnimatePresence>
        {selectedArticle && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedArticle(null)}
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
                onClick={() => setSelectedArticle(null)}
                className="absolute top-5 right-5 w-10 h-10 rounded-full bg-[#1A1A1A] border border-[#C6A15B]/30 flex items-center justify-center text-[#DEC27B] hover:bg-[#C6A15B] hover:text-[#0A0A0A] transition-colors"
                aria-label="Close"
              >
                <span className="material-symbols-outlined">close</span>
              </button>

              {/* Category & Date */}
              <div className="flex flex-wrap items-center gap-3 mb-4 text-xs font-body">
                <span className="px-3 py-1 rounded-full bg-[#C6A15B]/20 text-[#DEC27B] border border-[#C6A15B]/40 font-medium uppercase tracking-wider">
                  {selectedArticle.category}
                </span>
                <span className="text-[#AAA49A] font-medium">{selectedArticle.publishedAt}</span>
                <span className="text-[#AAA49A]">•</span>
                <span className="text-[#AAA49A] font-medium">{selectedArticle.readTime}</span>
              </div>

              {/* Title */}
              <h2 className="font-display text-2xl sm:text-4xl font-normal text-[#F3EFE7] leading-tight mb-4 tracking-[-0.02em]">
                {selectedArticle.title}
              </h2>

              {selectedArticle.subtitle && (
                <p className="font-body text-base sm:text-lg text-[#C6A15B] font-normal mb-6 border-l-2 border-[#C6A15B] pl-4">
                  {selectedArticle.subtitle}
                </p>
              )}

              {/* Featured Image */}
              <div className="relative h-72 sm:h-96 rounded-lg overflow-hidden border border-[#C6A15B]/20 mb-8">
                <img
                  src={selectedArticle.featuredImage}
                  alt={selectedArticle.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Author Info */}
              <div className="flex items-center gap-4 mb-8 pb-6 border-b border-[#C6A15B]/15">
                <img
                  src={selectedArticle.author.avatar}
                  alt={selectedArticle.author.name}
                  className="w-12 h-12 rounded-full object-cover border border-[#C6A15B]/40"
                />
                <div>
                  <div className="font-display text-base text-[#F3EFE7] font-normal">
                    {selectedArticle.author.name}
                  </div>
                  <div className="font-body text-xs text-[#AAA49A] font-normal">
                    {selectedArticle.author.role}
                  </div>
                </div>
              </div>

              {/* Article Content Paragraphs */}
              <div className="space-y-6 text-[#AAA49A] font-body text-base leading-relaxed font-normal">
                {selectedArticle.content.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>

              {/* Interactive 3D Material / Architectural Inspector */}
              <Article3DMaterialViewer category={selectedArticle.category} title={selectedArticle.title} />

              {/* Gallery if present */}
              {selectedArticle.gallery && selectedArticle.gallery.length > 0 && (
                <div className="mt-8 grid grid-cols-2 gap-4">
                  {selectedArticle.gallery.map((imgUrl, gIdx) => (
                    <div key={gIdx} className="rounded border border-[#C6A15B]/20 overflow-hidden h-48 sm:h-64">
                      <img src={imgUrl} alt={`Gallery ${gIdx}`} className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              )}

              {/* Footer CTA in modal */}
              <div className="mt-10 pt-6 border-t border-[#C6A15B]/20 flex justify-between items-center font-body">
                <Link
                  to="/news"
                  onClick={() => setSelectedArticle(null)}
                  className="text-xs font-medium uppercase tracking-wider text-[#C6A15B] hover:text-[#DEC27B]"
                >
                  Xem thêm nhiều bài viết khác →
                </Link>
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="btn-secondary px-5 py-2 text-xs"
                >
                  Đóng
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  )
}

