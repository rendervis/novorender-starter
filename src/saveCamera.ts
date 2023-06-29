import { Camera } from '@novorender/webgl-api'

// types
export type CameraProps = Readonly<{
  position: Camera['position']
  rotation: Camera['rotation']
}>

export function saveCamera(camera: Camera, callback: (position: CameraProps) => void): void {
  const saveButton = document.getElementById('save_button')!

  // Listen for Shift + Left click event
  saveButton.addEventListener('click', (event) => {
    if (event.shiftKey && event.button === 0) {
      const cameraProps: CameraProps = {
        position: { ...camera.position },
        rotation: { ...camera.rotation },
      }
      callback(cameraProps)
    } else {
      // Show alert message
      alert('Shift + Left click to save camera')
    }
  })
}
