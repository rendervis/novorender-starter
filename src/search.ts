import { HierarcicalObjectReference, Scene } from '@novorender/webgl-api'

export async function initSearch(
  scene: Scene,
  callback: (result: HierarcicalObjectReference[]) => void,
): Promise<void> {
  let loading = false
  let active = false
  let abortController = new AbortController()
  const form = document.getElementById('search_panel') as HTMLFormElement
  const input = form.querySelector('input') as HTMLInputElement
  const searchButton = document.getElementById('search_button')!

  // Toggle UI
  searchButton.addEventListener('click', async () => {
    active = !active
    console.log(' searchButton.addEventListener')
    console.log(' searchButton.addEventListener active', active)
    if (active) {
      searchButton.classList.add('active')
      form.classList.remove('hidden')
    } else {
      searchButton.classList.remove('active')
      form.classList.add('hidden')

      // Reset highlight of all objects
      scene.objectHighlighter.objectHighlightIndices.fill(0)
      scene.objectHighlighter.commit()
    }
  })

  // Handle search
  form.addEventListener('submit', async (event) => {
    event.preventDefault()

    const query = input.value
    console.log('orm.addEventListener: query', query)
    if (!query) {
      callback([])
      return 'no-op'
    }

    // Abort last search if called again before it has finished
    if (loading) {
      abortController.abort()
      abortController = new AbortController()
    }

    const abortSignal = abortController.signal
    loading = true

    try {
      const iterator = scene.search({ searchPattern: query }, abortSignal)
      const result: HierarcicalObjectReference[] = []
      for await (const obj of iterator) {
        result.push(obj)
      }

      loading = false

      callback(result)
    } catch (e) {
      console.warn(e)
    }
  })
}
