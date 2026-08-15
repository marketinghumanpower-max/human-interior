import { motion } from 'framer-motion'
import { homeContent } from '@/content/home'

export const ProjectsSection = () => {
  const { projects: projectsText } = homeContent
  const projects = [
    {
      id: 1,
      title: 'The Penthouse Saigon',
      subtitle: 'District 1 · Ho Chi Minh City',
      specs: 'Contemporary Luxury · 320 m²',
      category: 'Grand Living Room',
      image:
        'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1200&auto=format&fit=crop',
      colSpan: 'md:col-span-8',
      height: 'auto',
    },
    {
      id: 2,
      title: 'Carrara Culinary Studio',
      subtitle: 'Thao Dien · Thu Duc City',
      specs: 'Italian Marble · 95 m²',
      category: 'Kitchen & Island',
      image:
        'https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=1200&auto=format&fit=crop',
      colSpan: 'md:col-span-4',
      height: 'auto',
    },
    {
      id: 3,
      title: 'Master Suite Sanctuary',
      subtitle: 'Phu My Hung · District 7',
      specs: 'Quiet Luxury · 110 m²',
      category: 'Master Bedroom',
      image:
        'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?q=80&w=1200&auto=format&fit=crop',
      colSpan: 'md:col-span-4',
      height: 'auto',
    },
    {
      id: 4,
      title: 'Royal Marble Dining',
      subtitle: 'Ba Dinh · Ha Noi',
      specs: 'Neoclassical Fusion · 180 m²',
      category: 'Formal Dining',
      image:
        'https://images.unsplash.com/photo-1617806118233-18e1de247200?q=80&w=1200&auto=format&fit=crop',
      colSpan: 'md:col-span-8',
      height: 'auto',
    },
    {
      id: 5,
      title: 'Bespoke Walk-in Wardrobe',
      subtitle: 'Vinhomes Golden River',
      specs: 'Custom Walnut & Brass · 65 m²',
      category: 'Dressing Room',
      image:
        'https://images.unsplash.com/photo-1558882224-dda166733046?q=80&w=1200&auto=format&fit=crop',
      colSpan: 'md:col-span-6',
      height: 'h-[340px]',
    },
    {
      id: 6,
      title: 'Minimalist Villa Lounge',
      subtitle: 'Son Tra · Da Nang',
      specs: 'Architectural Villa · 450 m²',
      category: 'Private Lounge',
      image:
        'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1200&auto=format&fit=crop',
      colSpan: 'md:col-span-6',
      height: 'h-[340px]',
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 35 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  }

  return (
    <section
      id="projects"
      className="relative z-10 py-28 md:py-36 bg-[#080808]/90 border-t border-[#C6A15B]/15 overflow-hidden"
      data-scene-image="https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=1920&auto=format&fit=crop"
      data-scene-opacity="0.40"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 border-b border-[#C6A15B]/15 pb-8"
        >
          <div>
            <span className="eyebrow text-[#C6A15B] block mb-3">
              {projectsText.eyebrow}
            </span>
            <h2 className="display-lg font-normal text-[#F3EFE7] tracking-[-0.02em] leading-[1.08]">
              {projectsText.title.normal} <span className="font-display font-normal text-[#F3EFE7]">{projectsText.title.highlight}</span>
            </h2>
          </div>
          <a
            href="#contact"
            className="mt-6 md:mt-0 button-text text-[#DEC27B] border-b border-[#C6A15B] pb-1 hover:text-[#F3EFE7] hover:border-[#F3EFE7] transition-all duration-300"
          >
            {projectsText.viewAll}
          </a>
        </motion.div>

        {/* Editorial Bento Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-12 gap-8 auto-rows-[320px] md:auto-rows-[420px]"
        >
          {projects.map((project) => (
            <motion.div
              key={project.id}
              variants={cardVariants}
              className={`${project.colSpan} ${project.height} relative group project-card overflow-hidden border border-[#C6A15B]/22 rounded-none cursor-pointer bg-[#10100F] shadow-2xl`}
            >
              <img
                src={project.image}
                alt={project.title}
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.src =
                    'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1200&auto=format&fit=crop'
                }}
                className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
              />
              <div className="project-overlay absolute inset-0 bg-gradient-to-t from-[#080808]/95 via-[#080808]/40 to-transparent opacity-0 transition-opacity duration-500 flex flex-col justify-end p-8 md:p-10">
                <div className="flex items-center justify-between mb-2 transform translate-y-3 transition-transform duration-300 group-hover:translate-y-0">
                  <span className="eyebrow text-[#C6A15B]">
                    {project.category}
                  </span>
                  <span className="caption text-[#AAA49A]">
                    {project.specs}
                  </span>
                </div>
                <h3 className="heading-md font-normal text-[#F3EFE7] mb-1 transform translate-y-3 transition-transform duration-300 group-hover:translate-y-0 tracking-[-0.015em]">
                  {project.title}
                </h3>
                <p className="caption text-[#AAA49A] transform translate-y-3 transition-transform duration-300 group-hover:translate-y-0">
                  {project.subtitle}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

