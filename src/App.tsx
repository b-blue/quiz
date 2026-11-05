import { useEffect, useState } from 'react'
import Quiz from './components/Quiz'
import Hub from './components/Hub'
import PracticeTest from './components/PracticeTest'
import { loadView, saveView, saveStudy } from './lib/appState'
import type { SavedView } from './lib/appState'
import './App.css'

function App() {
  const [current, setCurrent] = useState<SavedView>(() => loadView());

  useEffect(() => { saveView(current); }, [current]);

  function go(next: SavedView) {
    saveStudy(null);
    setCurrent(next);
  }

  const openHub = () => go({ view: 'hub' });

  return (
    <div>
      <header style={{ display: 'flex', gap: 12, alignItems: 'center', padding: '0.5rem 1rem' }}>
      </header>
      <main>
        {current.view === 'aws' ? <Quiz mode="aws" onOpenHub={openHub} />
          : current.view === 'saa' ? <Quiz mode="saa" onOpenHub={openHub} />
          : current.view === 'practice' && current.test ? <PracticeTest key={current.test} test={current.test} onExit={openHub} />
          : <Hub onStartQuiz={(m) => go({ view: m })} onStartPractice={(n) => go({ view: 'practice', test: n })} />}
      </main>
    </div>
  )
}

export default App
