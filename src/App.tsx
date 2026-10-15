import { useState } from 'react'
import Quiz from './components/Quiz'
import BiologyQuiz from './components/BiologyQuiz'
import Settings from './components/Settings'
import './App.css'

function App() {
  // single dark theme only
  const [mode, setMode] = useState<'aws'|'saa'|'bio'|'settings'>(() => {
    const s = typeof window !== 'undefined' ? localStorage.getItem('app:startMode') : null;
    return s === 'bio' || s === 'aws' || s === 'saa' ? s : 'saa';
  });
  const [prevMode, setPrevMode] = useState<'aws'|'saa'|'bio'>(() => mode === 'settings' ? 'aws' : mode);

  return (
    <div>
      <header style={{ display: 'flex', gap: 12, alignItems: 'center', padding: '0.5rem 1rem' }}>
      </header>
      <main>
        {mode === 'aws' ? <Quiz mode="aws" onOpenSettings={() => { setPrevMode('aws'); setMode('settings'); }} /> : mode === 'saa' ? <Quiz mode="saa" onOpenSettings={() => { setPrevMode('saa'); setMode('settings'); }} /> : mode === 'bio' ? <BiologyQuiz onOpenSettings={() => { setPrevMode('bio'); setMode('settings'); }} /> : <Settings onBack={() => setMode(prevMode)} />}
      </main>
    </div>
  )
}

export default App
