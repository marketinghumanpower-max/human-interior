import { useRef, useEffect, useState } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import bg3dVideo from '../../../assets/bg_3d.mp4'

interface GlobalImageSceneProps {
  scrollProgress: { get: () => number }
  shouldReduceMotion?: boolean
}

export const GlobalImageScene = ({
  scrollProgress,
  shouldReduceMotion = false,
}: GlobalImageSceneProps) => {
  const meshRef = useRef<THREE.Mesh>(null!)
  const [texture, setTexture] = useState<THREE.VideoTexture | null>(null)
  const [aspect, setAspect] = useState(1.77)
  const { camera, viewport, gl } = useThree()
  const mouseRef = useRef({ x: 0, y: 0 })

  // Initialize default 3D video texture immediately on load
  useEffect(() => {
    const video = document.createElement('video')
    video.src = bg3dVideo
    video.crossOrigin = 'anonymous'
    video.loop = true
    video.muted = true
    video.playsInline = true
    video.autoplay = true
    video.preload = 'auto'
    video.setAttribute('playsinline', 'true')
    video.setAttribute('webkit-playsinline', 'true')

    const vTex = new THREE.VideoTexture(video)
    vTex.colorSpace = THREE.SRGBColorSpace
    vTex.minFilter = THREE.LinearFilter
    vTex.magFilter = THREE.LinearFilter
    vTex.anisotropy = gl.capabilities.getMaxAnisotropy()
    vTex.generateMipmaps = false

    const handleMetadata = () => {
      if (video.videoWidth && video.videoHeight) {
        setAspect(video.videoWidth / video.videoHeight)
      }
      vTex.needsUpdate = true
    }

    if (video.readyState >= 1) {
      handleMetadata()
    } else {
      video.addEventListener('loadedmetadata', handleMetadata)
    }

    video.play().catch(() => {
      const handleUserGesture = () => {
        video.play()
        window.removeEventListener('click', handleUserGesture)
        window.removeEventListener('touchstart', handleUserGesture)
      }
      window.addEventListener('click', handleUserGesture)
      window.addEventListener('touchstart', handleUserGesture)
    })

    setTexture(vTex)

    return () => {
      video.removeEventListener('loadedmetadata', handleMetadata)
      video.pause()
      video.src = ''
      vTex.dispose()
    }
  }, [gl])

  // Mouse move listener for smooth micro parallax
  useEffect(() => {
    if (shouldReduceMotion) return

    const handlePointerMove = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return
      mouseRef.current.x = THREE.MathUtils.clamp((e.clientX / window.innerWidth - 0.5) * 2, -1, 1)
      mouseRef.current.y = THREE.MathUtils.clamp((e.clientY / window.innerHeight - 0.5) * 2, -1, 1)
    }

    window.addEventListener('pointermove', handlePointerMove, { passive: true })
    return () => window.removeEventListener('pointermove', handlePointerMove)
  }, [shouldReduceMotion])

  // Smooth animation frame loop
  useFrame(() => {
    if (!meshRef.current) return

    // Scale mesh to fit viewport dynamically without distortion
    const viewportAspect = viewport.width / viewport.height
    let w = viewport.width
    let h = viewport.height

    if (viewportAspect > aspect) {
      h = viewport.width / aspect
    } else {
      w = viewport.height * aspect
    }

    meshRef.current.scale.set(w * 1.15, h * 1.15, 1)

    if (shouldReduceMotion) {
      camera.position.set(0, 0, 5)
      return
    }

    // Smooth subtle camera dolly & mouse micro parallax
    const progress = THREE.MathUtils.clamp(scrollProgress.get(), 0, 1)
    const isMobile = viewport.width < 6.5

    const targetCamX = THREE.MathUtils.lerp(0, isMobile ? 0.08 : 0.22, progress)
    const targetCamY = THREE.MathUtils.lerp(0, isMobile ? -0.12 : -0.28, progress)
    const targetCamZ = THREE.MathUtils.lerp(5.0, isMobile ? 4.30 : 3.75, progress)

    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetCamX, 0.08)
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetCamY, 0.08)
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetCamZ, 0.08)

    const mouseX = mouseRef.current.x
    const mouseY = mouseRef.current.y

    const bgRotX = THREE.MathUtils.lerp(0, -0.015, progress) + mouseY * 0.005
    const bgRotY = THREE.MathUtils.lerp(0, 0.03, progress) + mouseX * 0.008
    const bgPosX = mouseX * 0.03
    const bgPosY = THREE.MathUtils.lerp(0, 0.08, progress)

    meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, bgRotX, 0.08)
    meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, bgRotY, 0.08)
    meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, bgPosX, 0.08)
    meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, bgPosY, 0.08)
  })

  if (!texture) return null

  return (
    <mesh ref={meshRef} position={[0, 0, -0.5]}>
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial map={texture} transparent opacity={1} toneMapped={false} />
    </mesh>
  )
}


