import { useCallback, useState } from 'react'
import { HierarcicalObjectReference } from '@novorender/webgl-api'

// materila-ui
import Box from '@mui/material/Box'
import FastForwardIcon from '@mui/icons-material/FastForward'

// project imports
import { useSceneContext } from '../contexts/SceneContext'
import handleVisibilityChanges from '../lib/util/handleVisibilityChanges'
import { CameraProps, SaveCamera } from './SaveCamera'
import Search from './Search'
import CameraMover from './CameraMover'

// ========= // SCENE CONTROLS // ========= //
function SceneControls() {
  const { view, scene } = useSceneContext()

  const [cameraPositions, setCameraPositions] = useState<CameraProps[]>([])

  const handleSearchResult = useCallback(
    (result: HierarcicalObjectReference[]) => {
      // Handle the search result here
      scene && handleVisibilityChanges(scene, result)
    },
    [scene],
  )

  const handleSaveCamera = (position: CameraProps) => {
    const oldPos = JSON.parse(localStorage.getItem('cameraPositions') || '[]')
    const newPos = [position, ...oldPos.slice(0, 2)]
    setCameraPositions(() => newPos)
    // Save cameraPositions to localStorage
    localStorage.setItem('cameraPositions', JSON.stringify(newPos))
  }

  return (
    <>
      {view && scene && (
        <Box
          className="hud"
          sx={{
            position: 'fixed',
            top: '16px',
            width: '100vw',
            zIndex: 1,
            height: '32px',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            gap: '8px',
            padding: '4px',
          }}
        >
          <Search scene={scene} onSearchResult={handleSearchResult} />

          <SaveCamera camera={view.camera} onSave={handleSaveCamera}>
            Save camera
          </SaveCamera>
          <CameraMover camera={view.camera} positions={cameraPositions}>
            <FastForwardIcon />
          </CameraMover>
        </Box>
      )}
    </>
  )
}

export default SceneControls
