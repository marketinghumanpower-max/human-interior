import React, { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { motion, AnimatePresence } from 'framer-motion'
import { aboutContent } from '@/content/about'

interface HotspotData {
  id: string
  title: string
  subtitle: string
  description: string
  pos: THREE.Vector3
}

const HOTSPOT_POSITIONS: Record<string, THREE.Vector3> = {
  'hs-sofa': new THREE.Vector3(0, -0.2, -0.4),
  'hs-table': new THREE.Vector3(-0.1, -0.5, 0.6),
  'hs-lamp': new THREE.Vector3(0.8, 0.8, 0.6),
  'hs-plant': new THREE.Vector3(-1.7, 0.1, 0.2),
}

const HOTSPOTS: HotspotData[] = aboutContent.viewer3D.hotspots.map((hs) => ({
  ...hs,
  pos: HOTSPOT_POSITIONS[hs.id] || new THREE.Vector3(0, 0, 0),
}))

// Preset camera positions & targets
const CAMERA_PRESETS = {
  perspective: { pos: new THREE.Vector3(0, 0.8, 5.2), target: new THREE.Vector3(0, 0, 0) },
  front: { pos: new THREE.Vector3(0, 0.1, 4.6), target: new THREE.Vector3(0, 0, 0) },
  detail: { pos: new THREE.Vector3(-0.4, -0.1, 2.3), target: new THREE.Vector3(-0.2, -0.2, -0.2) },
  exploded: { pos: new THREE.Vector3(2.0, 2.2, 5.6), target: new THREE.Vector3(0, 0, 0) },
}

export const AboutHero3D: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeHotspot, setActiveHotspot] = useState<HotspotData | null>(HOTSPOTS[0])
  const [screenCoords, setScreenCoords] = useState<{ [key: string]: { x: number; y: number; visible: boolean } }>({})

  // Interactive Product Presentation States
  const [isExploded, setIsExploded] = useState(false)
  const [explosionAmount, setExplosionAmount] = useState(0) // 0 to 1
  const [activeCameraPreset, setActiveCameraPreset] = useState<'perspective' | 'front' | 'detail' | 'exploded'>('perspective')
  const [activeLighting, setActiveLighting] = useState<'studio' | 'daylight' | 'spotlight'>('studio')
  const [selectedSwatch, setSelectedSwatch] = useState<number>(0)
  const [showSpecs, setShowSpecs] = useState(false)

  // References for Three.js state sync
  const explosionRef = useRef(0)
  const targetCameraPosRef = useRef(CAMERA_PRESETS.perspective.pos.clone())
  const targetCameraTargetRef = useRef(CAMERA_PRESETS.perspective.target.clone())
  const lightingRef = useRef(activeLighting)
  const mainMaterialRef = useRef<THREE.MeshStandardMaterial | null>(null)

  // Sync state to refs for high-performance animation loop
  useEffect(() => {
    explosionRef.current = isExploded ? 1 : explosionAmount
  }, [isExploded, explosionAmount])

  useEffect(() => {
    const preset = CAMERA_PRESETS[activeCameraPreset]
    if (preset) {
      targetCameraPosRef.current.copy(preset.pos)
      targetCameraTargetRef.current.copy(preset.target)
    }
  }, [activeCameraPreset])

  useEffect(() => {
    lightingRef.current = activeLighting
  }, [activeLighting])

  useEffect(() => {
    const matConfig = aboutContent.viewer3D.materials[selectedSwatch]
    if (mainMaterialRef.current && matConfig) {
      const colorHex =
        matConfig.id === 'mat-leather'
          ? 0x9e522b
          : matConfig.id === 'mat-marble'
          ? 0xede9e1
          : matConfig.id === 'mat-wood'
          ? 0x5c3d20
          : 0xd4af37
      mainMaterialRef.current.color.setHex(colorHex)
      mainMaterialRef.current.roughness = matConfig.id === 'mat-marble' ? 0.25 : matConfig.id === 'mat-gold' ? 0.2 : 0.7
      mainMaterialRef.current.metalness = matConfig.id === 'mat-gold' ? 0.85 : 0.1
      mainMaterialRef.current.needsUpdate = true
    }
  }, [selectedSwatch])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let width = container.clientWidth
    let height = container.clientHeight

    // 1. SCENE & CAMERA SETUP
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0x0a0a0a)

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100)
    camera.position.copy(CAMERA_PRESETS.perspective.pos)

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.2
    container.appendChild(renderer.domElement)

    // Master Group for Mouse Parallax
    const masterGroup = new THREE.Group()
    scene.add(masterGroup)

    // Procedural Textures
    const createWoodTexture = () => {
      const canvas = document.createElement('canvas')
      canvas.width = 512
      canvas.height = 512
      const ctx = canvas.getContext('2d')
      if (ctx) {
        ctx.fillStyle = '#4a2f1b'
        ctx.fillRect(0, 0, 512, 512)
        ctx.strokeStyle = '#2d1b0e'
        ctx.lineWidth = 4
        for (let i = 0; i < 40; i++) {
          ctx.beginPath()
          ctx.moveTo(0, i * 13)
          ctx.bezierCurveTo(170, i * 13 + (i % 3) * 8, 340, i * 13 - (i % 2) * 8, 512, i * 13)
          ctx.stroke()
        }
      }
      const tex = new THREE.CanvasTexture(canvas)
      tex.wrapS = THREE.RepeatWrapping
      tex.wrapT = THREE.RepeatWrapping
      return tex
    }

    const createFabricTexture = () => {
      const canvas = document.createElement('canvas')
      canvas.width = 256
      canvas.height = 256
      const ctx = canvas.getContext('2d')
      if (ctx) {
        ctx.fillStyle = '#55585e'
        ctx.fillRect(0, 0, 256, 256)
        ctx.fillStyle = 'rgba(240, 240, 240, 0.08)'
        for (let x = 0; x < 256; x += 4) ctx.fillRect(x, 0, 2, 256)
        for (let y = 0; y < 256; y += 4) ctx.fillRect(0, y, 256, 2)
      }
      const tex = new THREE.CanvasTexture(canvas)
      tex.wrapS = THREE.RepeatWrapping
      tex.wrapT = THREE.RepeatWrapping
      return tex
    }

    const woodTex = createWoodTexture()
    woodTex.repeat.set(3, 3)

    const fabricTex = createFabricTexture()
    fabricTex.repeat.set(4, 4)

    // --- INTERIOR & PRODUCT MATERIALS ---
    const sofaFabricMat = new THREE.MeshStandardMaterial({
      map: fabricTex,
      color: 0x686c73,
      roughness: 0.8,
      metalness: 0.05,
    })
    mainMaterialRef.current = sofaFabricMat

    const pillowMat = new THREE.MeshStandardMaterial({
      color: 0xd9cebe,
      roughness: 0.75,
    })

    const accentPillowMat = new THREE.MeshStandardMaterial({
      color: 0xc6a15b,
      roughness: 0.6,
      metalness: 0.2,
    })

    const woodMat = new THREE.MeshStandardMaterial({
      map: woodTex,
      roughness: 0.4,
      metalness: 0.05,
    })

    const goldMat = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      metalness: 0.9,
      roughness: 0.18,
    })

    const darkMetalMat = new THREE.MeshStandardMaterial({
      color: 0x1a1a1a,
      metalness: 0.8,
      roughness: 0.3,
    })

    const rugMat = new THREE.MeshStandardMaterial({
      color: 0xded8cb,
      roughness: 0.95,
    })

    const wallMat = new THREE.MeshStandardMaterial({
      color: 0x1c1b1a,
      roughness: 0.9,
    })

    const plantMat = new THREE.MeshStandardMaterial({
      color: 0x274e27,
      roughness: 0.5,
    })

    const ceramicMat = new THREE.MeshStandardMaterial({
      color: 0xf5f3ef,
      roughness: 0.15,
      metalness: 0.05,
    })

    // --- 3D PRODUCT COMPONENTS (FOR EXPLODED ASSEMBLY) ---
    // Ground & Room Wall
    const floorGeo = new THREE.PlaneGeometry(14, 10)
    const floorMesh = new THREE.Mesh(floorGeo, woodMat)
    floorMesh.rotation.x = -Math.PI / 2
    floorMesh.position.y = -1.1
    floorMesh.receiveShadow = true
    masterGroup.add(floorMesh)

    const rugGeo = new THREE.BoxGeometry(4.6, 0.02, 2.8)
    const rugMesh = new THREE.Mesh(rugGeo, rugMat)
    rugMesh.position.set(0, -1.09, 0.4)
    rugMesh.receiveShadow = true
    masterGroup.add(rugMesh)

    const backWallGeo = new THREE.PlaneGeometry(14, 7)
    const backWallMesh = new THREE.Mesh(backWallGeo, wallMat)
    backWallMesh.position.set(0, 2.4, -2.2)
    backWallMesh.receiveShadow = true
    masterGroup.add(backWallMesh)

    const trimGeo = new THREE.BoxGeometry(14, 0.04, 0.04)
    const trimMesh = new THREE.Mesh(trimGeo, goldMat)
    trimMesh.position.set(0, 1.8, -2.18)
    masterGroup.add(trimMesh)

    // SOFA EXPLODED COMPONENT GROUPS
    const sofaMasterGroup = new THREE.Group()
    sofaMasterGroup.position.set(0, 0, -0.4)
    masterGroup.add(sofaMasterGroup)

    // 1. Sofa Base Frame
    const sofaBaseGeo = new THREE.BoxGeometry(2.8, 0.35, 1.0)
    const sofaBaseMesh = new THREE.Mesh(sofaBaseGeo, sofaFabricMat)
    sofaBaseMesh.castShadow = true
    sofaBaseMesh.receiveShadow = true
    const sofaBaseGroup = new THREE.Group()
    sofaBaseGroup.add(sofaBaseMesh)
    sofaBaseGroup.position.set(0, -0.7, 0)
    sofaMasterGroup.add(sofaBaseGroup)

    // 2. Sofa Backrest Component
    const sofaBackGeo = new THREE.BoxGeometry(2.8, 0.7, 0.25)
    const sofaBackMesh = new THREE.Mesh(sofaBackGeo, sofaFabricMat)
    sofaBackMesh.castShadow = true
    const sofaBackGroup = new THREE.Group()
    sofaBackGroup.add(sofaBackMesh)
    sofaBackGroup.position.set(0, -0.18, -0.38)
    sofaMasterGroup.add(sofaBackGroup)

    // 3. Left & Right Armrests
    const armGeo = new THREE.BoxGeometry(0.25, 0.6, 1.0)
    const leftArmMesh = new THREE.Mesh(armGeo, sofaFabricMat)
    leftArmMesh.castShadow = true
    const leftArmGroup = new THREE.Group()
    leftArmGroup.add(leftArmMesh)
    leftArmGroup.position.set(-1.4, -0.28, 0)
    sofaMasterGroup.add(leftArmGroup)

    const rightArmMesh = new THREE.Mesh(armGeo, sofaFabricMat)
    rightArmMesh.castShadow = true
    const rightArmGroup = new THREE.Group()
    rightArmGroup.add(rightArmMesh)
    rightArmGroup.position.set(1.4, -0.28, 0)
    sofaMasterGroup.add(rightArmGroup)

    // 4. Seat Cushions
    const cushionsGroup = new THREE.Group()
    cushionsGroup.position.set(0, -0.43, 0.04)
    const cushionGeo = new THREE.BoxGeometry(0.78, 0.2, 0.85)
    for (let i = -1; i <= 1; i++) {
      const cushion = new THREE.Mesh(cushionGeo, sofaFabricMat)
      cushion.position.set(i * 0.84, 0, 0)
      cushion.castShadow = true
      cushionsGroup.add(cushion)
    }
    sofaMasterGroup.add(cushionsGroup)

    // 5. Pillows
    const pillowsGroup = new THREE.Group()
    pillowsGroup.position.set(0, -0.25, -0.13)
    const pillow1 = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.38, 0.14), pillowMat)
    pillow1.position.set(-1.0, 0, 0)
    pillow1.rotation.y = 0.25
    pillowsGroup.add(pillow1)

    const pillow2 = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.34, 0.12), accentPillowMat)
    pillow2.position.set(-0.65, -0.02, -0.03)
    pillow2.rotation.y = -0.15
    pillowsGroup.add(pillow2)

    const pillow3 = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.38, 0.14), pillowMat)
    pillow3.position.set(1.0, 0, 0)
    pillow3.rotation.y = -0.25
    pillowsGroup.add(pillow3)
    sofaMasterGroup.add(pillowsGroup)

    // 6. Gold Legs
    const sofaLegsGroup = new THREE.Group()
    const legGeo = new THREE.CylinderGeometry(0.03, 0.02, 0.3, 16)
    const legCoords = [
      [-1.3, -0.95, 0.4],
      [1.3, -0.95, 0.4],
      [-1.3, -0.95, -0.4],
      [1.3, -0.95, -0.4],
    ]
    legCoords.forEach(([lx, ly, lz]) => {
      const leg = new THREE.Mesh(legGeo, goldMat)
      leg.position.set(lx, ly, lz)
      sofaLegsGroup.add(leg)
    })
    sofaMasterGroup.add(sofaLegsGroup)

    // MARBLE & WOOD COFFEE TABLE (EXPLODED GROUP)
    const tableMasterGroup = new THREE.Group()
    tableMasterGroup.position.set(-0.1, 0, 0.6)
    masterGroup.add(tableMasterGroup)

    const tableTopGeo = new THREE.BoxGeometry(1.4, 0.08, 0.75)
    const tableTopMesh = new THREE.Mesh(tableTopGeo, ceramicMat)
    tableTopMesh.position.y = -0.65
    tableTopMesh.castShadow = true
    tableTopMesh.receiveShadow = true
    tableMasterGroup.add(tableTopMesh)

    const tableBaseGeo = new THREE.BoxGeometry(1.2, 0.35, 0.6)
    const tableBaseMesh = new THREE.Mesh(tableBaseGeo, woodMat)
    tableBaseMesh.position.y = -0.87
    tableBaseMesh.castShadow = true
    tableMasterGroup.add(tableBaseMesh)

    const vaseGeo = new THREE.CylinderGeometry(0.06, 0.09, 0.26, 24)
    const vaseMesh = new THREE.Mesh(vaseGeo, ceramicMat)
    vaseMesh.position.set(-0.25, -0.48, 0.05)
    vaseMesh.castShadow = true
    tableMasterGroup.add(vaseMesh)

    // ARC LAMP & PLANT GROUPS
    const lampMasterGroup = new THREE.Group()
    lampMasterGroup.position.set(2.0, 0, -0.2)
    masterGroup.add(lampMasterGroup)

    const lampBaseGeo = new THREE.CylinderGeometry(0.18, 0.18, 0.04, 32)
    const lampBase = new THREE.Mesh(lampBaseGeo, goldMat)
    lampBase.position.y = -1.08
    lampMasterGroup.add(lampBase)

    const arcCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, -1.06, 0),
      new THREE.Vector3(0.05, 0, 0),
      new THREE.Vector3(-0.4, 1.0, 0.3),
      new THREE.Vector3(-1.2, 1.1, 0.8),
    ])
    const arcTubeGeo = new THREE.TubeGeometry(arcCurve, 32, 0.02, 16, false)
    const arcStem = new THREE.Mesh(arcTubeGeo, goldMat)
    lampMasterGroup.add(arcStem)

    const shadeGeo = new THREE.SphereGeometry(0.22, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2)
    const shadeMesh = new THREE.Mesh(shadeGeo, goldMat)
    shadeMesh.position.set(-1.2, 1.05, 0.8)
    shadeMesh.rotation.x = Math.PI
    lampMasterGroup.add(shadeMesh)

    const plantMasterGroup = new THREE.Group()
    plantMasterGroup.position.set(-1.7, 0, 0.2)
    masterGroup.add(plantMasterGroup)

    const potGeo = new THREE.CylinderGeometry(0.2, 0.15, 0.45, 24)
    const potMesh = new THREE.Mesh(potGeo, darkMetalMat)
    potMesh.position.y = -0.88
    potMesh.castShadow = true
    plantMasterGroup.add(potMesh)

    for (let i = 0; i < 14; i++) {
      const leafGeo = new THREE.ConeGeometry(0.04, 0.55, 4)
      const leaf = new THREE.Mesh(leafGeo, plantMat)
      const angle = (i * Math.PI * 2) / 14
      const radius = 0.12 + (i % 3) * 0.04
      leaf.position.set(Math.cos(angle) * radius, -0.4 + (i % 4) * 0.1, Math.sin(angle) * radius)
      leaf.rotation.z = Math.cos(angle) * 0.4
      leaf.rotation.x = Math.sin(angle) * 0.4
      plantMasterGroup.add(leaf)
    }

    // Floating Dust Particles
    const particleCount = 50
    const particlePositions = new Float32Array(particleCount * 3)
    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 8
      particlePositions[i + 1] = (Math.random() - 0.5) * 5
      particlePositions[i + 2] = (Math.random() - 0.5) * 5
    }
    const particleGeo = new THREE.BufferGeometry()
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3))
    const particleMat = new THREE.PointsMaterial({
      color: 0xd4af37,
      size: 0.025,
      transparent: true,
      opacity: 0.35,
    })
    const particles = new THREE.Points(particleGeo, particleMat)
    scene.add(particles)

    // --- DYNAMIC LIGHTING MODES ---
    const ambientLight = new THREE.AmbientLight(0xfff6ea, 1.2)
    scene.add(ambientLight)

    const sunLight = new THREE.DirectionalLight(0xfffaee, 2.2)
    sunLight.position.set(5, 5, 4)
    sunLight.castShadow = true
    sunLight.shadow.mapSize.width = 1024
    sunLight.shadow.mapSize.height = 1024
    sunLight.shadow.bias = -0.0005
    scene.add(sunLight)

    const spotLight = new THREE.SpotLight(0xffdfa9, 5.0, 10, Math.PI / 4, 0.4, 1)
    spotLight.position.set(0.8, 1.0, 0.6)
    spotLight.target = sofaMasterGroup
    scene.add(spotLight)

    // --- MOUSE PARALLAX & ANIMATION LOOP ---
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 }
    const currentCamTarget = camera.position.clone()
    const currentCamLookAt = new THREE.Vector3(0, 0, 0)
    let curExplodeVal = 0

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      mouse.targetX = ((e.clientX - rect.left) / rect.width) * 2 - 1
      mouse.targetY = -(((e.clientY - rect.top) / rect.height) * 2 - 1)
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })

    let animId: number
    const clock = new THREE.Clock()

    const animate = () => {
      animId = requestAnimationFrame(animate)
      const elapsedTime = clock.getElapsedTime()

      // Mouse lerp parallax
      mouse.x += (mouse.targetX - mouse.x) * 0.04
      mouse.y += (mouse.targetY - mouse.y) * 0.04

      masterGroup.rotation.y = Math.sin(elapsedTime * 0.15) * 0.05 + mouse.x * 0.18
      masterGroup.rotation.x = Math.cos(elapsedTime * 0.15) * 0.02 + mouse.y * 0.10

      particles.rotation.y = elapsedTime * 0.03

      // Smooth lerp camera position
      currentCamTarget.lerp(targetCameraPosRef.current, 0.05)
      camera.position.copy(currentCamTarget)
      currentCamLookAt.lerp(targetCameraTargetRef.current, 0.05)
      camera.lookAt(currentCamLookAt)

      // Smooth lerp 3D Exploded Assembly positions
      const targetExplode = explosionRef.current
      curExplodeVal += (targetExplode - curExplodeVal) * 0.06

      // Apply 3D component explosion offsets
      sofaBackGroup.position.set(0, -0.18 + curExplodeVal * 0.4, -0.38 - curExplodeVal * 0.5)
      cushionsGroup.position.set(0, -0.43 + curExplodeVal * 0.25, 0.04 + curExplodeVal * 0.2)
      pillowsGroup.position.set(0, -0.25 + curExplodeVal * 0.5, -0.13 + curExplodeVal * 0.3)
      leftArmGroup.position.set(-1.4 - curExplodeVal * 0.45, -0.28, 0)
      rightArmGroup.position.set(1.4 + curExplodeVal * 0.45, -0.28, 0)
      sofaLegsGroup.position.set(0, -0.95 - curExplodeVal * 0.3, 0)

      tableTopMesh.position.set(0, -0.65 + curExplodeVal * 0.3, 0)
      vaseMesh.position.set(-0.25, -0.48 + curExplodeVal * 0.5, 0.05)
      lampMasterGroup.position.set(2.0 + curExplodeVal * 0.4, 0, -0.2)
      plantMasterGroup.position.set(-1.7 - curExplodeVal * 0.4, 0, 0.2)

      // Dynamic lighting adjustments
      if (lightingRef.current === 'daylight') {
        ambientLight.intensity = 1.8
        sunLight.intensity = 3.0
        spotLight.intensity = 1.0
      } else if (lightingRef.current === 'spotlight') {
        ambientLight.intensity = 0.5
        sunLight.intensity = 0.8
        spotLight.intensity = 8.0
      } else {
        // studio
        ambientLight.intensity = 1.2
        sunLight.intensity = 2.2
        spotLight.intensity = 5.0
      }

      // Hotspot position projection
      const newScreenCoords: { [key: string]: { x: number; y: number; visible: boolean } } = {}
      HOTSPOTS.forEach((hs) => {
        const worldVec = hs.pos.clone().applyMatrix4(masterGroup.matrixWorld)
        const projVec = worldVec.project(camera)
        const x = (projVec.x * 0.5 + 0.5) * width
        const y = (-projVec.y * 0.5 + 0.5) * height
        const visible = projVec.z < 1

        newScreenCoords[hs.id] = { x, y, visible }
      })

      setScreenCoords(newScreenCoords)
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
  }, [])

  const { viewer3D } = aboutContent

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[520px] md:h-[620px] cursor-grab active:cursor-grabbing select-none overflow-hidden bg-[#0A0A0A]"
    >
      {/* Top Product Presentation Badge & HUD Bar */}
      <div className="absolute top-4 left-4 right-4 z-30 flex flex-wrap items-center justify-between gap-3 pointer-events-none">
        <div className="pointer-events-auto flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-[#C6A15B]/30 bg-[#0E0E0E]/80 backdrop-blur-md shadow-lg">
          <span className="w-2 h-2 rounded-full bg-[#C6A15B] animate-pulse" />
          <span className="font-body text-[10px] font-medium uppercase tracking-[0.22em] text-[#DEC27B]">
            {viewer3D.badge}
          </span>
        </div>

        {/* Camera Preset Toolbar */}
        <div className="pointer-events-auto flex items-center gap-1.5 p-1 rounded-full border border-[#C6A15B]/25 bg-[#0A0A0A]/85 backdrop-blur-md">
          {viewer3D.cameraPresets.map((preset) => {
            const isActive = activeCameraPreset === preset.id
            return (
              <button
                key={preset.id}
                onClick={() => {
                  setActiveCameraPreset(preset.id as any)
                  if (preset.id === 'exploded') setIsExploded(true)
                }}
                className={`px-3 py-1 rounded-full text-[11px] font-body font-medium transition-all duration-300 flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-[#C6A15B] text-[#0A0A0A] font-medium shadow-[0_0_12px_#C6A15B]'
                    : 'text-[#AAA49A] hover:text-[#F3EFE7] hover:bg-[#141414]'
                }`}
              >
                <span className="material-symbols-outlined text-sm">{preset.icon}</span>
                <span className="hidden sm:inline">{preset.label}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* 3D Hotspot Interactive Pins */}
      {HOTSPOTS.map((hs) => {
        const coords = screenCoords[hs.id]
        if (!coords || !coords.visible) return null
        const isActive = activeHotspot?.id === hs.id

        return (
          <button
            key={hs.id}
            onClick={() => setActiveHotspot(hs)}
            className="absolute z-20 transform -translate-x-1/2 -translate-y-1/2 group focus:outline-none"
            style={{ left: `${coords.x}px`, top: `${coords.y}px` }}
          >
            <div className="relative flex items-center justify-center">
              <span
                className={`absolute w-7 h-7 rounded-full bg-[#C6A15B]/30 animate-ping duration-1000 ${
                  isActive ? 'opacity-100' : 'opacity-40 group-hover:opacity-80'
                }`}
              />

              <span
                className={`relative w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                  isActive
                    ? 'bg-[#C6A15B] border-[#F3EFE7] scale-110 shadow-[0_0_15px_#C6A15B]'
                    : 'bg-[#0A0A0A]/80 border-[#C6A15B] hover:bg-[#C6A15B] hover:scale-105'
                }`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-[#0A0A0A]' : 'bg-[#C6A15B]'}`} />
              </span>

              <span
                className={`absolute left-7 whitespace-nowrap px-3 py-1 rounded-md text-[11px] font-body font-medium tracking-[0.1em] transition-all duration-300 border ${
                  isActive
                    ? 'bg-[#141414]/95 text-[#DEC27B] border-[#C6A15B] shadow-lg translate-x-1'
                    : 'bg-[#0A0A0A]/70 text-[#AAA49A] border-[#C6A15B]/30 opacity-80 group-hover:opacity-100 group-hover:text-[#F3EFE7]'
                }`}
              >
                {hs.title}
              </span>
            </div>
          </button>
        )
      })}

      {/* Floating Active Hotspot Spec Card */}
      <AnimatePresence mode="wait">
        {activeHotspot && (
          <motion.div
            key={activeHotspot.id}
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-20 left-4 right-4 md:left-6 md:right-auto md:max-w-sm z-30 p-5 rounded-lg bg-[#0E0E0E]/90 backdrop-blur-md border border-[#C6A15B]/40 shadow-2xl font-body"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-body text-[10px] font-medium uppercase tracking-[0.22em] text-[#C6A15B]">
                {activeHotspot.subtitle}
              </span>
              <button
                onClick={() => setActiveHotspot(null)}
                className="text-[#AAA49A] hover:text-[#F3EFE7] text-xs px-1"
              >
                ✕
              </button>
            </div>
            <h4 className="card-title text-sm text-[#F3EFE7] mb-1.5">
              {activeHotspot.title}
            </h4>
            <p className="font-body text-xs text-[#AAA49A] leading-[1.65] font-normal">
              {activeHotspot.description}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Product Specification Drawer Toggle */}
      <AnimatePresence>
        {showSpecs && (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            className="absolute top-16 right-4 z-40 w-72 p-5 rounded-xl bg-[#0C0C0C]/95 backdrop-blur-xl border border-[#C6A15B]/40 shadow-2xl space-y-4 font-body"
          >
            <div className="flex items-center justify-between border-b border-[#C6A15B]/20 pb-3">
              <div>
                <span className="text-[10px] uppercase text-[#C6A15B] font-body">{viewer3D.productCode}</span>
                <h5 className="card-title text-sm text-[#F3EFE7]">{viewer3D.productTitle}</h5>
              </div>
              <button onClick={() => setShowSpecs(false)} className="text-[#AAA49A] hover:text-[#F3EFE7]">
                ✕
              </button>
            </div>
            <div className="space-y-2.5">
              {viewer3D.specs.map((spec, i) => (
                <div key={i} className="flex justify-between text-xs font-body">
                  <span className="text-[#AAA49A]">{spec.label}:</span>
                  <span className="text-[#F3EFE7] font-medium">{spec.value}</span>
                </div>
              ))}
            </div>
            <div className="pt-2 border-t border-[#C6A15B]/20 flex flex-col gap-2">
              <a
                href="#contact"
                className="btn-primary w-full py-2"
              >
                {viewer3D.actions.quote}
              </a>
              <button className="btn-secondary w-full py-2">
                {viewer3D.actions.cadDownload}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Interactive Product Presentation Control Dock */}
      <div className="absolute bottom-4 left-4 right-4 z-30 flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl bg-[#0A0A0A]/90 border border-[#C6A15B]/30 backdrop-blur-xl shadow-2xl">
        {/* Left: Exploded Assembly & Slider Control */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsExploded(!isExploded)}
            className={`px-4 py-2 rounded-lg text-xs font-body font-medium transition-all duration-300 flex items-center gap-2 border ${
              isExploded
                ? 'bg-[#C6A15B] text-[#0A0A0A] border-[#C6A15B] shadow-[0_0_14px_#C6A15B]'
                : 'bg-[#141414] text-[#DEC27B] border-[#C6A15B]/40 hover:border-[#C6A15B]'
            }`}
          >
            <span className="material-symbols-outlined text-base">layers</span>
            <span>{isExploded ? 'Gộp Sản Phẩm 3D' : 'Tách Lớp Cấu Tạo 3D'}</span>
          </button>

          {/* Explosion Amount Manual Slider */}
          <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#121212] border border-[#C6A15B]/20">
            <span className="text-[10px] text-[#AAA49A] uppercase tracking-wider font-body">Mức Tách:</span>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={isExploded ? 1 : explosionAmount}
              onChange={(e) => {
                setIsExploded(false)
                setExplosionAmount(parseFloat(e.target.value))
              }}
              className="w-20 accent-[#C6A15B] cursor-pointer"
            />
          </div>
        </div>

        {/* Center: Quick Material Swatch Switcher */}
        <div className="flex items-center gap-2">
          <span className="hidden sm:inline text-[10px] uppercase font-body text-[#AAA49A] tracking-wider">Chất Liệu:</span>
          <div className="flex items-center gap-1.5">
            {viewer3D.materials.map((mat, idx) => {
              const colors = ['#9E522B', '#EAE6DF', '#5C3D20', '#D4AF37']
              const isSelected = selectedSwatch === idx
              return (
                <button
                  key={mat.id}
                  onClick={() => setSelectedSwatch(idx)}
                  title={mat.name}
                  className={`w-6 h-6 rounded-full border transition-all duration-300 ${
                    isSelected
                      ? 'scale-125 border-[#F3EFE7] ring-2 ring-[#C6A15B]'
                      : 'border-white/20 opacity-70 hover:opacity-100'
                  }`}
                  style={{ backgroundColor: colors[idx] }}
                />
              )
            })}
          </div>
        </div>

        {/* Right: Lighting Modes & Product Specs Button */}
        <div className="flex items-center gap-2">
          {/* Lighting Mode Selector */}
          <div className="hidden sm:flex items-center gap-1 bg-[#121212] p-1 rounded-lg border border-[#C6A15B]/20">
            {viewer3D.lightingModes.map((lm) => (
              <button
                key={lm.id}
                onClick={() => setActiveLighting(lm.id as any)}
                title={lm.label}
                className={`p-1.5 rounded-md transition-colors ${
                  activeLighting === lm.id ? 'bg-[#C6A15B] text-[#0A0A0A]' : 'text-[#AAA49A] hover:text-[#F3EFE7]'
                }`}
              >
                <span className="material-symbols-outlined text-sm">{lm.icon}</span>
              </button>
            ))}
          </div>

          <button
            onClick={() => setShowSpecs(!showSpecs)}
            className="px-3 py-2 rounded-lg bg-[#141414] border border-[#C6A15B]/30 text-[#F3EFE7] text-xs font-body font-medium hover:border-[#C6A15B] hover:text-[#DEC27B] flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-base">info</span>
            <span className="hidden sm:inline">Thông Số</span>
          </button>
        </div>
      </div>
    </div>
  )
}
