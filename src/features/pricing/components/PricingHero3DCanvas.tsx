import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'

interface PricingHero3DCanvasProps {
  className?: string
}

export const PricingHero3DCanvas: React.FC<PricingHero3DCanvasProps> = ({ className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let width = container.clientWidth
    let height = container.clientHeight

    // 1. Scene, Camera & Renderer
    const scene = new THREE.Scene()

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000)
    camera.position.set(0, 10, 32)

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.2
    container.appendChild(renderer.domElement)

    // 2. Lighting Setup
    const ambientLight = new THREE.AmbientLight(0xfff5e6, 0.8)
    scene.add(ambientLight)

    const mainLight = new THREE.PointLight(0xc6a15b, 3, 50)
    mainLight.position.set(12, 18, 15)
    scene.add(mainLight)

    const accentLight = new THREE.PointLight(0x78a0d0, 2, 40)
    accentLight.position.set(-15, -10, 10)
    scene.add(accentLight)

    // 3. Gold Glowing Floating 3D Particle Cloud (Shapes/Wireframes Removed)
    const particleCount = 180
    const particlePositions = new Float32Array(particleCount * 3)

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 45
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 30
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 40
    }

    const particleGeometry = new THREE.BufferGeometry()
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3))

    // Dot Texture
    const createDotTex = () => {
      const canvas = document.createElement('canvas')
      canvas.width = 64
      canvas.height = 64
      const ctx = canvas.getContext('2d')
      if (ctx) {
        const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32)
        grad.addColorStop(0, 'rgba(238, 209, 140, 1.0)')
        grad.addColorStop(0.4, 'rgba(198, 161, 91, 0.8)')
        grad.addColorStop(0.8, 'rgba(198, 161, 91, 0.25)')
        grad.addColorStop(1, 'rgba(0, 0, 0, 0)')
        ctx.fillStyle = grad
        ctx.fillRect(0, 0, 64, 64)
      }
      return new THREE.CanvasTexture(canvas)
    }

    const particleMaterial = new THREE.PointsMaterial({
      color: 0xc6a15b,
      size: 0.75,
      map: createDotTex(),
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })

    const particles = new THREE.Points(particleGeometry, particleMaterial)
    scene.add(particles)

    // 4. Mouse Parallax & Smooth Lerp
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      mouse.targetX = ((e.clientX - rect.left) / rect.width) * 2 - 1
      mouse.targetY = -(((e.clientY - rect.top) / rect.height) * 2 - 1)
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })

    // 5. Animation Loop (Particles floating as original)
    let animId: number
    let clock = new THREE.Clock()

    const animate = () => {
      animId = requestAnimationFrame(animate)
      const elapsedTime = clock.getElapsedTime()

      // Smooth mouse lerp
      mouse.x += (mouse.targetX - mouse.x) * 0.05
      mouse.y += (mouse.targetY - mouse.y) * 0.05

      // Particle rotation & gentle floating motion
      particles.rotation.y = elapsedTime * 0.05 + mouse.x * 0.2
      particles.rotation.x = Math.sin(elapsedTime * 0.1) * 0.05 + mouse.y * 0.1

      const pArr = particleGeometry.attributes.position.array as Float32Array
      for (let i = 0; i < particleCount; i++) {
        pArr[i * 3 + 1] += Math.sin(elapsedTime * 1.5 + i) * 0.004
        pArr[i * 3] += Math.cos(elapsedTime * 0.8 + i) * 0.002
      }
      particleGeometry.attributes.position.needsUpdate = true

      // Camera look
      camera.position.x = mouse.x * 4
      camera.position.y = 10 + mouse.y * 2
      camera.lookAt(0, 0, 0)

      renderer.render(scene, camera)
    }

    animate()

    // 6. Resize Handler
    const handleResize = () => {
      if (!container) return
      width = container.clientWidth
      height = container.clientHeight
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
      renderer.dispose()
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 pointer-events-none overflow-hidden z-0 ${className}`}
    />
  )
}
