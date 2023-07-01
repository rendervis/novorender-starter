import { useRef } from 'react'

// project imports
import { useDOMRef } from '../contexts/DOMRefContext'

// types
type Props = Readonly<{
  id?: string
}>

// ========= // CANVAS // ========= //
function Canvas(props: Props) {
  const { id } = props

  const containerRef = useRef<HTMLDivElement>(null)
  const { setRef } = useDOMRef<HTMLCanvasElement>()

  const canvasId = id || 'canvas'
  const containerCanvasId = `container-${canvasId}`

  return (
    <div
      id={containerCanvasId}
      ref={containerRef}
      data-refkey={containerCanvasId}
      style={{ flex: 1, position: 'relative', overflow: 'hidden', height: '100%', width: '100%' }}
    >
      <div
        style={{
          position: 'absolute',
          height: '100%',
          width: '100%',
        }}
      >
        <canvas ref={setRef} id={canvasId}></canvas>
      </div>
    </div>
  )
}

export default Canvas
