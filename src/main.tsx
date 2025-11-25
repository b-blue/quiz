import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// Clean up old UI key leftover from previous feature iterations
try {
  localStorage.removeItem('ui:ambientPulse');
} catch (e) {}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
