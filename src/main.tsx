import * as React from 'react'
import { createRoot } from 'react-dom/client'

// material-ui
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'

// project imports
import App from './App'
import theme from './theme'

const rootElement = document.getElementById('app') as HTMLElement
const root = createRoot(rootElement)

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
      <CssBaseline />
      <App />
    </ThemeProvider>
    ,
  </React.StrictMode>,
)
