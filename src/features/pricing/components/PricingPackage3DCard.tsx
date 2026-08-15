import React, { useRef, useState } from 'react'

interface PricingPackage3DCardProps {
  children: React.ReactNode
  className?: string
  popular?: boolean
}

export const PricingPackage3DCard: React.FC<PricingPackage3DCardProps> = ({
  children,
  className = '',
  popular = false,
}) => {
  const cardRef = useRef<HTMLDivElement>(null)
  const [transform, setTransform] = useState('perspective(1000px) rotateX(0deg) rotateY(0deg)')
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current
    if (!card) return

    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const centerX = rect.width / 2
    const centerY = rect.height / 2

    // Max rotation 8 degrees
    const rotateX = ((y - centerY) / centerY) * -7
    const rotateY = ((x - centerX) / centerX) * 7

    setTransform(`perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`)
    setGlarePos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.15,
    })
  }

  const handleMouseLeave = () => {
    setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)')
    setGlarePos((prev) => ({ ...prev, opacity: 0 }))
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative transition-transform duration-200 ease-out will-change-transform ${className}`}
      style={{ transform, transformStyle: 'preserve-3d' }}
    >
      {/* Dynamic Metallic Glare Light Overlay */}
      <div
        className="absolute inset-0 pointer-events-none rounded-sm transition-opacity duration-300 z-20"
        style={{
          background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(198,161,91,0.35) 0%, transparent 60%)`,
          opacity: glarePos.opacity,
        }}
      />

      {/* Popular Highlight Border Glow */}
      {popular && (
        <div className="absolute -inset-0.5 bg-gradient-to-r from-[#C6A15B] via-[#F3EFE7] to-[#C6A15B] rounded-sm opacity-70 blur-xs z-0" />
      )}

      <div className="relative z-10 h-full">{children}</div>
    </div>
  )
}
