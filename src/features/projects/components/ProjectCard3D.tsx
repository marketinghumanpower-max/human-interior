import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Project, FurnitureItem } from '../data/projectsData'
import { projectsContent } from '@/content/projects'

interface ProjectCard3DProps {
  project: Project
  onSelect: (project: Project, item?: FurnitureItem) => void
}

export const ProjectCard3D: React.FC<ProjectCard3DProps> = ({ project, onSelect }) => {
  const [isHovered, setIsHovered] = useState(false)
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)
  const [activeHotspot, setActiveHotspot] = useState<FurnitureItem | null>(null)
  const [activeImgIndex, setActiveImgIndex] = useState(0)
  const { card: cardText } = projectsContent

  const galleryImages = [
    project.image,
    ...(project.furnitureItems ? project.furnitureItems.map((item: FurnitureItem) => item.image) : []),
  ].filter(Boolean)

  const currentImage = galleryImages[activeImgIndex] || project.image

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget.getBoundingClientRect()
    const cardWidth = card.width
    const cardHeight = card.height
    const centerX = card.left + cardWidth / 2
    const centerY = card.top + cardHeight / 2
    const mouseX = e.clientX - centerX
    const mouseY = e.clientY - centerY

    const rX = (mouseY / (cardHeight / 2)) * -8
    const rY = (mouseX / (cardWidth / 2)) * 8

    setRotateX(rX)
    setRotateY(rY)
  }

  const handleMouseEnter = () => setIsHovered(true)

  const handleMouseLeave = () => {
    setIsHovered(false)
    setRotateX(0)
    setRotateY(0)
    setActiveHotspot(null)
  }

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation()
    setActiveImgIndex((prev) => (prev + 1) % galleryImages.length)
  }

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation()
    setActiveImgIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length)
  }

  return (
    <div
      className="perspective-1000 w-full h-full"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        style={{
          transform: isHovered
            ? `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(12px)`
            : 'rotateX(0deg) rotateY(0deg) translateZ(0px)',
          transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.5s ease-out',
        }}
        onClick={() => onSelect(project)}
        className="group bg-[#0F0F0E] border border-[#C6A15B]/25 hover:border-[#C6A15B] transition-all duration-500 overflow-hidden shadow-2xl relative flex flex-col justify-between cursor-pointer h-full"
      >
        {/* Top Image Showcase Area */}
        <div className="relative h-64 sm:h-72 w-full bg-[#181816] overflow-hidden">
          {/* Main Image with Gallery Transition */}
          <AnimatePresence mode="wait">
            <motion.img
              key={currentImage}
              src={currentImage}
              alt={project.title}
              initial={{ opacity: 0.8, scale: 1 }}
              animate={{ opacity: 1, scale: isHovered ? 1.05 : 1 }}
              exit={{ opacity: 0.8 }}
              transition={{ duration: 0.5 }}
              className="w-full h-full object-cover"
            />
          </AnimatePresence>

          {/* Dark Vignette Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0E] via-transparent to-[#0F0F0E]/40" />

          {/* Featured & Category Badges */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-2 z-10 font-body">
            {project.isFeatured && (
              <span className="font-body text-[10px] font-medium text-[#0A0A0A] bg-[#C6A15B] px-2.5 py-0.5 uppercase tracking-[0.14em] shadow-md">
                {cardText.featuredBadge}
              </span>
            )}
            <span className="font-body text-[10px] font-medium text-[#DEC27B] bg-[#0A0A0A]/80 backdrop-blur-md border border-[#C6A15B]/30 px-2.5 py-0.5 uppercase tracking-[0.12em]">
              {project.categoryLabel}
            </span>
          </div>

          {/* Furniture Count Tag */}
          {project.furnitureItems && project.furnitureItems.length > 0 && (
            <div className="absolute top-3 right-3 z-10 bg-[#0A0A0A]/85 backdrop-blur-md border border-[#C6A15B]/30 text-[#C6A15B] text-[10px] font-body px-2.5 py-0.5 rounded-full flex items-center gap-1 font-medium">
              <span>🛍️</span>
              <span>{project.furnitureItems.length} {cardText.furnitureBadgeSuffix}</span>
            </div>
          )}

          {/* Hotspot Interactive Markers */}
          {project.furnitureItems &&
            project.furnitureItems.map((item: FurnitureItem) => {
              if (!item.hotspot) return null
              const isHotspotActive = activeHotspot?.id === item.id

              return (
                <div
                  key={item.id}
                  style={{
                    top: `${item.hotspot.y}%`,
                    left: `${item.hotspot.x}%`,
                  }}
                  onMouseEnter={(e) => {
                    e.stopPropagation()
                    setActiveHotspot(item)
                  }}
                  onClick={(e) => {
                    e.stopPropagation()
                    onSelect(project, item)
                  }}
                  className="absolute z-20 -translate-x-1/2 -translate-y-1/2 cursor-pointer group/hotspot"
                >
                  {/* Glowing Marker Circle */}
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isHotspotActive
                        ? 'bg-[#C6A15B] text-[#0A0A0A] scale-125 shadow-[0_0_15px_#C6A15B]'
                        : 'bg-[#0A0A0A]/90 border border-[#C6A15B] text-[#DEC27B] hover:bg-[#C6A15B] hover:text-[#0A0A0A]'
                    }`}
                  >
                    <span className="text-[10px] font-bold">+</span>
                  </div>

                  {/* Hotspot Hover Card Tooltip */}
                  <AnimatePresence>
                    {isHotspotActive && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 5, scale: 0.95 }}
                        className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 bg-[#0A0A0A]/95 border border-[#C6A15B]/50 p-2.5 shadow-2xl backdrop-blur-md z-30 pointer-events-none font-body"
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-10 h-10 object-cover border border-[#C6A15B]/30"
                          />
                          <div className="overflow-hidden">
                            <p className="font-display text-xs text-[#F3EFE7] truncate font-normal">
                              {item.name}
                            </p>
                            <p className="font-body text-[10px] text-[#DEC27B] font-medium">
                              {item.price}
                            </p>
                          </div>
                        </div>
                        <span className="block text-[9px] font-body text-[#AAA49A] italic text-center border-t border-[#C6A15B]/20 pt-1 font-normal">
                          {cardText.hotspotHint}
                        </span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}

          {/* Gallery Navigation Controls */}
          {galleryImages.length > 1 && isHovered && (
            <div className="absolute inset-x-3 top-1/2 -translate-y-1/2 flex justify-between items-center pointer-events-none z-10">
              <button
                onClick={handlePrevImage}
                className="w-7 h-7 rounded-full bg-[#0A0A0A]/80 border border-[#C6A15B]/40 text-[#DEC27B] hover:bg-[#C6A15B] hover:text-[#0A0A0A] flex items-center justify-center transition-colors pointer-events-auto shadow-md"
              >
                ‹
              </button>
              <button
                onClick={handleNextImage}
                className="w-7 h-7 rounded-full bg-[#0A0A0A]/80 border border-[#C6A15B]/40 text-[#DEC27B] hover:bg-[#C6A15B] hover:text-[#0A0A0A] flex items-center justify-center transition-colors pointer-events-auto shadow-md"
              >
                ›
              </button>
            </div>
          )}
        </div>

        {/* Bottom Details Content Area */}
        <div className="p-6 flex-1 flex flex-col justify-between space-y-4 font-body">
          <div>
            <div className="flex items-center justify-between text-xs text-[#C6A15B] font-body tracking-[0.14em] uppercase mb-2 font-medium">
              <span>{project.categoryLabel}</span>
              <span>{project.area}</span>
            </div>

            <h3 className="card-title text-xl sm:text-2xl text-[#F3EFE7] group-hover:text-[#DEC27B] transition-colors mb-2 line-clamp-1">
              {project.title}
            </h3>

            <p className="font-body text-xs text-[#AAA49A] font-normal line-clamp-2 leading-relaxed">
              {project.subtitle}
            </p>
          </div>

          {/* Quick Action Footer Bar */}
          <div className="pt-3 border-t border-[#C6A15B]/15 flex items-center justify-between gap-2">
            <span className="font-body text-[11px] text-[#888277] truncate max-w-[140px] font-normal">
              {project.location}
            </span>
            
            <div className="flex items-center gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onSelect(project)
                }}
                className="btn-primary px-3 py-1.5 text-[11px]"
              >
                {cardText.quoteAction}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
