import React, { useEffect, useRef, useState, useCallback } from 'react'
import * as THREE from 'three'
import { newsArticlesData } from '../data/newsData'
import type { NewsArticle } from '../types'

interface JournalHotspot {
  id: string
  title: string
  subtitle: string
  description: string
  pos: THREE.Vector3
  articleId?: string
}

function wrapText(ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] {
  const words = text.split(' ')
  const lines: string[] = []
  let currentLine = words[0] || ''

  for (let i = 1; i < words.length; i++) {
    const word = words[i]
    const width = ctx.measureText(currentLine + ' ' + word).width
    if (width < maxWidth) {
      currentLine += ' ' + word
    } else {
      lines.push(currentLine)
      currentLine = word
    }
  }
  lines.push(currentLine)
  return lines
}

export const NewsHero3D: React.FC<{ onSelectArticle?: (id: string) => void }> = ({ onSelectArticle }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState<number>(0)
  const [screenCoords, setScreenCoords] = useState<{ [key: string]: { x: number; y: number; visible: boolean } }>({})
  const [isFlipping, setIsFlipping] = useState<boolean>(false)

  const activeArticle: NewsArticle = newsArticlesData[activeIndex] || newsArticlesData[0]
  const prevArticle: NewsArticle = newsArticlesData[(activeIndex - 1 + newsArticlesData.length) % newsArticlesData.length]
  const nextArticle: NewsArticle = newsArticlesData[(activeIndex + 1) % newsArticlesData.length]

  // Refs for 3D elements to animate
  const sceneRef = useRef<THREE.Scene | null>(null)
  const texturesMapRef = useRef<{ [id: string]: THREE.CanvasTexture }>({})
  const coverMatRef = useRef<THREE.MeshStandardMaterial | null>(null)
  const prevCoverMatRef = useRef<THREE.MeshStandardMaterial | null>(null)
  const nextCoverMatRef = useRef<THREE.MeshStandardMaterial | null>(null)
  const journalGroupRef = useRef<THREE.Group | null>(null)
  const flipAngleRef = useRef<number>(0)
  const targetFlipAngleRef = useRef<number>(0)

  // Generate 3D Magazine Cover Canvas Texture for an article
  const getOrCreateArticleTexture = useCallback((article: NewsArticle): THREE.CanvasTexture => {
    if (texturesMapRef.current[article.id]) {
      return texturesMapRef.current[article.id]
    }

    const canvas = document.createElement('canvas')
    canvas.width = 1024
    canvas.height = 1366
    const ctx = canvas.getContext('2d')

    if (ctx) {
      // 1. Dark Obsidian Paper Background
      ctx.fillStyle = '#0E0E12'
      ctx.fillRect(0, 0, 1024, 1366)

      // 2. Luxury Gold Frame Border
      ctx.strokeStyle = '#C6A15B'
      ctx.lineWidth = 12
      ctx.strokeRect(36, 36, 952, 1294)
      ctx.lineWidth = 2
      ctx.strokeRect(54, 54, 916, 1258)

      // 3. Magazine Masthead Header
      ctx.fillStyle = '#C6A15B'
      ctx.font = 'bold 38px Georgia, serif'
      ctx.textAlign = 'center'
      ctx.fillText('HUMAN INTERIOR JOURNAL', 512, 130)

      ctx.fillStyle = '#AAA49A'
      ctx.font = '300 18px sans-serif'
      ctx.letterSpacing = '5px'
      ctx.fillText('ARCHITECTURAL PRESS & DESIGN MAGAZINE', 512, 172)

      // Divider line
      ctx.strokeStyle = 'rgba(198, 161, 91, 0.4)'
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.moveTo(90, 195)
      ctx.lineTo(934, 195)
      ctx.stroke()

      // 4. Category Badge
      ctx.fillStyle = '#DEC27B'
      ctx.font = 'bold 20px sans-serif'
      ctx.fillText(`• ${article.category.toUpperCase()} •`, 512, 235)

      // 5. Featured Image Placeholder Box
      ctx.fillStyle = '#18181F'
      ctx.fillRect(80, 260, 864, 480)
      ctx.strokeStyle = 'rgba(198, 161, 91, 0.3)'
      ctx.strokeRect(80, 260, 864, 480)

      // Draw Article Featured Image on Canvas asynchronously
      const img = new Image()
      img.crossOrigin = 'anonymous'
      img.onload = () => {
        if (ctx) {
          ctx.save()
          ctx.beginPath()
          ctx.rect(80, 260, 864, 480)
          ctx.clip()
          ctx.drawImage(img, 80, 260, 864, 480)
          // Overlay subtle dark gradient on image bottom
          const grad = ctx.createLinearGradient(0, 540, 0, 740)
          grad.addColorStop(0, 'rgba(14, 14, 18, 0)')
          grad.addColorStop(1, 'rgba(14, 14, 18, 0.85)')
          ctx.fillStyle = grad
          ctx.fillRect(80, 260, 864, 480)
          ctx.restore()
          tex.needsUpdate = true
        }
      }
      img.src = article.featuredImage

      // 6. Article Title
      ctx.fillStyle = '#F3EFE7'
      ctx.font = 'bold 40px Georgia, serif'
      const titleLines = wrapText(ctx, article.title, 840)
      let curY = 800
      titleLines.slice(0, 3).forEach((line) => {
        ctx.fillText(line, 512, curY)
        curY += 50
      })

      // 7. Subtitle / Excerpt
      ctx.fillStyle = '#AAA49A'
      ctx.font = '300 22px sans-serif'
      const excerptLines = wrapText(ctx, article.excerpt, 820)
      curY += 15
      excerptLines.slice(0, 2).forEach((line) => {
        ctx.fillText(line, 512, curY)
        curY += 34
      })

      // 8. Footer Metadata
      ctx.fillStyle = '#C6A15B'
      ctx.font = 'bold 18px monospace'
      ctx.fillText(`${article.publishedAt.toUpperCase()}  |  ${article.readTime.toUpperCase()}`, 512, 1220)

      ctx.fillStyle = '#AAA49A'
      ctx.font = '300 16px sans-serif'
      ctx.fillText(`TÁC GIẢ: ${article.author.name.toUpperCase()}`, 512, 1255)
    }

    const tex = new THREE.CanvasTexture(canvas)
    tex.wrapS = THREE.RepeatWrapping
    tex.wrapT = THREE.RepeatWrapping
    texturesMapRef.current[article.id] = tex
    return tex
  }, [])

  // Handle Changing Active Article
  const handleChangeArticle = (newIdx: number) => {
    if (isFlipping || newIdx === activeIndex) return
    setIsFlipping(true)
    targetFlipAngleRef.current += Math.PI * 2

    // Update active index after a short flip delay
    setTimeout(() => {
      setActiveIndex(newIdx)
      setIsFlipping(false)
    }, 350)
  }

  const handleNext = () => {
    const nextIdx = (activeIndex + 1) % newsArticlesData.length
    handleChangeArticle(nextIdx)
  }

  const handlePrev = () => {
    const prevIdx = (activeIndex - 1 + newsArticlesData.length) % newsArticlesData.length
    handleChangeArticle(prevIdx)
  }

  // Update textures on material refs when activeIndex changes
  useEffect(() => {
    const currentTex = getOrCreateArticleTexture(activeArticle)
    const prevTex = getOrCreateArticleTexture(prevArticle)
    const nextTex = getOrCreateArticleTexture(nextArticle)

    if (coverMatRef.current) {
      coverMatRef.current.map = currentTex
      coverMatRef.current.needsUpdate = true
    }
    if (prevCoverMatRef.current) {
      prevCoverMatRef.current.map = prevTex
      prevCoverMatRef.current.needsUpdate = true
    }
    if (nextCoverMatRef.current) {
      nextCoverMatRef.current.map = nextTex
      nextCoverMatRef.current.needsUpdate = true
    }
  }, [activeIndex, activeArticle, prevArticle, nextArticle, getOrCreateArticleTexture])

  // 3D Three.js Canvas Scene Setup
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let width = container.clientWidth
    let height = container.clientHeight

    // 1. SCENE & CAMERA
    const scene = new THREE.Scene()
    sceneRef.current = scene
    scene.background = null

    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100)
    camera.position.set(0, 0.4, 5.0)

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.3
    container.appendChild(renderer.domElement)

    // Master Group for Mouse Parallax
    const masterGroup = new THREE.Group()
    scene.add(masterGroup)

    // MATERIALS
    const paperPagesMat = new THREE.MeshStandardMaterial({
      color: 0xF3EFE7,
      roughness: 0.75,
    })

    const goldMat = new THREE.MeshStandardMaterial({
      color: 0xD4AF37,
      metalness: 0.9,
      roughness: 0.18,
    })

    const darkMetalMat = new THREE.MeshStandardMaterial({
      color: 0x141418,
      metalness: 0.85,
      roughness: 0.25,
    })

    const woodDeskMat = new THREE.MeshStandardMaterial({
      color: 0x1E1612,
      roughness: 0.4,
      metalness: 0.1,
    })

    // Initial Textures
    const initialTex = getOrCreateArticleTexture(activeArticle)
    const initialPrevTex = getOrCreateArticleTexture(prevArticle)
    const initialNextTex = getOrCreateArticleTexture(nextArticle)

    const journalCoverMat = new THREE.MeshStandardMaterial({
      map: initialTex,
      roughness: 0.35,
      metalness: 0.15,
    })
    coverMatRef.current = journalCoverMat

    const prevJournalCoverMat = new THREE.MeshStandardMaterial({
      map: initialPrevTex,
      roughness: 0.4,
      metalness: 0.1,
    })
    prevCoverMatRef.current = prevJournalCoverMat

    const nextJournalCoverMat = new THREE.MeshStandardMaterial({
      map: initialNextTex,
      roughness: 0.4,
      metalness: 0.1,
    })
    nextCoverMatRef.current = nextJournalCoverMat

    // 1. CENTER 3D ARCHITECTURAL JOURNAL / MAGAZINE
    const journalGroup = new THREE.Group()
    journalGroupRef.current = journalGroup

    // Front Cover Mesh
    const coverGeo = new THREE.BoxGeometry(1.5, 2.05, 0.02)
    const coverMesh = new THREE.Mesh(coverGeo, journalCoverMat)
    coverMesh.position.set(0, 0, 0.11)
    coverMesh.castShadow = true
    journalGroup.add(coverMesh)

    // Inner Pages Block Mesh
    const pagesGeo = new THREE.BoxGeometry(1.46, 2.0, 0.18)
    const pagesMesh = new THREE.Mesh(pagesGeo, paperPagesMat)
    pagesMesh.position.set(0.01, 0, 0.01)
    pagesMesh.castShadow = true
    journalGroup.add(pagesMesh)

    // Back Cover Mesh
    const backCoverGeo = new THREE.BoxGeometry(1.5, 2.05, 0.02)
    const backCoverMesh = new THREE.Mesh(backCoverGeo, darkMetalMat)
    backCoverMesh.position.set(0, 0, -0.09)
    backCoverMesh.castShadow = true
    journalGroup.add(backCoverMesh)

    // Spine Ribbon Bookmark
    const ribbonGeo = new THREE.BoxGeometry(0.08, 2.3, 0.01)
    const ribbonMesh = new THREE.Mesh(ribbonGeo, goldMat)
    ribbonMesh.position.set(-0.2, -0.15, 0.13)
    ribbonMesh.rotation.z = -0.1
    journalGroup.add(ribbonMesh)

    journalGroup.position.set(0, 0.1, 0.4)
    journalGroup.rotation.set(0.18, -0.22, 0.04)
    masterGroup.add(journalGroup)

    // 2. LEFT FLOATING PREVIOUS ARTICLE CARD
    const leftCardGroup = new THREE.Group()
    const leftCoverMesh = new THREE.Mesh(new THREE.BoxGeometry(1.2, 1.6, 0.02), prevJournalCoverMat)
    leftCoverMesh.castShadow = true
    leftCardGroup.add(leftCoverMesh)
    leftCardGroup.position.set(-1.7, -0.15, 0.0)
    leftCardGroup.rotation.set(0.25, 0.45, -0.08)
    masterGroup.add(leftCardGroup)

    // 3. RIGHT FLOATING NEXT ARTICLE CARD
    const rightCardGroup = new THREE.Group()
    const rightCoverMesh = new THREE.Mesh(new THREE.BoxGeometry(1.2, 1.6, 0.02), nextJournalCoverMat)
    rightCoverMesh.castShadow = true
    rightCardGroup.add(rightCoverMesh)
    rightCardGroup.position.set(1.7, -0.15, 0.0)
    rightCardGroup.rotation.set(0.25, -0.45, 0.08)
    masterGroup.add(rightCardGroup)

    // 4. DESK ENVIRONMENT SURFACE BASE
    const deskGeo = new THREE.BoxGeometry(5.2, 0.12, 2.6)
    const deskMesh = new THREE.Mesh(deskGeo, woodDeskMat)
    deskMesh.position.set(0, -1.25, 0)
    deskMesh.receiveShadow = true
    masterGroup.add(deskMesh)

    // 3D Fountain Pen on Desk
    const penGroup = new THREE.Group()
    const penBody = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 1.2, 16), darkMetalMat)
    penBody.rotation.z = Math.PI / 2
    const penTip = new THREE.Mesh(new THREE.ConeGeometry(0.025, 0.15, 16), goldMat)
    penTip.position.x = -0.67
    penTip.rotation.z = Math.PI / 2
    penGroup.add(penBody)
    penGroup.add(penTip)
    penGroup.position.set(-0.8, -1.16, 0.8)
    penGroup.rotation.y = 0.4
    masterGroup.add(penGroup)

    // 3D Brass Architectural Ruler
    const rulerGeo = new THREE.BoxGeometry(1.4, 0.01, 0.15)
    const rulerMesh = new THREE.Mesh(rulerGeo, goldMat)
    rulerMesh.position.set(1.0, -1.18, 0.9)
    rulerMesh.rotation.y = -0.3
    masterGroup.add(rulerMesh)

    // 5. AMBIENT GOLD DUST PARTICLES
    const particleCount = 70
    const particlePositions = new Float32Array(particleCount * 3)
    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 7.5
      particlePositions[i + 1] = (Math.random() - 0.5) * 5
      particlePositions[i + 2] = (Math.random() - 0.5) * 4
    }
    const particleGeo = new THREE.BufferGeometry()
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3))
    const particleMat = new THREE.PointsMaterial({
      color: 0xD4AF37,
      size: 0.022,
      transparent: true,
      opacity: 0.5,
    })
    const particles = new THREE.Points(particleGeo, particleMat)
    scene.add(particles)

    // LIGHTING
    const ambientLight = new THREE.AmbientLight(0xFFFAEE, 1.5)
    scene.add(ambientLight)

    const mainSun = new THREE.DirectionalLight(0xFFFAEE, 2.6)
    mainSun.position.set(4, 6, 4)
    mainSun.castShadow = true
    scene.add(mainSun)

    const fillSpot = new THREE.SpotLight(0xC6A15B, 4.2, 12, Math.PI / 4)
    fillSpot.position.set(-3, 4, 3)
    scene.add(fillSpot)

    // MOUSE PARALLAX
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      mouse.targetX = ((e.clientX - rect.left) / rect.width) * 2 - 1
      mouse.targetY = -(((e.clientY - rect.top) / rect.height) * 2 - 1)
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })

    let animId: number
    const clock = new THREE.Clock()

    // Hotspot positions in 3D
    const HOTSPOTS_3D: JournalHotspot[] = [
      {
        id: 'hs-main-journal',
        title: 'Tạp Chí Bìa 3D',
        subtitle: 'BÀI NỔI BẬT',
        description: 'Trải nghiệm giao diện báo điện tử 3D tương tác độc bản từ Human Interior Studio.',
        pos: new THREE.Vector3(0, 0.1, 0.4),
      },
      {
        id: 'hs-prev-article',
        title: 'Bài Trước',
        subtitle: 'TIN TỨC CÙNG CHUYÊN MỤC',
        description: 'Bấm để lật trang xem bài viết báo chí trước.',
        pos: new THREE.Vector3(-1.7, -0.15, 0.0),
      },
      {
        id: 'hs-next-article',
        title: 'Bài Tiếp Theo',
        subtitle: 'XU HƯỚNG MỚI',
        description: 'Bấm để lật trang sang bài viết kế tiếp.',
        pos: new THREE.Vector3(1.7, -0.15, 0.0),
      },
    ]

    const animate = () => {
      animId = requestAnimationFrame(animate)
      const elapsedTime = clock.getElapsedTime()

      // Smooth lerp mouse tracking
      mouse.x += (mouse.targetX - mouse.x) * 0.05
      mouse.y += (mouse.targetY - mouse.y) * 0.05

      // Smooth flip rotation lerp
      flipAngleRef.current += (targetFlipAngleRef.current - flipAngleRef.current) * 0.1

      // Floating animations
      journalGroup.rotation.y = -0.22 + Math.sin(elapsedTime * 0.8) * 0.05 + mouse.x * 0.22 + flipAngleRef.current
      journalGroup.rotation.x = 0.18 + Math.cos(elapsedTime * 0.6) * 0.03 + mouse.y * 0.12
      journalGroup.position.y = 0.1 + Math.sin(elapsedTime * 1.1) * 0.04

      leftCardGroup.rotation.y = 0.45 + Math.sin(elapsedTime * 0.9) * 0.04 + mouse.x * 0.15
      leftCardGroup.position.y = -0.15 + Math.cos(elapsedTime * 0.9) * 0.03

      rightCardGroup.rotation.y = -0.45 - Math.sin(elapsedTime * 0.9) * 0.04 + mouse.x * 0.15
      rightCardGroup.position.y = -0.15 + Math.sin(elapsedTime * 0.9) * 0.03

      particles.rotation.y = elapsedTime * 0.03

      masterGroup.rotation.y = mouse.x * 0.06
      masterGroup.rotation.x = mouse.y * 0.04

      // Calculate 2D Screen coords for hotspots
      const newScreenCoords: { [key: string]: { x: number; y: number; visible: boolean } } = {}
      HOTSPOTS_3D.forEach((hs) => {
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
  }, [getOrCreateArticleTexture])

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[480px] sm:h-[530px] lg:h-[570px] cursor-grab active:cursor-grabbing select-none rounded-2xl bg-[#09090C]/90 overflow-hidden border border-[#C6A15B]/30 shadow-[0_0_50px_rgba(198,161,91,0.12)]"
    >
      {/* 1. TOP HEADER OVERLAY: NEWS TICKER & BADGE */}
      <div className="absolute top-4 left-4 right-4 z-20 flex flex-wrap items-center justify-between gap-3 pointer-events-none">
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0A0A0A]/85 border border-[#C6A15B]/40 backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-[#C6A15B] animate-pulse" />
          <span className="font-body text-[11px] font-medium text-[#C6A15B] uppercase tracking-[0.22em]">
            BÁO NỘI THẤT 3D • {activeIndex + 1}/{newsArticlesData.length}
          </span>
        </div>

        <div className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0A0A0A]/75 border border-[#C6A15B]/25 text-[11px] font-body text-[#AAA49A] backdrop-blur-md">
          <span className="material-symbols-outlined text-sm text-[#C6A15B]">auto_stories</span>
          <span>Di chuột &amp; click 3D để lật trang</span>
        </div>
      </div>

      {/* 2. SIDE 3D NAVIGATION ARROWS */}
      <button
        onClick={handlePrev}
        disabled={isFlipping}
        aria-label="Bài viết trước"
        className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-[#0A0A0A]/85 border border-[#C6A15B]/40 text-[#DEC27B] hover:bg-[#C6A15B] hover:text-[#0A0A0A] transition-all flex items-center justify-center shadow-lg backdrop-blur-md active:scale-95 disabled:opacity-50"
      >
        <span className="material-symbols-outlined text-xl">chevron_left</span>
      </button>

      <button
        onClick={handleNext}
        disabled={isFlipping}
        aria-label="Bài viết tiếp theo"
        className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-[#0A0A0A]/85 border border-[#C6A15B]/40 text-[#DEC27B] hover:bg-[#C6A15B] hover:text-[#0A0A0A] transition-all flex items-center justify-center shadow-lg backdrop-blur-md active:scale-95 disabled:opacity-50"
      >
        <span className="material-symbols-outlined text-xl">chevron_right</span>
      </button>

      {/* 3. 3D HOTSPOT PINS */}
      {screenCoords['hs-main-journal']?.visible && (
        <div
          className="absolute z-20 transform -translate-x-1/2 -translate-y-1/2 pointer-events-auto"
          style={{
            left: `${screenCoords['hs-main-journal'].x}px`,
            top: `${screenCoords['hs-main-journal'].y}px`,
          }}
        >
          <button
            onClick={() => {
              if (onSelectArticle) onSelectArticle(activeArticle.id)
            }}
            className="group focus:outline-none"
          >
            <div className="relative flex items-center justify-center">
              <span className="absolute w-8 h-8 rounded-full bg-[#C6A15B]/30 animate-ping duration-1000" />
              <span className="relative w-6 h-6 rounded-full bg-[#C6A15B] border-2 border-[#F3EFE7] flex items-center justify-center shadow-[0_0_15px_#C6A15B] group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-xs text-[#0A0A0A]">article</span>
              </span>
              <span className="absolute left-8 whitespace-nowrap px-3 py-1 rounded-md bg-[#141414]/95 text-[#DEC27B] border border-[#C6A15B] text-[11px] font-body font-medium tracking-[0.14em] shadow-lg opacity-90 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
                Đọc Bài Này ➔
              </span>
            </div>
          </button>
        </div>
      )}

      {/* 4. BOTTOM ACTION CONTROL BAR */}
      <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 z-20 p-3.5 sm:p-4 rounded-xl bg-[#0B0B0E]/95 border border-[#C6A15B]/40 backdrop-blur-lg shadow-2xl space-y-2.5">
        {/* Row 1: Article Category, Date & Full Title */}
        <div className="text-left space-y-1">
          <div className="flex items-center gap-2.5">
            <span className="font-body text-[10px] sm:text-[11px] font-bold text-[#EDDAA2] uppercase tracking-wider px-2.5 py-0.5 rounded bg-[#C6A15B]/20 border border-[#C6A15B]/40 whitespace-nowrap shrink-0">
              {activeArticle.category}
            </span>
            <span className="font-body text-xs text-[#D1D5DB] font-medium whitespace-nowrap shrink-0">
              {activeArticle.publishedAt}
            </span>
          </div>
          <h3 className="card-title text-sm sm:text-base text-[#F5F1E8] font-bold leading-snug truncate">
            {activeArticle.title}
          </h3>
        </div>

        {/* Row 2: Action Buttons */}
        <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-[#C6A15B]/20 font-body">
          <button
            onClick={handleNext}
            disabled={isFlipping}
            className="btn-secondary px-3.5 py-1.5 sm:px-4 sm:py-2 text-[11px] sm:text-xs font-bold flex items-center justify-center gap-1.5 whitespace-nowrap shrink-0"
          >
            <span className="material-symbols-outlined text-xs sm:text-sm">flip</span>
            <span>Lật Trang 3D</span>
          </button>

          <button
            onClick={() => {
              if (onSelectArticle) onSelectArticle(activeArticle.id)
            }}
            className="btn-primary px-4 py-1.5 sm:px-5 sm:py-2 text-[11px] sm:text-xs font-bold flex items-center justify-center gap-1.5 whitespace-nowrap shrink-0"
          >
            <span>Đọc Tin Chi Tiết</span>
            <span className="material-symbols-outlined text-xs sm:text-sm">arrow_forward</span>
          </button>
        </div>
      </div>

      {/* 5. ARTICLE INDICATOR PILLS */}
      <div className="absolute top-16 left-1/2 -translate-x-1/2 z-20 hidden md:flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0A0A0A]/75 border border-[#C6A15B]/20 backdrop-blur-md">
        {newsArticlesData.map((art, idx) => (
          <button
            key={art.id}
            onClick={() => handleChangeArticle(idx)}
            className={`w-2.5 h-2.5 rounded-full transition-all ${
              idx === activeIndex
                ? 'bg-[#C6A15B] w-6 shadow-[0_0_8px_#C6A15B]'
                : 'bg-[#AAA49A]/40 hover:bg-[#C6A15B]/60'
            }`}
            title={art.title}
          />
        ))}
      </div>
    </div>
  )
}

