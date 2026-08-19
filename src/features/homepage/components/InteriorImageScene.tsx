import { useRef, useMemo, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { useTexture } from '@react-three/drei'
import * as THREE from 'three'

interface InteriorImageSceneProps {
  imageUrl: string
  scrollProgress: { get: () => number }
  shouldReduceMotion?: boolean
}

export const InteriorImageScene = ({
  imageUrl,
  scrollProgress,
  shouldReduceMotion = false,
}: InteriorImageSceneProps) => {
  const meshRef = useRef<THREE.Mesh>(null!)
  const texture = useTexture(imageUrl)

  const { camera, viewport, gl } = useThree()
  const maxAnisotropy = useMemo(() => gl.capabilities.getMaxAnisotropy(), [gl])

  // Ensure texture sRGB color space & high quality crisp filtering
  useEffect(() => {
    if (texture) {
      texture.colorSpace = THREE.SRGBColorSpace
      texture.minFilter = THREE.LinearMipmapLinearFilter
      texture.magFilter = THREE.LinearFilter
      texture.generateMipmaps = true
      texture.anisotropy = maxAnisotropy
      texture.needsUpdate = true
    }
  }, [texture, maxAnisotropy])

  // Track mouse coordinates for responsive desktop micro-parallax
  const mouseRef = useRef({ x: 0, y: 0 })
  const entranceProgressRef = useRef(0)

  // FLAT 1x1 PlaneGeometry — zero distortion, 100% crisp original texture
  const { geometry } = useMemo(() => {
    const img = texture.image as HTMLImageElement | undefined
    const imageAspect = img && img.width && img.height ? img.width / img.height : 1.77
    const viewportAspect = viewport.width / viewport.height

    let width = viewport.width
    let height = viewport.height

    if (viewportAspect > imageAspect) {
      height = viewport.width / imageAspect
    } else {
      width = viewport.height * imageAspect
    }

    const planeW = width * 1.25
    const planeH = height * 1.25

    // FLAT 1x1 PlaneGeometry
    const geo = new THREE.PlaneGeometry(planeW, planeH, 1, 1)
    return { geometry: geo }
  }, [texture.image, viewport.width, viewport.height])

  // Mouse move listener for desktop micro parallax
  useEffect(() => {
    if (shouldReduceMotion) return

    const handlePointerMove = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return

      const normalizedX = (e.clientX / window.innerWidth - 0.5) * 2
      const normalizedY = (e.clientY / window.innerHeight - 0.5) * 2

      mouseRef.current.x = THREE.MathUtils.clamp(normalizedX, -1, 1)
      mouseRef.current.y = THREE.MathUtils.clamp(normalizedY, -1, 1)
    }

    window.addEventListener('pointermove', handlePointerMove)
    return () => window.removeEventListener('pointermove', handlePointerMove)
  }, [shouldReduceMotion])

  // High performance smooth lerp update loop
  useFrame((_, delta) => {
    if (!meshRef.current) return

    if (entranceProgressRef.current < 1) {
      entranceProgressRef.current = THREE.MathUtils.clamp(
        entranceProgressRef.current + delta * 0.75,
        0,
        1
      )
    }
    const entranceEase = THREE.MathUtils.smoothstep(entranceProgressRef.current, 0, 1)

    if (shouldReduceMotion) {
      camera.position.set(0, 0, 5)
      meshRef.current.rotation.set(0, 0, 0)
      meshRef.current.position.set(0, 0, 0)
      return
    }

    const progress = THREE.MathUtils.clamp(scrollProgress.get(), 0, 1)
    const isMobile = viewport.width < 6.5

    const targetCamX = THREE.MathUtils.lerp(0, isMobile ? 0.08 : 0.20, progress)
    const targetCamY = THREE.MathUtils.lerp(0, isMobile ? -0.12 : -0.28, progress)

    const baseZ = THREE.MathUtils.lerp(5.25, 5.0, entranceEase)
    const targetCamZ = THREE.MathUtils.lerp(baseZ, isMobile ? 4.70 : 4.15, progress)

    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetCamX, 0.07)
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetCamY, 0.07)
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetCamZ, 0.07)

    const mouseX = mouseRef.current.x
    const mouseY = mouseRef.current.y

    const targetRotX = THREE.MathUtils.lerp(0, -0.018, progress) + mouseY * 0.008
    const targetRotY = THREE.MathUtils.lerp(0, 0.035, progress) + mouseX * 0.012
    const targetPosY = THREE.MathUtils.lerp(0, 0.12, progress)
    const targetPosX = mouseX * 0.05

    meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, targetRotX, 0.07)
    meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, targetRotY, 0.07)
    meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, targetPosY, 0.07)
    meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, targetPosX, 0.07)
  })

  return (
    <mesh ref={meshRef} geometry={geometry} position={[0, 0, 0]}>
      <meshBasicMaterial map={texture} transparent opacity={1} toneMapped={false} />
    </mesh>
  )
}
