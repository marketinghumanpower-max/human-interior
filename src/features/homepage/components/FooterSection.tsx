import { Link } from 'react-router-dom'
import { footerContent } from '@/content/footer'
import { FloatingContactWidget } from '@/components/common/FloatingContactWidget'

/* ─── Social Icon SVGs ─── */
const SocialIcon = ({ type }: { type: string }) => {
  switch (type) {
    case 'facebook':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      )
    case 'instagram':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
        </svg>
      )
    case 'youtube':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
          <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      )
    default:
      return null
  }
}

/* ─── Contact Icon SVGs ─── */
const MapPinIcon = () => (
  <svg className="w-4 h-4 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
  </svg>
)

const PhoneIcon = () => (
  <svg className="w-4 h-4 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
  </svg>
)

const MailIcon = () => (
  <svg className="w-4 h-4 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
  </svg>
)

const GlobeIcon = () => (
  <svg className="w-4 h-4 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
  </svg>
)

/* ─── Logo SVG ─── */
const LogoIcon = () => (
  <svg viewBox="0 0 40 48" fill="none" className="w-10 h-12">
    <rect x="8" y="0" width="24" height="4" rx="1" fill="#C6A15B" />
    <rect x="8" y="0" width="4" height="48" rx="1" fill="#C6A15B" />
    <rect x="28" y="0" width="4" height="48" rx="1" fill="#C6A15B" />
    <rect x="8" y="22" width="24" height="4" rx="1" fill="#C6A15B" />
    <rect x="15" y="10" width="10" height="3" rx="1" fill="#C6A15B" opacity="0.6" />
    <rect x="15" y="30" width="10" height="3" rx="1" fill="#C6A15B" opacity="0.6" />
    <rect x="8" y="44" width="24" height="4" rx="1" fill="#C6A15B" />
  </svg>
)

export const FooterSection = () => {
  const { brand, quickLinks, services, contact, bottom } = footerContent

  return (
    <>
      <footer className="relative z-10 w-full bg-[#0A0A0A]">
        {/* ─── Main Footer Grid ─── */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 pt-16 pb-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">

            {/* Column 1 — Brand */}
            <div className="space-y-5">
              <Link to="/" className="flex items-center gap-3 group">
                <LogoIcon />
                <span className="font-display text-lg text-[#F3EFE7] tracking-[0.1em] font-medium uppercase leading-tight">
                  {brand.name}
                </span>
              </Link>
              <p className="caption text-[#8A8478] leading-[1.65]">
                {brand.description}
              </p>
              <div className="flex items-center gap-3 pt-1">
                {brand.socials.map((social) => (
                  <a
                    key={social.icon}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="w-9 h-9 rounded-full border border-[#333] bg-[#151515] flex items-center justify-center text-[#8A8478] hover:text-[#C6A15B] hover:border-[#C6A15B]/50 transition-all duration-300"
                  >
                    <SocialIcon type={social.icon} />
                  </a>
                ))}
              </div>
            </div>

            {/* Column 2 — Quick Links */}
            <div>
              <h4 className="eyebrow text-[#C6A15B] mb-5">
                {quickLinks.title}
              </h4>
              <ul className="space-y-3">
                {quickLinks.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      to={item.href}
                      className="nav-text text-[#8A8478] hover:text-[#F3EFE7] transition-colors duration-200"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3 — Services */}
            <div>
              <h4 className="eyebrow text-[#C6A15B] mb-5">
                {services.title}
              </h4>
              <ul className="space-y-3">
                {services.items.map((item, idx) => (
                  <li key={idx}>
                    <Link
                      to={item.href}
                      className="nav-text text-[#8A8478] hover:text-[#F3EFE7] transition-colors duration-200"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4 — Contact Info */}
            <div>
              <h4 className="eyebrow text-[#C6A15B] mb-5">
                {contact.title}
              </h4>
              <div className="space-y-4">
                {/* Address */}
                <div className="flex items-start gap-2.5">
                  <span className="text-[#C6A15B]"><MapPinIcon /></span>
                  <a
                    href={(contact as { mapUrl?: string; address: string }).mapUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contact.address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="nav-text text-[#8A8478] hover:text-[#F3EFE7] hover:underline transition-colors leading-[1.65]"
                    title="Mở vị trí trên Google Maps"
                  >
                    {contact.address}
                  </a>
                </div>
                {/* Phones */}
                <div className="flex items-start gap-2.5">
                  <span className="text-[#C6A15B]"><PhoneIcon /></span>
                  <div className="space-y-1">
                    {contact.phones.map((phone) => (
                      <a
                        key={phone}
                        href={`tel:${phone.replace(/\s/g, '')}`}
                        className="block nav-text text-[#8A8478] hover:text-[#F3EFE7] transition-colors"
                      >
                        {phone}
                      </a>
                    ))}
                  </div>
                </div>
                {/* Emails */}
                <div className="flex items-start gap-2.5">
                  <span className="text-[#C6A15B]"><MailIcon /></span>
                  <div className="space-y-1">
                    {contact.emails.map((email) => (
                      <a
                        key={email}
                        href={`mailto:${email}`}
                        className="block nav-text text-[#8A8478] hover:text-[#F3EFE7] transition-colors"
                      >
                        {email}
                      </a>
                    ))}
                  </div>
                </div>
                {/* Website */}
                <div className="flex items-start gap-2.5">
                  <span className="text-[#C6A15B]"><GlobeIcon /></span>
                  <span className="nav-text text-[#8A8478]">
                    <span className="font-medium text-[#F3EFE7]">Website:</span>{' '}
                    <a
                      href={contact.website.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-[#F3EFE7] transition-colors"
                    >
                      {contact.website.label}
                    </a>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ─── Bottom Bar ─── */}
        <div className="border-t border-[#1E1E1E]">
          <div className="max-w-7xl mx-auto px-6 md:px-12 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="caption text-[#5A5550] font-normal">
              {bottom.copyright}
            </p>
            <div className="flex items-center gap-6">
              {bottom.legalLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="caption text-[#5A5550] hover:text-[#AAA49A] transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* ─── Floating Quick Contact Widget (Zalo + Hotline Call) ─── */}
      <FloatingContactWidget />
    </>
  )
}
