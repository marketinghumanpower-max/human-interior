import React, { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'

interface Article3DMaterialViewerProps {
  category: string
  title: string
}

export const Article3DMaterialViewer: React.FC<Article3DMaterialViewerProps> = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [rotationSpeed] = useState<number>(0.008)
  const [materialType, setMaterialType] = useState<'marble' | 'wood' | 'gold' | 'glass'>('marble')

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let width = container.clientWidth
    let height = container.clientHeight

    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0x0C0C0E)

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100)
    camera.position.set(0, 0, 3.8)

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.2
    container.appendChild(renderer.domElement)

    // Material Mesh Setup based on article context
    const geometry = new THREE.SphereGeometry(1.0, 64, 64)

    // Procedural Marble Texture
    const createMarbleCanvas = () => {
      const canvas = document.createElement('canvas')
      canvas.width = 512
      canvas.height = 512
      const ctx = canvas.getContext('2d')
      if (ctx) {
        ctx.fillStyle = '#F4F2EB'
        ctx.fillRect(0, 0, 512, 512)
        ctx.strokeStyle = 'rgba(198, 161, 91, 0.6)'
        ctx.lineWidth = 4
        for (let i = 0; i < 6; i++) {
          ctx.beginPath()
          ctx.moveTo(i * 90, 0)
          ctx.bezierCurveTo(i * 90 + 100, 200, i * 90 - 50, 350, i * 90 + 120, 512)
          ctx.stroke()
        }
      }
      return new THREE.CanvasTexture(canvas)
    }

    const marbleTex = createMarbleCanvas()

    const marbleMaterial = new THREE.MeshStandardMaterial({
      map: marbleTex,
      roughness: 0.15,
      metalness: 0.1,
    })

    const goldMaterial = new THREE.MeshStandardMaterial({
      color: 0xD4AF37,
      metalness: 0.9,
      roughness: 0.2,
    })

    const glassMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xF3EFE7,
      transmission: 0.9,
      opacity: 1,
      transparent: true,
      roughness: 0.05,
      ior: 1.5,
    })

    const meshMat =
      materialType === 'gold'
        ? goldMaterial
        : materialType === 'glass'
        ? glassMaterial
        : marbleMaterial

    const mesh = new THREE.Mesh(geometry, meshMat)
    scene.add(mesh)

    // Decorative Orbiting Ring
    const ringGeo = new THREE.TorusGeometry(1.4, 0.02, 16, 64)
    const ringMat = new THREE.MeshStandardMaterial({ color: 0xC6A15B, metalness: 0.8, roughness: 0.2 })
    const ring = new THREE.Mesh(ringGeo, ringMat)
    ring.rotation.x = Math.PI / 3
    scene.add(ring)

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xFFFFFF, 1.2)
    scene.add(ambientLight)

    const sun = new THREE.DirectionalLight(0xFFFAEE, 2.5)
    sun.position.set(3, 4, 3)
    scene.add(sun)

    const fill = new THREE.SpotLight(0xC6A15B, 3.0)
    fill.position.set(-3, -2, 2)
    scene.add(fill)

    // Mouse Interaction
    let isDragging = false
    let prevMousePos = { x: 0, y: 0 }

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true
      prevMousePos = { x: e.clientX, y: e.clientY }
    }

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return
      const deltaX = e.clientX - prevMousePos.x
      const deltaY = e.clientY - prevMousePos.y

      mesh.rotation.y += deltaX * 0.01
      mesh.rotation.x += deltaY * 0.01
      ring.rotation.z += deltaX * 0.005

      prevMousePos = { x: e.clientX, y: e.clientY }
    }

    const onMouseUp = () => {
      isDragging = false
    }

    const dom = renderer.domElement
    dom.addEventListener('mousedown', onMouseDown)
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)

    let animId: number
    const animate = () => {
      animId = requestAnimationFrame(animate)
      if (!isDragging) {
        mesh.rotation.y += rotationSpeed
        ring.rotation.z += rotationSpeed * 0.5
      }
      renderer.render(scene, camera)
    }

    animate()

    const handleResize = () => {
      width = container.clientWidth
      height = container.clientHeight
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(animId)
      dom.removeEventListener('mousedown', onMouseDown)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', onMouseUp)
      window.removeEventListener('resize', handleResize)
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
      renderer.dispose()
    }
  }, [materialType, rotationSpeed])

  return (
    <div className="bg-[#121215] border border-[#C6A15B]/30 rounded-lg p-5 my-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4 pb-3 border-b border-[#C6A15B]/20">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#C6A15B] animate-pulse" />
            <span className="font-body text-[11px] font-medium text-[#C6A15B] uppercase tracking-[0.22em]">
              MÔ PHỎNG VẬT LIỆU 3D INTERACTIVE
            </span>
          </div>
          <h4 className="card-title text-sm text-[#F3EFE7] mt-1">
            Xoay &amp; Quan Sát Chi Tiết Bề Mặt 360°
          </h4>
        </div>

        {/* Material Switcher */}
        <div className="flex items-center gap-2 font-body">
          {(['marble', 'gold', 'glass'] as const).map((mat) => (
            <button
              key={mat}
              onClick={() => setMaterialType(mat)}
              className={`px-3 py-1 rounded text-[11px] font-body font-medium uppercase tracking-wider transition-all ${
                materialType === mat
                  ? 'bg-[#C6A15B] text-[#0A0A0A]'
                  : 'bg-[#1C1C20] text-[#AAA49A] border border-[#C6A15B]/20 hover:text-[#F3EFE7]'
              }`}
            >
              {mat === 'marble' ? 'Đá Cẩm Thạch' : mat === 'gold' ? 'Kim Loại Vàng' : 'Kính Thủy Tinh'}
            </button>
          ))}
        </div>
      </div>

      <div
        ref={containerRef}
        className="w-full h-[260px] relative rounded overflow-hidden cursor-grab active:cursor-grabbing border border-[#C6A15B]/15"
      >
        <div className="absolute bottom-3 right-3 z-10 px-3 py-1 bg-[#0A0A0A]/80 border border-[#C6A15B]/30 rounded text-[11px] font-body text-[#AAA49A] backdrop-blur-md">
          Nhấp &amp; kéo chuột để xoay 3D 360°
        </div>
      </div>
    </div>
  )
}
