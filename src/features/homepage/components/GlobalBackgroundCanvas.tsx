import React, { Component, useState, useEffect } from 'react'
import type { ReactNode } from 'react'
import { Canvas } from '@react-three/fiber'
import { useScroll, useReducedMotion } from 'framer-motion'
import { GlobalImageScene } from './GlobalImageScene'

// Check WebGL context availability
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

// WebGL Error Boundary
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
    console.warn('Global R3F Canvas rendered fallback due to WebGL exception:', error)
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback
    }
    return this.props.children
  }
}

/**
 * GlobalBackgroundCanvas — Persistent full-page R3F Canvas
 *
 * Renders a fixed-position Canvas that covers the entire viewport.
 * Reads activeImage + canvasOpacity from SceneContext and passes
 * them to GlobalImageScene for crossfade transitions.
 */
export const GlobalBackgroundCanvas = () => {
  const [webGLSupported, setWebGLSupported] = useState(true)
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    setWebGLSupported(checkWebGLSupport())
  }, [])

  // Global scroll progress: 0 at page top, 1 at page bottom
  const { scrollYProgress } = useScroll()

  if (!webGLSupported) {
    return null // Graceful degradation — sections show their own backgrounds
  }

  return (
    <WebGLErrorBoundary fallback={null}>
      <div
        className="fixed inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: 0 }}
      >
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
            <GlobalImageScene
              scrollProgress={scrollYProgress}
              shouldReduceMotion={shouldReduceMotion ?? false}
            />
          </React.Suspense>
        </Canvas>
      </div>
    </WebGLErrorBoundary>
  )
}
