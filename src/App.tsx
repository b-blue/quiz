import { useState } from 'react'
import Quiz from './components/Quiz'
import BiologyQuiz from './components/BiologyQuiz'
import './App.css'

function App() {
  // single dark theme only
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

          {/* dark theme only — toggle removed */}
        </div>
      </header>
      <main>
        {mode === 'aws' ? <Quiz /> : <BiologyQuiz />}
      </main>
    </div>
  )
}

export default App
