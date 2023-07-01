import { API, Scene, View } from '@novorender/webgl-api'

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

export default initHighlighter
