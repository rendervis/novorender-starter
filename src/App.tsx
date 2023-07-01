// project imports
import NovoCanvas from './components/NovoCanvas'
import Hud from './components/SceneControls'
import SceneProvider from './contexts/SceneContext'
import DOMRefProvider from './contexts/DOMRefContext'

export default function App() {
  return (
    <>
      <DOMRefProvider>
        <SceneProvider>
          <Hud />
          <NovoCanvas />
        </SceneProvider>
      </DOMRefProvider>
    </>
  )
}
