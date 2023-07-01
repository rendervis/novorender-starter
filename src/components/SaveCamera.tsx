import { MouseEvent, ReactNode } from 'react'
import { Camera } from '@novorender/webgl-api'

// material-ui
import Button from '@mui/material/Button'

// types
export type CameraProps = Readonly<{
  position: Camera['position']
  rotation: Camera['rotation']
}>

type SaveCameraProps = {
  camera: Camera
  onSave: (position: CameraProps) => void
  children?: ReactNode
}

// ========= // SAVE CAMERA // ========= //
export function SaveCamera({ camera, onSave, children }: SaveCameraProps) {
  const handleSaveClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (event.shiftKey && event.button === 0) {
      const cameraProps: CameraProps = {
        position: { ...camera.position },
        rotation: { ...camera.rotation },
      }
      onSave(cameraProps)
    } else {
      // Show alert message
      alert('Shift + Left click to save camera')
    }
  }

  return (
    <Button variant="outlined" onClick={handleSaveClick}>
      {children}
    </Button>
  )
}
