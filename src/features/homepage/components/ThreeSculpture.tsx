import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { homeContent } from '@/content/home'

export interface HotspotPos {
  x: number
  y: number
  opacity: number
  visible: boolean
}

export interface HotspotsState {
  hs1: HotspotPos
  hs2: HotspotPos
  hs3: HotspotPos
}

interface ThreeSculptureProps {
  onHotspotsUpdate?: (state: HotspotsState) => void
  onProgressUpdate?: (progress: number) => void
}

interface Keyframe {
  progress: number
  camX: number
  camY: number
  camZ: number
  targetX: number
  targetY: number
  targetZ: number
  sofaRotY: number
  tableRotY: number
  lampLight: number
  hs1: number
  hs2: number
  hs3: number
}

const desktopKeyframes: Keyframe[] = [
  // Scene 01: Establishing Shot (0% -> 20%)
  { progress: 0.00, camX: 0.1,  camY: 1.1,  camZ: 5.6, targetX: 0,     targetY: -0.2,  targetZ: 0,    sofaRotY: 0,     tableRotY: 0,     lampLight: 6.0, hs1: 0, hs2: 0, hs3: 0 },
  { progress: 0.18, camX: 0.1,  camY: 1.1,  camZ: 5.6, targetX: 0,     targetY: -0.2,  targetZ: 0,    sofaRotY: 0,     tableRotY: 0,     lampLight: 6.0, hs1: 0, hs2: 0, hs3: 0 },
  
  // Scene 02: Focus on Grey Fabric Sofa & Poufs (20% -> 42%)
  { progress: 0.30, camX: -0.65,camY: 0.15, camZ: 2.8, targetX: -0.15, targetY: -0.35, targetZ: 0.1,  sofaRotY: 0.03,  tableRotY: 0,     lampLight: 7.0, hs1: 1, hs2: 0, hs3: 0 },
  { progress: 0.40, camX: -0.65,camY: 0.15, camZ: 2.8, targetX: -0.15, targetY: -0.35, targetZ: 0.1,  sofaRotY: 0.03,  tableRotY: 0,     lampLight: 7.0, hs1: 1, hs2: 0, hs3: 0 },
  
  // Scene 03: Focus on Wooden Block Table & Ceramic Vase (42% -> 65%)
  { progress: 0.52, camX: 0.15, camY: -0.20,camZ: 2.3, targetX: 0.05,  targetY: -0.58, targetZ: 0.85, sofaRotY: 0.01,  tableRotY: -0.04, lampLight: 6.0, hs1: 0.15, hs2: 1, hs3: 0 },
  { progress: 0.62, camX: 0.15, camY: -0.20,camZ: 2.3, targetX: 0.05,  targetY: -0.58, targetZ: 0.85, sofaRotY: 0.01,  tableRotY: -0.04, lampLight: 6.0, hs1: 0.15, hs2: 1, hs3: 0 },
  
  // Scene 04: Focus on Arc Gold Lamp & Plants (65% -> 85%)
  { progress: 0.74, camX: 1.25, camY: 0.35, camZ: 2.9, targetX: 0.65,  targetY: 0.25,  targetZ: 0.3,  sofaRotY: 0,     tableRotY: 0,     lampLight: 9.5, hs1: 0, hs2: 0.15, hs3: 1 },
  { progress: 0.83, camX: 1.25, camY: 0.35, camZ: 2.9, targetX: 0.65,  targetY: 0.25,  targetZ: 0.3,  sofaRotY: 0,     tableRotY: 0,     lampLight: 9.5, hs1: 0, hs2: 0.15, hs3: 1 },
  
  // Scene 05: Pull Back Full Reveal (85% -> 100%)
  { progress: 1.00, camX: 0.2,  camY: 1.3,  camZ: 6.2, targetX: 0,     targetY: -0.1,  targetZ: 0,    sofaRotY: 0,     tableRotY: 0,     lampLight: 6.5, hs1: 0, hs2: 0, hs3: 0 },
]

