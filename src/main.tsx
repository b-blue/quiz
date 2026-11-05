import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { theme } from './theme'
import { applyTopInset, loadTopInset } from './lib/appState'
import './index.css'
import App from './App.tsx'

// Clean up old UI key leftover from previous feature iterations
try {
  localStorage.removeItem('ui:ambientPulse');
} catch (e) {}

applyTopInset(loadTopInset());

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme} defaultMode="system">
      <CssBaseline />
      <App />
    </ThemeProvider>
  </StrictMode>,
)
