import React, { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'

interface PricingEstimator3DViewerProps {
  propertyType: string // 'apartment' | 'townhouse' | 'villa'
  materialTier: string // 'melamine' | 'laminate' | 'acrylic' | 'walnut'
  area: number
  className?: string
}

export const PricingEstimator3DViewer: React.FC<PricingEstimator3DViewerProps> = ({
  propertyType,
  materialTier,
  area,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [lightMode, setLightMode] = useState<'warm' | 'daylight' | 'night'>('warm')
  const [wireframeOnly, setWireframeOnly] = useState(false)
  const [autoRotate, setAutoRotate] = useState(true)

  const sceneRef = useRef<THREE.Scene | null>(null)
  const materialRef = useRef<THREE.MeshStandardMaterial | null>(null)
  const modelGroupRef = useRef<THREE.Group | null>(null)
  const lightsGroupRef = useRef<THREE.Group | null>(null)

  // 1. Procedural Texture Generators
  const generateMaterialTexture = (tier: string) => {
    const canvas = document.createElement('canvas')
    canvas.width = 512
    canvas.height = 512
    const ctx = canvas.getContext('2d')
    if (!ctx) return new THREE.CanvasTexture(canvas)

    if (tier === 'walnut') {
      // Deep Rich Walnut Wood Grain
      const grad = ctx.createLinearGradient(0, 0, 512, 512)
      grad.addColorStop(0, '#3D2314')
      grad.addColorStop(0.3, '#54321D')
      grad.addColorStop(0.6, '#2E1A0E')
      grad.addColorStop(1, '#4A2D19')
      ctx.fillStyle = grad
      ctx.fillRect(0, 0, 512, 512)

      // Wood Grain Lines
      ctx.strokeStyle = 'rgba(20, 10, 5, 0.35)'
      ctx.lineWidth = 2
      for (let i = 0; i < 80; i++) {
        ctx.beginPath()
        const y = Math.random() * 512
        ctx.moveTo(0, y)
        ctx.bezierCurveTo(170, y + Math.random() * 40 - 20, 340, y + Math.random() * 40 - 20, 512, y)
        ctx.stroke()
      }
    } else if (tier === 'acrylic') {
      // High-Gloss Mirror Acrylic (Sleek Dark Slate / Warm Gold Tinted Reflection pattern)
      const grad = ctx.createRadialGradient(256, 256, 10, 256, 256, 300)
      grad.addColorStop(0, '#1E1E1E')
      grad.addColorStop(0.5, '#121212')
      grad.addColorStop(1, '#0A0A0A')
      ctx.fillStyle = grad
      ctx.fillRect(0, 0, 512, 512)

      // Gloss highlights
      ctx.fillStyle = 'rgba(238, 209, 140, 0.15)'
      ctx.beginPath()
      ctx.ellipse(350, 150, 180, 60, Math.PI / 4, 0, Math.PI * 2)
      ctx.fill()
    } else if (tier === 'laminate') {
      // Natural Oak / Warm Wood Texture
      const grad = ctx.createLinearGradient(0, 0, 0, 512)
      grad.addColorStop(0, '#8C6747')
      grad.addColorStop(0.5, '#A67C52')
      grad.addColorStop(1, '#785537')
      ctx.fillStyle = grad
      ctx.fillRect(0, 0, 512, 512)

      ctx.strokeStyle = 'rgba(60, 40, 20, 0.25)'
      ctx.lineWidth = 1.5
      for (let i = 0; i < 60; i++) {
        ctx.beginPath()
        const x = Math.random() * 512
        ctx.moveTo(x, 0)
        ctx.lineTo(x + Math.random() * 20 - 10, 512)
        ctx.stroke()
      }
    } else {
      // Melamine Matte Modern Neutral Texture
      ctx.fillStyle = '#2A2A2A'
      ctx.fillRect(0, 0, 512, 512)
      // Subtle speckles
      ctx.fillStyle = 'rgba(255, 255, 255, 0.03)'
      for (let i = 0; i < 2000; i++) {
        ctx.fillRect(Math.random() * 512, Math.random() * 512, 2, 2)
      }
    }

    const texture = new THREE.CanvasTexture(canvas)
    texture.wrapS = THREE.RepeatWrapping
    texture.wrapT = THREE.RepeatWrapping
    texture.repeat.set(2, 2)
    return texture
  }

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let width = container.clientWidth
    let height = container.clientHeight

    // Scene & Camera
    const scene = new THREE.Scene()
    sceneRef.current = scene

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 1000)
    camera.position.set(14, 11, 18)
    camera.lookAt(0, 1, 0)

    // Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.25
    container.appendChild(renderer.domElement)

    // Lighting Group
    const lightsGroup = new THREE.Group()
    scene.add(lightsGroup)
    lightsGroupRef.current = lightsGroup

    const ambLight = new THREE.AmbientLight(0xfff5e6, 0.7)
    lightsGroup.add(ambLight)

    const keyLight = new THREE.DirectionalLight(0xfffaed, 2.5)
    keyLight.position.set(15, 20, 12)
    keyLight.castShadow = true
    keyLight.shadow.mapSize.width = 1024
    keyLight.shadow.mapSize.height = 1024
    lightsGroup.add(keyLight)

    const fillLight = new THREE.PointLight(0xc6a15b, 2, 30)
    fillLight.position.set(-12, 8, -10)
    lightsGroup.add(fillLight)

    const rimLight = new THREE.PointLight(0x78a0d0, 1.8, 30)
    rimLight.position.set(0, -5, -15)
    lightsGroup.add(rimLight)

    // Pedestal Base
    const baseGeo = new THREE.CylinderGeometry(8, 8.5, 0.8, 48)
    const baseMat = new THREE.MeshStandardMaterial({
      color: 0x141414,
      metalness: 0.9,
      roughness: 0.2,
    })
    const baseMesh = new THREE.Mesh(baseGeo, baseMat)
    baseMesh.position.y = -2
    baseMesh.receiveShadow = true
    scene.add(baseMesh)

    // Pedestal Ring Gold Accent
    const ringGeo = new THREE.TorusGeometry(8.2, 0.08, 16, 64)
    const goldMat = new THREE.MeshStandardMaterial({
      color: 0xc6a15b,
      metalness: 0.95,
      roughness: 0.15,
    })
    const ringMesh = new THREE.Mesh(ringGeo, goldMat)
    ringMesh.rotation.x = Math.PI / 2
    ringMesh.position.y = -1.55
    scene.add(ringMesh)

    // Main Architectural Specimen Model Group
    const modelGroup = new THREE.Group()
    scene.add(modelGroup)
    modelGroupRef.current = modelGroup

    // Mouse Drag Rotation Controls (Custom Orbit)
    let isDragging = false
    let prevMousePos = { x: 0, y: 0 }
    let rotationTargetY = 0
    let rotationTargetX = 0

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true
      prevMousePos = { x: e.clientX, y: e.clientY }
    }

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging || !modelGroupRef.current) return
      const deltaX = e.clientX - prevMousePos.x
      const deltaY = e.clientY - prevMousePos.y

      rotationTargetY += deltaX * 0.008
      rotationTargetX += deltaY * 0.008

      // Clamp X rotation
      rotationTargetX = Math.max(-0.6, Math.min(0.6, rotationTargetX))
      prevMousePos = { x: e.clientX, y: e.clientY }
    }

    const onMouseUp = () => {
      isDragging = false
    }

    const domEl = renderer.domElement
    domEl.addEventListener('mousedown', onMouseDown)
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)

    // Animation Loop
    let animId: number
    const clock = new THREE.Clock()

    const animate = () => {
      animId = requestAnimationFrame(animate)
      const delta = clock.getDelta()
      const elapsedTime = clock.getElapsedTime()

      if (modelGroupRef.current) {
        if (autoRotate && !isDragging) {
          rotationTargetY += delta * 0.35
        }
        modelGroupRef.current.rotation.y += (rotationTargetY - modelGroupRef.current.rotation.y) * 0.1
        modelGroupRef.current.rotation.x += (rotationTargetX - modelGroupRef.current.rotation.x) * 0.1

        // Gentle floating bounce
        modelGroupRef.current.position.y = Math.sin(elapsedTime * 1.5) * 0.15
      }

      renderer.render(scene, camera)
    }

    animate()

    // Resize Handler
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
      domEl.removeEventListener('mousedown', onMouseDown)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', onMouseUp)
      window.removeEventListener('resize', handleResize)
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
      renderer.dispose()
    }
  }, [])

  // Re-build 3D Model when propertyType, materialTier, or area changes
  useEffect(() => {
    const group = modelGroupRef.current
    if (!group) return

    // Clear old children
    while (group.children.length > 0) {
      const obj = group.children[0]
      group.remove(obj)
    }

    // Material setup based on tier
    const texture = generateMaterialTexture(materialTier)
    let metalness = 0.1
    let roughness = 0.4
    let color = 0xffffff

    if (materialTier === 'walnut') {
      metalness = 0.05
      roughness = 0.35
      color = 0xd4af37
    } else if (materialTier === 'acrylic') {
      metalness = 0.4
      roughness = 0.08
      color = 0xffffff
    } else if (materialTier === 'laminate') {
      metalness = 0.1
      roughness = 0.45
      color = 0xf5e6d3
    } else {
      metalness = 0.05
      roughness = 0.6
      color = 0xdddddd
    }

    const mainMat = new THREE.MeshStandardMaterial({
      map: texture,
      color: color,
      metalness: metalness,
      roughness: roughness,
      wireframe: wireframeOnly,
    })
    materialRef.current = mainMat

    const goldAccentMat = new THREE.MeshStandardMaterial({
      color: 0xc6a15b,
      metalness: 0.9,
      roughness: 0.2,
      wireframe: wireframeOnly,
    })

    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.35,
      roughness: 0.1,
      metalness: 0.1,
      transmission: 0.9,
      ior: 1.5,
      wireframe: wireframeOnly,
    })

    // Construct 3D Geometry depending on Property Type
    if (propertyType === 'villa') {
      // 3D Villa Volume Model with Double Height Ceiling & Marble Pedestal
      const mainBlock = new THREE.Mesh(new THREE.BoxGeometry(6, 4.5, 5), mainMat)
      mainBlock.position.set(0, 0.75, 0)
      mainBlock.castShadow = true
      mainBlock.receiveShadow = true
      group.add(mainBlock)

      // Upper Floor Overhang
      const upperBlock = new THREE.Mesh(new THREE.BoxGeometry(6.8, 2, 4), mainMat)
      upperBlock.position.set(0.4, 4, 0.2)
      upperBlock.castShadow = true
      group.add(upperBlock)

      // Panoramic Glass Façade
      const glassWall = new THREE.Mesh(new THREE.BoxGeometry(5.8, 3.8, 0.2), glassMat)
      glassWall.position.set(0, 0.8, 2.52)
      group.add(glassWall)

      // Gold Column Pillars
      for (let x of [-2.8, 2.8]) {
        const pillar = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 4.5, 16), goldAccentMat)
        pillar.position.set(x, 0.75, 2.5)
        pillar.castShadow = true
        group.add(pillar)
      }

      // Wireframe Bounds / Dimension Outline Box
      const wireOutline = new THREE.LineSegments(
        new THREE.EdgesGeometry(new THREE.BoxGeometry(7.5, 6, 6)),
        new THREE.LineBasicMaterial({ color: 0xc6a15b, transparent: true, opacity: 0.4 })
      )
      wireOutline.position.set(0.2, 2.2, 0)
      group.add(wireOutline)
    } else if (propertyType === 'townhouse') {
      // 3D Multi-Storey Townhouse Model
      const floor1 = new THREE.Mesh(new THREE.BoxGeometry(4.5, 2.5, 5.5), mainMat)
      floor1.position.set(0, -0.25, 0)
      floor1.castShadow = true
      group.add(floor1)

      const floor2 = new THREE.Mesh(new THREE.BoxGeometry(4.5, 2.5, 5.5), mainMat)
      floor2.position.set(0, 2.4, 0)
      floor2.castShadow = true
      group.add(floor2)

      const floor3 = new THREE.Mesh(new THREE.BoxGeometry(4.5, 2.2, 4.5), mainMat)
      floor3.position.set(0, 4.85, -0.5)
      floor3.castShadow = true
      group.add(floor3)

      // Balcony Accent Lines
      const balcony = new THREE.Mesh(new THREE.BoxGeometry(4.7, 0.15, 1.2), goldAccentMat)
      balcony.position.set(0, 1.15, 2.2)
      group.add(balcony)

      const glassBalustrade = new THREE.Mesh(new THREE.BoxGeometry(4.6, 0.9, 0.1), glassMat)
      glassBalustrade.position.set(0, 1.6, 2.75)
      group.add(glassBalustrade)
    } else {
      // Apartment: Modern Interior Room Box with Living / Dining Furniture Mockup
      const backWall = new THREE.Mesh(new THREE.BoxGeometry(7, 4, 0.3), mainMat)
      backWall.position.set(0, 0.5, -2.5)
      backWall.castShadow = true
      group.add(backWall)

      const floorPlate = new THREE.Mesh(new THREE.BoxGeometry(7, 0.3, 5.5), mainMat)
      floorPlate.position.set(0, -1.35, 0.1)
      floorPlate.receiveShadow = true
      group.add(floorPlate)

      // Sofa Block
      const sofa = new THREE.Mesh(new THREE.BoxGeometry(3.6, 1.1, 1.6), goldAccentMat)
      sofa.position.set(-1.2, -0.65, -0.5)
      sofa.castShadow = true
      group.add(sofa)

      // Coffee Table (Glass + Gold)
      const tableTop = new THREE.Mesh(new THREE.CylinderGeometry(1.2, 1.2, 0.1, 32), glassMat)
      tableTop.position.set(1.4, -0.7, 0.8)
      group.add(tableTop)

      const tableLeg = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.6, 0.6, 16), goldAccentMat)
      tableLeg.position.set(1.4, -1, 0.8)
      group.add(tableLeg)

      // TV Cabinet Console
      const consoleBox = new THREE.Mesh(new THREE.BoxGeometry(4.2, 0.7, 0.9), mainMat)
      consoleBox.position.set(0, -0.85, -2)
      consoleBox.castShadow = true
      group.add(consoleBox)
    }
  }, [propertyType, materialTier, wireframeOnly])

  // Light Mode Switcher logic
  useEffect(() => {
    const lights = lightsGroupRef.current
    if (!lights) return

    const amb = lights.children[0] as THREE.AmbientLight
    const dir = lights.children[1] as THREE.DirectionalLight
    const p1 = lights.children[2] as THREE.PointLight

    if (lightMode === 'warm') {
      amb.color.setHex(0xfff5e6)
      amb.intensity = 0.7
      dir.color.setHex(0xfffaed)
      dir.intensity = 2.5
      p1.color.setHex(0xc6a15b)
    } else if (lightMode === 'daylight') {
      amb.color.setHex(0xffffff)
      amb.intensity = 1.0
      dir.color.setHex(0xffffff)
      dir.intensity = 3.0
      p1.color.setHex(0xd0e8ff)
    } else {
      // Night Mode
      amb.color.setHex(0x1a2b4c)
      amb.intensity = 0.4
      dir.color.setHex(0xc6a15b)
      dir.intensity = 1.5
      p1.color.setHex(0xff9933)
    }
  }, [lightMode])

  return (
    <div className={`relative bg-[#080808] border border-[#C6A15B]/30 rounded-sm overflow-hidden flex flex-col ${className}`}>
      {/* Top 3D Canvas Header Bar */}
      <div className="px-4 py-3 bg-[#0F0F0F] border-b border-[#222] flex items-center justify-between z-10 font-body">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#C6A15B] animate-pulse" />
          <span className="font-body text-[11px] font-medium text-[#C6A15B] uppercase tracking-wider">
            MÔ HÌNH 3D XEM TRƯỚC VẬT LIỆU & CẤU TRÚC
          </span>
        </div>

        <div className="flex items-center gap-1.5 font-body">
          {/* Light Modes */}
          <button
            type="button"
            onClick={() => setLightMode('warm')}
            className={`px-2 py-1 font-body text-[10px] uppercase border transition-all ${
              lightMode === 'warm'
                ? 'bg-[#C6A15B] text-[#0A0A0A] border-[#C6A15B] font-medium'
                : 'text-[#888] border-[#262626] hover:text-[#DEC27B]'
            }`}
            title="Đèn Vàng Luxury"
          >
            Luxury
          </button>
          <button
            type="button"
            onClick={() => setLightMode('daylight')}
            className={`px-2 py-1 font-body text-[10px] uppercase border transition-all ${
              lightMode === 'daylight'
                ? 'bg-[#C6A15B] text-[#0A0A0A] border-[#C6A15B] font-medium'
                : 'text-[#888] border-[#262626] hover:text-[#DEC27B]'
            }`}
            title="Ánh Sáng Ban Ngày"
          >
            Daylight
          </button>
          <button
            type="button"
            onClick={() => setLightMode('night')}
            className={`px-2 py-1 font-body text-[10px] uppercase border transition-all ${
              lightMode === 'night'
                ? 'bg-[#C6A15B] text-[#0A0A0A] border-[#C6A15B] font-medium'
                : 'text-[#888] border-[#262626] hover:text-[#DEC27B]'
            }`}
            title="Ánh Sáng Đêm"
          >
            Night
          </button>
        </div>
      </div>

      {/* 3D WebGL Canvas Container */}
      <div ref={containerRef} className="relative w-full h-[360px] sm:h-[420px] cursor-grab active:cursor-grabbing font-body">
        {/* Floating 3D HUD Tags */}
        <div className="absolute top-4 left-4 pointer-events-none z-10 space-y-1">
          <div className="inline-block px-2.5 py-1 bg-[#0A0A0A]/80 backdrop-blur-md border border-[#C6A15B]/40 font-body text-[10px] font-medium text-[#DEC27B] uppercase tracking-wider">
            LOẠI HÌNH: {propertyType === 'apartment' ? 'CĂN HỘ CHUNG CƯ' : propertyType === 'townhouse' ? 'NHÀ PHỐ LIỀN KỀ' : 'BIỆT THỰ VILLA'}
          </div>
          <div className="block font-body text-[10px] text-[#8A8478] bg-[#0A0A0A]/70 px-2 py-0.5 border border-[#222]">
            DIỆN TÍCH: {area} m² · VẬT LIỆU: {materialTier.toUpperCase()}
          </div>
        </div>

        {/* Floating Controls Overlay */}
        <div className="absolute bottom-4 right-4 z-10 flex gap-2 font-body">
          <button
            type="button"
            onClick={() => setWireframeOnly(!wireframeOnly)}
            className={`px-3 py-1.5 backdrop-blur-md border font-body text-[11px] font-medium transition-all ${
              wireframeOnly
                ? 'bg-[#C6A15B] text-[#0A0A0A] border-[#C6A15B] font-medium'
                : 'bg-[#0A0A0A]/80 text-[#AAA49A] border-[#333] hover:border-[#C6A15B]'
            }`}
          >
            {wireframeOnly ? 'Show Textures' : 'Khung Wireframe 3D'}
          </button>
          <button
            type="button"
            onClick={() => setAutoRotate(!autoRotate)}
            className={`px-3 py-1.5 backdrop-blur-md border font-body text-[11px] font-medium transition-all ${
              autoRotate
                ? 'bg-[#C6A15B]/20 text-[#DEC27B] border-[#C6A15B]'
                : 'bg-[#0A0A0A]/80 text-[#AAA49A] border-[#333] hover:border-[#C6A15B]'
            }`}
          >
            {autoRotate ? 'Xoay 3D: On' : 'Xoay 3D: Off'}
          </button>
        </div>

        {/* Mouse Drag Hint */}
        <div className="absolute bottom-4 left-4 z-10 pointer-events-none flex items-center gap-2 text-[#777] font-body text-[11px]">
          <svg className="w-4 h-4 text-[#C6A15B] animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
          </svg>
          Kéo chuột để xoay 360°
        </div>
      </div>
    </div>
  )
}
