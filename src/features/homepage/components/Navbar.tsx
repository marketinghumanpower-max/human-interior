import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { navigationContent } from '@/content/navigation'

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const isSubPage = location.pathname !== '/' && location.pathname !== '/vi'

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 ease-in-out ${
        isScrolled || isSubPage
          ? 'bg-[#080808]/95 backdrop-blur-xl border-b border-[#C6A15B]/25 shadow-2xl'
          : 'bg-transparent backdrop-blur-md'
      }`}
    >
      <div className="w-full px-6 md:px-[8vw] flex justify-between items-center h-[90px]">
        {/* Logo */}
        <Link
          to="/"
          className="font-sans text-xl md:text-2xl font-bold tracking-[0.1em] md:tracking-[0.12em] text-[#FFFFFF] uppercase group flex items-center gap-1.5 whitespace-nowrap shrink-0"
        >
          <span>{navigationContent.logo.primary}</span>
          <span className="text-[#EDDAA2] font-bold">
            {navigationContent.logo.secondary}
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-10 items-center font-sans text-sm md:text-base uppercase font-semibold tracking-[0.1em]">
          {navigationContent.menu.map((item) => {
            const isActive =
              item.href === '/'
                ? location.pathname === '/'
                : location.pathname.startsWith(item.href)

            return (
              <Link
                key={item.href}
                to={item.href}
                className={`transition-colors duration-300 ${
                  isActive
                    ? 'text-[#EDDAA2] border-b-2 border-[#EDDAA2] pb-0.5'
                    : 'text-[#F5F1E8] hover:text-[#EDDAA2]'
                }`}
              >
                {item.label}
              </Link>
            )
          })}
        </div>

        {/* Right CTA Button */}
        <Link
          to="/contact"
          className="hidden md:inline-flex btn-secondary button-text px-6 py-2.5 !text-xs font-semibold"
        >
          {navigationContent.consultation}
        </Link>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-[#EDDAA2] focus:outline-none p-2"
          aria-label={navigationContent.aria.toggleMenu}
        >
          <span className="material-symbols-outlined text-2xl">
            {mobileMenuOpen ? 'close' : 'menu'}
          </span>
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#080808]/98 border-b border-[#C6A15B]/30 px-8 py-7 space-y-5 font-sans text-base uppercase text-[#F5F1E8]">
          {navigationContent.menu.map((item) => {
            const isActive =
              item.href === '/'
                ? location.pathname === '/'
                : location.pathname.startsWith(item.href)

            return (
              <Link
                key={item.href}
                to={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block pl-3 font-semibold ${
                  isActive
                    ? 'text-[#EDDAA2] border-l-2 border-[#EDDAA2]'
                    : 'hover:text-[#EDDAA2]'
                }`}
              >
                {item.label}
              </Link>
            )
          })}
          <Link
            to="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className="inline-block mt-3 border border-[#C6A15B] text-[#EDDAA2] px-5 py-2.5 button-text !text-xs font-semibold"
          >
            {navigationContent.consultation}
          </Link>
        </div>
      )}
    </nav>
  )
}
