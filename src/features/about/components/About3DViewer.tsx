import React, { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { motion } from 'framer-motion'
import { aboutContent } from '@/content/about'

interface MaterialOption {
  id: string
  name: string
  subtitle: string
  origin: string
  colorPreview: string
  roughness: number
  metalness: number
  color: number
  description: string
}

const MATERIAL_PREVIEWS: Record<string, { colorPreview: string; color: number }> = {
  'mat-leather': { colorPreview: '#9E522B', color: 0x9e522b },
  'mat-marble': { colorPreview: '#EAE6DF', color: 0xede9e1 },
  'mat-wood': { colorPreview: '#5C3D20', color: 0x5c3d20 },
  'mat-gold': { colorPreview: '#D4AF37', color: 0xd4af37 },
}

const MATERIALS: MaterialOption[] = aboutContent.viewer3D.materials.map((mat) => ({
  ...mat,
  colorPreview: MATERIAL_PREVIEWS[mat.id]?.colorPreview || '#9E522B',
  color: MATERIAL_PREVIEWS[mat.id]?.color || 0x9e522b,
  metalness: mat.id === 'mat-gold' ? 0.85 : mat.id === 'mat-wood' ? 0.1 : 0.2,
  roughness: mat.id === 'mat-marble' ? 0.2 : mat.id === 'mat-gold' ? 0.2 : 0.65,
}))

export const About3DViewer: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [selectedMat, setSelectedMat] = useState<MaterialOption>(MATERIALS[0])
  const [autoRotate, setAutoRotate] = useState(true)
  const [isWireframe, setIsWireframe] = useState(false)
  const [zoomLevel, setZoomLevel] = useState(3.6) // camera z position

  const materialRef = useRef<THREE.MeshStandardMaterial | null>(null)
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let width = container.clientWidth
    let height = container.clientHeight

    // 1. SCENE SETUP
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100)
    camera.position.set(0, 0.35, zoomLevel)
    cameraRef.current = camera

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.2
    container.appendChild(renderer.domElement)

    // Master Group
    const masterGroup = new THREE.Group()
    scene.add(masterGroup)

    // Pedestal Base & Floor Shadow
    const floorGeo = new THREE.PlaneGeometry(8, 8)
    const floorMat = new THREE.ShadowMaterial({ opacity: 0.35 })
    const floorMesh = new THREE.Mesh(floorGeo, floorMat)
    floorMesh.rotation.x = -Math.PI / 2
    floorMesh.position.y = -0.75
    floorMesh.receiveShadow = true
    masterGroup.add(floorMesh)

    const pedestalGeo = new THREE.CylinderGeometry(1.2, 1.35, 0.1, 40)
    const pedestalMat = new THREE.MeshStandardMaterial({
      color: 0x141414,
      roughness: 0.4,
      metalness: 0.6,
    })
    const pedestalMesh = new THREE.Mesh(pedestalGeo, pedestalMat)
    pedestalMesh.position.y = -0.7
    pedestalMesh.receiveShadow = true
    masterGroup.add(pedestalMesh)

    // 2. 3D LUXURY LOUNGE ARMCHAIR & SIDE TABLE MODEL
    const modelGroup = new THREE.Group()
    modelGroup.position.y = -0.05
    masterGroup.add(modelGroup)

    // Dynamic Material for Chair Upholstery & Table Surface
    const mainMaterial = new THREE.MeshStandardMaterial({
      color: selectedMat.color,
      roughness: selectedMat.roughness,
      metalness: selectedMat.metalness,
      wireframe: isWireframe,
    })
    materialRef.current = mainMaterial

    // Accent Metallic Frame Material
    const frameMat = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      metalness: 0.9,
      roughness: 0.2,
      wireframe: isWireframe,
    })

    const pillowMat = new THREE.MeshStandardMaterial({
      color: 0xded4c3,
      roughness: 0.8,
      wireframe: isWireframe,
    })

    const ceramicMat = new THREE.MeshStandardMaterial({
      color: 0xf5f3ef,
      roughness: 0.15,
      metalness: 0.05,
      wireframe: isWireframe,
    })

    // --- ARMCHAIR COMPONENTS ---
    const seatGeo = new THREE.BoxGeometry(1.0, 0.18, 0.9)
    const seatMesh = new THREE.Mesh(seatGeo, mainMaterial)
    seatMesh.position.set(-0.25, -0.22, 0)
    seatMesh.castShadow = true
    seatMesh.receiveShadow = true
    modelGroup.add(seatMesh)

    const backGeo = new THREE.CylinderGeometry(0.55, 0.55, 0.7, 32, 1, false, 0, Math.PI)
    const backMesh = new THREE.Mesh(backGeo, mainMaterial)
    backMesh.position.set(-0.25, 0.22, -0.22)
    backMesh.rotation.y = Math.PI / 2
    backMesh.castShadow = true
    modelGroup.add(backMesh)

    const armGeo = new THREE.BoxGeometry(0.14, 0.45, 0.85)
    const leftArm = new THREE.Mesh(armGeo, mainMaterial)
    leftArm.position.set(-0.8, -0.08, 0)
    leftArm.castShadow = true
    modelGroup.add(leftArm)

    const rightArm = new THREE.Mesh(armGeo, mainMaterial)
    rightArm.position.set(0.3, -0.08, 0)
    rightArm.castShadow = true
    modelGroup.add(rightArm)

    const pillowGeo = new THREE.BoxGeometry(0.32, 0.32, 0.12)
    const pillowMesh = new THREE.Mesh(pillowGeo, pillowMat)
    pillowMesh.position.set(-0.25, 0.05, -0.15)
    pillowMesh.rotation.y = -0.15
    pillowMesh.castShadow = true
    modelGroup.add(pillowMesh)

    const legGeo = new THREE.CylinderGeometry(0.025, 0.018, 0.4, 16)
    const legPositions = [
      [-0.75, -0.5, 0.38],
      [0.25, -0.5, 0.38],
      [-0.75, -0.5, -0.38],
      [0.25, -0.5, -0.38],
    ]
    legPositions.forEach(([lx, ly, lz]) => {
      const leg = new THREE.Mesh(legGeo, frameMat)
      leg.position.set(lx, ly, lz)
      leg.castShadow = true
      modelGroup.add(leg)
    })

    // --- SIDE TABLE ---
    const tableTopGeo = new THREE.CylinderGeometry(0.35, 0.35, 0.04, 32)
    const tableTop = new THREE.Mesh(tableTopGeo, mainMaterial)
    tableTop.position.set(0.8, -0.15, 0.15)
    tableTop.castShadow = true
    tableTop.receiveShadow = true
    modelGroup.add(tableTop)

    const tableLegGeo = new THREE.CylinderGeometry(0.025, 0.025, 0.5, 16)
    const tableLeg = new THREE.Mesh(tableLegGeo, frameMat)
    tableLeg.position.set(0.8, -0.42, 0.15)
    tableLeg.castShadow = true
    modelGroup.add(tableLeg)

    const tableBaseGeo = new THREE.CylinderGeometry(0.22, 0.22, 0.03, 32)
    const tableBase = new THREE.Mesh(tableBaseGeo, frameMat)
    tableBase.position.set(0.8, -0.66, 0.15)
    tableBase.castShadow = true
    modelGroup.add(tableBase)

    const cupGeo = new THREE.CylinderGeometry(0.04, 0.03, 0.06, 24)
    const cup = new THREE.Mesh(cupGeo, ceramicMat)
    cup.position.set(0.8, -0.1, 0.15)
    cup.castShadow = true
    modelGroup.add(cup)

    // 3. LIGHTING SYSTEM
    const ambientLight = new THREE.AmbientLight(0xfff8ee, 1.2)
    scene.add(ambientLight)

    const keyLight = new THREE.DirectionalLight(0xfffaed, 2.5)
    keyLight.position.set(4, 5, 4)
    keyLight.castShadow = true
    keyLight.shadow.mapSize.width = 1024
    keyLight.shadow.mapSize.height = 1024
    keyLight.shadow.bias = -0.0005
    scene.add(keyLight)

    const fillLight = new THREE.DirectionalLight(0xc6a15b, 1.2)
    fillLight.position.set(-4, 3, 2)
    scene.add(fillLight)

    const rimLight = new THREE.SpotLight(0xffffff, 2.0, 10, Math.PI / 4, 0.5)
    rimLight.position.set(0, 4, -4)
    scene.add(rimLight)

    // 4. MOUSE & TOUCH DRAG CONTROLS
    let isDragging = false
    let prevMouseX = 0
    let prevMouseY = 0

    const handleMouseDown = (e: MouseEvent) => {
      isDragging = true
      prevMouseX = e.clientX
      prevMouseY = e.clientY
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return
      const deltaX = e.clientX - prevMouseX
      const deltaY = e.clientY - prevMouseY

      modelGroup.rotation.y += deltaX * 0.008
      modelGroup.rotation.x = Math.max(-0.4, Math.min(0.4, modelGroup.rotation.x + deltaY * 0.008))

      prevMouseX = e.clientX
      prevMouseY = e.clientY
    }

    const handleMouseUp = () => {
      isDragging = false
    }

    const domElem = renderer.domElement
    domElem.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)

    // Touch support
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDragging = true
        prevMouseX = e.touches[0].clientX
        prevMouseY = e.touches[0].clientY
      }
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging || e.touches.length !== 1) return
      const deltaX = e.touches[0].clientX - prevMouseX
      const deltaY = e.touches[0].clientY - prevMouseY

      modelGroup.rotation.y += deltaX * 0.008
      modelGroup.rotation.x = Math.max(-0.4, Math.min(0.4, modelGroup.rotation.x + deltaY * 0.008))

      prevMouseX = e.touches[0].clientX
      prevMouseY = e.touches[0].clientY
    }

    const handleTouchEnd = () => {
      isDragging = false
    }

    domElem.addEventListener('touchstart', handleTouchStart, { passive: true })
    window.addEventListener('touchmove', handleTouchMove, { passive: true })
    window.addEventListener('touchend', handleTouchEnd)

    let animId: number

    const animate = () => {
      animId = requestAnimationFrame(animate)

      if (autoRotate && !isDragging) {
        modelGroup.rotation.y += 0.006
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
      domElem.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
      domElem.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('touchend', handleTouchEnd)
      window.removeEventListener('resize', handleResize)
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
      renderer.dispose()
    }
  }, [autoRotate])

  // Update material & wireframe on state change
  useEffect(() => {
    if (materialRef.current) {
      materialRef.current.color.setHex(selectedMat.color)
      materialRef.current.roughness = selectedMat.roughness
      materialRef.current.metalness = selectedMat.metalness
      materialRef.current.wireframe = isWireframe
      materialRef.current.needsUpdate = true
    }
  }, [selectedMat, isWireframe])

  // Update camera zoom
  useEffect(() => {
    if (cameraRef.current) {
      cameraRef.current.position.z = zoomLevel
    }
  }, [zoomLevel])

  const inspector = aboutContent.viewer3D.materialInspector

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-7xl mx-auto px-6 md:px-12 py-12">
      {/* 3D Canvas Showcase Box */}
      <div className="lg:col-span-7 relative h-[450px] sm:h-[520px] bg-[#0E0E0E] border border-[#C6A15B]/30 rounded-xl overflow-hidden shadow-2xl">
        <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

        {/* Top Controls Bar */}
        <div className="absolute top-4 left-4 z-10 flex flex-wrap items-center gap-2">
          <button
            onClick={() => setAutoRotate(!autoRotate)}
            className={`px-3 py-1.5 rounded-full text-xs font-body font-medium transition-all backdrop-blur-md border ${
              autoRotate
                ? 'bg-[#C6A15B] text-[#0A0A0A] border-[#C6A15B] shadow-[0_0_10px_#C6A15B]'
                : 'bg-[#0A0A0A]/70 text-[#AAA49A] border-[#C6A15B]/30 hover:text-[#F3EFE7]'
            }`}
          >
            {autoRotate ? inspector.toggleRotate.stop : inspector.toggleRotate.start}
          </button>

          <button
            onClick={() => setIsWireframe(!isWireframe)}
            className={`px-3 py-1.5 rounded-full text-xs font-body font-medium transition-all backdrop-blur-md border ${
              isWireframe
                ? 'bg-[#C6A15B] text-[#0A0A0A] border-[#C6A15B] shadow-[0_0_10px_#C6A15B]'
                : 'bg-[#0A0A0A]/70 text-[#AAA49A] border-[#C6A15B]/30 hover:text-[#F3EFE7]'
            }`}
          >
            {isWireframe ? '🔷 Hiển Thị Mô Hình Bề Mặt' : '🕸️ Xem Khung Khung Lưới (Wireframe)'}
          </button>
        </div>

        {/* Zoom Level Controls */}
        <div className="absolute top-4 right-4 z-10 flex flex-col gap-1.5 bg-[#0A0A0A]/80 p-1.5 rounded-lg border border-[#C6A15B]/30 backdrop-blur-md">
          <button
            onClick={() => setZoomLevel((z) => Math.max(2.2, z - 0.4))}
            title="Phóng to 3D"
            className="w-7 h-7 rounded bg-[#141414] text-[#DEC27B] text-sm flex items-center justify-center hover:bg-[#C6A15B] hover:text-[#0A0A0A]"
          >
            +
          </button>
          <button
            onClick={() => setZoomLevel((z) => Math.min(5.0, z + 0.4))}
            title="Thu nhỏ 3D"
            className="w-7 h-7 rounded bg-[#141414] text-[#DEC27B] text-sm flex items-center justify-center hover:bg-[#C6A15B] hover:text-[#0A0A0A]"
          >
            −
          </button>
        </div>

        {/* Drag Hint */}
        <div className="absolute bottom-4 left-4 z-10 pointer-events-none text-[11px] text-[#AAA49A] bg-[#0A0A0A]/80 px-3 py-1 rounded-full border border-[#C6A15B]/20 backdrop-blur-sm flex items-center gap-1.5">
          <svg className="w-3.5 h-3.5 text-[#C6A15B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
          </svg>
          {inspector.hint}
        </div>
      </div>

      {/* Material Selection Panel & Specs */}
      <div className="lg:col-span-5 space-y-6">
        <div>
          <span className="font-body text-[11px] font-medium uppercase tracking-[0.22em] text-[#C6A15B] mb-2 block">
            {inspector.eyebrow}
          </span>
          <h3 className="font-display text-2xl md:text-3xl font-normal text-[#F3EFE7] mb-2 tracking-[-0.015em]">
            {inspector.title}
          </h3>
          <p className="font-body text-sm text-[#AAA49A] font-normal leading-[1.65] tracking-[-0.005em]">
            {inspector.description}
          </p>
        </div>

        {/* Material Swatches Selection Grid */}
        <div className="grid grid-cols-2 gap-3">
          {MATERIALS.map((mat) => {
            const isSelected = selectedMat.id === mat.id
            return (
              <button
                key={mat.id}
                onClick={() => setSelectedMat(mat)}
                className={`p-3 rounded-md border text-left transition-all duration-300 flex items-center gap-3 ${
                  isSelected
                    ? 'bg-[#181818] border-[#C6A15B] shadow-[0_0_12px_rgba(198,161,91,0.25)]'
                    : 'bg-[#101010] border-[#C6A15B]/15 hover:border-[#C6A15B]/40 hover:bg-[#141414]'
                }`}
              >
                <span
                  className="w-5 h-5 rounded-full border border-white/20 shrink-0 shadow-inner"
                  style={{ backgroundColor: mat.colorPreview }}
                />
                <div className="overflow-hidden">
                  <div
                    className={`font-body text-xs font-medium truncate ${
                      isSelected ? 'text-[#DEC27B]' : 'text-[#F3EFE7]'
                    }`}
                  >
                    {mat.name}
                  </div>
                  <div className="font-body text-[10px] text-[#AAA49A] truncate">{mat.subtitle}</div>
                </div>
              </button>
            )
          })}
        </div>

        {/* Selected Material Info Card */}
        <motion.div
          key={selectedMat.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="p-4 rounded-md bg-[#121212] border border-[#C6A15B]/25 space-y-3 font-body"
        >
          <div className="flex items-center justify-between text-xs border-b border-[#C6A15B]/15 pb-2">
            <span className="text-[#C6A15B] font-medium uppercase tracking-[0.1em]">{inspector.originLabel}</span>
            <span className="text-[#F3EFE7] font-medium">{selectedMat.origin}</span>
          </div>
          <p className="font-body text-xs text-[#AAA49A] leading-[1.65] font-normal">
            {selectedMat.description}
          </p>

          {/* Properties Bars */}
          <div className="space-y-2 pt-1">
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-[#AAA49A]">{inspector.metalnessLabel}</span>
              <span className="text-[#DEC27B] font-mono">{Math.round(selectedMat.metalness * 100)}%</span>
            </div>
            <div className="w-full h-1 bg-[#202020] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#C6A15B] transition-all duration-500"
                style={{ width: `${selectedMat.metalness * 100}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-[11px] pt-1">
              <span className="text-[#AAA49A]">{inspector.roughnessLabel}</span>
              <span className="text-[#DEC27B] font-mono">{Math.round(selectedMat.roughness * 100)}%</span>
            </div>
            <div className="w-full h-1 bg-[#202020] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#C6A15B] transition-all duration-500"
                style={{ width: `${selectedMat.roughness * 100}%` }}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
