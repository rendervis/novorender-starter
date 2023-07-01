import { createTheme } from '@mui/material/styles'
import { red } from '@mui/material/colors'

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        '*': {
          boxSizing: 'border-box',
          scrollbarWidth: 'thin',
        },
        html: {
          touchAction: 'manipulation',
          textRendering: 'optimizeLegibility',
          MozOsxFontSmoothing: 'grayscale',
          WebkitFontSmoothing: 'antialiased',
          display: 'block',
        },
        body: {
          margin: 0,
          overflow: 'hidden',
          minHeight: '100vh',
          height: '100%',
        },

        '#app': {
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
        },
        canvas: {
          outline: 0,
          height: '100vh',
          width: '100vw',
          cursor: 'crosshair',
        },
      },
    },

    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(190,190,190,0.5)',
        },
      },
    },
  },
})

export default theme
