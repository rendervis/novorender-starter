import { HierarcicalObjectReference, Scene } from '@novorender/webgl-api'

// Hide objects that are not in the search result
export default function handleVisibilityChanges(
  scene: Scene,
  groups: HierarcicalObjectReference[],
): void {
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
