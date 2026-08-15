import React from 'react'

export const FloatingContactWidget: React.FC = () => {
  return (
    <div className="fixed bottom-7 right-7 z-50 flex flex-col gap-5 items-end pointer-events-auto">
      {/* ─── Zalo Floating Button ─── */}
      <div className="relative group">
        {/* Outer Pulsing Ring */}
        <span className="absolute inset-0 rounded-full bg-[#0068FF] opacity-70 animate-ping pointer-events-none" />

        {/* Hover Tooltip Badge */}
        <span className="absolute right-16 top-1/2 -translate-y-1/2 px-3.5 py-2 rounded-xl bg-[#0A0A0A]/95 backdrop-blur-md border border-[#0068FF]/40 text-[#F3EFE7] text-xs font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 group-hover:-translate-x-1 transition-all duration-300 pointer-events-none shadow-[0_6px_25px_rgba(0,104,255,0.4)] flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#0068FF] animate-pulse" />
          Chat Zalo: 0329.688.826
        </span>

        <a
          href="https://zalo.me/0329688826"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat qua Zalo"
          className="relative w-14 h-14 rounded-full bg-gradient-to-tr from-[#0052CC] via-[#0068FF] to-[#00A3FF] flex items-center justify-center shadow-[0_6px_25px_rgba(0,104,255,0.55)] hover:scale-110 active:scale-95 transition-transform duration-300 animate-pulse-blue group border border-white/20"
        >
          {/* Crisp Zalo Badge Logo */}
          <div className="flex flex-col items-center justify-center transition-transform duration-300 group-hover:scale-105">
            <span className="text-white font-extrabold text-[15px] tracking-tight leading-none font-sans drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)]">
              Zalo
            </span>
          </div>
        </a>
      </div>

      {/* ─── Phone Call Floating Button ─── */}
      <div className="relative group">
        {/* Outer Pulsing Ring */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-70 animate-ping pointer-events-none" style={{ animationDelay: '0.4s' }} />

        {/* Hover Tooltip Badge */}
        <span className="absolute right-16 top-1/2 -translate-y-1/2 px-3.5 py-2 rounded-xl bg-[#0A0A0A]/95 backdrop-blur-md border border-[#25D366]/40 text-[#F3EFE7] text-xs font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 group-hover:-translate-x-1 transition-all duration-300 pointer-events-none shadow-[0_6px_25px_rgba(37,211,102,0.4)] flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
          Hotline: 0329.688.826
        </span>

        <a
          href="tel:0329688826"
          aria-label="Gọi điện trực tiếp Hotline"
          className="relative w-14 h-14 rounded-full bg-gradient-to-tr from-[#1EBE5D] via-[#25D366] to-[#40E07B] flex items-center justify-center shadow-[0_6px_25px_rgba(37,211,102,0.55)] hover:scale-110 active:scale-95 transition-transform duration-300 animate-pulse-green border border-white/20"
        >
          <svg className="w-6 h-6 text-white animate-phone-ring" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
          </svg>
        </a>
      </div>
    </div>
  )
}
