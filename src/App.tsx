import { useState } from 'react'
import Quiz from './components/Quiz'
import BiologyQuiz from './components/BiologyQuiz'
import Settings from './components/Settings'
import './App.css'

function App() {
  // single dark theme only
  const [mode, setMode] = useState<'aws'|'bio'|'settings'>(() => {
    const s = typeof window !== 'undefined' ? localStorage.getItem('app:startMode') : null;
    return s === 'bio' ? 'bio' : 'aws';
  });

  return (
    <div>
      <header style={{ display: 'flex', gap: 12, alignItems: 'center', padding: '0.5rem 1rem' }}>
      </header>
      <main>
        {mode === 'aws' ? <Quiz onOpenSettings={() => setMode('settings')} /> : mode === 'bio' ? <BiologyQuiz onOpenSettings={() => setMode('settings')} /> : <Settings />}
      </main>
    </div>
  )
}

export default App
