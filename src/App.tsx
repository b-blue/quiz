import { useEffect, useState } from 'react'
import Quiz from './components/Quiz'
import './App.css'

function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    const stored = typeof window !== 'undefined' ? localStorage.getItem('theme') : null
    return stored === 'light' ? 'light' : 'dark'
  })

  useEffect(() => {
    const root = document.documentElement
    if (theme === 'light') root.classList.add('light-theme')
    else root.classList.remove('light-theme')
  try { localStorage.setItem('theme', theme); } catch { /* ignore errors (e.g., private mode) */ }
  }, [theme])

  function toggleTheme() {
    setTheme((t) => (t === 'light' ? 'dark' : 'light'))
  }

  return (
    <div>
      <header style={{ display: 'flex', gap: 12, alignItems: 'center', padding: '1rem' }}>
        <h1 style={{ margin: 0 }}>AWS Quiz</h1>
        <small style={{ color: 'var(--muted)' }}>Study terms from your notes</small>

        <div style={{ marginLeft: 'auto' }}>
          <button onClick={toggleTheme} aria-pressed={theme === 'light'} style={{ padding: '0.4rem 0.6rem', borderRadius: 8, border: '1px solid rgba(255,255,255,0.06)', background: 'var(--btn-bg)', color: 'var(--text)' }}>
            {theme === 'light' ? 'Light' : 'Dark'}
          </button>
        </div>
      </header>
      <main>
        <Quiz />
      </main>
    </div>
  )
}

export default App
