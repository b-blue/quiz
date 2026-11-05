import { lazy, Suspense, useCallback, useEffect, useRef, useState } from 'react';
import type { QuizQuestion } from '../types';
import { getRandomQuestion, getAllTerms, getSaaTerms, getPracticeRefs } from '../lib/terms';
import { loadCramText } from '../lib/practiceTests';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import LinearProgress from '@mui/material/LinearProgress';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { alpha } from '@mui/material/styles';
import MenuBookIcon from '@mui/icons-material/MenuBookOutlined';
import TimerIcon from '@mui/icons-material/TimerOutlined';
import TimerOffIcon from '@mui/icons-material/TimerOffOutlined';
import AppShell from './AppShell';
import { loadStudy, saveStudy } from '../lib/appState';
import { initialStudy, pushScreen, useScreenPop } from '../lib/screenHistory';

const StudyPanel = lazy(() => import('./StudyPanel'));

export default function Quiz({ mode = 'aws' }: { mode?: 'aws' | 'saa' }) {
  const terms = mode === 'saa' ? getSaaTerms() : getAllTerms();
  const selectedSection: string | null = null;
  const [question, setQuestion] = useState<QuizQuestion | null>(() => getRandomQuestion(selectedSection, terms));
  const [selected, setSelected] = useState<number | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [showStudyView, setShowStudyView] = useState(() => initialStudy('quiz') !== null);
  useScreenPop(useCallback((sc) => {
    const on = sc?.sub === 'study';
    if (!on) saveStudy(null);
    setShowStudyView(on);
  }, []));
  const [cramHint, setCramHint] = useState<string | null>(null);
  // Buttons are simple press targets now (no drag-and-drop)

  // Game state: streaks (per-quiz), muted
  const [currentStreak, setCurrentStreak] = useState<number>(() => Number(localStorage.getItem(`${mode}:currentStreak`) || 0));
  const [bestStreak, setBestStreak] = useState<number>(() => Number(localStorage.getItem(`${mode}:bestStreak`) || 0));
  const [csPop, setCsPop] = useState(false);
  const [bsPop, setBsPop] = useState(false);
  const csTimerRef = useRef<number | null>(null);
  const bsTimerRef = useRef<number | null>(null);
  const muted: boolean = localStorage.getItem('quiz:muted') === '1';

  // Timed per-question mode
  const [timedMode, setTimedMode] = useState<boolean>(() => localStorage.getItem(`${mode}:timedMode`) === '1');
  const timerDuration = 15; // seconds per question when timedMode is on
  const [timeLeft, setTimeLeft] = useState<number>(timerDuration);
  const timerRef = useRef<number | null>(null);

  function toggleTimedMode() {
    const next = !timedMode;
    setTimedMode(next);
    try { localStorage.setItem(`${mode}:timedMode`, next ? '1' : '0'); } catch (e) {}
  }

  const studyTitle = mode === 'saa' ? 'SAA-C03 Study Guide' : 'CLF-C02 Study Guide';

  function next() {
    // pick a new random question, but avoid returning the same definition immediately
    const maxAttempts = 10;
    let nextQ = getRandomQuestion(selectedSection ?? undefined, terms);
    let attempts = 0;
    while (nextQ && question && nextQ.definition === question.definition && attempts < maxAttempts) {
      nextQ = getRandomQuestion(selectedSection ?? undefined, terms);
      attempts++;
    }
    setQuestion(nextQ);
    setSelected(null);
    setShowAnswer(false);
    setCramHint(null);
    setTimeLeft(timerDuration);
  }
  function onSelect(i: number) {
    if (showAnswer) return;
    // stop timer while showing answer
    stopTimer();
    setSelected(i);
    setShowAnswer(true);

    const firstRef = mode === 'saa' && question?.term ? getPracticeRefs(question.term)[0]?.match(/^T(\d)Q(\d+)$/) : null;
    if (firstRef) {
      loadCramText(Number(firstRef[1]), Number(firstRef[2])).then(t => setCramHint(t ?? null)).catch(() => {});
    }

    const correct = i === question!.correctIndex;
    if (correct) {
      // celebrate every correct
      triggerConfetti();
      playTone(660, 0.1);

      const newStreak = currentStreak + 1;
      setCurrentStreak(newStreak);
      localStorage.setItem(`${mode}:currentStreak`, String(newStreak));

      // pop + audio cue for current streak multiples of 5
      if (newStreak > 0 && newStreak % 5 === 0) {
        setCsPop(true);
        playTone(980, 0.12);
        if (csTimerRef.current) window.clearTimeout(csTimerRef.current);
        csTimerRef.current = window.setTimeout(() => setCsPop(false), 420) as unknown as number;
      }

      if (newStreak > bestStreak) {
        const newBest = newStreak;
        setBestStreak(newBest);
        localStorage.setItem(`${mode}:bestStreak`, String(newBest));
        // extra celebration for new best
        triggerConfetti();
        playTone(880, 0.12);
        // pop + audio cue for best-streak multiples of 10
        if (newBest > 0 && newBest % 10 === 0) {
          setBsPop(true);
          playTone(1320, 0.14);
          if (bsTimerRef.current) window.clearTimeout(bsTimerRef.current);
          bsTimerRef.current = window.setTimeout(() => setBsPop(false), 520) as unknown as number;
        }
      }
    } else {
      setCurrentStreak(0);
      localStorage.setItem(`${mode}:currentStreak`, '0');
      playTone(220, 0.18);
    }
  }

  // No drag handlers — selecting is done by pressing option buttons.

  function triggerConfetti() {
    if (muted) return;
    // dynamic import to avoid breaking builds when package missing
    import('canvas-confetti').then((mod) => {
      const c = (mod as any).default || mod;
      try {
        c({ particleCount: 120, spread: 120, origin: { y: 0.6 } });
      } catch (e) {
        // ignore
      }
    }).catch(() => {});
  }

  function playTone(frequency: number, duration = 0.1) {
    if (muted) return;
    try {
      const AudioCtx = (window as any).AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioCtx();
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = 'sine';
      o.frequency.value = frequency;
      o.connect(g);
      g.connect(ctx.destination);
      g.gain.value = 0.0001;
      o.start();
      const now = ctx.currentTime;
      g.gain.exponentialRampToValueAtTime(0.08, now + 0.01);
      g.gain.exponentialRampToValueAtTime(0.0001, now + duration);
      o.stop(now + duration + 0.02);
      setTimeout(() => { try { ctx.close(); } catch (e) {} }, (duration + 0.05) * 1000);
    } catch (e) {
      // ignore
    }
  }

  function stopTimer() {
    if (timerRef.current) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }

  useEffect(() => {
    // start timer for question when timedMode is enabled and answers not shown
    stopTimer();
    if (!timedMode || showStudyView) return;
    timerRef.current = window.setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          // time's up
          stopTimer();
          setShowAnswer(true);
          // show the correct answer when time expires
          setSelected(question ? question.correctIndex : null);
          setCurrentStreak(0);
          localStorage.setItem(`${mode}:currentStreak`, '0');
          playTone(220, 0.18);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => stopTimer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [question, timedMode, showStudyView]);

  useEffect(() => {
    return () => {
      if (csTimerRef.current) window.clearTimeout(csTimerRef.current);
      if (bsTimerRef.current) window.clearTimeout(bsTimerRef.current);
    };
  }, []);

  // framer-motion dynamic loading removed to avoid Vite import-analysis errors.
  // We use CSS transitions for hover/tap effects instead.

  if (!question) {
    return <AppShell title={studyTitle}><Typography>No terms available. Run the extractor to generate data.</Typography></AppShell>;
  }

  if (showStudyView) {
    return (
      <Suspense fallback={<AppShell title={studyTitle}><Typography>Loading study guide…</Typography></AppShell>}>
        <StudyPanel mode={mode} restore={loadStudy() ?? undefined} />
      </Suspense>
    );
  }

  const lines: string[] = [];
  if (showAnswer) {
    if (selected === question.correctIndex) {
      lines.push('Correct 🎉');
    } else {
      lines.push(`Incorrect — the correct answer is "${question.options[question.correctIndex]}"`);
      if (selected !== null) {
        const selectedTerm = question.options[selected];
        const selectedEntry = terms.find((t) => t.term === selectedTerm);
        if (selectedEntry?.definition) lines.push(`${selectedTerm} — ${selectedEntry.definition}`);
      }
    }
    const refs = mode === 'saa' && question.term ? getPracticeRefs(question.term) : [];
    if (refs.length > 0) {
      lines.push(`Seen in practice: ${refs.join(' · ')}`);
      if (cramHint) lines.push(`${refs[0]} cram — ${cramHint}`);
    }
  }

  const actions = (
    <>
      <Button variant="outlined" startIcon={<MenuBookIcon />} onClick={() => { saveStudy({ from: 'quiz' }); pushScreen({ view: mode }, 'study', { from: 'quiz' }); setShowStudyView(true); }} aria-label={`Open ${studyTitle}`}>Guide</Button>
      <Button variant="outlined" startIcon={timedMode ? <TimerIcon /> : <TimerOffIcon />} onClick={toggleTimedMode} aria-label={timedMode ? 'Turn timed mode off' : 'Turn timed mode on'}>
        {timedMode ? 'Timed' : 'Untimed'}
      </Button>
      <Button variant="contained" sx={{ flex: 1 }} onClick={next} disabled={!showAnswer}>Next</Button>
    </>
  );

  return (
    <AppShell title={question.definition} subtitle={mode === 'saa' ? 'SAA-C03 quiz' : 'CLF-C02 quiz'} actions={actions}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }} aria-live="polite">
        <Typography variant="body2" color="text.secondary">Streak: <strong className={csPop ? 'pop' : undefined} style={{ color: currentStreak > 0 && currentStreak % 5 === 0 ? '#66bb6a' : undefined }}>{currentStreak}</strong></Typography>
        <Typography variant="body2" color="text.secondary">Best: <strong className={bsPop ? 'pop' : undefined} style={{ color: bestStreak > 0 && bestStreak % 10 === 0 ? '#ffb300' : undefined }}>{bestStreak}</strong></Typography>
      </Box>
      {timedMode && <LinearProgress variant="determinate" value={(timeLeft / timerDuration) * 100} sx={{ mb: 2, height: 6, borderRadius: 3 }} />}

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        {question.options.map((opt, i) => {
          const correct = i === question.correctIndex;
          const isSelected = selected === i;
          const state = showAnswer ? (correct ? 'success' : isSelected ? 'error' : null) : null;
          return (
            <Paper
              key={opt}
              component="button"
              variant="outlined"
              onClick={() => onSelect(i)}
              aria-pressed={isSelected}
              sx={(theme) => ({
                textAlign: 'left',
                font: 'inherit',
                color: 'text.primary',
                p: 1.75,
                cursor: showAnswer ? 'default' : 'pointer',
                borderColor: state ? theme.palette[state].main : undefined,
                bgcolor: state ? alpha(theme.palette[state].main, 0.15) : 'background.paper',
                '&:hover': showAnswer ? undefined : { borderColor: 'primary.main' },
              })}
            >
              {opt}
            </Paper>
          );
        })}
      </Box>

      <Alert severity={!showAnswer ? 'info' : selected === question.correctIndex ? 'success' : 'warning'} icon={false} sx={{ mt: 2 }}>
        {showAnswer ? lines.map((l, idx) => <Typography key={idx} variant="body2" sx={{ mb: idx < lines.length - 1 ? 1 : 0 }}>{l}</Typography>) : 'Pick the term that matches the clue.'}
      </Alert>
    </AppShell>
  );
}