const mobileKeyframes: Keyframe[] = [
  { progress: 0.00, camX: 0,    camY: 1.2,  camZ: 6.4, targetX: 0,     targetY: -0.2,  targetZ: 0,    sofaRotY: 0,     tableRotY: 0,     lampLight: 6.0, hs1: 0, hs2: 0, hs3: 0 },
  { progress: 0.45, camX: -0.3, camY: 0.2,  camZ: 3.4, targetX: -0.1,  targetY: -0.3,  targetZ: 0.1,  sofaRotY: 0.02,  tableRotY: 0,     lampLight: 7.0, hs1: 1, hs2: 0, hs3: 0 },
  { progress: 1.00, camX: 0,    camY: 1.3,  camZ: 6.4, targetX: 0,     targetY: -0.1,  targetZ: 0,    sofaRotY: 0,     tableRotY: 0,     lampLight: 6.5, hs1: 0, hs2: 0, hs3: 0 },
]

function interpolateKeyframes(keyframes: Keyframe[], progress: number): Keyframe {
  const p = Math.max(0, Math.min(1, progress))
  if (p <= keyframes[0].progress) return { ...keyframes[0] }
  if (p >= keyframes[keyframes.length - 1].progress) return { ...keyframes[keyframes.length - 1] }

  let i = 0
  while (i < keyframes.length - 1 && keyframes[i + 1].progress < p) {
    i++
  }

  const k1 = keyframes[i]
  const k2 = keyframes[i + 1]
  const factor = (p - k1.progress) / (k2.progress - k1.progress)
  const t = factor * factor * (3 - 2 * factor)
  const lerpVal = (a: number, b: number) => a + (b - a) * t

  return {
    progress: p,
    camX: lerpVal(k1.camX, k2.camX),
    camY: lerpVal(k1.camY, k2.camY),
    camZ: lerpVal(k1.camZ, k2.camZ),
    targetX: lerpVal(k1.targetX, k2.targetX),
    targetY: lerpVal(k1.targetY, k2.targetY),
    targetZ: lerpVal(k1.targetZ, k2.targetZ),
    sofaRotY: lerpVal(k1.sofaRotY, k2.sofaRotY),
    tableRotY: lerpVal(k1.tableRotY, k2.tableRotY),
    lampLight: lerpVal(k1.lampLight, k2.lampLight),
    hs1: lerpVal(k1.hs1, k2.hs1),
    hs2: lerpVal(k1.hs2, k2.hs2),
    hs3: lerpVal(k1.hs3, k2.hs3),
  }
}

