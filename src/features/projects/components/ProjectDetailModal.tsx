import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Project, FurnitureItem } from '../data/projectsData'
import { projectsContent } from '@/content/projects'

interface ProjectDetailModalProps {
  project: Project | null
  initialSelectedItem?: FurnitureItem | null
  onClose: () => void
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  initialSelectedItem,
  onClose,
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [selectedFurniture, setSelectedFurniture] = useState<FurnitureItem | null>(null)
  const [quoteSuccess, setQuoteSuccess] = useState<string | null>(null)

  useEffect(() => {
    if (initialSelectedItem) {
      setSelectedFurniture(initialSelectedItem)
    } else {
      setSelectedFurniture(null)
    }
  }, [initialSelectedItem, project])

  if (!project) return null

  const activeImage = project.gallery[activeImageIndex] || project.image

  const handleRequestQuote = (itemName?: string) => {
    const target = itemName || project.title
    setQuoteSuccess(`Đã gửi yêu cầu tư vấn báo giá cho "${target}". Chuyên viên Human Interior sẽ liên hệ ngay!`)
    setTimeout(() => {
      setQuoteSuccess(null)
    }, 4000)
  }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#040404]/90 backdrop-blur-xl z-0"
        />

        {/* Modal Window Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 w-full max-w-5xl bg-[#0F0F0E] border border-[#C6A15B]/40 shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden my-auto max-h-[92vh] flex flex-col"
        >
          {/* Top Bar with Title & Close Button */}
          <div className="flex justify-between items-center p-5 md:p-6 border-b border-[#C6A15B]/20 bg-[#141412] font-body">
            <div>
              <span className="font-body text-[11px] font-medium text-[#C6A15B] uppercase tracking-[0.22em] block mb-1">
                {project.categoryLabel} • {project.estimatedPrice}
              </span>
              <h2 className="font-display text-2xl md:text-3xl font-normal text-[#F3EFE7] tracking-[-0.02em]">
                {project.title}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full border border-[#C6A15B]/30 flex items-center justify-center text-[#F3EFE7] hover:border-[#C6A15B] hover:bg-[#C6A15B]/10 transition-colors"
              aria-label="Close"
            >
              ✕
            </button>
          </div>

          {/* Success Toast Notification */}
          <AnimatePresence>
            {quoteSuccess && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-[#C6A15B] text-[#0A0A0A] text-xs font-body font-medium p-3 text-center border-b border-[#DEC27B]"
              >
                ✓ {quoteSuccess}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Modal Body - Scrollable */}
          <div className="p-6 md:p-8 overflow-y-auto space-y-8 flex-1 scrollbar-thin font-body">
            {/* Main Active Image Showcase with Interactive Hotspots */}
            <div className="relative h-[320px] sm:h-[450px] w-full bg-[#181816] border border-[#C6A15B]/20 overflow-hidden group">
              <img
                src={activeImage}
                alt={project.title}
                className="w-full h-full object-cover transition-all duration-500"
              />

              {/* Hotspot Pins overlaid on Main Photo */}
              {activeImageIndex === 0 &&
                project.furnitureItems &&
                project.furnitureItems.map((item) => {
                  const isSelected = selectedFurniture?.id === item.id
                  return (
                    <div
                      key={item.id}
                      style={{ top: `${item.hotspot.y}%`, left: `${item.hotspot.x}%` }}
                      className="absolute z-20 transform -translate-x-1/2 -translate-y-1/2"
                    >
                      <button
                        type="button"
                        onClick={() => setSelectedFurniture(item)}
                        className={`relative group/pin flex items-center justify-center p-2 focus:outline-none transition-transform ${
                          isSelected ? 'scale-125' : 'hover:scale-110'
                        }`}
                      >
                        <span className="animate-ping absolute inline-flex h-8 w-8 rounded-full bg-[#C6A15B]/60 opacity-75" />
                        <span
                          className={`relative inline-flex rounded-full h-5 w-5 border-2 border-[#0A0A0A] shadow-[0_0_15px_rgba(198,161,91,0.9)] items-center justify-center text-[9px] font-bold ${
                            isSelected ? 'bg-[#DEC27B] text-[#0A0A0A]' : 'bg-[#C6A15B] text-[#0A0A0A]'
                          }`}
                        >
                          📍
                        </span>
                      </button>
                    </div>
                  )
                })}
            </div>

            {/* Gallery Thumbnails */}
            {project.gallery.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
                {project.gallery.map((imgUrl, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-24 h-16 flex-shrink-0 border transition-all duration-300 overflow-hidden ${
                      activeImageIndex === idx
                        ? 'border-[#C6A15B] ring-2 ring-[#C6A15B]/40 opacity-100'
                        : 'border-[#C6A15B]/20 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={imgUrl} alt={`Gallery item ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Shoppable Furniture Products in Room Section */}
            {project.furnitureItems && project.furnitureItems.length > 0 && (
              <div className="bg-[#141412] border border-[#C6A15B]/25 p-5 md:p-6 space-y-4 font-body">
                <div className="flex items-center justify-between border-b border-[#C6A15B]/15 pb-3">
                  <div>
                    <span className="font-body text-[11px] font-medium uppercase text-[#C6A15B] tracking-[0.22em] block">
                      {projectsContent.modal.shopLookEyebrow}
                    </span>
                    <h3 className="font-display text-xl font-normal text-[#F3EFE7] tracking-[-0.015em]">
                      {projectsContent.modal.shopLookTitle}
                    </h3>
                  </div>
                  <span className="font-body text-xs text-[#AAA49A] font-normal">
                    {project.furnitureItems.length} {projectsContent.modal.availableProductsSuffix}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {project.furnitureItems.map((item) => {
                    const isSelected = selectedFurniture?.id === item.id
                    return (
                      <div
                        key={item.id}
                        onClick={() => setSelectedFurniture(item)}
                        className={`p-4 border transition-all duration-300 cursor-pointer flex gap-4 items-center bg-[#191917] ${
                          isSelected
                            ? 'border-[#C6A15B] ring-1 ring-[#C6A15B]/50 bg-[#1E1E1C]'
                            : 'border-[#C6A15B]/20 hover:border-[#C6A15B]/50'
                        }`}
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-20 h-20 object-cover border border-[#C6A15B]/30 flex-shrink-0"
                        />
                        <div className="flex-1 overflow-hidden">
                          <span className="font-body text-[11px] uppercase font-medium text-[#C6A15B] tracking-[0.2em] block">
                            {item.categoryLabel}
                          </span>
                          <h4 className="font-display text-sm font-normal text-[#F3EFE7] truncate mb-1 tracking-[-0.01em]">
                            {item.name}
                          </h4>
                          <p className="font-body text-[11px] text-[#AAA49A] line-clamp-1 mb-1.5 font-normal">
                            {item.material}
                          </p>
                          <div className="flex items-center justify-between">
                            <span className="font-display text-sm font-normal text-[#DEC27B]">
                              {item.price}
                            </span>
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                handleRequestQuote(item.name)
                              }}
                              className="btn-primary px-3 py-1 text-[11px]"
                            >
                              {projectsContent.card.quickQuote}
                            </button>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Specs Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 bg-[#161614] border border-[#C6A15B]/15 font-body">
              <div>
                <span className="font-body text-[11px] text-[#C6A15B] uppercase tracking-[0.22em] block mb-1 font-medium">
                  {projectsContent.modal.location}
                </span>
                <p className="font-body text-xs text-[#F3EFE7] font-medium truncate">{project.location}</p>
              </div>
              <div>
                <span className="font-body text-[11px] text-[#C6A15B] uppercase tracking-[0.22em] block mb-1 font-medium">
                  {projectsContent.modal.area}
                </span>
                <p className="font-body text-xs text-[#F3EFE7] font-medium">{project.area}</p>
              </div>
              <div>
                <span className="font-body text-[11px] text-[#C6A15B] uppercase tracking-[0.22em] block mb-1 font-medium">
                  {projectsContent.modal.style}
                </span>
                <p className="font-body text-xs text-[#F3EFE7] font-medium">{project.style || 'Luxury Modern'}</p>
              </div>
              <div>
                <span className="font-body text-[11px] text-[#C6A15B] uppercase tracking-[0.22em] block mb-1 font-medium">
                  {projectsContent.modal.architect}
                </span>
                <p className="font-body text-xs text-[#F3EFE7] font-medium truncate">
                  {project.architect || 'Human Interior Team'}
                </p>
              </div>
            </div>

            {/* Description & Story */}
            <div>
              <h3 className="font-display text-xl font-normal text-[#DEC27B] mb-3 border-b border-[#C6A15B]/15 pb-2 tracking-[-0.015em]">
                {projectsContent.modal.conceptTitle}
              </h3>
              <p className="font-body text-sm text-[#AAA49A] font-normal leading-[1.65]">
                {project.description}
              </p>
            </div>

            {/* Project Highlights */}
            {project.highlights.length > 0 && (
              <div>
                <h3 className="font-display text-xl font-normal text-[#DEC27B] mb-3 border-b border-[#C6A15B]/15 pb-2 tracking-[-0.015em]">
                  {projectsContent.modal.highlightsTitle}
                </h3>
                <ul className="space-y-2">
                  {project.highlights.map((hl, i) => (
                    <li key={i} className="flex items-start gap-3 text-xs font-body text-[#F3EFE7] font-normal leading-[1.65]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C6A15B] mt-1.5 flex-shrink-0" />
                      <span>{hl}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Materials Used */}
            {project.materials.length > 0 && (
              <div>
                <h3 className="font-display text-xl font-normal text-[#DEC27B] mb-3 border-b border-[#C6A15B]/15 pb-2 tracking-[-0.015em]">
                  {projectsContent.modal.materialsTitle}
                </h3>
                <div className="flex flex-wrap gap-2 font-body">
                  {project.materials.map((mat, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-[#1A1A18] border border-[#C6A15B]/25 text-[#DEC27B] text-[11px] font-body font-medium"
                    >
                      {mat}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Footer CTA */}
          <div className="p-5 md:p-6 bg-[#141412] border-t border-[#C6A15B]/20 flex flex-col sm:flex-row items-center justify-between gap-4 font-body">
            <p className="font-body text-xs text-[#AAA49A] font-normal">
              {projectsContent.modal.ctaQuestion}
            </p>
            <button
              onClick={() => handleRequestQuote()}
              className="btn-primary uppercase tracking-[0.12em] whitespace-nowrap"
            >
              {projectsContent.modal.ctaButton}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
