import { useEffect, useMemo, useState } from 'react'
import Quiz from './components/Quiz'
import Hub from './components/Hub'
import PracticeTest from './components/PracticeTest'
import { loadView, saveView, saveStudy } from './lib/appState'
import type { SavedView } from './lib/appState'
import { NavContext } from './lib/NavContext'
import type { Nav } from './lib/NavContext'

function App() {
  const [current, setCurrent] = useState<SavedView>(() => loadView());
  const [nonce, setNonce] = useState(0);

  useEffect(() => { saveView(current); }, [current]);

  const nav = useMemo<Nav>(() => {
    const go = (next: SavedView) => { saveStudy(null); setCurrent(next); setNonce(n => n + 1); };
    return {
      openHub: () => go({ view: 'hub' }),
      openQuiz: (mode) => go({ view: mode }),
      openStudy: () => { saveStudy({ from: 'quiz' }); setCurrent({ view: 'saa' }); setNonce(n => n + 1); },
    };
  }, []);

  return (
    <NavContext.Provider value={nav}>
      {current.view === 'aws' ? <Quiz key={`aws${nonce}`} mode="aws" />
        : current.view === 'saa' ? <Quiz key={`saa${nonce}`} mode="saa" />
        : current.view === 'practice' && current.test ? <PracticeTest key={current.test} test={current.test} onExit={nav.openHub} />
        : <Hub onStartQuiz={nav.openQuiz} onStartPractice={(n) => { saveStudy(null); setCurrent({ view: 'practice', test: n }); }} />}
    </NavContext.Provider>
  )
}

export default App
