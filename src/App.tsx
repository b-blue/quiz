import { useEffect, useState } from 'react'
import Quiz from './components/Quiz'
import BiologyQuiz from './components/BiologyQuiz'
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

  const [mode, setMode] = useState<'aws'|'bio'>('aws');

  return (
    <div>
      <header style={{ display: 'flex', gap: 12, alignItems: 'center', padding: '1rem' }}>
        <div>
          <h1 style={{ margin: 0 }}>{mode === 'aws' ? 'AWS Quiz' : 'Biology Quiz'}</h1>
          <small style={{ color: 'var(--muted)' }}>{mode === 'aws' ? 'Study AWS terms from your notes' : 'Practice biology questions from Biology.md'}</small>
        </div>

        <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
          <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
            <button onClick={() => setMode('aws')} aria-pressed={mode === 'aws'} style={{ padding: '0.4rem 0.6rem', borderRadius: 8, border: mode === 'aws' ? '2px solid var(--accent)' : '1px solid rgba(255,255,255,0.06)', background: 'var(--btn-bg)', color: 'var(--text)' }}>
              AWS Quiz
            </button>
            <button onClick={() => setMode('bio')} aria-pressed={mode === 'bio'} style={{ padding: '0.4rem 0.6rem', borderRadius: 8, border: mode === 'bio' ? '2px solid var(--accent)' : '1px solid rgba(255,255,255,0.06)', background: 'var(--btn-bg)', color: 'var(--text)' }}>
              Biology Quiz
            </button>
          </div>

          <button onClick={toggleTheme} aria-pressed={theme === 'light'} style={{ padding: '0.4rem 0.6rem', borderRadius: 8, border: '1px solid rgba(255,255,255,0.06)', background: 'var(--btn-bg)', color: 'var(--text)' }}>
            {theme === 'light' ? 'Light' : 'Dark'}
          </button>
        </div>
      </header>
      <main>
        {mode === 'aws' ? <Quiz /> : <BiologyQuiz />}
      </main>
    </div>
  )
}

export default App
