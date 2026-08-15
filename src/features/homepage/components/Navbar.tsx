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
          ? 'bg-[#080808]/90 backdrop-blur-xl border-b border-[#C6A15B]/20 shadow-2xl'
          : 'bg-transparent backdrop-blur-md'
      }`}
    >
      <div className="w-full px-6 md:px-[8vw] flex justify-between items-center h-[90px]">
        {/* Logo */}
        <Link
          to="/"
          className="font-display text-lg md:text-xl font-medium tracking-[0.15em] text-[#F3EFE7] uppercase group"
        >
          {navigationContent.logo.primary}{' '}
          <span className="text-[#C6A15B] font-display font-medium">
            {navigationContent.logo.secondary}
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-10 items-center nav-text uppercase font-medium">
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
                    ? 'text-[#C6A15B] border-b border-[#C6A15B] pb-0.5'
                    : 'text-[#F3EFE7] hover:text-[#DEC27B]'
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
          className="hidden md:inline-flex btn-secondary button-text px-5 py-2.5 !text-[11px]"
        >
          {navigationContent.consultation}
        </Link>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-[#C6A15B] focus:outline-none p-2"
          aria-label={navigationContent.aria.toggleMenu}
        >
          <span className="material-symbols-outlined text-2xl">
            {mobileMenuOpen ? 'close' : 'menu'}
          </span>
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#080808]/98 border-b border-[#C6A15B]/25 px-8 py-7 space-y-5 nav-text uppercase text-[#F3EFE7]">
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
                className={`block pl-3 ${
                  isActive
                    ? 'text-[#C6A15B] font-semibold border-l-2 border-[#C6A15B]'
                    : 'hover:text-[#DEC27B]'
                }`}
              >
                {item.label}
              </Link>
            )
          })}
          <Link
            to="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className="inline-block mt-3 border border-[#C6A15B] text-[#DEC27B] px-5 py-2.5 button-text !text-[11px]"
          >
            {navigationContent.consultation}
          </Link>
        </div>
      )}
    </nav>
  )
}


