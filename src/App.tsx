import { useEffect, useMemo, useState } from 'react'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { blueTheme, greenTheme } from './theme'
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

  // Practice tests and the SAA-C03 quiz are green; the CLF-C02 quiz and hub stay blue.
  const theme = current.view === 'practice' || current.view === 'saa' ? greenTheme : blueTheme;

  return (
    <ThemeProvider theme={theme} defaultMode="system">
    <CssBaseline />
    <NavContext.Provider value={nav}>
      {current.view === 'aws' ? <Quiz key={`aws${nonce}`} mode="aws" />
        : current.view === 'saa' ? <Quiz key={`saa${nonce}`} mode="saa" />
        : current.view === 'practice' && current.test ? <PracticeTest key={current.test} test={current.test} onExit={nav.openHub} />
        : <Hub onStartQuiz={nav.openQuiz} onStartPractice={(n) => { saveStudy(null); setCurrent({ view: 'practice', test: n }); }} />}
    </NavContext.Provider>
    </ThemeProvider>
  )
}

export default App
