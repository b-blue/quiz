import { useCallback, useEffect, useMemo, useState } from 'react'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { blueTheme, greenTheme } from './theme'
import ErrorBoundary from './components/ErrorBoundary'
import Quiz from './components/Quiz'
import Hub from './components/Hub'
import PracticeTest from './components/PracticeTest'
import { loadView, saveView, saveStudy } from './lib/appState'
import type { SavedView } from './lib/appState'
import { pushScreen, useScreenPop } from './lib/screenHistory'
import { useSwipeHistory } from './lib/useSwipeHistory'
import { NavContext } from './lib/NavContext'
import type { Nav } from './lib/NavContext'

function App() {
  const [current, setCurrent] = useState<SavedView>(() => loadView());
  const [nonce, setNonce] = useState(0);

  useEffect(() => { saveView(current); }, [current]);
  useSwipeHistory();

  useScreenPop(useCallback((s) => {
    if (!s) return;
    setCurrent(prev => {
      if (prev.view === s.view.view && prev.test === s.view.test) return prev;
      setNonce(n => n + 1);
      return s.view;
    });
  }, []));

  const nav = useMemo<Nav>(() => {
    const go = (next: SavedView) => { saveStudy(null); pushScreen(next); setCurrent(next); setNonce(n => n + 1); };
    return {
      openHub: () => go({ view: 'hub' }),
      openQuiz: (mode) => go({ view: mode }),
      openStudy: () => { saveStudy({ from: 'quiz' }); pushScreen({ view: 'saa' }, 'study', { from: 'quiz' }); setCurrent({ view: 'saa' }); setNonce(n => n + 1); },
    };
  }, []);

  // Practice tests and the SAA-C03 quiz are green; the CLF-C02 quiz and hub stay blue.
  const theme = current.view === 'practice' || current.view === 'saa' ? greenTheme : blueTheme;

  return (
    <ThemeProvider theme={theme} defaultMode="system">
    <CssBaseline />
    <NavContext.Provider value={nav}>
    <ErrorBoundary>
      {current.view === 'aws' ? <Quiz key={`aws${nonce}`} mode="aws" />
        : current.view === 'saa' ? <Quiz key={`saa${nonce}`} mode="saa" />
        : current.view === 'practice' && current.test ? <PracticeTest key={current.test} test={current.test} onExit={nav.openHub} />
        : <Hub onStartQuiz={nav.openQuiz} onStartPractice={(n) => { saveStudy(null); pushScreen({ view: 'practice', test: n }); setCurrent({ view: 'practice', test: n }); }} />}
    </ErrorBoundary>
    </NavContext.Provider>
    </ThemeProvider>
  )
}

export default App
