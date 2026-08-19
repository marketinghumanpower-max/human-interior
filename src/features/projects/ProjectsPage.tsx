import React, { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PROJECTS_DATA, PROJECT_CATEGORIES, FURNITURE_CATEGORIES } from './data/projectsData'
import type { Project, FurnitureItem } from './data/projectsData'
import { ProjectsHero3D } from './components/ProjectsHero3D'
import { ProjectsFilterBar } from './components/ProjectsFilterBar'
import { ProjectCard3D } from './components/ProjectCard3D'
import { ProjectDetailModal } from './components/ProjectDetailModal'
import { FooterSection } from '../homepage/components/FooterSection'
import { projectsContent } from '@/content/projects'

export const ProjectsPage: React.FC = () => {
  const [viewMode, setViewMode] = useState<'projects' | 'furniture'>('projects')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [sortBy, setSortBy] = useState<string>('featured')
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [selectedFurnitureItem, setSelectedFurnitureItem] = useState<FurnitureItem | null>(null)
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  // Calculate project & furniture category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {}

    if (viewMode === 'projects') {
      counts['all'] = PROJECTS_DATA.length
      PROJECT_CATEGORIES.forEach((cat) => {
        if (cat.id !== 'all') {
          counts[cat.id] = PROJECTS_DATA.filter((p) => p.category === cat.id).length
        }
      })
    } else {
      // Flatten all furniture items
      const allFurniture: FurnitureItem[] = []
      PROJECTS_DATA.forEach((p) => {
        if (p.furnitureItems) allFurniture.push(...p.furnitureItems)
      })

      counts['all_furniture'] = allFurniture.length
      FURNITURE_CATEGORIES.forEach((cat) => {
        if (cat.id !== 'all_furniture') {
          counts[cat.id] = allFurniture.filter((f) => f.category === cat.id).length
        }
      })
    }

    return counts
  }, [viewMode])

  // Filtered Projects list
  const filteredProjects = useMemo(() => {
    let list = PROJECTS_DATA.filter((project) => {
      const matchesCategory = selectedCategory === 'all' || project.category === selectedCategory
      const query = searchQuery.trim().toLowerCase()
      const matchesSearch =
        !query ||
        project.title.toLowerCase().includes(query) ||
        project.subtitle.toLowerCase().includes(query) ||
        project.location.toLowerCase().includes(query) ||
        (project.style && project.style.toLowerCase().includes(query))

      return matchesCategory && matchesSearch
    })

    // Sorting logic
    if (sortBy === 'price-asc') {
      list = [...list].sort((a, b) => {
        const pA = parseInt(a.estimatedPrice.replace(/\D/g, '')) || 0
        const pB = parseInt(b.estimatedPrice.replace(/\D/g, '')) || 0
        return pA - pB
      })
    } else if (sortBy === 'price-desc') {
      list = [...list].sort((a, b) => {
        const pA = parseInt(a.estimatedPrice.replace(/\D/g, '')) || 0
        const pB = parseInt(b.estimatedPrice.replace(/\D/g, '')) || 0
        return pB - pA
      })
    }

    return list
  }, [selectedCategory, searchQuery, sortBy])

  // Flattened & Filtered Furniture Items list
  const filteredFurniture = useMemo(() => {
    const allFurnitureWithParent: { item: FurnitureItem; project: Project }[] = []

    PROJECTS_DATA.forEach((p) => {
      if (p.furnitureItems) {
        p.furnitureItems.forEach((f) => {
          allFurnitureWithParent.push({ item: f, project: p })
        })
      }
    })

    let list = allFurnitureWithParent.filter(({ item }) => {
      const matchesCategory = selectedCategory === 'all_furniture' || item.category === selectedCategory
      const query = searchQuery.trim().toLowerCase()
      const matchesSearch =
        !query ||
        item.name.toLowerCase().includes(query) ||
        item.material.toLowerCase().includes(query) ||
        (item.description && item.description.toLowerCase().includes(query))

      return matchesCategory && matchesSearch
    })

    // Sorting logic for furniture
    if (sortBy === 'price-asc') {
      list = [...list].sort((a, b) => {
        const pA = parseInt(a.item.price.replace(/\D/g, '')) || 0
        const pB = parseInt(b.item.price.replace(/\D/g, '')) || 0
        return pA - pB
      })
    } else if (sortBy === 'price-desc') {
      list = [...list].sort((a, b) => {
        const pA = parseInt(a.item.price.replace(/\D/g, '')) || 0
        const pB = parseInt(b.item.price.replace(/\D/g, '')) || 0
        return pB - pA
      })
    }

    return list
  }, [selectedCategory, searchQuery, sortBy])

  const handleSelectCard = (project: Project, item?: FurnitureItem) => {
    setSelectedProject(project)
    setSelectedFurnitureItem(item || null)
  }

  const handleQuickQuote = (name: string) => {
    setToastMessage(`Đã thêm sản phẩm "${name}" vào danh sách nhận báo giá!`)
    setTimeout(() => setToastMessage(null), 4000)
  }

  const totalDisplayed = viewMode === 'projects' ? filteredProjects.length : filteredFurniture.length

  return (
    <div className="min-h-screen bg-[#080808] text-[#F3EFE7] font-body overflow-x-hidden">
      {/* Toast Floating Notification */}

      {/* Toast Floating Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-24 right-6 z-50 bg-[#C6A15B] text-[#0A0A0A] px-5 py-3 shadow-2xl font-body text-xs font-medium border border-[#DEC27B] flex items-center gap-2"
          >
            <span>✨</span>
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3D Interactive Hero Canvas Section */}
      <ProjectsHero3D />

      {/* Main Filter & Grid Container */}
      <section className="py-16 md:py-24 relative z-10 bg-[#080808]">
        {/* Search, View Mode Switcher & Category Filter Bar */}
        <ProjectsFilterBar
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedCategory={selectedCategory}
          onCategorySelect={setSelectedCategory}
          categoryCounts={categoryCounts}
          totalDisplayed={totalDisplayed}
          sortBy={sortBy}
          onSortChange={setSortBy}
        />

        {/* Content Showcase Grid */}
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {viewMode === 'projects' ? (
            /* Mode 1: Projects / Interior Rooms Grid */
            filteredProjects.length > 0 ? (
              <motion.div
                layout
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                <AnimatePresence mode="popLayout">
                  {filteredProjects.map((project) => (
                    <ProjectCard3D
                      key={project.id}
                      project={project}
                      onSelect={handleSelectCard}
                    />
                  ))}
                </AnimatePresence>
              </motion.div>
            ) : (
              /* Empty State Projects */
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-20 bg-[#0D0D0C] border border-[#C6A15B]/20 p-8 max-w-lg mx-auto font-body"
              >
                <div className="text-[#C6A15B] text-4xl mb-4">🔍</div>
                <h3 className="heading-md font-normal text-[#F3EFE7] mb-2 tracking-[-0.015em]">
                  {projectsContent.filterBar.emptyProjects.title}
                </h3>
                <p className="body-md text-[#AAA49A] mb-6 font-normal">
                  {projectsContent.filterBar.emptyProjects.description}
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('')
                    setSelectedCategory('all')
                  }}
                  className="btn-secondary button-text px-6 py-2.5 !text-xs"
                >
                  ĐẶT LẠI BỘ LỌC
                </button>
              </motion.div>
            )
          ) : (
            /* Mode 2: Furniture Product E-commerce Catalog Grid */
            filteredFurniture.length > 0 ? (
              <motion.div
                layout
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                <AnimatePresence mode="popLayout">
                  {filteredFurniture.map(({ item, project }) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.4 }}
                      className="group bg-[#0E0E0D] border border-[#C6A15B]/25 hover:border-[#C6A15B] overflow-hidden flex flex-col justify-between shadow-2xl transition-all duration-300"
                    >
                      {/* Product Image Box */}
                      <div className="relative h-64 w-full bg-[#151513] overflow-hidden cursor-pointer" onClick={() => handleSelectCard(project, item)}>
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        {/* Category & Stock Tag */}
                        <div className="absolute top-3 left-3 bg-[#0A0A0A]/80 backdrop-blur-md border border-[#C6A15B]/30 text-[#DEC27B] eyebrow px-2.5 py-1">
                          {item.categoryLabel}
                        </div>
                        {item.originalPrice && (
                          <div className="absolute top-3 right-3 bg-[#C6A15B] text-[#0A0A0A] eyebrow px-2 py-0.5">
                            {projectsContent.card.dealTag}
                          </div>
                        )}
                      </div>

                      {/* Product Content Details */}
                      <div className="p-5 flex-1 flex flex-col justify-between font-body">
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="eyebrow text-[#C6A15B]">
                              {projectsContent.card.spaceLabelPrefix} {project.title}
                            </span>
                          </div>

                          <h3
                            onClick={() => handleSelectCard(project, item)}
                            className="card-title text-lg text-[#F3EFE7] group-hover:text-[#DEC27B] transition-colors cursor-pointer line-clamp-1 mb-1.5"
                          >
                            {item.name}
                          </h3>

                          <p className="body-md text-xs text-[#AAA49A] font-normal line-clamp-2 mb-4 leading-relaxed">
                            {item.material} {item.dimensions ? `• kích thước: ${item.dimensions}` : ''}
                          </p>
                        </div>

                        {/* Price & Action Button */}
                        <div className="pt-3 border-t border-[#C6A15B]/15 flex items-center justify-between">
                          <div>
                            <span className="font-display text-base font-medium text-[#DEC27B] block">
                              {item.price}
                            </span>
                            {item.originalPrice && (
                              <span className="caption text-[#888277] line-through block font-normal">
                                {item.originalPrice}
                              </span>
                            )}
                          </div>

                          <button
                            onClick={() => handleQuickQuote(item.name)}
                            className="btn-primary button-text px-4 py-2 !text-xs"
                          >
                            {projectsContent.card.quickQuote}
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            ) : (
              /* Empty State Furniture */
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-20 bg-[#0D0D0C] border border-[#C6A15B]/20 p-8 max-w-lg mx-auto font-body"
              >
                <div className="text-[#C6A15B] text-4xl mb-4">🛍️</div>
                <h3 className="heading-md text-[#F3EFE7] mb-2">
                  {projectsContent.filterBar.emptyFurniture.title}
                </h3>
                <p className="body-md text-[#AAA49A] mb-6 font-normal">
                  {projectsContent.filterBar.emptyFurniture.description}
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('')
                    setSelectedCategory('all_furniture')
                  }}
                  className="btn-secondary button-text px-6 py-2.5 !text-xs"
                >
                  ĐẶT LẠI BỘ LỌC
                </button>
              </motion.div>
            )
          )}
        </div>
      </section>

      {/* Call To Action Banner Section */}
      <section className="py-20 bg-[#0A0A0A] border-t border-b border-[#C6A15B]/20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(198,161,91,0.15),transparent_70%)] pointer-events-none" />
        <div className="max-w-4xl mx-auto text-center px-6 relative z-10 font-body">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="eyebrow text-[#EDDAA2] text-xs font-semibold block mb-3 uppercase tracking-[0.18em]">
              {projectsContent.ctaBanner.eyebrow}
            </span>
            <h2 className="display-lg text-[#F5F1E8] mb-6 leading-tight tracking-[-0.005em]">
              {projectsContent.ctaBanner.title.normal} <span className="text-[#EDDAA2]">{projectsContent.ctaBanner.title.highlight}</span>?
            </h2>
            <p className="body-lg text-[#D1D5DB] font-normal max-w-2xl mx-auto mb-8 leading-relaxed text-base md:text-lg">
              {projectsContent.ctaBanner.description}
            </p>
            <a
              href="/#contact"
              className="btn-primary button-text inline-flex items-center gap-3 font-semibold"
            >
              <span>{projectsContent.ctaBanner.action}</span>
              <span>→</span>
            </a>
          </motion.div>
        </div>
      </section>

      {/* Lightbox Detail Modal */}
      <ProjectDetailModal
        project={selectedProject}
        initialSelectedItem={selectedFurnitureItem}
        onClose={() => {
          setSelectedProject(null)
          setSelectedFurnitureItem(null)
        }}
      />

      {/* Footer Section */}
      <FooterSection />
    </div>
  )
}
