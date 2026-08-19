import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'

interface ContactDots3DCanvasProps {
  className?: string
}

export const ContactDots3DCanvas: React.FC<ContactDots3DCanvasProps> = ({ className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let width = container.clientWidth
    let height = container.clientHeight

    // 1. Scene & Camera Setup
    const scene = new THREE.Scene()
    
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000)
    camera.position.set(0, 35, 60)
    camera.lookAt(0, 0, 0)

    // 2. Renderer Setup
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    container.appendChild(renderer.domElement)

    // 3. Grid of Dots Setup
    const numX = 55
    const numZ = 55
    const separation = 2.4
    const count = numX * numZ

    const positions = new Float32Array(count * 3)
    const scales = new Float32Array(count)
    const opacities = new Float32Array(count)

    let index = 0
    for (let ix = 0; ix < numX; ix++) {
      for (let iz = 0; iz < numZ; iz++) {
        // Centered grid position
        const x = (ix - numX / 2) * separation
        const z = (iz - numZ / 2) * separation
        const y = 0

        positions[index * 3] = x
        positions[index * 3 + 1] = y
        positions[index * 3 + 2] = z

        scales[index] = 1.0
        opacities[index] = 0.5
        index++
      }
    }

    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('scale', new THREE.BufferAttribute(scales, 1))

    // Create dot texture using canvas for sharp glowing circular dots
    const createDotTexture = () => {
      const canvas = document.createElement('canvas')
      canvas.width = 64
      canvas.height = 64
      const ctx = canvas.getContext('2d')
      if (ctx) {
        const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32)
        gradient.addColorStop(0, 'rgba(238, 209, 140, 1.0)')
        gradient.addColorStop(0.3, 'rgba(198, 161, 91, 0.8)')
        gradient.addColorStop(0.7, 'rgba(198, 161, 91, 0.25)')
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)')

        ctx.fillStyle = gradient
        ctx.fillRect(0, 0, 64, 64)
      }
      return new THREE.CanvasTexture(canvas)
    }

    const dotTexture = createDotTexture()

    // Shader Material for smooth size & color blending
    const material = new THREE.ShaderMaterial({
      uniforms: {
        color: { value: new THREE.Color(0xC6A15B) },
        pointTexture: { value: dotTexture },
        time: { value: 0 },
      },
      vertexShader: `
        attribute float scale;
        uniform float time;
        varying float vScale;
        varying float vDepth;

        void main() {
          vScale = scale;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          vDepth = -mvPosition.z;
          gl_PointSize = scale * (220.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform vec3 color;
        uniform sampler2D pointTexture;
        varying float vScale;
        varying float vDepth;

        void main() {
          vec4 texColor = texture2D(pointTexture, gl_PointCoord);
          if (texColor.a < 0.05) discard;
          
          // Distance fade out towards edge
          float alpha = texColor.a * min(1.0, 100.0 / vDepth);
          gl_FragColor = vec4(color, alpha * 0.85);
        }
      `,
      transparent: true,
      depthTest: false,
      blending: THREE.AdditiveBlending,
    })

    const particles = new THREE.Points(geometry, material)
    scene.add(particles)

    // 4. Mouse Tracking & Parallax
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      mouse.targetX = ((e.clientX - rect.left) / rect.width) * 2 - 1
      mouse.targetY = -(((e.clientY - rect.top) / rect.height) * 2 - 1)
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })

    // 5. Animation Loop
    let animId: number
    let countTime = 0

    const animate = () => {
      animId = requestAnimationFrame(animate)
      countTime += 0.035

      // Smooth Mouse Lerp
      mouse.x += (mouse.targetX - mouse.x) * 0.04
      mouse.y += (mouse.targetY - mouse.y) * 0.04

      // Dynamic Wave of dots traveling back and forth across the 3D grid
      const posAttr = geometry.attributes.position as THREE.BufferAttribute
      const scaleAttr = geometry.attributes.scale as THREE.BufferAttribute
      const posArray = posAttr.array as Float32Array
      const scaleArray = scaleAttr.array as Float32Array

      let idx = 0
      for (let ix = 0; ix < numX; ix++) {
        for (let iz = 0; iz < numZ; iz++) {
          // Double sine wave traveling horizontally & vertically (dấu chấm chạy qua lại)
          const wave1 = Math.sin(ix * 0.25 + countTime) * 1.8
          const wave2 = Math.cos(iz * 0.25 + countTime * 0.8) * 1.8
          const waveTraveling = Math.sin((ix + iz) * 0.15 - countTime * 1.2) * 2.2

          // Update Y position of dots
          posArray[idx * 3 + 1] = wave1 + wave2 + waveTraveling

          // Pulse dot size as the wave passes through
          const wavePulse = Math.sin(ix * 0.2 + iz * 0.2 + countTime * 1.5)
          scaleArray[idx] = Math.max(0.6, (wave1 + wave2 + 4) * 0.35 + wavePulse * 0.4)

          idx++
        }
      }

      posAttr.needsUpdate = true
      scaleAttr.needsUpdate = true

      // Camera gentle motion & mouse parallax
      camera.position.x = Math.sin(countTime * 0.15) * 4 + mouse.x * 12
      camera.position.z = 60 + Math.cos(countTime * 0.15) * 4 + mouse.y * 6
      camera.lookAt(0, 0, 0)

      renderer.render(scene, camera)
    }

    animate()

    // 6. Window Resize Handler
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
