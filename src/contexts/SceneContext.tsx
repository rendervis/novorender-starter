import { ReactNode, createContext, useContext, useEffect, useMemo, useState } from 'react'
import initScene from '../lib/bootstrap'
import { API, Scene, View } from '@novorender/webgl-api'
import { useDOMRef } from './DOMRefContext'

type SceneContextProps = {
  view: View | null
  scene: Scene | null
  api: API | null
}

const SceneContext = createContext<SceneContextProps>({} as any)

function SceneProvider({ children }: { children: ReactNode }) {
  const { DOMref } = useDOMRef<HTMLCanvasElement>()

  const [view, setView] = useState<View | null>(null)
  const [scene, setScene] = useState<Scene | null>(null)
  const [api, setAPi] = useState<API | null>(null)
  const canvas = DOMref['canvas']

  useEffect(() => {
    let isMounted = true
    const init = async () => {
      if (canvas && isMounted) {
        const { view, scene, webglApi } = await initScene({ canvas })
        setView(view)
        setScene(scene)
        setAPi(webglApi)
      }
    }

    init()
    return () => {
      isMounted = false
    }
  }, [canvas])

  const value = useMemo(
    () => ({
      view,
      scene,
      api,
    }),
    [view, scene, api],
  )

  return <SceneContext.Provider value={value}>{children}</SceneContext.Provider>
}

export default SceneProvider

export const useSceneContext = () => {
  const context = useContext(SceneContext)

  if (!context) {
    throw new Error(
      `The \`useSceneContext\` hook must be used inside the <SceneProvider> component's context.`,
    )
  }

  return context
}
