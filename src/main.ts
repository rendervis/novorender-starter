import { createAPI } from '@novorender/webgl-api'
import { main } from './novorenderCanvas'

import './main.css'
const mainElement = document.querySelector<HTMLDivElement>('#app')
const canvas = document.getElementById('3d_canvas') as HTMLCanvasElement
const hudElement = document.querySelector<HTMLDivElement>('.hud')

// Initialize webgl api
const webglApi = createAPI({
  scriptBaseUrl: window.location.origin + '/novorender/webgl-api/',
})

if (mainElement && webglApi && canvas && hudElement) {
  hudElement.style.display = 'block'
  main({ webglApi, canvas })
}
