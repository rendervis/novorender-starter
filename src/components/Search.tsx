import { useState } from 'react'
import { HierarcicalObjectReference, Scene } from '@novorender/webgl-api'

// material-ui
import Button from '@mui/material/Button'
import OutlinedInput from '@mui/material/OutlinedInput'

// types
type Props = Readonly<{
  scene: Scene
  onSearchResult: (result: HierarcicalObjectReference[]) => void
}>

// ========= // SEARCH // ========= //
function Search({ scene, onSearchResult }: Props) {
  const [loading, setLoading] = useState(false)
  const [active, setActive] = useState(false)
  const [query, setQuery] = useState('')
  let abortController = new AbortController()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!query) {
      onSearchResult([])
      return 'no-op'
    }

    // Abort last search if called again before it has finished
    if (loading) {
      abortController.abort()
      abortController = new AbortController()
    }

    setLoading(true)

    try {
      const iterator = scene.search({ searchPattern: query }, abortController.signal)
      const result: HierarcicalObjectReference[] = []
      for await (const obj of iterator) {
        result.push(obj)
      }

      setLoading(false)
      onSearchResult(result)
    } catch (e) {
      console.error('::Search:: error', e)
    }
  }

  const handleToggle = () => {
    setActive((prevActive) => !prevActive)

    if (active) {
      // Reset highlight of all objects
      scene.objectHighlighter.objectHighlightIndices.fill(0)
      scene.objectHighlighter.commit()
    }
  }

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value)
  }

  return (
    <>
      <Button variant="outlined" onClick={handleToggle}>
        {active ? 'Deactivate Search' : 'Activate Search'}
      </Button>
      {active && (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'row', gap: '4px' }}>
          <OutlinedInput type="text" value={query} onChange={handleQueryChange} />
          <Button variant="contained" type="submit" disabled={loading}>
            {loading ? 'Searching...' : 'Search'}
          </Button>
        </form>
      )}
    </>
  )
}

export default Search