export const ThreeSculpture = ({
  onHotspotsUpdate,
  onProgressUpdate,
}: ThreeSculptureProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [loadProgress, setLoadProgress] = useState(0)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let width = container.clientWidth || window.innerWidth
    let height = container.clientHeight || window.innerHeight

    let progressTimer = setInterval(() => {
      setLoadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressTimer)
          setTimeout(() => setIsLoading(false), 250)
          return 100
        }
        return prev + 20
      })
    }, 50)

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // 1. Scene & Camera Setup
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0x0e0d0c)

    const camera = new THREE.PerspectiveCamera(46, width / height, 0.1, 1000)
    camera.position.set(0.1, 1.1, 5.6)

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    container.appendChild(renderer.domElement)

    // Master Group
    const masterGroup = new THREE.Group()
    scene.add(masterGroup)

    // --- PROCEDURAL TEXTURES ---
    const createWoodTexture = (color1 = '#8c6239', color2 = '#5c3d20') => {
      const canvas = document.createElement('canvas')
      canvas.width = 512
      canvas.height = 512
      const ctx = canvas.getContext('2d')
      if (ctx) {
        ctx.fillStyle = color1
        ctx.fillRect(0, 0, 512, 512)
        ctx.strokeStyle = color2
        ctx.lineWidth = 3
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
        ctx.fillStyle = '#626469'
        ctx.fillRect(0, 0, 256, 256)
        ctx.fillStyle = 'rgba(230, 230, 230, 0.08)'
        for (let x = 0; x < 256; x += 4) {
          ctx.fillRect(x, 0, 2, 256)
        }
        for (let y = 0; y < 256; y += 4) {
          ctx.fillRect(0, y, 256, 2)
        }
      }
      return new THREE.CanvasTexture(canvas)
    }

    const woodTex = createWoodTexture('#8c6239', '#4d3219')
    woodTex.repeat.set(2, 2)

    const darkWoodTex = createWoodTexture('#3a281c', '#21150e')
    darkWoodTex.repeat.set(4, 4)

    const fabricTex = createFabricTexture()
    fabricTex.repeat.set(4, 4)

    // --- MATERIALS ---
    const sofaFabricMat = new THREE.MeshStandardMaterial({
      map: fabricTex,
      color: 0x6e7178,
      roughness: 0.85,
      metalness: 0.05,
    })

    const pillowMat = new THREE.MeshStandardMaterial({
      color: 0xded4c3,
      roughness: 0.8,
    })

    const patternPillowMat = new THREE.MeshStandardMaterial({
      color: 0x9c8a74,
      roughness: 0.75,
    })

    const woodBlockMat = new THREE.MeshStandardMaterial({
      map: woodTex,
      roughness: 0.4,
      metalness: 0.05,
    })

    const leatherPoufMat = new THREE.MeshStandardMaterial({
      color: 0x9e522b,
      roughness: 0.5,
      metalness: 0.1,
    })

    const leatherChairMat = new THREE.MeshStandardMaterial({
      color: 0x8a4522,
      roughness: 0.45,
      metalness: 0.12,
    })

    const goldMat = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      metalness: 0.88,
      roughness: 0.16,
    })

    const blackMetalMat = new THREE.MeshStandardMaterial({
      color: 0x1e1e1e,
      metalness: 0.8,
      roughness: 0.3,
    })

    const creamRugMat = new THREE.MeshStandardMaterial({
      color: 0xdcd5c9,
      roughness: 0.9,
    })

    const woodFloorMat = new THREE.MeshStandardMaterial({
      map: darkWoodTex,
      roughness: 0.4,
      metalness: 0.08,
    })

    const wallMat = new THREE.MeshStandardMaterial({
      color: 0xcfc7b9,
      roughness: 0.9,
    })

    const greenPlantMat = new THREE.MeshStandardMaterial({
      color: 0x2e5c2b,
      roughness: 0.5,
    })

    const ceramicVaseMat = new THREE.MeshStandardMaterial({
      color: 0xf4f0e8,
      roughness: 0.2,
      metalness: 0.05,
    })

    // --- 3D LIVING ROOM SCENE OBJECTS ---

    // 1. Floor & Large Cream Rug
    const floorGeo = new THREE.PlaneGeometry(16, 12)
    const floorMesh = new THREE.Mesh(floorGeo, woodFloorMat)
    floorMesh.rotation.x = -Math.PI / 2
    floorMesh.position.y = -1.25
    floorMesh.receiveShadow = true
    masterGroup.add(floorMesh)

    const rugGeo = new THREE.BoxGeometry(5.2, 0.02, 3.2)
    const rugMesh = new THREE.Mesh(rugGeo, creamRugMat)
    rugMesh.position.set(0, -1.24, 0.4)
    rugMesh.receiveShadow = true
    masterGroup.add(rugMesh)

    // 2. Back Wall & Architecture
    const backWallGeo = new THREE.PlaneGeometry(16, 8)
    const backWallMesh = new THREE.Mesh(backWallGeo, wallMat)
    backWallMesh.position.set(0, 2.75, -2.4)
    backWallMesh.receiveShadow = true
    masterGroup.add(backWallMesh)

    // Transom Window Frame near ceiling
    const transomFrameGeo = new THREE.BoxGeometry(5.8, 0.5, 0.1)
    const transomFrame = new THREE.Mesh(transomFrameGeo, blackMetalMat)
    transomFrame.position.set(0, 1.7, -2.35)
    masterGroup.add(transomFrame)

    const transomGlassGeo = new THREE.PlaneGeometry(5.6, 0.4)
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0x88ccff,
      transparent: true,
      opacity: 0.35,
      roughness: 0.1,
    })
    const transomGlass = new THREE.Mesh(transomGlassGeo, glassMat)
    transomGlass.position.set(0, 1.7, -2.29)
    masterGroup.add(transomGlass)

    // Left Door
    const doorGeo = new THREE.BoxGeometry(1.0, 2.6, 0.08)
    const doorMesh = new THREE.Mesh(doorGeo, blackMetalMat)
    doorMesh.position.set(-3.2, 0.05, -2.35)
    masterGroup.add(doorMesh)

    // Right Glass Wall Patio Window
    const rightWindowFrameGeo = new THREE.BoxGeometry(0.1, 4.2, 5.0)
    const rightWindowFrame = new THREE.Mesh(rightWindowFrameGeo, woodBlockMat)
    rightWindowFrame.position.set(3.8, 0.85, 0.5)
    masterGroup.add(rightWindowFrame)

    // 3. MAIN GREY FABRIC SOFA
    const sofaGroup = new THREE.Group()

    // Base Seat Frame
    const sofaBaseGeo = new THREE.BoxGeometry(3.1, 0.4, 1.15)
    const sofaBase = new THREE.Mesh(sofaBaseGeo, sofaFabricMat)
    sofaBase.position.y = -0.8
    sofaBase.castShadow = true
    sofaBase.receiveShadow = true
    sofaGroup.add(sofaBase)

    // Backrest
    const sofaBackGeo = new THREE.BoxGeometry(3.1, 0.75, 0.3)
    const sofaBack = new THREE.Mesh(sofaBackGeo, sofaFabricMat)
    sofaBack.position.set(0, -0.22, -0.42)
    sofaBack.castShadow = true
    sofaGroup.add(sofaBack)

    // Armrests
    const armGeo = new THREE.BoxGeometry(0.3, 0.65, 1.15)
    const leftArm = new THREE.Mesh(armGeo, sofaFabricMat)
    leftArm.position.set(-1.55, -0.32, 0)
    leftArm.castShadow = true
    sofaGroup.add(leftArm)

    const rightArm = new THREE.Mesh(armGeo, sofaFabricMat)
    rightArm.position.set(1.55, -0.32, 0)
    rightArm.castShadow = true
    sofaGroup.add(rightArm)

    // 3 Seat Cushions
    const seatCushionGeo = new THREE.BoxGeometry(0.85, 0.22, 0.95)
    for (let i = -1; i <= 1; i++) {
      const cushion = new THREE.Mesh(seatCushionGeo, sofaFabricMat)
      cushion.position.set(i * 0.92, -0.49, 0.05)
      cushion.castShadow = true
      cushion.receiveShadow = true
      sofaGroup.add(cushion)
    }

    // Throw Pillows
    const pillow1 = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.4, 0.16), pillowMat)
    pillow1.position.set(-1.1, -0.28, -0.15)
    pillow1.rotation.y = 0.2
    sofaGroup.add(pillow1)

    const pillow2 = new THREE.Mesh(new THREE.BoxGeometry(0.36, 0.36, 0.14), patternPillowMat)
    pillow2.position.set(-0.7, -0.30, -0.18)
    pillow2.rotation.y = -0.1
    sofaGroup.add(pillow2)

    const pillow3 = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.4, 0.16), pillowMat)
    pillow3.position.set(1.1, -0.28, -0.15)
    pillow3.rotation.y = -0.25
    sofaGroup.add(pillow3)

    const pillow4 = new THREE.Mesh(new THREE.BoxGeometry(0.36, 0.36, 0.14), patternPillowMat)
    pillow4.position.set(0.7, -0.30, -0.18)
    pillow4.rotation.y = 0.15
    sofaGroup.add(pillow4)

    sofaGroup.position.set(0, 0, -0.6)
    masterGroup.add(sofaGroup)

    // 4. WOODEN BLOCK COFFEE TABLE & DECOR
    const tableGroup = new THREE.Group()

    const tableBlockGeo = new THREE.BoxGeometry(1.6, 0.36, 0.85)
    const tableBlock = new THREE.Mesh(tableBlockGeo, woodBlockMat)
    tableBlock.position.y = -0.92
    tableBlock.castShadow = true
    tableBlock.receiveShadow = true
    tableGroup.add(tableBlock)

    // White Ceramic Vase on Table
    const vaseGeo = new THREE.CylinderGeometry(0.06, 0.09, 0.28, 32)
    const vaseMesh = new THREE.Mesh(vaseGeo, ceramicVaseMat)
    vaseMesh.position.set(-0.25, -0.58, 0.05)
    vaseMesh.castShadow = true
    tableGroup.add(vaseMesh)

    // Wooden Bowl on Table
    const bowlGeo = new THREE.CylinderGeometry(0.12, 0.06, 0.08, 24)
    const bowlMesh = new THREE.Mesh(bowlGeo, woodBlockMat)
    bowlMesh.position.set(0.2, -0.7, -0.1)
    bowlMesh.castShadow = true
    tableGroup.add(bowlMesh)

    tableGroup.position.set(-0.1, 0, 0.7)
    masterGroup.add(tableGroup)

    // 5. TWO LEATHER POUFS (IN FRONT OF COFFEE TABLE)
    const poufGroup = new THREE.Group()
    const poufGeo = new THREE.BoxGeometry(0.5, 0.38, 0.5)

    const pouf1 = new THREE.Mesh(poufGeo, leatherPoufMat)
    pouf1.position.set(-0.35, -0.96, 1.45)
    pouf1.castShadow = true
    pouf1.receiveShadow = true
    poufGroup.add(pouf1)

    const pouf2 = new THREE.Mesh(poufGeo, leatherPoufMat)
    pouf2.position.set(0.35, -0.96, 1.45)
    pouf2.castShadow = true
    pouf2.receiveShadow = true
    poufGroup.add(pouf2)

    masterGroup.add(poufGroup)

    // 6. ARC GOLD FLOOR LAMP (RIGHT SIDE)
    const lampGroup = new THREE.Group()

    const lampBaseGeo = new THREE.CylinderGeometry(0.2, 0.2, 0.04, 32)
    const lampBase = new THREE.Mesh(lampBaseGeo, goldMat)
    lampBase.position.y = -1.2
    lampGroup.add(lampBase)

    const arcCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, -1.18, 0),
      new THREE.Vector3(0.05, -0.1, 0),
      new THREE.Vector3(-0.5, 1.0, 0.4),
      new THREE.Vector3(-1.4, 1.1, 0.9),
    ])
    const arcTubeGeo = new THREE.TubeGeometry(arcCurve, 40, 0.02, 16, false)
    const arcStem = new THREE.Mesh(arcTubeGeo, goldMat)
    lampGroup.add(arcStem)

    const shadeGeo = new THREE.SphereGeometry(0.24, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2)
    const shadeMesh = new THREE.Mesh(shadeGeo, goldMat)
    shadeMesh.position.set(-1.4, 1.05, 0.9)
    shadeMesh.rotation.x = Math.PI
    lampGroup.add(shadeMesh)

    const bulbGeo = new THREE.SphereGeometry(0.09, 16, 16)
    const bulbMat = new THREE.MeshBasicMaterial({ color: 0xffe2b0 })
    const bulbMesh = new THREE.Mesh(bulbGeo, bulbMat)
    bulbMesh.position.set(-1.4, 0.96, 0.9)
    lampGroup.add(bulbMesh)

    lampGroup.position.set(2.2, 0, -0.3)
    masterGroup.add(lampGroup)

    // 7. TWO RIGHT LEATHER ARMCHAIRS
    const rightArmchairsGroup = new THREE.Group()
    const armchairGeo = new THREE.BoxGeometry(0.65, 0.6, 0.65)

    const chair1 = new THREE.Mesh(armchairGeo, leatherChairMat)
    chair1.position.set(2.0, -0.75, 0.6)
    chair1.rotation.y = -0.45
    chair1.castShadow = true
    rightArmchairsGroup.add(chair1)

    const chair2 = new THREE.Mesh(armchairGeo, leatherChairMat)
    chair2.position.set(2.4, -0.75, 1.35)
    chair2.rotation.y = -0.55
    chair2.castShadow = true
    rightArmchairsGroup.add(chair2)

    masterGroup.add(rightArmchairsGroup)

    // 8. YUCCA POTTED PLANT (RIGHT WINDOW SIDE)
    const plantGroup = new THREE.Group()
    const potGeo = new THREE.CylinderGeometry(0.18, 0.14, 0.45, 24)
    const potMesh = new THREE.Mesh(potGeo, blackMetalMat)
    potMesh.position.y = -1.0
    plantGroup.add(potMesh)

    // Multiple Yucca Stems & Leaves
    for (let i = 0; i < 18; i++) {
      const leafGeo = new THREE.ConeGeometry(0.04, 0.6, 4)
      const leaf = new THREE.Mesh(leafGeo, greenPlantMat)
      const angle = (i * Math.PI * 2) / 18
      const radius = 0.15 + (i % 3) * 0.05
      leaf.position.set(Math.cos(angle) * radius, -0.5 + (i % 4) * 0.12, Math.sin(angle) * radius)
      leaf.rotation.z = Math.cos(angle) * 0.4
      leaf.rotation.x = Math.sin(angle) * 0.4
      plantGroup.add(leaf)
    }

    plantGroup.position.set(2.8, 0, 0.1)
    masterGroup.add(plantGroup)

    // Floating Particles
    const particleCount = 60
    const particleGeo = new THREE.BufferGeometry()
    const particlePositions = new Float32Array(particleCount * 3)

    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 12
      particlePositions[i + 1] = (Math.random() - 0.5) * 8
      particlePositions[i + 2] = (Math.random() - 0.5) * 8
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3))

    const particleMat = new THREE.PointsMaterial({
      color: 0xdec27b,
      size: 0.022,
      transparent: true,
      opacity: 0.25,
    })
    const particles = new THREE.Points(particleGeo, particleMat)
    scene.add(particles)

    // --- LIGHTING SYSTEM (MATCHING SUNLIGHT IN PHOTO) ---
    // Warm Ambient Light
    const ambientLight = new THREE.AmbientLight(0xfff5ea, 0.9)
    scene.add(ambientLight)

    // Directional Window Sunlight (From right glass windows)
    const sunLight = new THREE.DirectionalLight(0xffe8ca, 2.2)
    sunLight.position.set(6, 4, 3)
    sunLight.castShadow = true
    sunLight.shadow.mapSize.width = 1024
    sunLight.shadow.mapSize.height = 1024
    sunLight.shadow.bias = -0.0005
    scene.add(sunLight)

    // Arc Lamp Warm Spotlight
    const lampSpotLight = new THREE.SpotLight(0xffd59e, 6.0, 12, Math.PI / 4, 0.4, 1)
    lampSpotLight.position.set(0.8, 1.1, 0.6)
    lampSpotLight.target = sofaGroup
    scene.add(lampSpotLight)

    // Fill Soft PointLight
    const fillLight = new THREE.PointLight(0xc6a15b, 1.2, 14)
    fillLight.position.set(-3, 2, 2)
    scene.add(fillLight)

    // --- HOTSPOT ANCHORS ---
    const sofaAnchorWorld = new THREE.Vector3(-0.4, -0.3, -0.6)
    const tableAnchorWorld = new THREE.Vector3(-0.1, -0.7, 0.7)
    const lampAnchorWorld = new THREE.Vector3(0.8, 0.8, 0.6)

    const projectToScreen = (worldPos: THREE.Vector3) => {
      const v = worldPos.clone().applyMatrix4(masterGroup.matrixWorld)
      v.project(camera)
      const x = (v.x * 0.5 + 0.5) * window.innerWidth
      const y = (-v.y * 0.5 + 0.5) * window.innerHeight
      const visible = v.z < 1
      return { x, y, visible }
    }

    // --- SCROLL PROGRESS & ANIMATION LOOP ---
    let targetProgress = 0
    let currentProgress = 0

    const currentCamPos = new THREE.Vector3(0.1, 1.1, 5.6)
    const targetCamPos = new THREE.Vector3(0.1, 1.1, 5.6)

    const currentLookTarget = new THREE.Vector3(0, -0.2, 0)
    const targetLookTarget = new THREE.Vector3(0, -0.2, 0)

    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 }

    const handleScroll = () => {
      const heroElem = document.getElementById('home')
      if (!heroElem) return

      const rect = heroElem.getBoundingClientRect()
      const scrollableDistance = heroElem.offsetHeight - window.innerHeight
      if (scrollableDistance <= 0) return

      const progress = Math.min(1, Math.max(0, -rect.top / scrollableDistance))
      targetProgress = progress
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = (e.clientX / window.innerWidth) * 2 - 1
      mouse.targetY = -(e.clientY / window.innerHeight) * 2 + 1
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    handleScroll()

    let animationFrameId: number

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate)

      currentProgress += (targetProgress - currentProgress) * 0.07

      if (onProgressUpdate) {
        onProgressUpdate(currentProgress)
      }

      mouse.x += (mouse.targetX - mouse.x) * 0.04
      mouse.y += (mouse.targetY - mouse.y) * 0.04

      const isMobile = window.innerWidth < 768
      const keyframes = isMobile ? mobileKeyframes : desktopKeyframes
      const targetState = interpolateKeyframes(keyframes, currentProgress)

      if (!prefersReducedMotion) {
        targetCamPos.set(
          targetState.camX + mouse.x * 0.14,
          targetState.camY + mouse.y * 0.10,
          targetState.camZ
        )
        currentCamPos.lerp(targetCamPos, 0.07)
        camera.position.copy(currentCamPos)

        targetLookTarget.set(
          targetState.targetX + mouse.x * 0.08,
          targetState.targetY + mouse.y * 0.06,
          targetState.targetZ
        )
        currentLookTarget.lerp(targetLookTarget, 0.07)
        camera.lookAt(currentLookTarget)

        sofaGroup.rotation.y += (targetState.sofaRotY - sofaGroup.rotation.y) * 0.07
        tableGroup.rotation.y += (targetState.tableRotY - tableGroup.rotation.y) * 0.07
        lampSpotLight.intensity += (targetState.lampLight - lampSpotLight.intensity) * 0.07
      } else {
        camera.position.set(0.1, 1.1, 5.6)
        camera.lookAt(0, -0.2, 0)
      }

      tableGroup.position.y = Math.sin(Date.now() * 0.0015) * 0.015
      particles.rotation.y = currentProgress * Math.PI * 0.6 + mouse.x * 0.08

      if (onHotspotsUpdate) {
        const sofaP = projectToScreen(sofaAnchorWorld)
        const tableP = projectToScreen(tableAnchorWorld)
        const lampP = projectToScreen(lampAnchorWorld)

        onHotspotsUpdate({
          hs1: {
            x: sofaP.x,
            y: sofaP.y,
            opacity: targetState.hs1,
            visible: sofaP.visible && targetState.hs1 > 0.02,
          },
          hs2: {
            x: tableP.x,
            y: tableP.y,
            opacity: targetState.hs2,
            visible: tableP.visible && targetState.hs2 > 0.02,
          },
          hs3: {
            x: lampP.x,
            y: lampP.y,
            opacity: targetState.hs3,
            visible: lampP.visible && targetState.hs3 > 0.02,
          },
        })
      }

      renderer.render(scene, camera)
    }

    animate()

    const handleResize = () => {
      width = container.clientWidth || window.innerWidth
      height = container.clientHeight || window.innerHeight
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      clearInterval(progressTimer)
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
      renderer.dispose()
    }
  }, [onHotspotsUpdate, onProgressUpdate])

  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 z-50 bg-[#080808] flex flex-col items-center justify-center transition-opacity duration-700">
          <div className="text-center space-y-4">
            <span className="font-body text-[11px] text-[#C6A15B] uppercase tracking-[0.22em] font-medium block">
              {homeContent.sculpture3D.brand}
            </span>
            <p className="font-display text-lg text-[#F3EFE7] font-normal">
              {homeContent.sculpture3D.loadingText}
            </p>
            <div className="w-48 h-[2px] bg-[#1a1918] overflow-hidden rounded-full mx-auto">
              <div
                className="h-full bg-[#C6A15B] transition-all duration-300 ease-out"
                style={{ width: `${loadProgress}%` }}
              />
            </div>
          </div>
        </div>
      )}

      {/* WebGL Canvas Container */}
      <div ref={containerRef} className="w-full h-full" />
    </div>
  )
}
