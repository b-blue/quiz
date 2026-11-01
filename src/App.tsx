import { useState } from 'react'
import Quiz from './components/Quiz'
import BiologyQuiz from './components/BiologyQuiz'
import Settings from './components/Settings'
import PracticeTest from './components/PracticeTest'
import './App.css'

function App() {
  // single dark theme only
  const [mode, setMode] = useState<'aws'|'saa'|'bio'|'settings'|'practice'>(() => {
    const s = typeof window !== 'undefined' ? localStorage.getItem('app:startMode') : null;
    return s === 'bio' || s === 'aws' || s === 'saa' ? s : 'saa';
  });
  const [prevMode, setPrevMode] = useState<'aws'|'saa'|'bio'>(() => mode === 'settings' || mode === 'practice' ? 'aws' : mode);

  const [practiceTest, setPracticeTest] = useState<number>(1);

  return (
    <div>
      <header style={{ display: 'flex', gap: 12, alignItems: 'center', padding: '0.5rem 1rem' }}>
      </header>
      <main>
        {mode === 'aws' ? <Quiz mode="aws" onOpenSettings={() => { setPrevMode('aws'); setMode('settings'); }} /> : mode === 'saa' ? <Quiz mode="saa" onOpenSettings={() => { setPrevMode('saa'); setMode('settings'); }} /> : mode === 'bio' ? <BiologyQuiz onOpenSettings={() => { setPrevMode('bio'); setMode('settings'); }} /> : mode === 'practice' ? <PracticeTest key={practiceTest} test={practiceTest} onExit={() => setMode('settings')} /> : <Settings onBack={() => setMode(prevMode)} onStartPractice={(n) => { setPracticeTest(n); setMode('practice'); }} />}
      </main>
    </div>
  )
}

export default App
