import { createContext, useContext, useState, useCallback } from 'react'
import type { ReactNode } from 'react'
import bg3dVideo from '../../../assets/bg_3d.mp4'

interface SceneContextValue {
  activeImage: string
  midgroundImage?: string
  foregroundImage?: string
  canvasOpacity: number
  setScene: (imageUrl: string, opacity: number, midgroundUrl?: string, foregroundUrl?: string) => void
}

// Default 3D Background: User's local bg_3d.mp4 video texture
const DEFAULT_IMAGE = bg3dVideo

const SceneContext = createContext<SceneContextValue>({
  activeImage: DEFAULT_IMAGE,
  canvasOpacity: 1,
  setScene: () => {},
})

export const useSceneContext = () => useContext(SceneContext)

interface SceneProviderProps {
  children: ReactNode
}

export const SceneProvider = ({ children }: SceneProviderProps) => {
  const [activeImage, setActiveImage] = useState(DEFAULT_IMAGE)
  const [midgroundImage, setMidgroundImage] = useState<string | undefined>(undefined)
  const [foregroundImage, setForegroundImage] = useState<string | undefined>(undefined)
  const [canvasOpacity, setCanvasOpacity] = useState(1)

  const setScene = useCallback(
    (imageUrl: string, opacity: number, midgroundUrl?: string, foregroundUrl?: string) => {
      setActiveImage((prev) => (prev !== imageUrl ? imageUrl : prev))
      setMidgroundImage((prev) => (prev !== midgroundUrl ? midgroundUrl : prev))
      setForegroundImage((prev) => (prev !== foregroundUrl ? foregroundUrl : prev))
      setCanvasOpacity((prev) => (prev !== opacity ? opacity : prev))
    },
    []
  )

  return (
    <SceneContext.Provider
      value={{ activeImage, midgroundImage, foregroundImage, canvasOpacity, setScene }}
    >
      {children}
    </SceneContext.Provider>
  )
}
