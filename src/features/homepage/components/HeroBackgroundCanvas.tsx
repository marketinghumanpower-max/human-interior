import React, { Component, useState, useEffect } from 'react'
import type { ReactNode } from 'react'
import { Canvas } from '@react-three/fiber'
import { InteriorImageScene } from './InteriorImageScene'

interface HeroBackgroundCanvasProps {
  imageUrl: string
  scrollProgress: { get: () => number }
  shouldReduceMotion?: boolean
}

// Check WebGL context availability in current browser environment
function checkWebGLSupport(): boolean {
  try {
    const canvas = document.createElement('canvas')
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    )
  } catch {
    return false
  }
}

// WebGL Error Boundary to catch any R3F / Canvas rendering exceptions gracefully
interface ErrorBoundaryProps {
  fallback: ReactNode
  children: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
}

class WebGLErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error: Error) {
    console.warn('R3F Hero Canvas rendered fallback due to WebGL exception:', error)
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback
    }
    return this.props.children
  }
}

export const HeroBackgroundCanvas: React.FC<HeroBackgroundCanvasProps> = ({
  imageUrl,
  scrollProgress,
  shouldReduceMotion = false,
}) => {
  const [webGLSupported, setWebGLSupported] = useState<boolean>(true)

  useEffect(() => {
    setWebGLSupported(checkWebGLSupport())
  }, [])

  // 2D Static Image Fallback Element (Also used as Suspense fallback while texture loads)
  const FallbackImage = (
    <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
      <img
        src={imageUrl}
        alt="Luxury Architectural Interior Living Room"
        className="w-full h-full object-cover object-center"
        loading="eager"
      />
    </div>
  )

  if (!webGLSupported) {
    return FallbackImage
  }

  return (
    <WebGLErrorBoundary fallback={FallbackImage}>
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">
        <Canvas
          camera={{
            position: [0, 0, 5],
            fov: 40,
            near: 0.1,
            far: 1000,
          }}
          dpr={[1, 1.5]}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance',
          }}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
          }}
        >
          <React.Suspense fallback={null}>
            <InteriorImageScene
              imageUrl={imageUrl}
              scrollProgress={scrollProgress}
              shouldReduceMotion={shouldReduceMotion}
            />
          </React.Suspense>
        </Canvas>
      </div>
    </WebGLErrorBoundary>
  )
}
