import {
  API,
  HierarcicalObjectReference,
  Scene,
  View,
  // createAPI,
} from '@novorender/webgl-api'
import * as DataJsApi from '@novorender/data-js-api'

import { initSearch } from './search'
import { CameraProps, saveCamera } from './saveCamera'
import { initFlyTo } from './flyTo'

// types
export interface IParams {
  canvas: HTMLCanvasElement
  webglApi: API
}

export async function main({ webglApi, canvas }: IParams): Promise<void> {
  try {
    // Initialize the data API with the Novorender data server service
    const dataApi = DataJsApi.createAPI({
      serviceUrl: 'https://data.novorender.com/api',
    })

    const view = await initView(dataApi, webglApi, canvas)

    const scene = view.scene!
    // Retrieve cameraPositions from localStorage if available
    let cameraPositions: CameraProps[] = JSON.parse(localStorage.getItem('cameraPositions') || '[]')
    run(view, canvas)

    // Show HUD and init the extra functionality
    document.querySelector('.hud')?.classList.remove('hidden')

    initHighlighter(view, scene, webglApi)

    // Setup search with callback
    initSearch(scene, (result) => {
      handleVisibilityChanges(scene, result)
    })

    saveCamera(view.camera, (position) => {
      cameraPositions = [position, ...cameraPositions.slice(0, 2)]

      // Save cameraPositions to localStorage
      localStorage.setItem('cameraPositions', JSON.stringify(cameraPositions))

      initFlyTo(view)
    })
    initFlyTo(view)
  } catch (e) {
    // Handle errors
    console.log('::main error::', e)
  }
}

// ========= // Load scene and initialize the 3D view // ========= //
async function initView(dataApi: DataJsApi.API, api: API, canvas: HTMLCanvasElement) {
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

//========= //  Run render loop // ========= //
async function run(view: View, canvas: HTMLCanvasElement): Promise<void> {
  // Handle canvas resizes
  const resizeObserver = new ResizeObserver((entries) => {
    for (const entry of entries) {
      canvas.width = entry.contentRect.width
      canvas.height = entry.contentRect.height
      view.applySettings({
        display: { width: canvas.width, height: canvas.height },
      })
    }
  })

  resizeObserver.observe(canvas)

  // Create a bitmap context to display render output
  const ctx = canvas.getContext('bitmaprenderer')

  // Main render loop
  while (true) {
    // Render frame
    const output = await view.render()
    {
      // Finalize output image
      const image = await output.getImage()

      if (image) {
        // Display in canvas
        ctx?.transferFromImageBitmap(image)
        image.close()
      }
    }
    ;(output as any).dispose()
  }
}

function initHighlighter(view: View, scene: Scene, api: API): (ids: number[]) => void {
  // Init highlights with neutral as highlight color
  view.settings.objectHighlights = [
    api.createHighlight({ kind: 'neutral' }),
    api.createHighlight({ kind: 'color', color: [0.6, 0.6, 0.6, 1] }),
  ]

  return (ids) => {
    // Reset highlight of all objects
    scene.objectHighlighter.objectHighlightIndices.fill(0)
    if (ids.length) {
      // Set new highlight on selected objects
      ids.forEach((id) => (scene.objectHighlighter.objectHighlightIndices[id] = 1))
    } else {
      scene.objectHighlighter.objectHighlightIndices.fill(1)
    }
    scene.objectHighlighter.commit()
  }
}

// Hide objects that are not in the search result
function handleVisibilityChanges(scene: Scene, groups: HierarcicalObjectReference[]): void {
  if (groups.length) {
    // Hide all
    scene.objectHighlighter.objectHighlightIndices.fill(255)

    // Render result objects
    groups.forEach((group) => (scene.objectHighlighter.objectHighlightIndices[group.id] = 1))
  } else {
    // Render All in neutral color
    scene.objectHighlighter.objectHighlightIndices.fill(1)
  }
  scene.objectHighlighter.commit()
}
