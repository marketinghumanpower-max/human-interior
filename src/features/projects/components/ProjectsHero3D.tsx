import React, { useEffect, useRef, useState, useMemo } from 'react'
import * as THREE from 'three'
import { motion, AnimatePresence } from 'framer-motion'
import { PROJECTS_DATA, type Project } from '../data/projectsData'

export const ProjectsHero3D: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [isRotating, setIsRotating] = useState(true)
  const [renderMode, setRenderMode] = useState<'real' | 'blueprint'>('real')

  const featuredProjects = useMemo(() => PROJECTS_DATA.slice(0, 5), [])
  const activeProject: Project = featuredProjects[activeIndex] || featuredProjects[0]

  const sceneRef = useRef<THREE.Scene | null>(null)
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const projectPanelsRef = useRef<THREE.Group[]>([])
  const texturesRef = useRef<(THREE.CanvasTexture | THREE.Texture)[]>([])

  // Helper to create a fallback canvas texture if network fails
  const createFallbackTexture = (title: string, color = '#1a1918') => {
    const canvas = document.createElement('canvas')
    canvas.width = 1024
    canvas.height = 768
    const ctx = canvas.getContext('2d')
    if (ctx) {
      ctx.fillStyle = color
      ctx.fillRect(0, 0, 1024, 768)

      // Architectural Grid Background
      ctx.strokeStyle = 'rgba(198, 161, 91, 0.15)'
      ctx.lineWidth = 2
      for (let x = 0; x < 1024; x += 64) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, 768)
        ctx.stroke()
      }
      for (let y = 0; y < 768; y += 64) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(1024, y)
        ctx.stroke()
      }

      // Title Text
      ctx.fillStyle = '#C6A15B'
      ctx.font = 'bold 36px serif'
      ctx.textAlign = 'center'
      ctx.fillText(title, 512, 384)

      ctx.fillStyle = '#A0A0A0'
      ctx.font = '20px sans-serif'
      ctx.fillText('THI CÔNG BỞI HUMAN INTERIOR', 512, 430)
    }
    const texture = new THREE.CanvasTexture(canvas)
    texture.colorSpace = THREE.SRGBColorSpace
    return texture
  }

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let width = container.clientWidth
    let height = container.clientHeight

    // 1. Scene & Camera Setup
    const scene = new THREE.Scene()
    sceneRef.current = scene
    scene.background = new THREE.Color(0x060606)

    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100)
    cameraRef.current = camera
    camera.position.set(0, 0.4, 6.2)

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    rendererRef.current = renderer
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

    // Floor Grid / Reflective Architectural Stage
    const gridHelper = new THREE.GridHelper(20, 20, 0xc6a15b, 0x1f1f1f)
    gridHelper.position.y = -1.8
    scene.add(gridHelper)

    // Ambient & Directional Lighting
    const ambientLight = new THREE.AmbientLight(0xfff8ee, 1.8)
    scene.add(ambientLight)

    const goldSpotLight = new THREE.SpotLight(0xc6a15b, 7, 15, Math.PI / 3, 0.5)
    goldSpotLight.position.set(4, 5, 5)
    goldSpotLight.castShadow = true
    scene.add(goldSpotLight)

    const blueSpotLight = new THREE.SpotLight(0x3a5a78, 4, 15, Math.PI / 3, 0.5)
    blueSpotLight.position.set(-5, -2, -2)
    scene.add(blueSpotLight)

    // Preload Textures for Featured Projects
    const textureLoader = new THREE.TextureLoader()
    const projectTextures: (THREE.Texture | THREE.CanvasTexture)[] = []

    featuredProjects.forEach((proj) => {
      const fallback = createFallbackTexture(proj.title)
      textureLoader.load(
        proj.image,
        (loadedTex) => {
          loadedTex.colorSpace = THREE.SRGBColorSpace
          loadedTex.minFilter = THREE.LinearFilter
          loadedTex.magFilter = THREE.LinearFilter
          // Update material map if ready
          const panelIndex = featuredProjects.findIndex((p) => p.id === proj.id)
          if (panelIndex !== -1 && projectPanelsRef.current[panelIndex]) {
            const mesh = projectPanelsRef.current[panelIndex].children[0] as THREE.Mesh
            if (mesh && mesh.material) {
              const materials = mesh.material as THREE.Material[]
              if (Array.isArray(materials)) {
                const frontMat = materials[4] as THREE.MeshStandardMaterial
                if (frontMat) frontMat.map = loadedTex
                frontMat.needsUpdate = true
              }
            }
          }
        },
        undefined,
        () => {
          console.warn(`Failed to load texture for ${proj.title}, fallback used.`)
        }
      )
      projectTextures.push(fallback)
    })
    texturesRef.current = projectTextures

    // Build 3D Project Exhibition Carousel Ring
    const panelsGroup = new THREE.Group()
    masterGroup.add(panelsGroup)

    const radius = 3.6
    const panels: THREE.Group[] = []

    featuredProjects.forEach((proj, idx) => {
      const panelGroup = new THREE.Group()
      const angle = (idx - activeIndex) * (Math.PI / 3.2)
      
      const posX = Math.sin(angle) * radius
      const posZ = Math.cos(angle) * radius - radius + 0.5
      panelGroup.position.set(posX, 0, posZ)
      panelGroup.rotation.y = -angle * 0.7

      // Panel Dimensions
      const pWidth = 3.2
      const pHeight = 2.0
      const pDepth = 0.12

      // Materials: Gold border sides, photo on front
      const frameMat = new THREE.MeshStandardMaterial({
        color: 0xc6a15b,
        metalness: 0.85,
        roughness: 0.25,
      })

      const backMat = new THREE.MeshStandardMaterial({
        color: 0x111111,
        metalness: 0.5,
        roughness: 0.5,
      })

      const frontPhotoMat = new THREE.MeshStandardMaterial({
        map: projectTextures[idx],
        roughness: 0.2,
        metalness: 0.05,
      })

      // Box geometry materials array: [right, left, top, bottom, front, back]
      const cubeMaterials = [frameMat, frameMat, frameMat, frameMat, frontPhotoMat, backMat]
      const panelGeo = new THREE.BoxGeometry(pWidth, pHeight, pDepth)
      const panelMesh = new THREE.Mesh(panelGeo, cubeMaterials)
      panelMesh.castShadow = true
      panelMesh.receiveShadow = true
      panelGroup.add(panelMesh)

      // Gold Outer Architectural Edge Frame
      const wireGeo = new THREE.EdgesGeometry(panelGeo)
      const wireMat = new THREE.LineBasicMaterial({
        color: 0xc6a15b,
        linewidth: 2,
        transparent: true,
        opacity: 0.8,
      })
      const edgeLines = new THREE.LineSegments(wireGeo, wireMat)
      panelGroup.add(edgeLines)

      // 3D Tag Base
      const tagGeo = new THREE.PlaneGeometry(2.4, 0.4)
      const tagCanvas = document.createElement('canvas')
      tagCanvas.width = 512
      tagCanvas.height = 96
      const tagCtx = tagCanvas.getContext('2d')
      if (tagCtx) {
        tagCtx.fillStyle = 'rgba(10, 10, 10, 0.85)'
        tagCtx.fillRect(0, 0, 512, 96)
        tagCtx.strokeStyle = '#C6A15B'
        tagCtx.lineWidth = 4
        tagCtx.strokeRect(4, 4, 504, 88)
        tagCtx.fillStyle = '#DEC27B'
        tagCtx.font = 'bold 24px sans-serif'
        tagCtx.textAlign = 'center'
        tagCtx.fillText(proj.title.toUpperCase(), 256, 40)
        tagCtx.fillStyle = '#A0A0A0'
        tagCtx.font = '18px sans-serif'
        tagCtx.fillText(`${proj.area} • ${proj.categoryLabel} • Thi công ${proj.year}`, 256, 72)
      }
      const tagTex = new THREE.CanvasTexture(tagCanvas)
      tagTex.colorSpace = THREE.SRGBColorSpace
      const tagMat = new THREE.MeshBasicMaterial({ map: tagTex, transparent: true })
      const tagMesh = new THREE.Mesh(tagGeo, tagMat)
      tagMesh.position.set(0, -1.35, 0.1)
      panelGroup.add(tagMesh)

      panelsGroup.add(panelGroup)
      panels.push(panelGroup)
    })

    projectPanelsRef.current = panels

    // Floating Particles
    const particleCount = 70
    const particlePositions = new Float32Array(particleCount * 3)
    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 12
      particlePositions[i + 1] = (Math.random() - 0.5) * 6
      particlePositions[i + 2] = (Math.random() - 0.5) * 8
    }
    const particleGeo = new THREE.BufferGeometry()
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3))
    const particleMat = new THREE.PointsMaterial({
      color: 0xc6a15b,
      size: 0.035,
      transparent: true,
      opacity: 0.35,
    })
    const particles = new THREE.Points(particleGeo, particleMat)
    scene.add(particles)

    // Mouse Parallax Interaction
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 }
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      mouse.targetX = ((e.clientX - rect.left) / rect.width) * 2 - 1
      mouse.targetY = -(((e.clientY - rect.top) / rect.height) * 2 - 1)
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })

    // Animation Loop
    let animId: number
    const clock = new THREE.Clock()

    const animate = () => {
      animId = requestAnimationFrame(animate)
      const elapsedTime = clock.getElapsedTime()

      // Smooth mouse lerp
      mouse.x += (mouse.targetX - mouse.x) * 0.05
      mouse.y += (mouse.targetY - mouse.y) * 0.05

      // Smoothly reposition project panels according to activeIndex
      projectPanelsRef.current.forEach((panelGroup, idx) => {
        const offset = idx - activeIndex
        const targetAngle = offset * (Math.PI / 3.4)
        
        const targetX = Math.sin(targetAngle) * radius
        const targetZ = Math.cos(targetAngle) * radius - radius + 0.5
        const targetRotY = -targetAngle * 0.65
        const targetScale = idx === activeIndex ? 1.05 : 0.82

        panelGroup.position.x += (targetX - panelGroup.position.x) * 0.08
        panelGroup.position.z += (targetZ - panelGroup.position.z) * 0.08
        panelGroup.position.y = Math.sin(elapsedTime * 1.5 + idx) * 0.04
        panelGroup.rotation.y += (targetRotY - panelGroup.rotation.y) * 0.08
        
        panelGroup.scale.x += (targetScale - panelGroup.scale.x) * 0.08
        panelGroup.scale.y += (targetScale - panelGroup.scale.y) * 0.08
        panelGroup.scale.z += (targetScale - panelGroup.scale.z) * 0.08
      })

      // Camera Parallax & Subtle Rotation
      if (cameraRef.current) {
        cameraRef.current.position.x = mouse.x * 0.4
        cameraRef.current.position.y = 0.4 + mouse.y * 0.25
        cameraRef.current.lookAt(0, 0, 0)
      }

      particles.rotation.y = elapsedTime * 0.03
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
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
      renderer.dispose()
    }
  }, [activeIndex, featuredProjects])

  // Update wireframe / blueprint render mode on 3D panels
  useEffect(() => {
    projectPanelsRef.current.forEach((group) => {
      const mesh = group.children[0] as THREE.Mesh
      const edgeLines = group.children[1] as THREE.LineSegments
      if (mesh && mesh.material) {
        const materials = mesh.material as THREE.Material[]
        if (Array.isArray(materials)) {
          materials.forEach((mat) => {
            if (mat) {
              ;(mat as THREE.MeshStandardMaterial).wireframe = renderMode === 'blueprint'
            }
          })
        }
      }
      if (edgeLines && edgeLines.material) {
        const lineMat = edgeLines.material as THREE.LineBasicMaterial
        lineMat.color.setHex(renderMode === 'blueprint' ? 0x00f0ff : 0xc6a15b)
      }
    })
  }, [renderMode])

  // Auto rotation interval
  useEffect(() => {
    if (!isRotating) return
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % featuredProjects.length)
    }, 4500)
    return () => clearInterval(timer)
  }, [isRotating, featuredProjects.length])

  return (
    <div className="relative w-full h-[60vh] md:h-[75vh] bg-[#060606] overflow-hidden flex items-center justify-center border-b border-[#C6A15B]/20">
      {/* 3D WebGL Canvas Container */}
      <div ref={containerRef} className="absolute inset-0 z-0 cursor-grab active:cursor-grabbing" />

      {/* Ambient Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-[#080808]/75 pointer-events-none z-10" />
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#060606]/30 to-[#060606]/90 pointer-events-none z-10" />

      {/* Floating Badge Header Overlay */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 z-20 text-center pointer-events-none w-full px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#141414]/90 border border-[#C6A15B]/40 backdrop-blur-md shadow-2xl">
            <span className="w-2 h-2 rounded-full bg-[#C6A15B] animate-ping" />
            <span className="font-body text-[11px] font-medium uppercase tracking-[0.22em] text-[#DEC27B]">
              TRIỂN LÃM 3D KHÔNG GIAN DỰ ÁN THI CÔNG THỰC TẾ
            </span>
          </div>
        </motion.div>
      </div>

      {/* Active Project Floating Details Overlay (Left Panel) */}
      <div className="absolute left-6 md:left-12 top-1/2 -translate-y-1/2 z-20 max-w-sm hidden sm:block pointer-events-none font-body">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeProject.id}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4 }}
            className="p-5 rounded-2xl bg-[#0e0e0e]/85 backdrop-blur-xl border border-[#C6A15B]/30 shadow-2xl text-left"
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded text-[10px] uppercase font-medium tracking-wider bg-[#C6A15B]/20 text-[#DEC27B] border border-[#C6A15B]/30">
                {activeProject.categoryLabel}
              </span>
              <span className="text-xs text-[#AAA49A]">Năm {activeProject.year}</span>
            </div>

            <h2 className="font-display text-xl font-normal text-[#F3EFE7] mb-1 leading-snug tracking-[-0.01em]">
              {activeProject.title}
            </h2>

            <p className="font-body text-xs text-[#AAA49A] mb-3 line-clamp-2 leading-relaxed font-normal">
              {activeProject.subtitle}
            </p>

            <div className="space-y-1.5 text-[11px] text-[#C6A15B] border-t border-[#C6A15B]/15 pt-3 font-body">
              <div className="flex justify-between">
                <span className="text-[#888]">📍 Vị trí:</span>
                <span className="font-medium text-[#DEC27B] truncate max-w-[180px]">{activeProject.location}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#888]">📐 Diện tích:</span>
                <span className="font-medium text-[#DEC27B]">{activeProject.area}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#888]">🏛️ Phong cách:</span>
                <span className="font-medium text-[#DEC27B]">{activeProject.style}</span>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Interactive Bottom Control Bar */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 w-full max-w-4xl px-4 flex flex-col md:flex-row items-center justify-between gap-3 pointer-events-auto font-body">
        {/* Project Selector Tabs */}
        <div className="flex items-center gap-1.5 bg-[#0E0E0E]/90 backdrop-blur-md border border-[#C6A15B]/30 p-1.5 rounded-full overflow-x-auto max-w-full">
          {featuredProjects.map((proj, idx) => (
            <button
              key={proj.id}
              onClick={() => setActiveIndex(idx)}
              className={`px-3 py-1.5 rounded-full text-xs font-body whitespace-nowrap transition-all duration-300 ${
                idx === activeIndex
                  ? 'bg-[#C6A15B] text-[#0E0E0E] font-medium shadow-lg scale-105'
                  : 'text-[#AAA49A] hover:text-[#DEC27B] hover:bg-[#C6A15B]/10'
              }`}
            >
              {proj.title.split(' ')[0]} {proj.title.split(' ')[1] || ''}
            </button>
          ))}
        </div>

        {/* Display Mode & Animation Controls */}
        <div className="flex items-center gap-2 bg-[#0E0E0E]/90 backdrop-blur-md border border-[#C6A15B]/30 p-1.5 rounded-full text-xs text-[#DEC27B]">
          <button
            onClick={() => setRenderMode(renderMode === 'real' ? 'blueprint' : 'real')}
            className={`px-3.5 py-1.5 rounded-full transition-all duration-300 flex items-center gap-1.5 ${
              renderMode === 'blueprint'
                ? 'bg-[#00F0FF]/20 text-[#00F0FF] border border-[#00F0FF]/40'
                : 'bg-[#C6A15B]/20 text-[#DEC27B] hover:bg-[#C6A15B]/30'
            }`}
          >
            <span>{renderMode === 'real' ? '📐 Bản vẽ 3D Blueprint' : '🖼️ Thi công Thực tế'}</span>
          </button>

          <div className="w-[1px] h-4 bg-[#C6A15B]/25" />

          <button
            onClick={() => setIsRotating(!isRotating)}
            className={`px-3 py-1.5 rounded-full transition-all duration-300 ${
              isRotating ? 'bg-[#C6A15B]/20 text-[#DEC27B]' : 'hover:bg-[#C6A15B]/10 text-[#AAA49A]'
            }`}
          >
            {isRotating ? '⏸️ Tạm dừng' : '🔄 Xoay 3D'}
          </button>
        </div>
      </div>
    </div>
  )
}

