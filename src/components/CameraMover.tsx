import { ReactNode } from 'react'
import { Camera } from '@novorender/webgl-api'

// material-ui
import Button from '@mui/material/Button'

// project imports
import { CameraProps } from './SaveCamera'

// types
type CameraMoverProps = {
  camera: Camera
  positions: CameraProps[]
  children?: ReactNode
}

// ========= // CAMERA MOVER // ========= //
export function CameraMover({ camera, positions, children }: CameraMoverProps) {
  let currentIndex = -1

  const handleMoveCamera = () => {
    if (positions.length === 0) {
      return
    }

    currentIndex = (currentIndex + 1) % positions.length

    const { position, rotation } = positions[currentIndex]
    camera.controller.moveTo(position, rotation)
  }

  return (
    <Button variant="outlined" onClick={handleMoveCamera} disabled={positions.length === 0}>
      {children}
    </Button>
  )
}

export default CameraMover
