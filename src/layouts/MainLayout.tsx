import { Outlet } from 'react-router-dom'
import { ScrollToTop } from '@/components/ScrollToTop'
import { Navbar } from '@/features/homepage/components/Navbar'

export const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#0A0A0A] text-[#e4e2dd]">
      <ScrollToTop />
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  )
}

