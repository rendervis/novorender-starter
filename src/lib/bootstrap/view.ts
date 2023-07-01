import { API } from '@novorender/webgl-api'
import { API as DataJsApi } from '@novorender/data-js-api'

// ========= // Load scene and initialize the 3D view // ========= //
export default async function initView(dataApi: DataJsApi, api: API, canvas: HTMLCanvasElement) {
  // Load scene metadata
  const sceneData = await dataApi
    // Condos scene ID, but can be changed to any scene ID
    .loadScene('3b5e65560dc4422da5c7c3f827b6a77c')
    .then((res) => {
      if ('error' in res) {
        throw res
      } else {
        return res
      }
    })

  // Destructure relevant properties into variables
  const { url, db, settings, camera: cameraParams } = sceneData

  // Load scene
  const scene = await api.loadScene(url, db)

  // Create a view with the scene's saved settings
  const view = await api.createView(settings, canvas)

  // Set resolution scale to 1
  view.applySettings({ quality: { resolution: { value: 1 } } })

  // Create a camera controller with the saved parameters with turntable as fallback
  const camera = cameraParams ?? ({ kind: 'flight' } as any)
  view.camera.controller = api.createCameraController(camera, canvas)

  // Assign the scene to the view
  view.scene = scene

  return view
}
