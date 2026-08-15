import { SceneProvider } from './SceneContext'
import { GlobalBackgroundCanvas } from './GlobalBackgroundCanvas'
import { useSceneObserver } from './useSceneObserver'
import { HeroSection } from './HeroSection'
import { AboutSection } from './AboutSection'
import { ProjectsSection } from './ProjectsSection'
import { ProcessSection } from './ProcessSection'
import { NewsSection } from '@/features/news'
import { TestimonialsSection } from './TestimonialsSection'
import { ContactSection } from './ContactSection'
import { FooterSection } from './FooterSection'

/** Inner component so useSceneObserver runs inside SceneProvider */
const HomeContent = () => {
  useSceneObserver()

  return (
    <>
      {/* Persistent full-page 3D cinematic background */}
      <GlobalBackgroundCanvas />

      {/* Hero Section with Parallax Background */}
      <HeroSection />

      {/* Introduction / About Section */}
      <AboutSection />

      {/* Portfolio / Projects Bento Grid */}
      <ProjectsSection />

      {/* Work Process Timeline */}
      <ProcessSection />

      {/* News & Architectural Journal Showcase */}
      <NewsSection />

      {/* Client Testimonials */}
      <TestimonialsSection />

      {/* Consultation Contact Form */}
      <ContactSection />

      {/* Footer */}
      <FooterSection />
    </>
  )
}

export const HomePage = () => {
  return (
    <SceneProvider>
      <div className="relative min-h-screen bg-[#0A0A0A] text-[#e4e2dd] overflow-x-hidden">
        <HomeContent />
      </div>
    </SceneProvider>
  )
}
