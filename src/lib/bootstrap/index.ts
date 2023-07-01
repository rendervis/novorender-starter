import { createAPI as createDataJsAPI } from '@novorender/data-js-api'
import { createAPI } from '@novorender/webgl-api'
import initView from './view'
import initHighlighter from '../util/initHighlighter'
import run from './run'

const initScene = async ({ canvas }: { canvas: HTMLCanvasElement }) => {
  // Initialize webgl api
  const webglApi = createAPI({
    scriptBaseUrl: window.location.origin + '/novorender/webgl-api/',
  })

  // Initialize the data API with the Novorender data server service
  const dataApi = createDataJsAPI({
    serviceUrl: 'https://data.novorender.com/api',
  })

  // basic scene setup
  const view = await initView(dataApi, webglApi, canvas)
  const scene = view.scene!

  initHighlighter(view, scene, webglApi)

  run(view, canvas)

  return { view, scene, webglApi }
}

export default initScene
